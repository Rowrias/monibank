export default function ehUmCPF(campo) {
    // Variavel que pega o valor do campo do cpf que contem "." e "-" substitui por ""
    const cpf = campo.value.replace(/\.|-/g, "");

    // Se as qualquer dessas funções der "true"...
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        console.log("Esse cpf não existe!")

    // Se for "false"...
    } else {
        console.log("Existe!");
    }
}

// Função que verifica se a pessoa repeitiu esses numeros
function validaNumerosRepetidos(cpf) {
    const numeroRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    // Vai retornar "true" se a pessoa digitou um desses numeros
    return numeroRepetidos.includes(cpf);
}

// Função que valida o primeiro numero depois dos primeiros 9 digitos do cpf (123.456.789-(x)x)
function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    // tamanho = 0, 1, 2, 3, 4, 5, 6, 7, 8 => a cada for" (Do index 0 até o 8 do cpf - os 9 numeros do cpf)
    for(let tamanho = 0; tamanho < 9; tamanho++) {
        // Pega o primeiro digito do cpf e multiplica com 10 e armazena na variavel soma. Depois o segundo digito e multiplica por 9 e soma com a variavel soma e armazena, ...
        soma += cpf[tamanho] * multiplicador;
        // multiplicador = 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 => a cada for
        multiplicador--;
    }

    // Pega a soma multiplica por 10 o resultado modulariza por 11
    soma = (soma * 10) % 11;

    // Se a soma der 10 ou 11 a soma vai armazenar o valor 0
    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna "true" se o (valor da variavel soma) for diferente do (valor do index 9 do cpf)
    return soma != cpf[9];
}

// Função que valida o segundo numero depois dos primeiros 10 digitos do cpf (123.456.789-9(x))
function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna "true" se o (valor da variavel soma) for diferente do (valor do index 10 do cpf)
    return soma != cpf [10];
}
