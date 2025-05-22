from datasets import load_dataset

def get_sciq_data():
    dataset = load_dataset('sciq', split='train[:500]')
    return [{
        'context': ex['support'],
        'question': ex['question'],
        'answer': ex['correct_answer'],
        'difficulty': 'intermediate',
        'type': 'theory',
        'topic': 'Science'
    } for ex in dataset]