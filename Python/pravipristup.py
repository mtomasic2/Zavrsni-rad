import os
import io
import sys
import spacy
from collections import Counter
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist

import utils

# Wrap sys.stdout with an encoding that supports the characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

current_file_path = os.path.abspath(__file__)
text_file_path = os.path.join(os.path.dirname(current_file_path), "text.txt")

text = utils.read_text_from_file(text_file_path)

top_keywords = utils.count_most_common_words(text, 10)
for keyword, frequency in top_keywords:
    print(keyword, frequency)

# Keywords
nlp = spacy.load("en_core_web_sm")
doc = nlp(text)
print(doc.ents)


