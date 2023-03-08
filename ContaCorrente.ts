import { Conta } from "./Conta";
import { Cliente } from "./Cliente";

//Heraça da conta
export class ContaCorrente extends Conta {
    
    private _chequeEspecial: number;//atributo

    constructor(numeroConta: string, cliente: Cliente) {
        super(numeroConta, cliente);
        this._chequeEspecial = 1000;
    }

    public retornarSaldoComChequeEspecial(): number {
        return this._saldo + this._chequeEspecial;
    }

    public get chequeEspecial(): number {
        return this._chequeEspecial;
    }

    public set chequeEspecial(novoChequeEspecial: number) {
        this._chequeEspecial = novoChequeEspecial;
    }
    
    public sacar(valorSacar: number): boolean {
        if (valorSacar <= this.retornarSaldoComChequeEspecial()) {
            this._saldo = this._saldo - valorSacar;
            return true
        }
        return false
    }
}
