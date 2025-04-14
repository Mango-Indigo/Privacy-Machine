import pickle
from flask import Flask,request,jsonify,render_template
from flask_cors import CORS
import numpy as np

# loads model and vectorizer
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('vec.pkl', 'rb') as f:
    vec = pickle.load(f)

app = Flask(__name__)
CORS(app)

# creates home page
@app.route('/')
def home():
    # return render_template('options.html')
    return "Local server is up and running"

# communicates with client side
@app.route('/predict', methods=['POST'])
def predict():
    # recives text data
    text0 = request.get_json()
    text = text0['text']
    if text is not None:
        # vectorizing text, predicts using model and sends the data back
        text_transformed = vec.transform([text])
        prediction0 = model.predict(text_transformed)
        prediction = prediction0[0]
        return jsonify({'prediction': prediction})
    else:
	    return jsonify({'error': 'Text not available.'})


if __name__ == '__main__':
    app.run(debug=True)



