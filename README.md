# WhatsApp Web – Exportador de Contatos Não Salvos (Brasil)

Script em JavaScript para extração automática de contatos **não salvos** a partir do WhatsApp Web, seguindo o padrão brasileiro de numeração (+55). O script gera um arquivo CSV compatível com o Google Contatos, facilitando a organização e importação dos números extraídos.

---

## Descrição

Este projeto foi desenvolvido para identificar conversas no WhatsApp Web cujo nome do chat seja um número de telefone, o que indica, na maioria dos casos, que o contato não está salvo na agenda. A partir dessa identificação, o script coleta os números válidos do Brasil e gera um arquivo CSV pronto para importação no Google Contatos.

---

## Como usar

### 1. Acessar o WhatsApp Web
Acesse https://web.whatsapp.com e faça login normalmente.

### 2. Abrir o console do navegador
Pressione `F12` ou `Ctrl + Shift + I` e selecione a aba **Console**.

### 3. Executar o script
Cole o conteúdo do script JavaScript no console e pressione `Enter`.

### 4. Rolar a lista de conversas
Role a lista lateral de conversas lentamente até o final para garantir que todas as conversas sejam carregadas e analisadas, os contatos identificados pelo script, ficaram marcos em verde.

### 5. Exportar os contatos
Clique no botão **Exportar Não Salvos** exibido na interface.  
O arquivo CSV será gerado e baixado automaticamente.

### 6. Importar no Google Contatos
Acesse https://contacts.google.com  
Utilize a opção **Importar** e selecione o arquivo CSV gerado.

---

## Funcionalidades

- Leitura das conversas exibidas no WhatsApp Web
- Identificação de contatos não salvos com base no nome do chat
- Validação de números no padrão brasileiro (+55 + DDD + número)
- Remoção automática de números duplicados
- Coleta progressiva conforme a rolagem da lista de conversas
- Geração de arquivo CSV compatível com Google Contatos
- Download automático do arquivo gerado

---

## Limitações

O WhatsApp Web não fornece uma informação explícita indicando se um contato está salvo ou não.  
Este script utiliza a abordagem mais confiável disponível no ambiente web:

- Se o nome da conversa for um número de telefone, o contato é considerado não salvo
- Se o nome da conversa for um texto (nome), o contato é considerado salvo

Essa limitação é inerente à plataforma.

---

## Requisitos

- Navegador (Google Chrome, Edge ou Firefox)
- Conta ativa no WhatsApp
- Acesso ao WhatsApp Web

---

## Formato do arquivo CSV

O arquivo gerado segue o padrão oficial de importação do Google Contatos:


```csv 
Name,Given Name,Additional Name,Family Name,Group Membership,Phone 1 - Type,Phone 1 - Value
WhatsApp 1,WhatsApp 1,,,My Contacts,Mobile,+5511999999999
```

Apos o download do arquivo, você pode modificar a planilha, removendo informaçoes de contato que não deseja que seja sicronizado ao Google Contatos.

Se for remover alguma informação dos contatos apos o download do csv, de maneira nenhuma apague as colunas da planilha, apos a atualização da sua preferencia, salvar em CSV.

---

## Boas práticas

- Role a lista de conversas lentamente para evitar falhas na coleta
- Evite executar o script repetidas vezes sem necessidade
- Utilize apenas em contas próprias
- Verifique os contatos antes de importar definitivamente no Google Contatos

## Segurança e privacidade

- O script é executado localmente no navegador
- Nenhum dado é enviado para servidores externos
- Não realiza envio de mensagens nem automação de interações
- Apenas lê informações visíveis na interface do WhatsApp Web

---

## Problemas que podem acontecer
**Se o botão de Exportar Não Salvos** não aparecer? não se desespere, atualize a pagina e rode novamente o script.

**Se nem todos os contatos não foram exportado**? certifique-se de rolar completamente a lista de conversas antes de exportar.

**Números inválidos não aparecem no CSV** Apenas números válidos no padrão brasileiro são exportados.

---

## Aviso legal

Este projeto é fornecido apenas para fins organizacionais.
O autor não se responsabiliza por usos que violem os termos de serviço do WhatsApp ou leis locais.

Utilize com responsabilidade.

---

## Contribuições

Contribuições são bem-vindas por meio de Pull Requests ou Issues para correções, melhorias ou sugestões.

---

## Licença

Este projeto pode ser distribuído sob licença MIT ou outra licença de sua preferência.