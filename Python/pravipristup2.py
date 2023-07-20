import spacy

def extract_api_information(text):
    # Učitavanje jezičnog modela spaCy
    nlp = spacy.load("en_core_web_sm")

    # Analiza teksta
    doc = nlp(text)

    # Inicijalizacija listi za opise putanja
    descriptions = []

    # Pretraživanje rečenica u tekstu
    for sent in doc.sents:
        sent_text = sent.text

        # Pronalaženje metoda
        method = "GET"
        for token in sent:
            if token.text in ["GET", "POST", "PUT", "DELETE"]:
                method = token.text.upper()
                break

        # Pronalaženje putanje
        start_index = sent_text.find("/")  
        end_index = sent_text.find(" ", start_index)
        path = sent_text[start_index:end_index]

        # Pronalaženje opisa
        start_index = end_index + 1
        description = sent_text[start_index:]

        descriptions.append((method, path, description.strip()))

    return descriptions

# Primjer upotrebe
text = "This RESTful web service allows users to search for and retrieve information, you can make requests to the /books endpoint to get a list of books. Additionally, the /users/{id} endpoint provides user-related information."

descriptions = extract_api_information(text)

print("API Descriptions:")
for method, path, description in descriptions:
    print("Method:", method)
    print("Path:", path)
    print("Description:", description)
    print()
