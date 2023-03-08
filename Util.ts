

export const formatarValor = (valor:number): string => {
 return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
}

export const randomizar = (minimo: number, maximo: number): number => {
      const valorSorteado = minimo + Math.random() * (maximo - minimo);
      const valorInteiro = Math.round(valorSorteado);
      return valorInteiro;
    }

  