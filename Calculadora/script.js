let expressao = "";
const display = document.getElementById("display");
const listaHistorico = document.getElementById("lista-historico");
const botaoTema = document.getElementById("alternar-tema");
const botaoLimparHistorico = document.getElementById("btn-limpar-historico");

// Recuperar histórico salvo do localStorage
let historico = JSON.parse(localStorage.getItem("historico")) || [];

historico.forEach(itemTexto => {
  const item = document.createElement("li");
  item.textContent = itemTexto;
  listaHistorico.appendChild(item);
});

// Adiciona valor à expressão
function adicionar(valor) {
  expressao += valor;
  display.value = expressao;
}

// Limpa toda a expressão
function limpar() {
  expressao = "";
  display.value = "";
}

// Apaga o último caractere
function apagar() {
  expressao = expressao.slice(0, -1);
  display.value = expressao;
}

// Calcula o resultado
function calcular() {
  try {
    const resultado = eval(expressao);
    display.value = resultado;

    const item = document.createElement("li");
    item.textContent = `${expressao} = ${resultado}`;

    // Remove destaque anterior
    document.querySelectorAll("#lista-historico li").forEach(li => li.classList.remove("destaque"));

    item.classList.add("destaque");
    listaHistorico.appendChild(item);

    historico.push(item.textContent);
    localStorage.setItem("historico", JSON.stringify(historico));

    expressao = "";
  } catch {
    display.value = "Erro";
  }
}

// Limpa o histórico
function limparHistorico() {
  listaHistorico.innerHTML = "";
  historico = [];
  localStorage.removeItem("historico");
}

// Teclado
document.addEventListener("keydown", (evento) => {
  const tecla = evento.key;
  const permitidos = "0123456789+-*/.";

  if (permitidos.includes(tecla)) {
    adicionar(tecla);
  } else if (tecla === "Enter") {
    calcular();
  } else if (tecla === "Backspace") {
    apagar();
  } else if (tecla === "Escape") {
    limpar();
  }
});

// Tema escuro/claro
botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("modo-escuro");
  const modoEscuroAtivo = document.body.classList.contains("modo-escuro");
  botaoTema.textContent = modoEscuroAtivo ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});

// Evento do botão de limpar histórico
botaoLimparHistorico.addEventListener("click", limparHistorico);