import "./MatrizHermite.css";

interface MatrizHermiteProps {
  matriz: number[][] | null;
}

export default function MatrizHermite({ matriz }: MatrizHermiteProps) {
  if (!matriz || matriz.length === 0) {
    return (
      <div className="matriz-container">
        <h2>Matriz de Hermite</h2>
        <p className="placeholder">Ingresa los datos para ver la matriz</p>
      </div>
    );
  }

  return (
    <div className="matriz-container">
      <h2>Matriz de Diferencias Divididas</h2>
      <div className="tabla-scroll">
        <table className="tabla-matriz">
          <tbody>
            {matriz.map((fila, i) => (
              <tr key={i}>
                {fila.map((valor, j) => (
                  <td key={`${i}-${j}`} className={`celda ${j === 0 ? "x-column" : ""}`}>
                    {valor !== undefined ? (
                      typeof valor === "number" ? (
                        valor.toFixed(6)
                      ) : (
                        valor
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
