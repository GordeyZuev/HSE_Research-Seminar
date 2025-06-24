# Сервис для выделения ключевых слов и эмбеддингов из статей

## Описание
Сервис позволяет:
- Скрапить текст статьи по URL
- Извлекать ключевые слова (TF-IDF, TextRank, RAKE, YAKE, KeyBERT)
- Извлекать именованные сущности (NER)
- Получать эмбеддинги текста (BERT, RoBERTa)

## Архитектура
- **`/extract/keywords`** — принимает URL или текст, возвращает ключевые слова
- **`/extract/entities`** — возвращает именованные сущности
- **`/embed`** — возвращает эмбеддинг текста

## Структура проекта
```
NIS/
  app/
    main.py           # FastAPI приложение
    scraper.py        # Скрапинг и предобработка
    keywords.py       # Ключевые слова
    entities.py       # NER
    embeddings.py     # Эмбеддинги
  requirements.txt
  README.md
```

## Установка и запуск

### 1. Установка зависимостей
```bash
pip install -r requirements.txt
```

### 2. Установка модели SpaCy
```bash
python -m spacy download en_core_web_sm
```

### 3. Запуск сервера
```bash
uvicorn app.main:app --reload
```

Сервер будет доступен по адресу: http://127.0.0.1:8000

### 4. Документация API
Swagger UI: http://127.0.0.1:8000/docs

## API Эндпоинты

### 1. Извлечение ключевых слов
**POST** `/extract/keywords`

Поддерживаемые методы:
- `tfidf` - TF-IDF (по умолчанию)
- `textrank` - TextRank
- `rake` - RAKE
- `yake` - YAKE
- `keybert` - KeyBERT

#### Пример запроса:
```json
{
  "text": "FastAPI is a modern, fast web framework for building APIs with Python. It is easy to use and very powerful.",
  "method": "tfidf",
  "top_k": 5
}
```

#### Пример ответа:
```json
{
  "keywords": ["fastapi", "modern", "web", "framework", "python"]
}
```

### 2. Извлечение именованных сущностей
**POST** `/extract/entities`

#### Пример запроса:
```json
{
  "text": "Barack Obama was the 44th President of the United States."
}
```

#### Пример ответа:
```json
{
  "entities": [
    ["Barack Obama", "PERSON"],
    ["44th", "ORDINAL"],
    ["United States", "GPE"]
  ]
}
```

### 3. Получение эмбеддингов
**POST** `/embed`

#### Пример запроса:
```json
{
  "text": "FastAPI is a modern web framework."
}
```

#### Пример ответа:
```json
{
  "embedding": [0.123, -0.456, 0.789, ...]
}
```


## Технологии
- **`FastAPI`** - веб-фреймворк
- **`SpaCy`** - NLP и NER
- **`scikit-learn`** - TF-IDF
- **`pytextrank`** - TextRank
- **`rake-nltk`** - RAKE
- **`yake`** - YAKE
- **`keybert`** - KeyBERT
- **`transformers`** - BERT эмбеддинги
- **`BeautifulSoup`** - парсинг HTML
- **`requests`** - HTTP запросы

## Возможные улучшения
1. Поддержка русского языка
2. Асинхронная обработка
3. Кэширование результатов
4. Docker контейнеризация