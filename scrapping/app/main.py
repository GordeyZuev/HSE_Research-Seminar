from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import Optional, List, Literal
from app.scraper import fetch_article_text
from app.keywords import (
    extract_keywords_tfidf,
    extract_keywords_textrank,
    extract_keywords_rake,
    extract_keywords_yake,
    extract_keywords_keybert,
)
from app.entities import extract_entities
from app.embeddings import get_text_embedding

app = FastAPI(title="Keyword & Embedding Extraction Service")

class ExtractRequest(BaseModel):
    url: Optional[str] = None
    text: Optional[str] = None
    method: Optional[Literal['tfidf', 'textrank', 'rake', 'yake', 'keybert']] = 'tfidf'
    top_k: Optional[int] = 10

@app.post("/extract/keywords")
def extract_keywords(req: ExtractRequest):
    if req.text:
        text = req.text
    elif req.url:
        text = fetch_article_text(req.url)
        if not text:
            return {"error": "Не удалось получить текст по URL"}
    else:
        return {"error": "Нужно передать url или text"}

    if req.method == 'tfidf':
        keywords = extract_keywords_tfidf(text, req.top_k)
    elif req.method == 'textrank':
        keywords = extract_keywords_textrank(text, req.top_k)
    elif req.method == 'rake':
        keywords = extract_keywords_rake(text, req.top_k)
    elif req.method == 'yake':
        keywords = extract_keywords_yake(text, req.top_k)
    elif req.method == 'keybert':
        keywords = extract_keywords_keybert(text, req.top_k)
    else:
        return {"error": "Неизвестный метод"}
    return {"keywords": keywords}

@app.post("/extract/entities")
def extract_entities_api(req: ExtractRequest):
    if req.text:
        text = req.text
    elif req.url:
        text = fetch_article_text(req.url)
        if not text:
            return {"error": "Не удалось получить текст по URL"}
    else:
        return {"error": "Нужно передать url или text"}
    entities = extract_entities(text)
    return {"entities": entities}

@app.post("/embed")
def embed_text(req: ExtractRequest):
    if req.text:
        text = req.text
    elif req.url:
        text = fetch_article_text(req.url)
        if not text:
            return {"error": "Не удалось получить текст по URL"}
    else:
        return {"error": "Нужно передать url или text"}
    embedding = get_text_embedding(text)
    return {"embedding": embedding}

# TODO: реализовать эндпоинты /extract/keywords, /extract/entities, /embed 