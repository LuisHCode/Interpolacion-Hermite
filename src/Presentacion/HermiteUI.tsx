import { useState, useMemo } from "react";
import interfacePuntoHermite from "../Interfaces/interfacePuntoHermite.tsx";
import FormularioPuntos from "./FormularioPuntos.tsx";
import MatrizHermite from "./MatrizHermite.tsx";
import ResultadoHermite from "./ResultadoHermite.tsx";
import DetallesCelda from "./DetallesCelda.tsx";
import { Hermite } from "../Logica/hermite.tsx";
import "./HermiteUI.css";

export default function HermiteUI() {
  const [puntos, setPuntos] = useState<interfacePuntoHermite[]>([]);
  const hermite = new Hermite();

  // Calcular matriz y resultado con useMemo
  const { matriz, expresionBase, resultado } = useMemo(
      () => hermite.calcularPolinomio(puntos),
      [puntos]
    );
    return (
      <div className="hermite-ui-container">
      <header className="hermite-header">
        <h1>Interpolación de Hermite</h1>
        <p className="subtitle">Calcula el polinomio de Hermite con diferencias divididas</p>
      </header>

      <div className="hermite-content">
        <div className="formulario-section">
          <FormularioPuntos onPuntosChange={setPuntos} />
        </div>

        <div className="resultados-section">
          <div className="resultados-scroll-container">
            <div className="matriz-section">
              <MatrizHermite matriz={matriz} />
            </div>

            <div className="resultado-section">
              <ResultadoHermite expresionBase={expresionBase} resultado={resultado} />
            </div>

            <div className="detalles-section">
              <DetallesCelda matriz={matriz} hermiteInstance={hermite} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
