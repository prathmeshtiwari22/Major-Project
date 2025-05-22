from datasets import load_dataset

def load_cs_dataset(file_path):
    return load_dataset('csv', data_files={
        'train': f'{file_path}/train.csv',
        'valid': f'{file_path}/valid.csv'
    })

CS_COLUMNS = {
    "t5": ["context", "question"],
    "bert": ["text", "label"]
}