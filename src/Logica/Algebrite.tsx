import algebrite from "algebrite";

export class Algebrite {
  private formatearPolinomio(polinomio: string): string {
    const limpio = polinomio
      .replace(/\.{3}/g, "") // Borra los puntos suspensivos "..."
      .replace(/\^(\d+)\.0/g, "^$1") // Cambia x^2.0 por x^2
      .replace(/\*/g, "");
    return limpio;
  }

  crearExpresion(expresion: string): string {
    expresion = algebrite.expand(expresion).toString();
    expresion = "H(x) = " + this.formatearPolinomio(expresion);

    return expresion;
  }
}
