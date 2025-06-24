import spacy
from typing import List, Tuple

nlp = spacy.load("en_core_web_sm")

def extract_entities(text: str) -> List[Tuple[str, str]]:
    doc = nlp(text)
    return [(ent.text, ent.label_) for ent in doc.ents] 