export class Cliente {

    private _nome: string;
    private _cpf: string;

    constructor(
        nome: string,
        cpf: string
    ) {
        this._nome = nome,
        this._cpf = cpf
    }

    public get nome(): string {
        return this._nome;
    }

    public get cpf(): string {
        return this._cpf;
    }

}
