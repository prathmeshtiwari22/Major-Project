import yaml
from transformers import Seq2SeqTrainingArguments, Seq2SeqTrainer
from utils.data_loader import load_cs_dataset, CS_COLUMNS
from models.t5_peft import create_t5_model

def main():
    with open("config/t5_config.yaml") as f:
        config = yaml.safe_load(f)
    
    model, tokenizer = create_t5_model(config)
 
    dataset = load_cs_dataset("data")
    
    def preprocess(examples):
        inputs = ["generate question: " + ex for ex in examples["context"]]
        targets = examples["question"]
        model_inputs = tokenizer(
            inputs, max_length=config["max_length"], truncation=True, padding="max_length"
        )
        labels = tokenizer(
            targets, max_length=config["max_length"], truncation=True, padding="max_length"
        )
        model_inputs["labels"] = labels["input_ids"]
        return model_inputs
    
    tokenized_ds = dataset.map(preprocess, batched=True)
    
    training_args = Seq2SeqTrainingArguments(
        output_dir="./t5_results",
        per_device_train_batch_size=config["batch_size"],
        predict_with_generate=True,
        fp16=True,
        gradient_accumulation_steps=2,
        **{k:v for k,v in config.items() if k in ["learning_rate", "num_epochs"]}
    )
    
    trainer = Seq2SeqTrainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_ds["train"],
        eval_dataset=tokenized_ds["valid"]
    )
    
    trainer.train()

if __name__ == "__main__":
    main()