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

const territoryMap = document.querySelector("#territoryMap");
const placeList = document.querySelector("#placeList");
const mapSource = document.querySelector("#mapSource");
const territoryLegend = document.querySelector("#territoryLegend");
const buyResult = document.querySelector("#buyResult");
const receiveWallet = document.querySelector("#receiveWallet");
const receiveWalletAddress = document.querySelector("#receiveWalletAddress");
const copyReceiveWallet = document.querySelector("#copyReceiveWallet");

const ringContains = (lon, lat, ring) => {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const crosses = (yi > lat) !== (yj > lat);
    const xAtLat = ((xj - xi) * (lat - yi)) / (yj - yi) + xi;

    if (crosses && lon < xAtLat) inside = !inside;
  }

  return inside;
};

const insideTerritory = (lon, lat, rings) => {
  const [outer, ...holes] = rings;
  return ringContains(lon, lat, outer) && holes.every((hole) => !ringContains(lon, lat, hole));
};

const reais = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

if (territoryMap && placeList && mapSource) {
  const showMapError = (message) => {
    territoryMap.textContent = message;
  };

  if (!window.L) {
    showMapError("O mapa não carregou. Verifique a conexão e atualize a página.");
  } else {
    const fontes = [
      { url: "data/cabana.json", cor: "#c4622d", corEscura: "#8a3e12" },
      { url: "data/madre-gertrudes.json", cor: "#1765e9", corEscura: "#1049b3" },
      { url: "data/coracao-eucaristico.json", cor: "#1f7a4d", corEscura: "#145c38" }
    ];

    Promise.all(fontes.map((fonte) =>
      fetch(fonte.url).then((response) => {
        if (!response.ok) throw new Error(fonte.url);
        return response.json().then((cadastro) => ({ ...fonte, cadastro }));
      })
    ))
      .then((carregados) => {
        const territorios = carregados.map((item) => {
          const rings = item.cadastro.territorio.poligono.coordinates;
          const lugares = item.cadastro.estabelecimentos.filter((lugar) =>
            insideTerritory(lugar.lon, lugar.lat, rings)
          );
          return { ...item, rings, lugares };
        });

        const recebimento = territorios
          .map((item) => item.cadastro.recebimento)
          .find((item) => item?.rede === "localnet");
        const carteiraTeste = recebimento?.endereco || "";
        if (receiveWallet && receiveWalletAddress && carteiraTeste) {
          receiveWallet.hidden = false;
          receiveWalletAddress.textContent = carteiraTeste;
          const receiveWalletLabel = document.querySelector("#receiveWalletLabel");
          const receiveWalletNote = document.querySelector("#receiveWalletNote");
          if (receiveWalletLabel) receiveWalletLabel.textContent = "Carteira única de teste · localnet";
          if (receiveWalletNote) {
            receiveWalletNote.textContent =
              `Nesta versão, o pagamento de todos os territórios cai neste endereço, somente no validator local (${recebimento.rpc}).`;
          }
        }

        const total = territorios.reduce((sum, item) => sum + item.lugares.length, 0);
        const nomes = territorios.map((item) => item.cadastro.territorio.nome);
        const lista = nomes.length > 1
          ? `${nomes.slice(0, -1).join(", ")} e ${nomes.at(-1)}`
          : nomes[0] || "";
        mapSource.textContent =
          `${total} autônomos em ${lista}. A compra só libera no polígono da sua localização.`;

        const map = L.map(territoryMap, { scrollWheelZoom: false });
        map.setView([-19.94, -43.995], 12);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap"
        }).addTo(map);
        const grupo = L.featureGroup().addTo(map);
        const markers = new Map();
        let pessoa = null;

        const mostrarPessoa = (lat, lon) => {
          if (pessoa) {
            pessoa.setLatLng([lat, lon]);
          } else {
            pessoa = L.circleMarker([lat, lon], {
              radius: 7,
              color: "#10274c",
              weight: 2,
              fillColor: "#ffffff",
              fillOpacity: 1
            }).addTo(map);
            pessoa.bindPopup("Sua localização");
          }
        };

        const territorioDaPessoa = (lat, lon) => territorios.find((item) =>
          insideTerritory(lon, lat, item.rings)
        );

        const informarCompra = (state, message) => {
          if (!buyResult) return;
          buyResult.dataset.state = state;
          buyResult.textContent = message;
        };

        const comprar = async (lugar, produto, territorio) => {
          informarCompra("", "Conferindo se você está dentro do polígono...");
          try {
            const posicao = await new Promise((resolve, reject) => {
              if (!navigator.geolocation) {
                reject(new Error("Este navegador não informa localização."));
                return;
              }
              navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                () => reject(new Error("A localização foi negada. Sem ela a compra não libera.")),
                { enableHighAccuracy: true, timeout: 12000, maximumAge: 15000 }
              );
            });
            const onde = territorioDaPessoa(posicao.lat, posicao.lon);
            try {
              mostrarPessoa(posicao.lat, posicao.lon);
            } catch {
              // A decisão da compra depende do polígono, não do marcador.
            }
            if (onde?.cadastro.territorio.nome === territorio.cadastro.territorio.nome) {
              informarCompra(
                "ok",
                `Compra liberada: ${produto.nome} em ${lugar.nome}. Você está em ${territorio.cadastro.territorio.nome}.`
              );
              return;
            }
            if (onde) {
              informarCompra(
                "blocked",
                `Compra recusada em ${territorio.cadastro.territorio.nome}. Você está em ${onde.cadastro.territorio.nome}. Compre nos estabelecimentos desse polígono.`
              );
              return;
            }
            informarCompra(
              "blocked",
              `Compra recusada. Sua localização está fora de ${territorio.cadastro.territorio.nome}.`
            );
          } catch (error) {
            informarCompra("blocked", error.message);
          }
        };

        const selectPlace = (id) => {
          placeList.querySelectorAll(".place-card").forEach((card) => {
            card.classList.toggle("is-active", card.dataset.id === id);
          });
          const marker = markers.get(id);
          if (!marker) return;
          marker.openPopup();
          map.panTo(marker.getLatLng());
        };

        territorios.forEach((territorio) => {
          const nome = territorio.cadastro.territorio.nome;
          L.geoJSON(territorio.cadastro.territorio.poligono, {
            style: {
              color: territorio.cor,
              weight: 2,
              fillColor: territorio.cor,
              fillOpacity: 0.16
            }
          }).addTo(grupo);

          if (territoryLegend) {
            const item = document.createElement("li");
            const swatch = document.createElement("span");
            swatch.className = "territory-swatch";
            swatch.style.background = territorio.cor;
            item.append(swatch, document.createTextNode(nome));
            territoryLegend.append(item);
          }

          territorio.lugares.forEach((lugar) => {
            const marker = L.circleMarker([lugar.lat, lugar.lon], {
              radius: 8,
              color: territorio.corEscura,
              weight: 2,
              fillColor: territorio.cor,
              fillOpacity: 0.95
            }).addTo(map);
            const produtos = lugar.produtos
              .map((produto) => `${produto.nome} · ${reais(produto.preco)}`)
              .join("<br>");
            marker.bindPopup(
              `<strong>${lugar.nome}</strong><br>${lugar.oficio}<br>${lugar.rua}, ${nome}<br><br>${produtos}`
            );
            marker.on("click", () => selectPlace(lugar.id));
            markers.set(lugar.id, marker);

            const card = document.createElement("article");
            card.className = "place-card";
            card.dataset.id = lugar.id;
            card.style.setProperty("--place-color", territorio.cor);
            const open = document.createElement("button");
            open.type = "button";
            open.className = "place-open";
            open.innerHTML = "<strong></strong><span class=\"place-role\"></span><span class=\"place-street\"></span>";
            open.querySelector("strong").textContent = lugar.nome;
            open.querySelector(".place-role").textContent = `${lugar.oficio} · ${nome}`;
            open.querySelector(".place-street").textContent = `${lugar.rua}, ${lugar.bairro}`;
            open.addEventListener("click", () => selectPlace(lugar.id));
            const products = document.createElement("div");
            products.className = "place-products";
            lugar.produtos.forEach((produto) => {
              const buy = document.createElement("button");
              buy.type = "button";
              buy.textContent = `Comprar ${produto.nome} · ${reais(produto.preco)}`;
              buy.addEventListener("click", () => comprar(lugar, produto, territorio));
              products.append(buy);
            });
            card.append(open, products);
            placeList.append(card);
          });
        });

        map.invalidateSize();
        const limites = grupo.getBounds();
        if (limites.isValid()) {
          map.fitBounds(limites, { padding: [18, 18] });
        }
      })
      .catch((error) => {
        showMapError(error && error.message ? error.message : "Não foi possível carregar os territórios.");
      });

    copyReceiveWallet?.addEventListener("click", async () => {
      const endereco = receiveWalletAddress?.textContent || "";
      if (!endereco) return;
      try {
        await navigator.clipboard.writeText(endereco);
        copyReceiveWallet.textContent = "Endereço copiado";
      } catch {
        copyReceiveWallet.textContent = "Não foi possível copiar";
      }
    });
  }
}