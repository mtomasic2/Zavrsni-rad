import requests
import spacy
import sys
import io
from bs4 import BeautifulSoup

# Wrap sys.stdout with an encoding that supports the characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Dohvaćanje sadržaja web stranice
response = requests.get('https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-users#http-request-3')
html_content = response.content

# Analiza HTML sadržaja
soup = BeautifulSoup(html_content, 'html.parser')
# Pronalazak "main" elementa u HTML-u
main_element = soup.find('main')



# Provjera je li pronađen "main" element
if main_element:
    # Izdvajanje teksta unutar "main" elementa
    main_text = main_element.get_text()
    
    # Inicijalizacija spaCy modela
    nlp = spacy.load('en_core_web_sm')

    # Analiza teksta iz "main" elementa
    doc = nlp(main_text)

    # Izdvajanje imenovanih entiteta
    named_entities = set()
    for entity in doc.ents:
        if entity.label_:
            named_entities.add(entity.text)

    # Ispis imenovanih entiteta
    for entity in named_entities:
        print(entity)
else:
    print("Nije pronađen \"main\" element u HTML-u.")