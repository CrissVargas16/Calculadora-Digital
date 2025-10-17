import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  }
  const handleBackspace = () => {
    if (result !== "") {
      setInput("");
      setResult("");
      return;
    }
    const funciones = ["sin(", "cos(", "tan(", "sqrt(", "pi", "Error"];
    for (let f of funciones) {
      if (input.endsWith(f)) {
        setInput(input.slice(0, -f.length));
        return;
      }
    }
    setInput(input.slice(0, -1));
  };

  const handleEqual = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expresion: input })
      });
      const data = await response.json();
      setInput(data.resultado.toString());
      setResult(data.resultado.toString());
    } catch (error) {
      console.error("Error:", error);
      setInput("Error");
    }
  };
  const displayValue = input
    .replace(/sqrt/g, "√")
    .replace(/pi/g, "π")
    .replace(/sin/g, "sin")
    .replace(/cos/g, "cos")
    .replace(/tan/g, "tan");

  return (
    <div style={{
      width: "260px",
      margin: "50px auto",
      padding: "20px",
      border: "5px solid black",
      borderRadius: "20px",
      background: "#f4f4f4"
    }}>
      <h1 style={{
        textAlign: "center",
        color: "#000000ff",
        fontSize: "30px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold"
      }}>
        Calculadora
      </h1>

      {/* Pantalla */}
      <div style={{
        height: "60px",
        background: "white",
        border: "6px solid #000000ff",
        borderRadius: "10px",
        marginBottom: "15px",
        padding: "10px",
        fontSize: "30px",
        fontWeight: "bold",
        textAlign: "right",
        color: "#000000ff",
        overflow: "auto",
        whiteSpace: "nowrap"
      }}>
        {displayValue || "0"}
      </div>
      {/* Controles Principales*/}
      <div style={{
        dysplay: "flex",
        justifyContent: "space-between",
        marginBottom: "15px"
      }}>
        <button
          onClick={handleClear}
          style={{ flex: 1, marginRight: "10px", backgroundColor: "#ff6b6b", color: "white", fontWeight: "bold" }}
        >
          AC
        </button>
        <button
          onClick={handleBackspace}
          style={{ flex: 1, backgroundColor: "#ffd93d", fontWeight: "bold" }}
        >
          C
        </button>
      </div>
      {/* Panel numerico */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "10px"
      }}>
        <button onClick={() => handleClick("sin(")}>sin</button>
        <button onClick={() => handleClick("cos(")}>cos</button>
        <button onClick={() => handleClick("tan(")}>tan</button>
        <button onClick={() => handleClick("sqrt(")}>√</button>

        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}> )</button>
        <button onClick={() => handleClick("pi")}>π</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={handleEqual} style={{ backgroundColor: "#03c4ffff", fontWeight: "bold" }}>=</button>
      </div>

    </div >

  )
}
export default App
