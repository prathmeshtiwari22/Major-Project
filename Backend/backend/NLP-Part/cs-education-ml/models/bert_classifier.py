from transformers import DistilBertForSequenceClassification, AutoTokenizer

def create_bert_model(config):
    model = DistilBertForSequenceClassification.from_pretrained(
        config["model_name"],
        num_labels=config["num_labels"]
    )
    return model, AutoTokenizer.from_pretrained(config["model_name"])