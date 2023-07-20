from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

def print_matches(matches):
    for match in matches:
        method = match[0]
        path = match[1]
        print("Metoda:", method)
        print("Putanja:", path)
        print()

def read_text_from_file(text_file_path):
    with open(text_file_path, 'r', encoding='utf-8') as file:
        # Čitanje sadržaja datoteke
        text = file.read()
    return text


def count_most_common_words(text, num_words):
    # Tokenizacija teksta
    tokens = word_tokenize(text)
    # Uklanjanje interpunkcije i brojeva
    tokens = [token for token in tokens if token.isalpha()]
    # Pretvaranje u mala slova
    tokens = [token.lower() for token in tokens]
    # Uklanjanje stop riječi (npr. 'the', 'and', 'is')
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    # Izračunavanje frekvencija riječi
    frequency_dist = FreqDist(tokens)
    # Izdvajanje najčešćih riječi
    most_common_words = frequency_dist.most_common(num_words)
    return most_common_words