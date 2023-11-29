import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

// Pega todos os campos que contem o atributo [required]
const camposDoFormulario = document.querySelectorAll("[required]");

// Para cada campo do formulario ...
camposDoFormulario.forEach((campo) => {
    // Recebe um "Ouvidor de Evento" que quando deselecionar campo contem o atributo [required] vai executar a função verificaCampo(campo)
    campo.addEventListener("blur", () => verificaCampo(campo));
})

function verificaCampo(campo) {
    // Se o campo for o cpf e o tamanho do valor do campo for maior ou igual a 11 vai executar a função ehUmCPF(campo)
    if (campo.name == "cpf" && campo.value.lenght >= 11 ) {
        ehUmCPF(campo);
    }
    // Se o campo for o aniversario e o valor do campo não for vazia vai executar a função ehMaiorDeIdade(campo)
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

}
