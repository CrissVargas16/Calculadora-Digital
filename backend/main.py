from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_wordl():
    return "Hello, World:"


@app.route("/sumar", methods=["POST"])
def sumar():
    data = request.get_json()
    a = data.get("a", 0)
    b = data.get("b", 0)
    resultado = a + b
    return jsonify({"resultado": resultado})


@app.route("/restar", methods=["POST"])
def restar():
    data = request.get_json()
    a = data.get("a", 0)
    b = data.get("b", 0)
    resultado = a - b
    return jsonify({"resultado": resultado})


@app.route("/multiplicar", methods=["POST"])
def multiplicar():
    data = request.get_json()
    a = data.get("a", 0)
    b = data.get("b", 0)
    resultado = a * b
    return jsonify({"resultado": resultado})


@app.route("/dividir", methods=["POST"])
def dividir():
    data = request.get_json()
    a = data.get("a", 0)
    b = data.get("b", 0)
    resultado = a / b
    return jsonify({"resultado": resultado})


if __name__ == "__main__":
    app.run(
        debug=True
    )  # Asi para que se reinicie cada que se corra y por default port 5000
