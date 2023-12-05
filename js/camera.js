const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

// Adiciona um Ouvinte de evento no botaoIniciarCamera que vai aguardar um click
botaoIniciarCamera.addEventListener("click", async function () {
    // Quando clicado pede para o navegador "mediadevices" iniciar a camera mas sem audio
    const iniciarVideo = await navigator.mediaDevices
    .getUserMedia({video: true, audio: false})

    // Coloca um estilo "none" no botaoIniciarCamera (tira o rostinho)
    botaoIniciarCamera.style.display = "none";
    // Coloca um estilo "block" no campoCamera (coloca a camera)
    campoCamera.style.display = "block";

    // O atributo [data-video] recebe a variavel "iniciarVideo" 
    // que fica aguardando o click da função assincrona
    // quando clicado abre a camera.
    video.srcObject = iniciarVideo
})

// Adiciona um ouvinte de eventos no botaoTirarFotos que vai aguardar um click
botaoTirarFoto.addEventListener("click", function() {
    // Criou um canvas 2d, desenhou uma imagem na posição que o video estava quando clicou o botao,
    // coloca uma posição: (0, 0) e o tamanho e a largura do canvas.
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

    // Pega a imagem que foi gerada no "canvas" e salva na variavel "imagemURL"
    imagemURL = canvas.toDataURL("image/jpeg");

    // Coloca um estilo "none" no campoCamera (tira a camera)
    campoCamera.style.display = "none";
    // Coloca um estilo "block" no campoMensagem (coloca a mensagem)
    mensagem.style.display = "block";
})

// Adiciona um ouvinte de eventos no botaoEnviarFoto que vai aguardar um click
botaoEnviarFoto.addEventListener("click", () => {
    // variavel que acessa a chave cadastro no localStorage
    const receberDadosExistentes = localStorage.getItem("cadastro");
    // variavel que converte o arquivo json para visualizar como objeto no javascript
    const converteRetorno = JSON.parse(receberDadosExistentes);

    // Cria um atributo imagem la dentro que recebe a "imagemURL" que foi tirada
    converteRetorno.imagem = imagemURL;

    // Coloca na chave cadastro do localStorage as informações atualizadas e transforma os arquivos em JSON
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno));

    // Envia nos para a "pagina numero 3"
    window.location.href = "./abrir-conta-form-3.html";
})