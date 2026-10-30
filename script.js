const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const joinMessage = document.querySelector("#joinMessage");
const loginDialog = document.querySelector("#loginDialog");
const loginFeedback = document.querySelector("#loginFeedback");
const loginTitle = document.querySelector("#loginTitle");
const loginDescription = document.querySelector("#loginDescription");
const phantomConnect = document.querySelector("#phantomConnect");
const phantomDisconnect = document.querySelector("#phantomDisconnect");
const phantomInstall = document.querySelector("#phantomInstall");
const walletAccount = document.querySelector("#walletAccount");
const walletAddressLabel = document.querySelector("#walletAddress");
const walletProfileName = document.querySelector("#walletProfileName");
const profileAction = document.querySelector("#profileAction");
const profileDialog = document.querySelector("#profileDialog");
const profileTitle = document.querySelector("#profileTitle");
const profileWallet = document.querySelector("#profileWallet");
const profileForm = document.querySelector("#profileForm");
const profileFeedback = document.querySelector("#profileFeedback");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    });
  });
}

document.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!joinMessage) return;

    const role = button.dataset.role;
    joinMessage.textContent =
      `Que bom ter você aqui! Você selecionou: ${role}. ` +
      "O cadastro será disponibilizado na próxima etapa.";
    joinMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

