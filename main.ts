import { ContaCorrente } from "./ContaCorrente";
import { ContaPoupanca } from "./ContaPoupanca";
import { Conta } from "./Conta";
import { formatarValor, randomizar } from "./Util";
import { Cliente } from "./Cliente";
import prompt from "prompt-sync";

let teclado = prompt();
let clienteA: Cliente = new Cliente("Jennifer", "222222");//(argumentos)
let clienteB: Cliente = new Cliente("Rafaela", "333333");
let contaAtiva: Conta | undefined;
let contas: Conta[] = [];
let poupanca: ContaPoupanca = new ContaPoupanca("1234", clienteA);
let corrente: ContaCorrente = new ContaCorrente("5678", clienteB);

contas.push(poupanca);
contas.push(corrente);

criarConta()

export function criarConta() {
    let escolha = 0;

    while (escolha != 4) {
        console.log("\n+======= Banco das Gurias ======+");
        console.log("|1. Acessar uma conta             |");
        console.log("|2. Criar uma conta poupança      |");
        console.log("|3. Criar uma conta corrente      |");
        console.log("|4. Sair                          |");
        console.log("+=================================+");
        escolha = +teclado("Escolha sua opção: ")

        if (escolha == 1) {
            let numero = teclado("Qual o numero da conta? ")
            contaAtiva = contas.find(objetoConta => objetoConta.numeroConta == numero)
            //console.log(contaAtiva?.constructor.name) //definição da conta
            escolha = menuConta();

        } else if (escolha == 2) {
            let nome = teclado("Insira seu nome: ")
            let cpf = teclado("Insira seu CPF: ")
            let cliente = new Cliente(nome, cpf);
            let numero = randomizar(1000, 9999).toString();
            let novaPoupanca = new ContaPoupanca(numero, cliente);
            contaAtiva = novaPoupanca;
            contas.push(novaPoupanca);
            console.log(`Conta poupança ${numero} foi criada com sucesso!`);
            console.log("");
            escolha = menuConta();
        } else if (escolha == 3) {
            let nome = teclado("Insira seu nome: ")
            let cpf = teclado("Insira seu CPF: ")
            let cliente = new Cliente(nome, cpf);
            let numero = randomizar(1000, 9999).toString();
            let novaCorrente = new ContaCorrente(numero, cliente);
            contaAtiva = novaCorrente;
            contas.push(novaCorrente);
            console.log(`Conta corrente ${numero} foi criada com sucesso!`);
            console.log("");
            escolha = menuConta();
        } else {
            escolha = 4;
            console.log("");
            console.log('Você saiu!');
            console.log("");
        }
    }
}

export function menuConta() {
    let escolha: number = 0

    if (contaAtiva == undefined) {
        console.log("Conta não encontrada!!!!");
        return 0;
    }
    if (contaAtiva.constructor.name == "ContaPoupanca") {
        console.log(`Bem vindo(a), ${contaAtiva.cliente.nome}, você acessou sua Conta Poupança!`)
    } else {
        console.log(`Bem vindo(a), ${contaAtiva.cliente.nome}, você acessou sua Conta Corrente!`)
    }

    //console.log(`${contaAtiva.cliente.cpf}`)

    while (escolha != 9) {
        console.log("\n+======= Banco das Gurias ======+");
        console.log("|1. Ver saldo                     |");
        console.log("|2. Depositar                     |");
        console.log("|3. Sacar                         |");
        console.log("|4. Transferir                    |");
        console.log("|5. Usar outra conta              |");

        if (contaAtiva.constructor.name == "ContaPoupanca") {
            console.log("|6. Verificar rendimento          |");
        }
        console.log("|9. Sair                          |");
        console.log("+=================================+");
        console.log('')
        //=======================================================================================================

        escolha = +teclado("Escolha sua opção: ")

//===============VER SALDO ==============================================================================
        if (escolha == 1) {
            console.log(`Seu saldo atual é de: ${formatarValor(contaAtiva.saldo)}`)
            if (contaAtiva.constructor.name == "ContaCorrente") {
                const contaCorrente = <ContaCorrente>contaAtiva;
                console.log(`Seu limite do cheque especial: ${formatarValor(contaCorrente.chequeEspecial)}`)
                console.log(`Seu valor disponível para transações: ${formatarValor(contaCorrente.retornarSaldoComChequeEspecial())}`);
            }
        }
//===================DEPOSITAR==========================================================================
        else if (escolha == 2) {

            let valorDepositar = +teclado("Quanto você deseja depositar? ")
            contaAtiva.depositar(valorDepositar)
            console.log(`Você depositou: ${formatarValor(valorDepositar)}`)
            console.log('')

//======================SACAR===========================================================================
        } else if (escolha == 3) {
            let valorSaque = +teclado("Quanto você deseja sacar? ")
            if (contaAtiva.sacar(valorSaque)) {
                console.log(`Você sacou: R$${formatarValor(valorSaque)}`)
                console.log('')
            } else {
                console.log("Saldo Insuficiente!");
            }

//======================TRANSFERIR=======================================================================
        } else if (escolha == 4) {
            let numeroConta: string = teclado("Qual o numero da conta que deseja transferir? ");
            let contaTransferir = contas.find(conta => conta.numeroConta == numeroConta);
            let valorTransferencia = +teclado("Quanto voce deseja transferir? ")
            if (contaTransferir != undefined) {
                if (contaAtiva.transferir(contaTransferir, valorTransferencia)) {
                    console.log(`Você transferiu ${formatarValor(valorTransferencia)} para a conta ${numeroConta}`);
                } else {
                    console.log("Saldo Insuficiente!");

                }
            } else {
                console.log("Conta não encontrada");
            }


            //===================USAR OUTRA CONTA====================================================================
        } else if (escolha == 5) {
            return 0;
            //===================RENDIMENTO==========================================================================            
        } else if (escolha == 6) {
            if (contaAtiva.constructor.name == "ContaPoupanca") {
                //Definindo o objeto contaAtiva como  tipo contaPoupança
                const contaPoupanca = <ContaPoupanca>contaAtiva;
                console.log(`Seu rendimento da poupança é de: ${formatarValor(contaPoupanca.creditarTaxa())}`)
            }
            //================SAIR===================================================================================
        } else if (escolha == 9) {
            console.log("");
            console.log("Até a próxima!");
            console.log("");
            return 4;
        }
    }
    return 0;
}
//=======================================================================================================
