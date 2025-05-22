import yaml
from transformers import TrainingArguments, Trainer
from utils.data_loader import load_cs_dataset, CS_COLUMNS
from models.bert_classifier import create_bert_model

def main():
    with open("config/bert_config.yaml") as f:
        config = yaml.safe_load(f)
    
    model, tokenizer = create_bert_model(config)
    
    dataset = load_cs_dataset("data")
    
    def preprocess(examples):
        return tokenizer(
            examples["text"],
            max_length=config["max_length"],
            truncation=True,
            padding="max_length"
        )
    
    tokenized_ds = dataset.map(preprocess, batched=True)
    
    training_args = TrainingArguments(
        output_dir="./bert_results",
        per_device_train_batch_size=config["batch_size"],
        fp16=True,
        gradient_accumulation_steps=2,
        **{k:v for k,v in config.items() if k in ["learning_rate", "num_epochs"]}
    )
    
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_ds["train"],
        eval_dataset=tokenized_ds["valid"],
        compute_metrics=compute_metrics
    )
    
    trainer.train()

def compute_metrics(eval_pred):
    pass

if __name__ == "__main__":
    main()