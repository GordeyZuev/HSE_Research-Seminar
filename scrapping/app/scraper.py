import requests
from bs4 import BeautifulSoup
from typing import Optional


def fetch_article_text(url: str) -> Optional[str]:
    """Скрапит и возвращает основной текст статьи по URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        # Пробуем найти <article>
        article = soup.find('article')
        if article:
            text = article.get_text(separator=' ', strip=True)
        else:
            # Пробуем найти div с классом content
            content = soup.find('div', class_='content')
            if content:
                text = content.get_text(separator=' ', strip=True)
            else:
                # Фоллбек: весь текст страницы
                text = soup.get_text(separator=' ', strip=True)
        return text
    except Exception as e:
        print(f"Ошибка при скрапинге: {e}")
        return None 