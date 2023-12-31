export default function ehMaiorDeIdade(campo) {
    // Pega o valor que foi digitado no campo data
    const dataNascimento = new Date(campo.value);
    // Se a data atual "não" for maior que 18 anos vai retornar "true"
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}


// Se a data atual for maior que 18 anos vai retornar "true"
function validaIdade(data) {
    // Variavel que recebe a data de hoje
    const dataAtual = new Date();
    // Variavel que recebe a data da variavel dataNascimento e adiciona +18 anos (o dia e os meses continua igual)
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    // Vai comparar a (data de hoje) com a (dataNascimento com +18 anos). Se a data atual for maior que 18 anos vai retornar "true"
    return dataAtual >= dataMais18;
}