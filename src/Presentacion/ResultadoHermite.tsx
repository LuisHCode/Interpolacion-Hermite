import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./ResultadoHermite.css";

interface ResultadoHermiteProps {
  expresionBase: string | null;
  resultado: string | null;
}

export default function ResultadoHermite({ expresionBase, resultado }: ResultadoHermiteProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Renderizar expresión base con KaTeX
  useEffect(() => {
    if (baseRef.current && expresionBase) {
      try {
        const latexExpression = `H(x) = ${expresionBase}`;
        katex.render(latexExpression, baseRef.current, { displayMode: true });
      } catch (error) {
        // Si hay error en LaTeX, mostrar texto plano
        if (baseRef.current) {
          baseRef.current.textContent = `H(x) = ${expresionBase}`;
        }
      }
    }
  }, [expresionBase]);

  // Renderizar resultado con KaTeX
  useEffect(() => {
    if (resultRef.current && resultado) {
      try {
        katex.render(resultado, resultRef.current, { displayMode: true });
      } catch (error) {
        // Si hay error en LaTeX, mostrar texto plano
        if (resultRef.current) {
          resultRef.current.textContent = resultado;
        }
      }
    }
  }, [resultado]);

  return (
    <div className="resultado-container">
      <h2>Resultado: Polinomio de Hermite</h2>
      
      {expresionBase && (
        <div className="expresion-base-box">
          <h3>Expresión Base (sin expandir):</h3>
          <div ref={baseRef} className="katex-render"></div>
        </div>
      )}
      
      <div className="resultado-box">
        <h3>Resultado (Expandido):</h3>
        {resultado ? (
          <div ref={resultRef} className="katex-render"></div>
        ) : (
          <p className="placeholder">El resultado aparecerá aquí</p>
        )}
      </div>
    </div>
  );
}
