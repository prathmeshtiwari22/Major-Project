from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import random
import logging
from bkt import SimpleBKT

app = FastAPI()
logging.basicConfig(level=logging.INFO)
bkt = SimpleBKT()

with open("questions.json", "r") as f:
    questions = json.load(f)

leitner_boxes = {1: [], 2: [], 3: [], 4: [], 5: []}
user_progress = {}
for i, q in enumerate(questions):
    q["id"] = i
    leitner_boxes[1].append(q)
    user_progress[i] = {"box": 1, "correct": 0}

class AnswerInput(BaseModel):
    question_id: int
    selected_option: str

@app.get("/questions")
def get_question():
    concept = "computer_science"
    knowledge = bkt.get_knowledge(concept)

    if knowledge < 0.4:
        difficulty_level = "easy"
    elif knowledge < 0.7:
        difficulty_level = "medium"
    else:
        difficulty_level = "hard"

    for box in range(1, 6):
        candidates = [q for q in leitner_boxes[box] if q.get("difficulty") == difficulty_level]
        if candidates:
            question = random.choice(candidates)
            options = question["options"][:]
            random.shuffle(options)
            return {
                "question_id": question["id"],
                "question": question["question"],
                "options": options,
                "difficulty": question["difficulty"]
            }
    raise HTTPException(status_code=404, detail="No questions available for current difficulty")

@app.post("/submit")
def submit_answer(data: AnswerInput):
    question = next((q for q in questions if q["id"] == data.question_id), None)
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")

    correct = data.selected_option == question["correct_answer"]
    concept = "computer_science"
    bkt.update(concept, correct)

    current_box = user_progress[data.question_id]["box"]
    new_box = min(current_box + 1, 5) if correct else 1
    user_progress[data.question_id]["box"] = new_box
    if correct:
        user_progress[data.question_id]["correct"] += 1

    logging.info(f"Question {data.question_id} moved from Box {current_box} to Box {new_box}")

    leitner_boxes[current_box] = [q for q in leitner_boxes[current_box] if q["id"] != data.question_id]
    leitner_boxes[new_box].append(question)

    return {
        "correct": correct,
        "new_box": new_box,
        "correct_answer": question["correct_answer"],
        "updated_knowledge_estimate": bkt.get_knowledge(concept)
    }

@app.get("/knowledge")
def get_knowledge(concept: str = "computer_science"):
    return {"concept": concept, "knowledge_estimate": bkt.get_knowledge(concept)}

@app.get("/leitner")
def get_leitner_progress():
    return sorted(
        [
            {"question_id": q_id, "box": prog["box"], "times_correct": prog["correct"]}
            for q_id, prog in user_progress.items()
        ],
        key=lambda x: x["box"]
    )

@app.get("/debug/user_progress")
def debug_user_progress():
    return user_progress

@app.get("/debug/leitner_boxes")
def debug_leitner_boxes():
    return {f"box_{box}": [q["id"] for q in questions_list] for box, questions_list in leitner_boxes.items()}
