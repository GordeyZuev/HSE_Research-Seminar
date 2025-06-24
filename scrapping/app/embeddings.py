from transformers import AutoTokenizer, AutoModel
import torch
from typing import List

MODEL_NAME = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModel.from_pretrained(MODEL_NAME)

def get_text_embedding(text: str) -> List[float]:
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        # Используем [CLS] токен (первый)
        embedding = outputs.last_hidden_state[:, 0, :].squeeze().tolist()
    return embedding 