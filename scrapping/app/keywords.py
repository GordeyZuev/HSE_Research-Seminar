from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer
import networkx as nx
import yake
from rake_nltk import Rake
from keybert import KeyBERT
import spacy
import pytextrank

# Для TextRank через pytextrank
nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("textrank")


def extract_keywords_tfidf(text: str, top_k: int = 10) -> List[str]:
    vectorizer = TfidfVectorizer(stop_words='english', max_features=top_k)
    X = vectorizer.fit_transform([text])
    return list(vectorizer.get_feature_names_out())


def extract_keywords_textrank(text: str, top_k: int = 10) -> List[str]:
    doc = nlp(text)
    return [phrase.text for phrase in doc._.phrases[:top_k]]


def extract_keywords_rake(text: str, top_k: int = 10) -> List[str]:
    rake = Rake()
    rake.extract_keywords_from_text(text)
    return [kw for kw, _ in rake.get_ranked_phrases_with_scores()[:top_k]]


def extract_keywords_yake(text: str, top_k: int = 10) -> List[str]:
    kw_extractor = yake.KeywordExtractor(top=top_k, stopwords=None)
    keywords = kw_extractor.extract_keywords(text)
    return [kw for kw, _ in keywords]


def extract_keywords_keybert(text: str, top_k: int = 10) -> List[str]:
    model = KeyBERT()
    keywords = model.extract_keywords(text, top_n=top_k)
    return [kw for kw, _ in keywords] 