# Portfólio Pessoal (Currículo Online)

Site estático em **HTML5 + CSS3 + JavaScript puro** (sem frameworks), feito
para a atividade de portfólio pessoal.

## Estrutura

```
portfolio/
├── html/
│   ├── index.html      → Página inicial / Sobre mim
│   ├── formacao.html    → Formação, cursos e idiomas
│   ├── portfolio.html    → Projetos
│   └── contato.html    → Formulário de contato (validado em JS)
├── css/
│   └── style.css      → Todo o estilo do site (tema claro/escuro incluso)
├── js/
│   └── script.js      → Menu mobile, tema, validação do formulário, animações
└── README.md
```

> As páginas ficam em `html/`, então elas referenciam as outras duas
> pastas subindo um nível: `../css/style.css` e `../js/script.js`. Os
> links entre as próprias páginas (`index.html`, `formacao.html`...)
> continuam simples, pois estão todas na mesma pasta.

## Antes de entregar: últimos ajustes

O conteúdo já está personalizado com as informações de Matteo D'Aquila.
Ainda faltam alguns pontos que só você pode preencher:

- **`html/contato.html`** — troque `seuemail@dominio.com` pelo seu e-mail real.
- **`html/portfolio.html`** — troque o `href="#"` do card "Portfólio Pessoal
  (este site)" pelo link real do seu repositório no GitHub, depois de
  publicá-lo.
- **Links de GitHub/LinkedIn** no rodapé e na página de contato — atualize
  para os seus perfis reais, ou remova se ainda não tiver.
- **Idiomas** (`html/formacao.html`) — só o Português está preenchido;
  adicione outros idiomas se fizer sentido, seguindo o comentário no código.
- Ícone/foto: por padrão o "avatar" usa apenas as iniciais "MD" e CSS
  (sem imagem externa). Se quiser trocar por uma foto real, substitua o
  conteúdo de `.avatar-panel` por uma tag `<img>`.

> **Uma observação sobre privacidade:** como o site vai ficar público na
> internet (indexado por buscadores), evitei colocar a idade de forma
> explícita no texto — é uma prática comum em currículos/portfólios, e
> também reduz a quantidade de dados pessoais expostos junto com nome
> completo, cidade e escola. Vale conversar com um responsável ou
> professor sobre o que é confortável deixar público antes da entrega.

## Como testar localmente

Abra `html/index.html` diretamente no navegador, ou, para simular melhor
o ambiente de produção, rode um servidor local a partir da pasta do
projeto (na raiz, não dentro de `html/`):

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000/html/` no navegador.

## Como publicar no GitHub Pages

O GitHub Pages só publica automaticamente a partir da **raiz** do
repositório ou de uma pasta chamada **`/docs`** — não existe opção pronta
para apontar direto para `/html`. Escolha uma das duas opções abaixo:

**Opção A — renomear `html/` para `docs/`** (mais simples)
```bash
mv html docs
git init
git add .
git commit -m "Portfólio pessoal"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```
No GitHub: **Settings → Pages → Source** → branch `main`, pasta `/docs`.

**Opção B — manter `html/` e criar um redirecionamento na raiz**
Crie um `index.html` na raiz do repositório (fora de `html/`) só com:
```html
<meta http-equiv="refresh" content="0; url=html/index.html">
```
Depois publique normalmente com Source = `/ (root)`.

Em ambos os casos:
1. Confirme que o site abre pelo link `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`
   (não `localhost`) antes de colocá-lo no documento de entrega.
2. Cole esse link e o link do repositório no PDF de entrega.

## Checklist rápido em relação ao enunciado

- [x] HTML5 + CSS3 (sem Bootstrap/Tailwind/etc.) + JavaScript puro (sem jQuery/React/etc.)
- [x] 4 páginas interligadas por um menu igual em todas elas
- [x] Sobre mim / Formação / Portfólio / Contato
- [x] Formulário valida nome, e-mail (formato) e mensagem antes de "enviar"
- [x] Simulação de envio: limpa o formulário e mostra confirmação (modal)
- [x] Menu responsivo (hambúrguer) em telas pequenas
- [x] Alternância de tema claro/escuro
- [x] Comentários explicativos no CSS e no JS
- [ ] Publicar no GitHub Pages e colar o link no documento de entrega (.pdf)
- [ ] Colar prints de cada página com a URL pública visível na barra de endereço
