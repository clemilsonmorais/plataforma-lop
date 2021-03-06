const { NodeVM } = require('vm2');

let entradas = [];
let indiceEntrada;
let resultado;

const contexto = {
  INIT_VM_CONTEXT: function(valores) {
    resultado = '';
    indiceEntrada = 0;
    entradas = valores;
  },
  escreva: function(valor, novaLinha) {
    resultado = resultado.concat(valor);
    if (novaLinha) {
      resultado = resultado.concat('\n');
    }
  },
  prompt: function() {
    if (indiceEntrada >= entradas.length) {
      throw new Error('Entrada indisponível');
      return;
    }
    return entradas[indiceEntrada++];
  },
  alert: function(valor) {
    resultado = resultado.concat(valor);
  },
  lerTexto: function() {
    if (indiceEntrada >= entradas.length) {
      throw new Error('Entrada indisponível');
      return;
    }
    return entradas[indiceEntrada++];
  },
  lerInteiro: function() {
    if (indiceEntrada >= entradas.length) {
      throw new Error('Entrada indisponível');
      return;
    }
    return parseInt(entradas[indiceEntrada++]);
  },
  lerReal: function() {
    if (indiceEntrada >= entradas.length) {
      throw new Error('Entrada indisponível');
      return;
    }
    return parseFloat(entradas[indiceEntrada++]);
  },
  raizQuadrada: function(valor) {
    return Math.sqrt(valor);
  },
  potencia: function(base, expoente) {
    return Math.pow(base, expoente);
  },
  divisaoInteira: function(x, y) {
    return Math.floor(x / y);
  }
};

function executar(codigo, arrayEntrada) {
  contexto.INIT_VM_CONTEXT(arrayEntrada);

  const vm = new NodeVM({
    timeout: 1000,
    sandbox: contexto,
    console: 'off'
  });

  try {
    vm.run(codigo);
  } catch (error) {
    resultado = `Erro: ${error.message}`;
  }

  return resultado;
}

module.exports = executar;
