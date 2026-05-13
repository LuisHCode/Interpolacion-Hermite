import interfacePuntoHermite from "../Interfaces/interfacePuntoHermite.tsx";
import { Algebrite } from "./Algebrite.tsx";


export class Hermite {
  private algebrite: Algebrite;

  constructor() {
    this.algebrite = new Algebrite();
  }

  calcularHermite(puntos: interfacePuntoHermite[]) {
    const n = puntos.length - 1;
    const grado = 2 * n + 1;

    return {
      n: n,
      gradoMaximo: grado,
      totalPuntos: puntos.length,
      filas: puntos.length * 2,
    };
  }

  private generarMatriz(puntos: any, datos: any) {
    let matriz: number[][] = Array.from({ length: datos.filas }, () =>
      Array(datos.gradoMaximo + 2),
    );
    let count = 0;
    for (let i = 0; i <= datos.gradoMaximo; i++) {
      for (let j = 0; j < 2; j++) {
        matriz[i][0] = puntos[count].x;
        matriz[i][1] = puntos[count].fx;
        i++;
      }
      i--;
      matriz[i][2] = puntos[count].dfx;
      count++;
    }
    return matriz;
  }

  private interpolacion(puntos: interfacePuntoHermite[]) {
    let datos = this.calcularHermite(puntos);
    let matriz = this.generarMatriz(puntos, datos);
    let count = 1;

    for (let j = 2; j < datos.gradoMaximo + 2; j++) {
      for (let i = j - 1; i < datos.filas; i++) {
        if (matriz[i][j] === undefined) {
          let valor =
            (matriz[i][j - 1] - matriz[i - 1][j - 1]) /
            (matriz[i][0] - matriz[i - count][0]);
          matriz[i][j] = Math.round(valor * 1e6) / 1e6;
        }
      }
      count++;
    }
    return matriz;
  }

  posicionCeldaEnFz(_matriz: any, fila: number, columna: number){
    let posicion = "F(";
    let n = fila - (columna- 1);
    if(columna === 1 && fila >= 0){
      return posicion+= "z_" + fila + ")";
    }

    if(fila > 0 && fila >= columna - 1){
      for (let i = 0; i < columna; i++) {
        posicion += "z_"+n++        
        if(i+1 !== columna){
          posicion += ", "
        }
      }
      posicion += ")"
    }
    return posicion
  }

  armarExpresionInterpolacion(matriz: any, fila: number, columna: number): string {
    // Verificar si la celda tiene un valor válido
    if (matriz[fila][columna] === undefined) {
      return "";
    }

    // ========== VALORES INICIALES (INGRESADOS) ==========
    // Caso 1: f(x) - valores iniciales en filas pares, columna 1
    if (columna === 1 && fila % 2 === 0) {
      return `f(${matriz[fila][0]}) = ${matriz[fila][columna]}`;
    }

    // Caso 2: f'(x) - derivadas en filas impares, columna 1
    if (columna === 1 && fila % 2 === 1) {
      return `f'(${matriz[fila][0]}) = ${matriz[fila][columna]}`;
    }

    // Caso 3: F'(z_n) - derivadas en filas impares, columna 2 (valores iniciales de derivadas)
    if (columna === 2 && fila % 2 === 1) {
      return `F'(z_${fila}) = ${matriz[fila][columna]}`;
    }

    // ========== VALORES CALCULADOS (FÓRMULA) ==========
    // Caso 4: Diferencias divididas - columnas >= 2 (excepto derivadas iniciales)
    if (columna >= 2 && !(columna === 2 && fila % 2 === 1)) {
      const posicion = this.posicionCeldaEnFz(matriz, fila, columna);
      const numerador = `(${matriz[fila][columna - 1]} - ${matriz[fila - 1][columna - 1]})`;
      const denominador = `( ${matriz[fila][0]} - (${matriz[fila - (columna - 1)][0]}))`;
      const expresion = `${posicion} = ${numerador} / ${denominador} = ${matriz[fila][columna]}`;
      return expresion;
    }

    return "";
  }

  armarExpresionBase(matriz: any) {
    if (!matriz || matriz.length === 0) return "";
    let expresion = "(" + matriz[0][1] + ")";
    for (let i = 1; i < matriz.length; i++) {
      if (matriz[i][i + 1] !== undefined) {
        expresion += " + (" + matriz[i][i + 1] + ") ";
        for (let j = 0; j < i; j++) {
          expresion += " * (x - (" + matriz[j][0] + "))";
        }
      }
    }
    return expresion;
  }

  calcularPolinomio(puntos: interfacePuntoHermite[]): { matriz: number[][] | null; expresionBase: string | null; resultado: string | null } {
    if (puntos.length === 0) {
      return { matriz: null, expresionBase: null, resultado: null };
    }

    let matriz = this.interpolacion(puntos);
    const expresionBase = this.armarExpresionBase(matriz);
    const resultado = this.algebrite.crearExpresion(expresionBase);
    return { matriz, expresionBase, resultado };
  }

}


