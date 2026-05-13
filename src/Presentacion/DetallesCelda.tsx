import { useState, useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./DetallesCelda.css";

interface DetallesCeldaProps {
  matriz: number[][] | null;
  hermiteInstance: any;
}

export default function DetallesCelda({ matriz, hermiteInstance }: DetallesCeldaProps) {
  // 1. Declaración de Hooks (Siempre al inicio)
  const [celdaSeleccionada, setCeldaSeleccionada] = useState<{ fila: number; columna: number } | null>(null);
  const expresionRef = useRef<HTMLDivElement>(null);

  // 2. Funciones auxiliares
  const getExpresion = () => {
    if (!celdaSeleccionada || !matriz) return "";
    return hermiteInstance.armarExpresionInterpolacion(
      matriz,
      celdaSeleccionada.fila,
      celdaSeleccionada.columna
    );
  };

  const handleCeldaClick = (fila: number, columna: number) => {
    if (matriz && matriz[fila][columna] !== undefined) {
      setCeldaSeleccionada({ fila, columna });
    }
  };

  // 3. useEffect (Debe ejecutarse en cada render, por eso va antes del return temprano)
  useEffect(() => {
    if (expresionRef.current) {
      if (celdaSeleccionada) {
        const expresion = getExpresion();
        if (expresion) {
          try {
            katex.render(expresion, expresionRef.current, { displayMode: true });
          } catch (error) {
            // Fallback a texto plano si KaTeX falla
            expresionRef.current.textContent = expresion;
          }
        }
      } else {
        // Limpiar el contenedor si no hay celda seleccionada
        expresionRef.current.innerHTML = "";
      }
    }
  }, [celdaSeleccionada, matriz]); // Se dispara cuando cambia la selección o los datos

  // 4. Return temprano (Condicional)
  if (!matriz || matriz.length === 0) {
    return (
      <div className="detalles-container">
        <h3>Detalles de Cálculo</h3>
        <p className="placeholder">Ingresa los datos para ver los detalles</p>
      </div>
    );
  }

  // 5. Renderizado principal
  return (
    <div className="detalles-container">
      <h3>Detalles de Cálculo</h3>
      
      <div className="matriz-interactiva">
        <p className="hint">Haz clic en una celda para ver cómo se calculó</p>
        <table className="tabla-interactiva">
          <tbody>
            {matriz.map((fila, i) => (
              <tr key={i}>
                {fila.map((valor, j) => (
                  <td
                    key={`${i}-${j}`}
                    className={`celda-interactiva ${valor !== undefined ? "valida" : ""} ${
                      celdaSeleccionada?.fila === i && celdaSeleccionada?.columna === j
                        ? "seleccionada"
                        : ""
                    }`}
                    onClick={() => handleCeldaClick(i, j)}
                  >
                    {valor !== undefined ? valor.toFixed(4) : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="expresion-resultado">
        {celdaSeleccionada ? (
          <>
            <p className="celda-info">
              Celda [{celdaSeleccionada.fila}, {celdaSeleccionada.columna}]
            </p>
            <div ref={expresionRef} className="katex-render"></div>
          </>
        ) : (
          <p className="placeholder">Selecciona una celda de la tabla para ver el procedimiento</p>
        )}
      </div>
    </div>
  );
}