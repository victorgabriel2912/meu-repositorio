/* ── CONFIGURAÇÃO ── edite só estas duas linhas ── */
const WHATSAPP = "5561986781049";
const EMAIL    = "victor.madeiros2912@gmail.com";


/* ── VALIDAÇÃO ── */
function validar() {
  var nome     = document.getElementById('campo-nome').value.trim();
  var email    = document.getElementById('campo-email').value.trim();
  var assunto  = document.getElementById('campo-assunto').value.trim();
  var mensagem = document.getElementById('campo-mensagem').value.trim();

  // Limpa erros anteriores
  document.getElementById('campo-nome').classList.remove('campo-invalido');
  document.getElementById('campo-email').classList.remove('campo-invalido');
  document.getElementById('campo-assunto').classList.remove('campo-invalido');
  document.getElementById('campo-mensagem').classList.remove('campo-invalido');
  document.getElementById('erro-nome').classList.add('d-none');
  document.getElementById('erro-email').classList.add('d-none');
  document.getElementById('erro-assunto').classList.add('d-none');
  document.getElementById('erro-mensagem').classList.add('d-none');
  document.getElementById('alerta-erro').classList.add('d-none');

  var ok = true;

  // Verifica cada campo
  if (nome === '') {
    document.getElementById('campo-nome').classList.add('campo-invalido');
    document.getElementById('erro-nome').classList.remove('d-none');
    ok = false;
  }

  if (email === '' || email.indexOf('@') === -1) {
    document.getElementById('campo-email').classList.add('campo-invalido');
    document.getElementById('erro-email').classList.remove('d-none');
    ok = false;
  }

  if (assunto === '') {
    document.getElementById('campo-assunto').classList.add('campo-invalido');
    document.getElementById('erro-assunto').classList.remove('d-none');
    ok = false;
  }

  if (mensagem.length < 10) {
    document.getElementById('campo-mensagem').classList.add('campo-invalido');
    document.getElementById('erro-mensagem').classList.remove('d-none');
    ok = false;
  }

  if (!ok) {
    document.getElementById('alerta-erro').classList.remove('d-none');
  }

  return ok;
}


/* ── ENVIO PELO WHATSAPP ── */
document.getElementById('btn-whatsapp').addEventListener('click', function() {
  if (!validar()) return;

  var nome     = document.getElementById('campo-nome').value.trim();
  var email    = document.getElementById('campo-email').value.trim();
  var assunto  = document.getElementById('campo-assunto').value.trim();
  var mensagem = document.getElementById('campo-mensagem').value.trim();

  var texto = 'Olá! Meu nome é ' + nome + '.\n\nAssunto: ' + assunto + '\n\n' + mensagem + '\n\nRetorno: ' + email;
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank');
  document.getElementById('form-contato').reset();
});


/* ── ENVIO POR E-MAIL ── */
document.getElementById('btn-email').addEventListener('click', function() {
  if (!validar()) return;

  var nome     = document.getElementById('campo-nome').value.trim();
  var email    = document.getElementById('campo-email').value.trim();
  var assunto  = document.getElementById('campo-assunto').value.trim();
  var mensagem = document.getElementById('campo-mensagem').value.trim();

  var corpo = 'Olá!\n\nMeu nome é ' + nome + ' (' + email + ').\n\n' + mensagem;
  window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
});


/* ── VALIDAÇÃO EM TEMPO REAL (LIMPA ERRO AO DIGITAR) ── */
[
  ['campo-nome', 'erro-nome'],
  ['campo-email', 'erro-email'],
  ['campo-assunto', 'erro-assunto'],
  ['campo-mensagem', 'erro-mensagem']
].forEach(function(par) {
  var campo = document.getElementById(par[0]);
  var erro  = document.getElementById(par[1]);
  campo.addEventListener('input', function() {
    campo.classList.remove('campo-invalido');
    erro.classList.add('d-none');
  });
});


/* ── VALIDAÇÃO NO SUBMIT DO FORMULÁRIO ── */
document.getElementById('form-contato').addEventListener('submit', function(e) {
  e.preventDefault();
  validar();
});


/* ── FECHAR MENU MOBILE AO CLICAR NUM LINK ── */
document.querySelectorAll('#menu .nav-link').forEach(function(link) {
  link.addEventListener('click', function() {
    var instancia = bootstrap.Collapse.getInstance(document.getElementById('menu'));
    if (instancia) instancia.hide();
  });
});


/* ── ALTERNADOR DE TEMA CLARO/ESCURO ── */
var botaoTema = document.getElementById('botao-tema');
var iconeTema = document.getElementById('icone-tema');

function aplicarTema(tema) {
  var temaClaro = tema === 'claro';

  if (temaClaro) {
    document.documentElement.setAttribute('data-tema', 'claro');
  } else {
    document.documentElement.removeAttribute('data-tema');
  }

  iconeTema.className = temaClaro ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
  botaoTema.setAttribute('aria-label', temaClaro ? 'Ativar tema escuro' : 'Ativar tema claro');
  botaoTema.setAttribute('title', temaClaro ? 'Ativar tema escuro' : 'Ativar tema claro');
}

var temaSalvo = localStorage.getItem('tema-portfolio') || 'escuro';
aplicarTema(temaSalvo);

botaoTema.addEventListener('click', function() {
  var temaAtual = document.documentElement.getAttribute('data-tema') === 'claro' ? 'claro' : 'escuro';
  var novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';

  aplicarTema(novoTema);
  localStorage.setItem('tema-portfolio', novoTema);
});
