import executar from '../executar';

const codigoSomatorio = `
  var soma = 0;
  for(var i = 0; i < 3; i++) {
    soma += lerInteiro();
  }
  escreva(soma);
`;

const codigoAlertPrompt = `
  for(var i = 0; i < 3; i++) {
    texto = prompt();
    alert(texto);
  }
`;

describe('execução de código javascript', () => {
  describe('retorna resultado com mensagem de erro', () => {
    test('erro ao tentar ler entradas em excesso', () => {
      const resultado = executar(codigoSomatorio, ['1', '2']);
      expect(resultado).toBe('Erro: Entrada indisponível');
    });
  });

  describe('retorna resultado com sucesso', () => {
    test('resultado correto para somatório de 3 entradas', () => {
      const resultado = executar(codigoSomatorio, ['1', '2', '3']);
      expect(resultado).toBe('6');
    });

    test('resultado correto para escreva com múltiplas linhas', () => {
      const resultado = executar(
        `
        for(var i = 0; i < 3; i++) {
          escreva(lerInteiro(), true);
        }
      `,
        ['1', '2', '3']
      );
      expect(resultado).toBe('1\n2\n3\n');
    });

    test('resultado correto com uso de prompt e alert', () => {
      const resultado = executar(codigoAlertPrompt, ['Um', 'Dois', 'Tres']);
      expect(resultado).toBe('UmDoisTres');
    });

    test('ler texto lê uma variável do tipo string', () => {
      const resultado = executar(`
        var x = lerTexto();
        var y = lerTexto();
        escreva(x + ' ' + y);
      `, ['Hello', 'World']);
      expect(resultado).toBe('Hello World');
    });
  });
});
