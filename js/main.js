/* =========================================================
   Imagem Alcance · comportamento do site (sem bibliotecas)
   1. Tema claro/escuro (sol e lua)
   2. Menu do celular
   3. Raio-X, régua e varredura ligados à rolagem
   4. Entrada suave das seções
   ========================================================= */

const raiz = document.documentElement;
const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Tema claro/escuro ---------- */
const corDaBarra = { claro: '#FFFFFF', escuro: '#050D1A' };

function marcarTema() {
  const atual = raiz.dataset.tema;
  document.querySelectorAll('[data-tema-botao]').forEach((botao) => {
    botao.setAttribute('aria-pressed', String(botao.dataset.temaBotao === atual));
  });
  document.querySelector('[data-cor-tema]')?.setAttribute('content', corDaBarra[atual]);
}

function aplicarTema(tema) {
  if (raiz.dataset.tema === tema) return;
  try { localStorage.setItem('tema', tema); } catch (e) { /* navegação privada */ }

  const trocar = () => { raiz.dataset.tema = tema; marcarTema(); };
  // Efeito de scanner na troca, onde o navegador suporta
  if (document.startViewTransition && !semMovimento) document.startViewTransition(trocar);
  else trocar();
}

document.querySelectorAll('[data-tema-botao]').forEach((botao) => {
  botao.addEventListener('click', () => aplicarTema(botao.dataset.temaBotao));
});
marcarTema();

/* ---------- 2. Menu do celular ---------- */
const menuBotao = document.querySelector('[data-menu-botao]');
const menuCelular = document.querySelector('[data-menu]');

function abrirMenu(abrir) {
  menuCelular.hidden = !abrir;
  menuBotao.setAttribute('aria-expanded', String(abrir));
  menuBotao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}
menuBotao?.addEventListener('click', () => abrirMenu(menuCelular.hidden));
menuCelular?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => abrirMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menuCelular.hidden) abrirMenu(false); });

/* ---------- 3. Efeitos ligados à rolagem ---------- */
const limitar = (v) => Math.min(1, Math.max(0, v));
const raiox = document.querySelector('[data-raiox]');
const regua = document.querySelector('[data-regua]');
const como = document.querySelector('#como-funciona');
const varredura = document.querySelector('[data-varredura]');

function atualizarRolagem() {
  const alturaTela = window.innerHeight;

  // Raio-X: começa como foto e vira radiografia enquanto a imagem sobe na tela
  if (raiox) {
    const caixa = raiox.getBoundingClientRect();
    const progresso = limitar((alturaTela * 0.85 - caixa.bottom) / (alturaTela * 0.5));
    raiox.style.setProperty('--p', progresso.toFixed(3));
  }

  // Régua de medida corre para o lado
  if (regua) regua.style.setProperty('--desloc', `${-window.scrollY * 0.3}px`);

  // Varredura atravessa a seção "Como funciona"
  if (como && varredura) {
    const caixa = como.getBoundingClientRect();
    const progresso = limitar((alturaTela * 0.7 - caixa.top) / (caixa.height + alturaTela * 0.4));
    varredura.style.transform = `translateX(${progresso * (caixa.width - 3)}px)`;
  }
}

if (!semMovimento) {
  let agendado = false;
  const aoRolar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => { atualizarRolagem(); agendado = false; });
  };
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar);
  atualizarRolagem();
}

/* ---------- 4. Entrada suave das seções ---------- */
const itens = document.querySelectorAll('[data-revelar]');
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  itens.forEach((item) => observador.observe(item));
} else {
  itens.forEach((item) => item.classList.add('visivel'));
}

/* Ano atual no rodapé */
document.querySelectorAll('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });
