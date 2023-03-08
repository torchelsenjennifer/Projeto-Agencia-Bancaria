import { Conta } from "./Conta";
import { Cliente }from "./Cliente";

export class ContaPoupanca extends Conta {
    //readonly = apenas leitura, constante
    protected readonly _jurosMensal: number = 1.01; //atributo
    constructor(numeroConta: string, cliente: Cliente) 
    {
     super(numeroConta, cliente)
    }

    public creditarTaxa(): number {
       return this._saldo = this._saldo * this._jurosMensal;
    }
}

