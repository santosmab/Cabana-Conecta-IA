/* =========================================
   CABANA PAY
   SCRIPT.JS
========================================= */


/* =========================================
   HEADER AO ROLAR
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   MENU MOBILE
========================================= */

function toggleMenu() {

    const menu = document.getElementById("mobileMenu");

    menu.classList.toggle("open");

}


/* =========================================
   MODAL
========================================= */

function abrirModal(tipo) {

    const modal = document.getElementById("modal");

    modal.classList.add("active");

    trocarModal(tipo);

    document.body.style.overflow = "hidden";

}


function fecharModal() {

    const modal = document.getElementById("modal");

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


function trocarModal(tipo) {

    const login = document.getElementById("loginContent");
    const cadastro = document.getElementById("cadastroContent");

    if (tipo === "login") {

        login.style.display = "block";
        cadastro.style.display = "none";

    } else {

        login.style.display = "none";
        cadastro.style.display = "block";

    }

}


/* Fechar clicando fora */

document.getElementById("modal").addEventListener("click", function(event) {

    if (event.target === this) {
        fecharModal();
    }

});


/* Fechar com ESC */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        fecharModal();
    }

});


/* =========================================
   SALDO
========================================= */

let saldoVisivel = true;


function toggleBalance() {

    const balance = document.getElementById("balanceValue");
    const icon = document.getElementById("balanceIcon");

    saldoVisivel = !saldoVisivel;


    if (saldoVisivel) {

        balance.textContent = "R$ 1.250,00";

        icon.className =
            "fa-solid fa-eye";

    } else {

        balance.textContent = "R$ ••••••";

        icon.className =
            "fa-solid fa-eye-slash";

    }

}


/* =========================================
   LOGIN
========================================= */

function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    if (!email) {
        return;
    }

    fecharModal();

    mostrarMensagem(
        "Login demonstrativo realizado com sucesso!"
    );

}


/* =========================================
   CADASTRO
========================================= */

function cadastro(event) {

    event.preventDefault();

    const nome =
        document.getElementById("cadastroNome").value;

    if (!nome) {
        return;
    }

    fecharModal();

    mostrarMensagem(
        `Conta de ${nome.split(" ")[0]} criada no modo demonstração!`
    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function mostrarMensagem(mensagem) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = mensagem;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* =========================================
   ANIMAÇÃO AO ENTRAR NA TELA
========================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(
        ".resource-card, .feature-mini, .about-main-card, .business-dashboard, .impact-phone"
    )
    .forEach(element => {

        observer.observe(element);

    });


/* =========================================
   LINKS DA NAV
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   BOTÕES DEMONSTRATIVOS
========================================= */

document
    .querySelectorAll(".quick-actions button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const nome =
                button.innerText.trim();

            mostrarMensagem(
                `${nome} — funcionalidade em desenvolvimento.`
            );

        });

    });


/* =========================================
   PREVENIR LINKS # DE RECARREGAR
========================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });
