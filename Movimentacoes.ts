import { Conta } from "./Conta"

export interface Movimentacoes {
    sacar(valorSacar: number): boolean
    depositar(valorDepositar: number): boolean
    transferir(contaTransferir: Conta, valorTransferir: number): boolean
};