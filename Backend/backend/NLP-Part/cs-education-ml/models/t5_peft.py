from transformers import T5ForConditionalGeneration, T5Tokenizer
from peft import LoraConfig, get_peft_model

def create_t5_model(config):
    model = T5ForConditionalGeneration.from_pretrained(
        config["model_name"],
        load_in_4bit=True,
        device_map="auto"
    )
    
    peft_config = LoraConfig(
        r=config["lora_rank"],
        lora_alpha=32,
        target_modules=["q", "v", "wi", "wo"],
        lora_dropout=0.1,
        task_type="SEQ_2_SEQ_LM"
    )
    
    return get_peft_model(model, peft_config), T5Tokenizer.from_pretrained(config["model_name"])