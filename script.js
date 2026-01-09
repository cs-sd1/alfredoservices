const params = new URLSearchParams(window.location.search);
const id = params.get("c");

fetch("clientes.json")
  .then(r => r.json())
  .then(data => {

    if (!id || !data[id]) {
      document.body.innerHTML = "<h2 style='text-align:center'>Site não encontrado</h2>";
      return;
    }

    const c = data[id];

    document.getElementById("titulo").textContent = c.nome;
    document.getElementById("nome").textContent = c.nome;
    document.getElementById("slogan").textContent = c.slogan;
    document.getElementById("endereco").textContent = c.endereco;
    document.getElementById("rodape").textContent = c.nome;
    document.getElementById("ano").textContent = new Date().getFullYear();

    document.querySelector("header").style.background = c.cor;

    const lista = document.getElementById("servicos");
    c.servicos.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      lista.appendChild(li);
    });

    document.getElementById("whatsapp").href =
      "https://wa.me/" + c.telefone;
  });