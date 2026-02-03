/**
* WhatsApp Web – Exportador de Contatos Não Salvos (Brasil)
*
* Descrição:
* Extrai contatos não salvos do WhatsApp Web identificando conversas
* cujo título é um número de telefone no formato brasileiro (+55).
* Gera um arquivo CSV compatível com o Google Contatos.
*
* Uso:
* Cole este script no console do navegador enquanto o WhatsApp Web estiver aberto.
*
* Observações:
* - Executa inteiramente no navegador
* - Nenhum dado é enviado para servidores externos
* - Não automatiza mensagens ou interações
*
* Autor: GLTEC INFORMÁTICA
* Licença: MIT
*/


(() => {
  /*************************
   * CONFIGURAÇÕES
   *************************/
  const FILE_NAME = 'contatos_whatsapp_nao_salvos.csv';
  const DEFAULT_SUFFIX = 'WhatsApp';

  /*************************
   * ESTADO GLOBAL
   *************************/
  if (!window.whatsExtractedContacts) {
    window.whatsExtractedContacts = {};
  }

  /*************************
   * REGEX BR (+55 DDD XXXXXXXX / XXXXXXXXX)
   *************************/
  const BR_PHONE_REGEX =
    /\+55\s?\(?\d{2}\)?\s?(9?\d{4})[-\s]?\d{4}/;

  function normalizeBR(text) {
    if (!text) return null;

    const match = text.match(BR_PHONE_REGEX);
    if (!match) return null;

    let num = match[0].replace(/\D/g, '');

    if (num.startsWith('55')) {
      return '+' + num;
    }

    return null;
  }

  /*************************
   * DETECTA SE É NÚMERO (NÃO SALVO)
   *************************/
  function looksLikePhoneName(name) {
    return BR_PHONE_REGEX.test(name);
  }

  /*************************
   * BOTÃO
   *************************/
  function createButton(label, onClick) {
    const btn = document.createElement('button');
    btn.innerText = label;

    Object.assign(btn.style, {
      position: 'fixed',
      top: '12px',
      right: '12px',
      zIndex: 9999,
      padding: '10px 22px',
      background: 'linear-gradient(#25D366, #1ebe5d)',
      border: '1px solid #128C7E',
      borderRadius: '22px',
      color: '#fff',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer'
    });

    btn.onclick = onClick;
    document.body.appendChild(btn);
  }

  /*************************
   * COLETA DE CONVERSAS
   *************************/
  function collectChats() {
    const chats = document.querySelectorAll(
      '#pane-side [role="row"]'
    );

    chats.forEach(chat => {
      const titleEl = chat.querySelector('span[title]');
      if (!titleEl) return;

      const title = titleEl.getAttribute('title');

      // só pega conversas cujo "nome" é um número
      if (!looksLikePhoneName(title)) return;

      const phone = normalizeBR(title);
      if (!phone) return;

      if (!window.whatsExtractedContacts[phone]) {
        window.whatsExtractedContacts[phone] = phone;
        chat.style.backgroundColor = '#d6ffe0';
      }
    });
  }

  /*************************
   * CSV (GOOGLE CONTACTS)
   *************************/
  function generateCSV() {
    const suffix =
      prompt('Sufixo para os contatos:', DEFAULT_SUFFIX) || DEFAULT_SUFFIX;

    let csv =
      'Name,Given Name,Additional Name,Family Name,Group Membership,Phone 1 - Type,Phone 1 - Value\n';

    let index = 1;

    Object.values(window.whatsExtractedContacts).forEach(phone => {
      const name = `${suffix} ${index++}`;
      csv += `${name},${name},,,My Contacts,Mobile,${phone}\n`;
    });

    return csv;
  }

  /*************************
   * DOWNLOAD
   *************************/
  function downloadCSV(content) {
    const blob = new Blob([content], {
      type: 'text/csv;charset=utf-8;'
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = FILE_NAME;
    link.click();
  }

  /*************************
   * INIT
   *************************/
  function init() {
    createButton('📥 Exportar Não Salvos', () => {
      collectChats();
      const csv = generateCSV();
      downloadCSV(csv);
    });

    const pane = document.querySelector('#pane-side');
    if (pane) {
      pane.addEventListener('scroll', collectChats);
    }

    console.log(
      '✅ Role a lista de conversas lentamente para coletar todos os números não salvos.'
    );
  }

  init();
})();