if (
  loginDialog &&
  loginFeedback &&
  loginTitle &&
  loginDescription &&
  phantomConnect &&
  phantomDisconnect &&
  phantomInstall &&
  walletAccount &&
  walletAddressLabel &&
  walletProfileName &&
  profileAction &&
  profileDialog &&
  profileTitle &&
  profileWallet &&
  profileForm &&
  profileFeedback
) {
  const loginTriggers = document.querySelectorAll("[data-open-login]");
  const profileNameInput = profileForm.elements.name;
  const profileTypeInput = profileForm.elements.type;
  const profileTypes = {
    morador: "Morador(a)",
    comerciante: "Comerciante",
    apoiador: "Apoiador(a)"
  };
  let loginMode = "login";
  let activeWalletAddress = "";
  let observedProvider = null;

  const getPhantomProvider = () => window.phantom?.solana || window.solana;
  const profileKey = (address) => `cabanaPayProfile:${address}`;

  const readProfile = (address) => {
    try {
      return JSON.parse(localStorage.getItem(profileKey(address)) || "null");
    } catch {
      return null;
    }
  };

  const renderWalletState = () => {
    const provider = getPhantomProvider();
    const providerAddress = provider?.isConnected ? provider.publicKey?.toString() : "";
    const publicKey = providerAddress || activeWalletAddress;

    if (providerAddress) activeWalletAddress = providerAddress;

    walletAccount.hidden = !publicKey;
    loginTriggers.forEach((trigger) => {
      trigger.hidden = Boolean(publicKey);
    });
    phantomDisconnect.hidden = !publicKey;
    phantomInstall.hidden = Boolean(provider?.isPhantom);

    if (publicKey) {
      const shortAddress = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
      const profile = readProfile(publicKey);
      walletAddressLabel.textContent = shortAddress;
      walletProfileName.hidden = !profile;
      walletProfileName.textContent = profile
        ? `${profile.name} · ${profileTypes[profile.type] || "Comunidade"}`
        : "";
      profileAction.textContent = profile ? "Editar perfil" : "Criar perfil";

      loginFeedback.textContent = loginMode === "register"
        ? `Carteira conectada: ${shortAddress}. O perfil pode ser criado no CabanaPay.`
        : `Carteira conectada: ${shortAddress}. A validação segura da conta depende do servidor CabanaPay.`;
      loginFeedback.dataset.state = "success";
    } else if (!provider?.isPhantom) {
      loginFeedback.textContent = "A carteira Phantom não foi detectada. Instale a extensão para continuar.";
      loginFeedback.dataset.state = "error";
    } else {
      loginFeedback.textContent = "Conecte sua carteira Phantom para continuar.";
      loginFeedback.dataset.state = "info";
    }
  };

  const observeProvider = (provider) => {
    if (!provider || provider === observedProvider) return;

    observedProvider = provider;
    provider.on?.("accountChanged", (publicKey) => {
      activeWalletAddress = publicKey?.toString() || "";
      renderWalletState();
    });
    provider.on?.("disconnect", () => {
      activeWalletAddress = "";
      renderWalletState();
    });
  };

  const setLoginMode = (mode) => {
    loginMode = mode;
    loginDialog.querySelectorAll("[data-wallet-mode]").forEach((tab) => {
      tab.setAttribute("aria-pressed", String(tab.dataset.walletMode === mode));
    });

    if (mode === "register") {
      loginTitle.textContent = "Criar conta no CabanaPay";
      loginDescription.textContent = "Use sua carteira Phantom para iniciar seu cadastro no CabanaPay.";
      phantomConnect.textContent = "Criar conta com Phantom";
    } else {
      loginTitle.textContent = "Entrar no CabanaPay";
      loginDescription.textContent = "Acesse sua conta conectando a carteira Phantom vinculada ao CabanaPay.";
      phantomConnect.textContent = "Entrar com Phantom";
    }

    renderWalletState();
  };

  const openProfile = () => {
    if (!activeWalletAddress) return;

    const profile = readProfile(activeWalletAddress);
    profileTitle.textContent = profile ? "Editar perfil" : "Criar perfil";
    profileWallet.textContent = `Carteira: ${activeWalletAddress}`;
    profileNameInput.value = profile?.name || "";
    profileTypeInput.value = profile?.type || "morador";
    profileFeedback.textContent = "";
    if (!profileDialog.open) profileDialog.showModal();
  };

  loginTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const provider = getPhantomProvider();
      observeProvider(provider);
      activeWalletAddress = provider?.isConnected ? provider.publicKey?.toString() || "" : "";
      setLoginMode("login");
      if (!loginDialog.open) loginDialog.showModal();
    });
  });

  loginDialog.querySelectorAll("[data-wallet-mode]").forEach((button) => {
    button.addEventListener("click", () => setLoginMode(button.dataset.walletMode));
  });

  loginDialog.querySelector("[data-close-login]")?.addEventListener("click", () => {
    loginDialog.close();
  });

  loginDialog.addEventListener("click", (event) => {
    if (event.target === loginDialog) loginDialog.close();
  });

  phantomConnect.addEventListener("click", async () => {
    const provider = getPhantomProvider();

    if (!provider?.isPhantom) {
      renderWalletState();
      return;
    }

    phantomConnect.disabled = true;
    phantomConnect.textContent = "Aguardando Phantom...";

    try {
      const response = await provider.connect();
      activeWalletAddress = response.publicKey?.toString() || provider.publicKey?.toString() || "";
      observeProvider(provider);
      renderWalletState();
      loginDialog.close();
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (error) {
      loginFeedback.textContent = error?.code === 4001
        ? "A conexão foi cancelada na Phantom."
        : "Não foi possível conectar à Phantom. Tente novamente.";
      loginFeedback.dataset.state = "error";
    } finally {
      phantomConnect.disabled = false;
      phantomConnect.textContent = loginMode === "register"
        ? "Criar conta com Phantom"
        : "Entrar com Phantom";
    }
  });

  phantomDisconnect.addEventListener("click", async () => {
    try {
      await getPhantomProvider()?.disconnect();
      activeWalletAddress = "";
      renderWalletState();
      loginFeedback.textContent = "Carteira desconectada.";
      loginFeedback.dataset.state = "info";
    } catch {
      loginFeedback.textContent = "Não foi possível desconectar a carteira.";
      loginFeedback.dataset.state = "error";
    }
  });

  profileAction.addEventListener("click", openProfile);
  profileDialog.querySelector("[data-close-profile]")?.addEventListener("click", () => {
    profileDialog.close();
  });
  profileDialog.addEventListener("click", (event) => {
    if (event.target === profileDialog) profileDialog.close();
  });

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const profile = {
      name: profileNameInput.value.trim(),
      type: profileTypeInput.value
    };

    try {
      localStorage.setItem(profileKey(activeWalletAddress), JSON.stringify(profile));
      renderWalletState();
      profileDialog.close();
    } catch {
      profileFeedback.textContent = "Não foi possível salvar o perfil neste navegador.";
    }
  });

  loginDialog.addEventListener("close", () => setLoginMode("login"));

  const provider = getPhantomProvider();
  observeProvider(provider);
  activeWalletAddress = provider?.isConnected ? provider.publicKey?.toString() || "" : "";
  renderWalletState();
}