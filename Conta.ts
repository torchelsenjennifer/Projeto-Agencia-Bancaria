import { Cliente } from "./Cliente";
import { Movimentacoes } from "./Movimentacoes";

export abstract class Conta implements Movimentacoes {
    protected _numeroConta: string;//atributos
    protected _saldo: number; //atributos
    protected _cliente: Cliente;//atributos

    constructor(numeroConta: string, cliente: Cliente) {
        this._numeroConta = numeroConta
        this._saldo = 0;
        this._cliente = cliente;
    }
    public get numeroConta(): string {
        return this._numeroConta;
    }
    public set numeroConta(numeroConta: string) {
        this._numeroConta = numeroConta;
    }
    public get saldo(): number {
        return this._saldo;
    }
    public set saldo(saldo: number) {
        this._saldo = saldo;
    }
    public get cliente(): Cliente {
        return this._cliente;
    }
    public sacar(valorSacar: number): boolean { // retorno do método
        if (valorSacar <= this._saldo) {
            this._saldo = this._saldo - valorSacar; 
            return true
        }
        return false
    }
    public depositar(valorDepositar: number): boolean {
        this._saldo = this._saldo + valorDepositar;
        return true
    }
    public transferir(contaTransferir: Conta, valorTransferir: number): boolean {
        if (this.sacar(valorTransferir)) {
            contaTransferir.depositar(valorTransferir);
            return true;
        }
        return false;
    }
}


