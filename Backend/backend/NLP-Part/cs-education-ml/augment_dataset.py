import pandas as pd
from transformers import pipeline
import random

def augment_data(df):
    paraphrases = pipeline('text2text-generation', model='t5-small')
    
    augmented = []
    for _, row in df.iterrows():
        paraphrased_q = paraphrases(
            f"paraphrase: {row['question']}",
            max_length=128,
            num_return_sequences=2,
            do_sample=True
        )
        
        new_difficulties = []
        if row['difficulty'] == 'beginner':
            new_difficulties.append('intermediate')
        elif row['difficulty'] == 'intermediate':
            new_difficulties.extend(['beginner', 'advanced'])
        else:
            new_difficulties.append('intermediate')
            
        for p in paraphrased_q:
            for diff in new_difficulties:
                augmented.append({
                    'context': row['context'],
                    'question': p['generated_text'],
                    'answer': row['answer'],
                    'difficulty': diff,
                    'type': row['type']
                })
    
    return pd.concat([df, pd.DataFrame(augmented)])

if __name__ == "__main__":
    df = pd.read_csv("data/cs_dataset.csv")
    augmented_df = augment_data(df)
    augmented_df.to_csv("data/augmented_dataset.csv", index=False)