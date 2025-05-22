import pandas as pd
from sklearn.model_selection import train_test_split

def validate_and_split():
    df = pd.read_csv('data/cs_questions.csv')
    
    valid = df[
        (df['difficulty'].isin(['beginner', 'intermediate', 'advanced'])) &
        (df['type'].isin(['definition', 'code', 'theory']))
    ]
    
    train, test = train_test_split(valid, test_size=0.2)
    
    train.to_csv('data/train.csv', index=False)
    test.to_csv('data/test.csv', index=False)
    print(f"Training samples: {len(train)}, Test samples: {len(test)}")

if __name__ == "__main__":
    validate_and_split()