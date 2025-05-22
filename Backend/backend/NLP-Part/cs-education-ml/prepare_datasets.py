import pandas as pd
from sklearn.model_selection import train_test_split

def prepare_t5_data(df):
    return df[['context', 'question']].sample(frac=1).reset_index(drop=True)

def prepare_bert_data(df):
    df['text'] = df['context'] + " [SEP] " + df['question']
    return df[['text', 'difficulty']].sample(frac=1).reset_index(drop=True)

def main():
    df = pd.read_csv("data/augmented/augmented_dataset.csv")
    
    t5_df = prepare_t5_data(df)
    bert_df = prepare_bert_data(df)
    
    t5_train, t5_valid = train_test_split(
        t5_df,
        test_size=0.2,
        random_state=42
    )
    
    bert_train, bert_valid = train_test_split(
        bert_df,
        test_size=0.2,
        stratify=bert_df['difficulty'],
        random_state=42
    )
    
    t5_train.to_csv("data/final/t5_train.csv", index=False)
    t5_valid.to_csv("data/final/t5_valid.csv", index=False)
    bert_train.to_csv("data/final/bert_train.csv", index=False)
    bert_valid.to_csv("data/final/bert_valid.csv", index=False)

if __name__ == "__main__":
    main()