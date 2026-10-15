
const paginas = document.querySelectorAll(".pagina");
const linksMenu = document.querySelectorAll("#menu a");

const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

const btnTema = document.querySelector("#toggle-theme");

// Troca a página visível
function navegarPara(paginaId) {
    const paginaAtiva = document.getElementById(paginaId);

    // Se a página não existir, volta para o início
    if (!paginaAtiva || !paginaAtiva.classList.contains("pagina")) {
        paginaId = "inicio";
    }

    // Oculta todas as páginas e mostra somente a escolhida
    paginas.forEach((pagina) => {
        pagina.hidden = pagina.id !== paginaId;
    });

    // Destaca o link correspondente à página atual
    linksMenu.forEach((link) => {
        if (link.dataset.page === paginaId) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    // Fecha o menu após a navegação
    menu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");

    // Volta ao topo para exibir a nova página
    window.scrollTo({ top: 0, behavior: "auto" });
}

// Navegação pelos links do menu
linksMenu.forEach((link) => {
    link.addEventListener("click", (evento) => {
        evento.preventDefault();

        const paginaId = link.dataset.page;

        // Atualiza a URL sem recarregar o documento
        if (window.location.hash !== `#${paginaId}`) {
            history.pushState(null, "", `#${paginaId}`);
        }

        navegarPara(paginaId);
    });
});

// Permite usar voltar e avançar do navegador
window.addEventListener("popstate", () => {
    navegarPara(window.location.hash.slice(1) || "inicio");
});

// Abre a página correspondente caso o usuário acesse uma URL com hash
window.addEventListener("hashchange", () => {
    navegarPara(window.location.hash.slice(1) || "inicio");
});

// Exibe a página inicial ou a indicada na URL
navegarPara(window.location.hash.slice(1) || "inicio");

// Menu para telas pequenas
menuToggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
});

// Tema claro e escuro
if (localStorage.getItem("theme") === "white") {
    document.body.classList.add("white-theme");
}

btnTema.addEventListener("click", () => {
    document.body.classList.toggle("white-theme");

    const temaAtual = document.body.classList.contains("white-theme")
        ? "white"
        : "dark";

    localStorage.setItem("theme", temaAtual);
});



/* para tela de carregamento */
const loadingScreen = document.getElementById("loading-screen");
const inicioCarregamento = performance.now();

function finalizarCarregamento() {
    const tempoDecorrido = performance.now() - inicioCarregamento;
    const tempoRestante = Math.max(0, 1000 - tempoDecorrido);

    setTimeout(() => {
        loadingScreen.classList.add("loaded");

        // Remove a tela do HTML após a animação de saída
        setTimeout(() => {
            loadingScreen.remove();
        }, 450);

    }, tempoRestante);
}

// Espera imagens, CSS e demais recursos da página carregarem
if (document.readyState === "complete") {
    finalizarCarregamento();
} else {
    window.addEventListener("load", finalizarCarregamento, {
        once: true
    });
}

