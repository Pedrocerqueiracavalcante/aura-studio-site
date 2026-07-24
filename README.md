# Barbearia Menuz — Modelo de Site para Barbearia

Site institucional **premium, responsivo e original** para barbearias, com **catálogo de cortes selecionável**: o cliente escolhe o corte pelo telemóvel antes de chegar e envia direto ao barbeiro pelo WhatsApp — reduzindo o tempo de espera e agilizando o atendimento.

- **Estrutura / UX** inspirada em sites de agendamento do setor (referência: appbarber) e no coverflow de destaques da **Menuz**.
- **Identidade visual Menuz:** laranja como cor principal, branco/claro como secundária, sobre base escura elegante. Tipografia geométrica moderna.
- **100% original:** logótipo é um conceito próprio (monograma "M" em gradiente laranja). Sem cópia de imagens, textos ou ícones de terceiros.

## Tecnologias

- **HTML5** semântico + dados estruturados (Schema.org `HairSalon`)
- **CSS3** puro (variáveis/tokens, grid, flexbox, animações)
- **JavaScript** vanilla (sem dependências, sem build)
- **Google Fonts** — Sora (títulos) + Inter (texto)

> Sem etapa de build: abra o `index.html` ou publique a pasta em qualquer alojamento estático.

## Estrutura de ficheiros

```
Barbearia Menuz/
├─ index.html              → todas as secções
├─ assets/
│  ├─ css/styles.css       → design system (paleta Menuz laranja/branco)
│  ├─ js/main.js           → nav, carrossel, filtros, seleção de corte, form
│  └─ img/
│     ├─ logo.svg          → logótipo Menuz (conceito original, laranja)
│     ├─ favicon.svg
│     └─ cortes/           → (opcional) coloque aqui as fotos reais dos cortes
└─ README.md
```

## Secções

Hero com **carrossel de cortes em destaque** + CTA · **Catálogo de Cortes** (grelha filtrável + botão *Selecionar*) · Sobre · Serviços · Benefícios · Depoimentos · Planos · Formulário de contacto (com validação + envio por WhatsApp) · Botão flutuante de WhatsApp · Rodapé completo.

### Como funciona a escolha do corte
1. O cliente vê os modelos (Degradê, Fades, Undercut, Navalha, etc.).
2. Toca em **Selecionar** no corte desejado.
3. O site marca o corte, pré-preenche o formulário e o botão de WhatsApp com o nome do corte, e leva ao contacto.
4. O cliente envia — e o barbeiro já sabe o que preparar.

## Personalizar para cada cliente (rebrand rápido)

### 1. Cores
Tudo centralizado no topo de [`assets/css/styles.css`](assets/css/styles.css) em `:root`:

```css
--brand:       #FF6A00;  /* laranja principal */
--brand-light: #FF9A3D;  /* laranja claro (gradiente/realces) */
--brand-deep:  #E8480A;  /* laranja profundo (gradiente) */
```
Gradiente, botões, chips, ícones e realces atualizam automaticamente.

### 2. Fotos reais dos cortes
As imagens dos cortes são **placeholders em gradiente**. Para usar fotos reais (ideal proporção **4:5**, vertical):

- Coloque as imagens em `assets/img/cortes/` (ex.: `degrade.jpg`).
- Em [`assets/css/styles.css`](assets/css/styles.css), troque o `background-image` da classe correspondente. Exemplo:
  ```css
  .cp-degrade { background-image: url("../img/cortes/degrade.jpg"); }
  ```
  Classes: `.cp-degrade .cp-social .cp-americano .cp-buzz .cp-lowfade .cp-midfade .cp-highfade .cp-taper .cp-mullet .cp-undercut .cp-navalha`

### 3. Nome, contactos e WhatsApp
- Marca: procure por `Menuz` no `index.html`.
- **WhatsApp:** atualize o número `351900000000` no `index.html` (WhatsApp flutuante + botão do formulário) e em `assets/js/main.js` (`WA_NUMBER`).
- Telefone / email / morada / horário: secção `#contato`, rodapé e bloco `application/ld+json`.

### 4. Logótipo
Substitua [`assets/img/logo.svg`](assets/img/logo.svg) e `favicon.svg` pelo logótipo oficial do cliente (SVG recomendado).

### 5. Formulário de contacto
O envio por formulário está **simulado** em [`assets/js/main.js`](assets/js/main.js). Para receber pedidos: integrar **Formspree**, **Web3Forms** ou **EmailJS**. (O envio por **WhatsApp** já funciona sem backend.)

## 🚀 Executar localmente

```bash
# Servidor local (recomendado)
npx serve .            # ou: python -m http.server 8080
# abrir http://localhost:8080  (ou simplesmente abrir index.html)
```

## 👥 Colaboração (fluxo Git)

```bash
git clone https://github.com/Pedrocerqueiracavalcante/aura-studio-site.git
cd aura-studio-site
git checkout -b feature/minha-alteracao
git add . && git commit -m "feat: descrição da alteração"
git push -u origin feature/minha-alteracao
# abrir Pull Request no GitHub
```
Convenção de commits: `feat:` `fix:` `style:` `docs:` `chore:`. Trabalhe sempre em branch + PR, nunca direto na `main`.

## 🌐 Deploy (GitHub Pages)

Preparado para GitHub Pages (caminhos relativos + `.nojekyll`). O push para `main` atualiza o site automaticamente.
- **Netlify / Vercel:** importar o repositório, sem comando de build, pasta de publicação = raiz (`.`).

## Boas práticas implementadas

- **SEO:** `title`/`description`, Open Graph, Twitter Card, `canonical`, JSON-LD.
- **Acessibilidade:** HTML semântico, `skip link`, `aria-*`, foco visível, `prefers-reduced-motion`.
- **Performance:** sem frameworks, CSS/JS leves, `defer`, `preconnect`, animações via `transform`/`opacity`.
- **Responsividade:** desktop, tablet e telemóvel (prioridade mobile; menu lateral).

## Licença

Projeto proprietário destinado a revenda/personalização para clientes. Uso e distribuição sob acordo com o autor. Identidade visual Menuz (laranja & branco).
