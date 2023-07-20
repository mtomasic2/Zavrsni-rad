import requests
import spacy
import io
import sys
import re
import utils
from bs4 import BeautifulSoup

# Wrap sys.stdout with an encoding that supports the characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Dohvaćanje HTML sadržaja stranice
response = requests.get('https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-users')
html_content = response.content

# Pretvaranje HTML sadržaja u tekst
soup = BeautifulSoup(html_content, 'html.parser')

# Pronalaženje elementa s oznakom "main"
main_element = soup.find('main')
#print(main_element)

if main_element:
    # Izdvajanje teksta unutar elementa "main"
    text = main_element.get_text()

    # Regex za pronalaženje elemenata s imenom metode i putanjom
    # regex = r"(GET|POST|PUT|DELETE)\s+(https?://\S+?/[a-z][^A-Z\s]*)"
    regex = r"(GET|POST|PUT|DELETE)\s+(https?://\S+|/\S*api\S*|\S+)"

    # Pronalaženje svih podudaranja
    matches = re.findall(regex, text)

    # Ispis rezultata
    utils.print_matches(matches)
else:
    print("Nije pronađen element 'main' u HTML-u.")






