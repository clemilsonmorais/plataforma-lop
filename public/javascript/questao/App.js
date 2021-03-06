import axios from 'axios';
import tippy from 'tippy.js';

import '../../styles/editor.css';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/ambiance';
import ex from '../modules/execucao';

$(function() {

  /**
   * Requisita as tags disponíveis no sistema
   */
  axios.get(window.location.origin + '/api/v1/tags')
    .then(res => {
      $('select[name=\'tags\']').select2({
        data: res.data,
        maximumSelectionLength: 4,
        tags: true
      });
    })
    .catch(err => {
      console.error(err);
    });

  /**
   * Configuração do editor de json para cadastro de resultados
   */
  const jsonContainer = document.getElementById('json_editor');
  const resultadosExemplo = [
    {
      entradas: ['1', '2', '3'],
      saida: '1 4 9'
    }
  ];

  const jsonEditor = new JSONEditor(jsonContainer, {
    mode: 'code',
    modes: ['code', 'tree'],
    onError: function(err) {
      alert(err.toString());
    }
  });

  jsonEditor.set(resultadosExemplo);

  /**
   * Configuração do editor de código para execução de questão e cadastro de solução
   */
  const editor = ace.edit('questao-editor');
  editor.getSession().setMode('ace/mode/javascript');
  editor.setTheme('ace/theme/ambiance');
  editor.setFontSize(14);

  $('#btn-enviar-codigo').on('click', function() {
    const resultados = jsonEditor.get();
    const $btn = $(this);
    $btn.prop('disabled', true);
    $btn.removeClass('btn-outline-primary');
    ex.executarCodigoComResultados(editor.getValue(), resultados)
      .then(res => {
        adicionarListaResultados(res.data);
        tippy('.saida-esperada');
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        $btn.prop('disabled', false);
        $btn.addClass('btn-outline-primary');
      });
  });

  $('#form-questao').submit(function() {
    const $resultados = $(`<input type='hidden' name='resultados'/>`);
    const $solucao = $(`<input type='hidden' name='solucao'/>`);
    $resultados.val(JSON.stringify(jsonEditor.get()));
    $solucao.val(editor.getValue());
    $(this).append($resultados);
    $(this).append($solucao);
  });
});

function adicionarListaResultados(resultados) {
  const $resultadosDiv = $('#resultados-container');
  const markup = criarLinhasResultado(resultados);
  $resultadosDiv.html(markup);
}

function criarLinhasResultado(resultado) {
  return resultado
    .map(r => {
      console.log(r);
      console.log(r.saida.length);
      console.log(r.saidaEsperada.length);
      const acertou = r.saida === r.saidaEsperada;
      const color = acertou ? 'green' : 'red';
      const icon = acertou ? 'ion-checkmark' : 'ion-close';
      return `
      <li class="list-group-item">
        <samp>${r.saida}</samp>
        <span class="saida-esperada pull-xs-right"
          title="<strong>Entrada:</strong>
          <br>${r.entrada}<br>
          <strong>Saída esperada:</strong><br>
          ${r.saidaEsperada.split('\n').join('<br>')}">
          <i style="color: ${color};" class="${icon}">&nbsp;</i> Ver detalhes
        </span>
      </li>
    `;
    })
    .join('');
}
