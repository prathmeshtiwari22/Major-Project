import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    pipeline,
    BitsAndBytesConfig
)
import logging
import json
from typing import List, Dict

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_NAME = "microsoft/phi-3-mini-4k-instruct"

# Windows-optimized 8-bit configuration
quantization_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_enable_fp32_cpu_offload=True,
    llm_int8_threshold=6.0
)

# Conservative device map for 4GB VRAM
device_map = {
    "model.embed_tokens": 0,
    "model.layers.0": 0,
    "model.layers.1": 0,
    "model.layers.2": "cpu",
    "model.layers.3": "cpu",
    **{f"model.layers.{i}": "cpu" for i in range(4, 32)},
    "model.norm": "cpu",
    "lm_head": "cpu"
}

def load_model():
    """Memory-safe model loading for 4GB VRAM"""
    try:
        logger.info("Loading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        
        logger.info("Loading model...")
        model = AutoModelForCausalLM.from_pretrained(
            MODEL_NAME,
            quantization_config=quantization_config,
            device_map=device_map,
            trust_remote_code=True,
            torch_dtype=torch.float16
        )
        return model, tokenizer
    except Exception as e:
        logger.error(f"Loading failed: {str(e)}")
        raise

model, tokenizer = load_model()

def generate_qa_batch(topic: str, num: int = 1) -> list:
    """Generation with strict VRAM management"""
    prompt = f"""Generate {num} question about {topic} in STRICT JSON format:
[
  {{
    "context": "...",
    "question": "...", 
    "answer": "...",
    "difficulty": "beginner",  // MUST be one of: beginner/intermediate/advanced
    "type": "definition"       // MUST be one of: definition/code/theory
  }}
]"""

    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=64,
        temperature=0.7,
        do_sample=True,
        device=0
    )

    try:
        torch.cuda.empty_cache()
        response = pipe(prompt)[0]['generated_text']
        return parse_response(response)
    except Exception as e:
        logger.error(f"Generation failed: {str(e)}")
        return []

def parse_response(response: str) -> List[Dict]:
    """Improved JSON parsing"""
    try:
        json_start = response.find('[')
        json_end = response.rfind(']') + 1
        json_str = response[json_start:json_end]
        return json.loads(json_str)
    except Exception as e:
        logger.warning(f"Parsing failed: {str(e)}")
        return []

if __name__ == "__main__":
    logger.info("Testing generation...")
    results = generate_qa_batch("Python variables")
    if results:
        print(json.dumps(results, indent=2))
    else:
        logger.error("Generation test failed")