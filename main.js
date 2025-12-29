console.log("Alfredo Services ativo");import { supabase } from "./supabase.js";

// Elemento onde os posts serão exibidos
const postsContainer = document.getElementById("posts");

// Função para formatar data
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2,"0");
  const month = String(date.getMonth()+1).padStart(2,"0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2,"0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Função para carregar posts
export async function loadPosts() {
  postsContainer.innerHTML = "<p>Carregando atualizações...</p>";

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false }); // posts mais recentes no topo

    if (error) throw error;

    if (!data || data.length === 0) {
      postsContainer.innerHTML = "<p>Nenhuma atualização ainda.</p>";
      return;
    }

    postsContainer.innerHTML = ""; // limpa container
    data.forEach(post => {
      let mediaHTML = "";
      if (post.media) {
        if (post.media.match(/\.(mp4|webm|ogg)$/i)) {
          mediaHTML = `<video controls controlsList="nodownload" src="${post.media}"></video>`;
        } else {
          mediaHTML = `<img src="${post.media}" alt="${post.titulo}">`;
        }
      }

      postsContainer.innerHTML += `
        <div class="card post-container">
          ${mediaHTML}
          <div class="post-title">${post.titulo}</div>
          <div class="post-text">${post.texto}</div>
          <div class="post-date">Publicado em ${formatDate(post.created_at)}</div>
          <a href="https://wa.me/244930349132?text=${encodeURIComponent('Olá! Quero saber mais sobre ' + post.titulo)}" target="_blank">
            <button>Saber mais sobre isso</button>
          </a>
        </div>
      `;
    });
  } catch (err) {
    postsContainer.innerHTML = `<p style="color:red;">Erro ao carregar atualizações: ${err.message}</p>`;
    console.error(err);
  }
}

// Atualiza automaticamente ao carregar a página
window.addEventListener("load", () => {
  loadPosts();
});
