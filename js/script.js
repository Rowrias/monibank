import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

// Pega todos os campos que contem o atributo [required]
const camposDoFormulario = document.querySelectorAll("[required]");
// Pega o atributo [data-formulario] do formulario
const formulario = document.querySelector("[data-formulario]");

// Recebe um "Ouvinte de Evento" que quando clicar no submit do formulario vai enviar dados para o localStorage
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = './abrir-conta-form-2.html';
})

// Para cada campo do formulario ...
camposDoFormulario.forEach((campo) => {
    // Recebe um "Ouvinte de Evento" que quando deselecionar campo contem o atributo [required] vai executar a função verificaCampo(campo)
    campo.addEventListener("blur", () => verificaCampo(campo));
    // Recebe um "Ouvinte de Evento" que quando clicar em "submit" não vai mais aparecer mensagem de algum erro
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

// Variavel dos tipos de erro que pode acontecer no preenchimento do formulario
const tiposDeErro = [
    'valueMissing',     // erro que aparece: se o campo não for preenchido
    'typeMismatch',     // se esta inserido por exemplo uma letra na onde deveria ser numero
    'patternMismatch',  // se não seguir o padrão proposto no input especifico
    'tooShort',         // se preencheu menos do que devia naquele input
    'customError'       // se não cumprir com as validações que nos criamos.
]

// Variavel que contem uma mensagem para cada tipo de erro que acontecer no formulario
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

// Função que verifica os campos do formulario
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    // Se o campo for o cpf e o tamanho do valor do campo for maior ou igual a 11 vai executar a função ehUmCPF(campo)
    if (campo.name == "cpf" && campo.value.lenght >= 11 ) {
        ehUmCPF(campo);
    }
    // Se o campo for o aniversario e o valor do campo não for vazia vai executar a função ehMaiorDeIdade(campo)
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }
    // Para cada erro da lista "tiposDeErro"
    tiposDeErro.forEach(erro => {
        // se a "validity" dentro do campo for igual true... (é pq tem erro!)
        if (campo.validity[erro]) {
            // abre a variavel "mensagem" que dentro abre o campo(nome ou email ou rg,...) e que dentro abre a variavel "tiposDeErro"
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    // variavel que seleciona a classe "mensagem-erro" que esta no <span> e que esta perto do campo selecionado (senão pegaria de todos o <span>)
    const mensagemErro = campo.parentNode.querySelect('.mensagem-erro');
    // variavel que checa a validade daquele campo
    const validadorDeinput = campo.checkValidity(); // se estiver valido, resultado = true

    // se não estiver valido (!) imprime a mensagem de erro no conteudo do <span>
    if (!validadorDeinput) {
        mensagemErro.textContent = mensagem;
    // senão continua "vazio" (se estiver valido)
    } else {
        mensagemErro.textContent = "";
    }
}
