# AURA Studio — Modelo de Site para Cabeleireiro / Barbearia

Site institucional **premium, responsivo e original**, criado como modelo comercial para revenda a clientes do setor de beleza (cabeleireiros, barbearias, estúdios).

- **Estrutura / UX** inspirada em sites de agendamento do setor (referência: appbarber).
- **Identidade visual** inspirada na linguagem da marca **Menuz** — gradiente violeta → magenta → índigo, fundo escuro sofisticado, tipografia geométrica moderna.
- **100% original:** nenhum logotipo, imagem, texto ou ícone protegido foi copiado. O logotipo é um **conceito próprio** (monograma "A" em gradiente).

## Tecnologias

- **HTML5** semântico + dados estruturados (Schema.org `HairSalon`)
- **CSS3** puro (variáveis/tokens, grid, flexbox, animações)
- **JavaScript** vanilla (sem dependências, sem build)
- **Google Fonts** — Sora (títulos) + Inter (texto)

> Sem etapa de build: basta abrir o `index.html` ou publicar a pasta em qualquer alojamento estático (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Estrutura de ficheiros

```
Projeto Cabeleiro Menuz/
├─ index.html              → marcação de todas as secções
├─ assets/
│  ├─ css/styles.css       → design system completo
│  ├─ js/main.js           → nav, reveal, slider, form, contadores
│  └─ img/
│     ├─ logo.svg          → logótipo (conceito original)
│     └─ favicon.svg       → ícone do separador
└─ README.md
```

## Secções incluídas

Hero com CTA · Sobre · Serviços · Benefícios · Galeria · Depoimentos (carrossel) · Planos/Preços · Formulário de contacto (com validação) · Botão flutuante de WhatsApp · Rodapé completo · Botão "voltar ao topo".

## Como personalizar para cada cliente (rebrand rápido)

### 1. Cores
Todas as cores estão centralizadas no topo de [`assets/css/styles.css`](assets/css/styles.css) em `:root`. Basta trocar três valores:

```css
--magenta: #E24BD6;
--violet:  #8B3FF0;
--indigo:  #5B45E8;
```

O gradiente, botões, ícones e destaques atualizam automaticamente.

### 2. Nome, contactos e textos
- Nome da marca: procure por `AURA` no `index.html` (cabeçalho, rodapé, título).
- Telefone / email / morada / horário: secção `#contato`, o rodapé e o bloco `application/ld+json` (SEO).
- **WhatsApp:** no `index.html`, atualize o número em `href="https://wa.me/351900000000..."` (formato internacional, sem `+` nem espaços).

### 3. Logótipo
Substitua [`assets/img/logo.svg`](assets/img/logo.svg) e `favicon.svg` pelo logótipo do cliente (SVG recomendado). O atual é um conceito próprio, livre de direitos.

### 4. Imagens reais (Galeria / Sobre)
Os blocos da galeria e da secção "Sobre" usam **placeholders em gradiente com ícones**, prontos a serem trocados por fotografias reais do cliente. Para usar fotos:
- No CSS, substitua o `background` de `.g-1 … .g-6` (e `.media-frame__img--a/b`) por `background-image: url("...")` com `background-size: cover;`.

### 5. Formulário de contacto
O envio está **simulado** em [`assets/js/main.js`](assets/js/main.js). Para receber os pedidos, integre um serviço:
- **Formspree** / **Web3Forms** — apenas alterar o `action`/`fetch`.
- **EmailJS** — envio direto do browser.
- Ou uma API própria.

## Boas práticas já implementadas

- **SEO:** `<title>`/`description`, Open Graph, Twitter Card, `canonical`, dados estruturados JSON-LD.
- **Acessibilidade:** HTML semântico, `skip link`, `aria-*`, foco visível, contraste, suporte a `prefers-reduced-motion`.
- **Performance:** sem frameworks, CSS/JS leves, `defer`, `preconnect` de fontes, animações via `transform`/`opacity`.
- **Responsividade:** desktop, tablet e telemóvel (menu lateral em mobile).

## Notas legais

Modelo desenvolvido de forma **original**. A referência de estrutura e a linguagem visual (paleta/estilo) servem apenas de **inspiração** — nenhum ativo protegido por direitos de autor da Menuz ou de terceiros foi reproduzido. Substitua os textos/placeholder de demonstração pelos dados reais do cliente antes de publicar.

---

## 🚀 Executar localmente

O projeto é **estático** (sem build). Há duas formas:

**A) Abrir diretamente**
Basta abrir o ficheiro `index.html` no navegador (duplo clique).

**B) Servidor local (recomendado — evita restrições de `file://`)**
```bash
# Com Node instalado
npx serve .
# ou
npx http-server -p 8080

# Ou com Python
python -m http.server 8080
```
Depois abra `http://localhost:8080`.

## 👥 Colaboração (fluxo de trabalho Git)

Repositório partilhado — ambos os colaboradores têm permissão para clonar, criar branches, fazer commit e merge.

**1. Clonar o projeto**
```bash
git clone https://github.com/<owner>/<repositorio>.git
cd <repositorio>
```

**2. Criar uma branch para a sua alteração**
```bash
git checkout -b feature/minha-alteracao
```

**3. Fazer commit e enviar**
```bash
git add .
git commit -m "feat: descrição clara da alteração"
git push -u origin feature/minha-alteracao
```

**4. Abrir um Pull Request** no GitHub e pedir revisão ao outro colaborador antes do merge para `main`.

> Boa prática: nunca trabalhar diretamente na `main`. Use branches + Pull Requests para manter o histórico limpo e evitar conflitos.

### Convenção de mensagens de commit
- `feat:` nova funcionalidade
- `fix:` correção
- `style:` ajustes visuais/CSS
- `docs:` documentação
- `chore:` manutenção/configuração

## 🌐 Deploy (GitHub Pages)

O site está preparado para **GitHub Pages** com caminhos relativos (funciona em subpasta `usuario.github.io/repo/`). O ficheiro `.nojekyll` evita o processamento Jekyll.

Para (re)publicar após alterações na `main`, o Pages atualiza automaticamente. Para outros serviços:
- **Netlify / Vercel:** importar o repositório, sem comando de build, pasta de publicação = raiz (`.`).

## 📄 Licença

Projeto proprietário destinado a revenda/personalização para clientes. Uso e distribuição sob acordo com o autor.
