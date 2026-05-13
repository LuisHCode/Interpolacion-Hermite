import { useState } from "react";
import interfacePuntoHermite from "../Interfaces/interfacePuntoHermite.tsx";
import "./FormularioPuntos.css";

interface FormularioPuntosProps {
  onPuntosChange: (puntos: interfacePuntoHermite[]) => void;
}

export default function FormularioPuntos({ onPuntosChange }: FormularioPuntosProps) {
  const [cantidad, setCantidad] = useState<number>(0);
  const [puntos, setPuntos] = useState<interfacePuntoHermite[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaCantidad = Math.max(1, parseInt(e.target.value) || 1);
    setCantidad(nuevaCantidad);
    
    // Ajustar el array de puntos
    const nuevosPuntos = Array.from({ length: nuevaCantidad }, (_, i) => 
      puntos[i] || { x: 0, fx: 0, dfx: 0 }
    );
    setPuntos(nuevosPuntos);
    onPuntosChange(nuevosPuntos);
  };

  const handlePuntoChange = (
    index: number,
    key: "x" | "fx" | "dfx",
    value: string
  ) => {
    const inputKey = `${index}-${key}`;
    setInputValues({ ...inputValues, [inputKey]: value });

    const nuevosPuntos = [...puntos];
    // Solo actualizar el estado si hay un valor válido
    if (value !== "") {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        nuevosPuntos[index] = {
          ...nuevosPuntos[index],
          [key]: numValue,
        };
        setPuntos(nuevosPuntos);
        onPuntosChange(nuevosPuntos);
      }
    }
  };

  const getInputValue = (index: number, key: "x" | "fx" | "dfx") => {
    const inputKey = `${index}-${key}`;
    return inputValues[inputKey] !== undefined ? inputValues[inputKey] : String(puntos[index]?.[key] || "");
  };

  return (
    <div className="formulario-puntos">
      <h2>Ingreso de Datos</h2>
      
      <div className="cantidad-container">
        <label htmlFor="cantidad">Cantidad de puntos:</label>
        <input
          id="cantidad"
          type="number"
          min="1"
          max="8"
          value={cantidad}
          onChange={handleCantidadChange}
        />
      </div>

      <div className="puntos-scroll-container">
        <div className="puntos-grid">
          {puntos.map((_punto, index) => (
            <div key={index} className="punto-card">
              <h3>Punto {index + 1}</h3>
              
              <div className="input-group">
                <label htmlFor={`x-${index}`}>x:</label>
                <input
                  id={`x-${index}`}
                  type="number"
                  step="any"
                  value={getInputValue(index, "x")}
                  onChange={(e) => handlePuntoChange(index, "x", e.target.value)}
                  placeholder="Valor de x"
                />
              </div>

              <div className="input-group">
                <label htmlFor={`fx-${index}`}>f(x):</label>
                <input
                  id={`fx-${index}`}
                  type="number"
                  step="any"
                  value={getInputValue(index, "fx")}
                  onChange={(e) => handlePuntoChange(index, "fx", e.target.value)}
                  placeholder="Valor de f(x)"
                />
              </div>

              <div className="input-group">
                <label htmlFor={`dfx-${index}`}>f'(x):</label>
                <input
                  id={`dfx-${index}`}
                  type="number"
                  step="any"
                  value={getInputValue(index, "dfx")}
                  onChange={(e) => handlePuntoChange(index, "dfx", e.target.value)}
                  placeholder="Valor de f'(x)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
