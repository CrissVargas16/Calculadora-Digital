from sympy import sympify, sqrt, cos, sin, log, pi, exp, tan
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
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


@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        data = request.get_json()
        print("DATA RECIBIDA", data)
        expresion = data.get("expresion", 0)
        print("EXPRESION RECIBIDA", expresion)
        contexto = {
            "sqrt": sqrt,
            "sin": sin,
            "cos": cos,
            "log": log,
            "pi": pi,
            "exp": exp,
            "tan": tan,
        }

        resultado = sympify(expresion, locals=contexto).evalf()
        return jsonify({"resultado": float(resultado)})
    except Exception:
        return jsonify({"error": "Expresion invalida"}), 400


if __name__ == "__main__":
    app.run(
        debug=True
    )  # Asi para que se reinicie cada que se corra y por default port 5000
