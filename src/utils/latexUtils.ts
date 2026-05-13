// Convertir expresiones a formato LaTeX
export function expressionToLatex(expression: string): string {
  if (!expression) return "";

  let latex = expression;

  // Reemplazar ^ con ^
  latex = latex.replace(/\^/g, "^");

  // Limpiar paréntesis innecesarios y formatear mejor
  latex = latex.replace(/\(/g, "\\left(");
  latex = latex.replace(/\)/g, "\\right)");

  // Formatear números en fracciones
  latex = latex.replace(/ \/ /g, " \\div ");

  // Formatear x como variable
  latex = latex.replace(/\bx\b/g, "x");

  return latex;
}

export function formatPolinomioLatex(polinomio: string): string {
  if (!polinomio) return "";

  let latex = polinomio;

  // Si ya tiene H(x) = al inicio, formatearlo mejor
  if (latex.includes("H(x) =")) {
    latex = latex.replace(/H\(x\) = /, "H(x) = ");
  }

  // Reemplazar operadores
  latex = latex.replace(/\s*\+\s*/g, " + ");
  latex = latex.replace(/\s*-\s*/g, " - ");

  // Paréntesis
  latex = latex.replace(/\(/g, "\\left(");
  latex = latex.replace(/\)/g, "\\right)");

  return latex;
}

export function formatDetallesCeldaLatex(expresion: string): string {
  if (!expresion) return "";

  let latex = expresion;

  // Formato para F(z_i, z_j) = ...
  latex = latex.replace(/F\(/g, "F\\left(");
  latex = latex.replace(/f\(/g, "f\\left(");
  latex = latex.replace(/f'/g, "f'");

  // Reemplazar z_ y mantener los índices
  latex = latex.replace(/z_(\d+)/g, "z_{$1}");

  // Formatear división
  latex = latex.replace(/ \/ /g, "\\div ");

  // Paréntesis
  latex = latex.replace(/\(/g, "\\left(");
  latex = latex.replace(/\)/g, "\\right)");

  return latex;
}
