# Tampermonkey Universal AI Prompt Commands PT

Versão portuguesa de um script Tampermonkey para trabalhar mais rápido com chats de inteligência artificial.

O script substitui os acionadores universais `Q1–Q10` por prompts de IA preparados. Estes acionadores não estão ligados a nenhum idioma: o usuário pode trocar `Q1`, `Q2` e os outros por palavras, comandos ou frases próprias.

## Para que serve

Serve para inserir rapidamente prompts em ChatGPT, Gemini, Claude, Copilot e outros chats de IA. Em vez de escrever sempre uma instrução longa, basta digitar `Q1` e o script insere o prompt completo.

## Como funciona

O script observa o campo de texto ativo. Se todo o conteúdo do campo corresponder exatamente a um dos acionadores `Q1–Q10`, ele é substituído pelo prompt preparado.

```text
Q1
```

é substituído por um prompt de tradução para português.

```text
Q8
```

é substituído por um prompt para extrair fatos importantes.

Texto normal não é alterado. Por exemplo, `Q1 outro texto` não será substituído.

## Acionadores personalizados

Os acionadores podem ser alterados no código, no objeto `COMMANDS`.

```javascript
'Q1': `...`
```

pode virar:

```javascript
'TRADUZIR': `...`
```

`Q1–Q10` são apenas os acionadores universais padrão.

## Onde usar

- ChatGPT
- Google Gemini
- Claude
- Microsoft Copilot
- outros sites com campo de texto

O script contém:

```javascript
// @match        *://*/*
```

## Requisito antes da instalação

A extensão **Tampermonkey** deve estar instalada no navegador. O script é instalado no Tampermonkey, não no GitHub e não em um site específico. O GitHub serve apenas para armazenar o arquivo `.user.js`.

## Instalação rápida

1. Instale o Tampermonkey.
2. Abra o link Raw:

```text
https://raw.githubusercontent.com/1777maxim7771/pt_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Confirme a instalação no Tampermonkey.
4. Abra um chat de IA e digite `Q1`.

## Instalação pelo GitHub

Abra o arquivo `tampermonkey-universal-ai-prompt-commands.user.js`, clique em **Raw** e confirme a instalação no Tampermonkey.

## Importar por URL

No Tampermonkey, abra **Dashboard → Utilities → Import from URL**, cole o link Raw e confirme.

## Instalação manual

Crie um novo script no Tampermonkey, cole o código do arquivo `.user.js` e salve.

## Por que o Tampermonkey reconhece o script

O Tampermonkey reconhece o cabeçalho `// ==UserScript==` e a extensão `.user.js`.

## Comandos padrão

- `Q1` — tradução para português.
- `Q2` — resumo do texto.
- `Q3` — resumo de uma carta em uma linha.
- `Q4` — tradução para alemão simples A2-B1.
- `Q5` — correção de texto em português.
- `Q6` — resposta oficial curta.
- `Q7` — explicação simples do texto.
- `Q8` — extração de fatos importantes.
- `Q9` — lista de ações necessárias.
- `Q10` — carta oficial em alemão.

## Verificação

Digite `Q1` em um chat de IA. Se o script funcionar, `Q1` será substituído pelo prompt completo.

## Possíveis problemas

Verifique se o script está ativado, se a página foi recarregada, se `Q1` foi digitado sem texto adicional, se o Tampermonkey tem permissão no site e se o cursor está em um campo editável.

## Objetivo do projeto

Acelerar o trabalho repetitivo com chats de IA: tradução, resumo, análise de cartas, respostas oficiais e processamento de documentos.
