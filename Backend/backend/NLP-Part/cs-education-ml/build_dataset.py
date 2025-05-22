import pandas as pd
import logging
import time  
from utils.synthetic_generator import generate_qa_batch

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

REQUIRED_COLUMNS = ['context', 'question', 'answer', 'difficulty', 'type']

def validate_entry(entry):
    if not isinstance(entry, dict):
        logger.warning("Invalid entry type - expected dictionary")
        return False
    
    missing = [key for key in REQUIRED_COLUMNS if key not in entry]
    if missing:
        logger.warning(f"Missing fields: {missing}")
        return False
        
    empty = [key for key in REQUIRED_COLUMNS if not str(entry[key]).strip()]
    if empty:
        logger.warning(f"Empty fields: {empty}")
        return False
        
    entry['difficulty'] = entry.get('difficulty', '').lower()
    entry['type'] = entry.get('type', '').lower()
    
    valid_difficulties = ['beginner', 'intermediate', 'advanced']
    if entry['difficulty'] not in valid_difficulties:
        logger.warning(f"Invalid difficulty: {entry['difficulty']}")
        logger.debug(f"Full entry: {entry}")  
        return False
        
    valid_types = ['definition', 'code', 'theory']
    if entry['type'].lower() not in valid_types:
        logger.warning(f"Invalid type: {entry['type']}")
        return False
        
    if len(entry['answer']) < 20:
        logger.warning("Answer too short (min 20 chars)")
        return False
        
    return True

def build_dataset():
    topics = [
        "Python inheritance", "Python decorators", "Python list comprehensions",
        "Java polymorphism", "C++ memory management", "JavaScript promises",
        
        "Time complexity analysis", "Binary search algorithm", "Hash tables implementation",
        "Quick sort algorithm", "Graph traversal methods", "Dynamic programming basics",
        
        "SQL JOIN operations", "Database normalization", "ACID properties",
        "Indexing in databases", "NoSQL vs SQL", "Transaction isolation levels",
        
        "P vs NP problem", "Finite automata", "Regular expressions in theory",
        "Turing machines", "Computational complexity", "Lambda calculus",
        
        "Agile methodology", "Test-driven development", "Design patterns",
        "REST API principles", "Microservices architecture", "CI/CD pipelines"
    ]
    
    all_entries = []
    
    for topic in topics:
        try:
            batch = generate_qa_batch(topic, num=2)
            if not batch:
                logger.warning(f"No questions for {topic}")
                continue
                
            logger.debug(f"Raw batch for {topic}: {batch}")  
            valid_entries = [e for e in batch if validate_entry(e)]
            
            if not valid_entries:
                logger.warning(f"All entries invalid for {topic}")
                logger.debug(f"Invalid batch: {batch}")  
                
            all_entries.extend(valid_entries)
            logger.info(f"Added {len(valid_entries)} valid entries for {topic}")
            
            time.sleep(20)  
            
        except Exception as e:
            logger.error(f"Error processing {topic}: {str(e)}")
            continue

    if not all_entries:
        logger.error("No valid entries collected!")
        return
    
    df = pd.DataFrame(all_entries)
    
    for col in REQUIRED_COLUMNS:
        if col not in df.columns:
            df[col] = None
            logger.warning(f"Missing column {col} - filled with nulls")

    df = df.dropna(subset=REQUIRED_COLUMNS)
    
    output_path = "data/cs_dataset.csv"
    df[REQUIRED_COLUMNS].to_csv(output_path, index=False)
    logger.info(f"Dataset saved to {output_path} with {len(df)} entries")

if __name__ == "__main__":
    build_dataset()