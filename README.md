# Tampermonkey Universal AI Prompt Commands PT

**Tampermonkey Universal AI Prompt Commands PT** é um userscript para a extensão **Tampermonkey**. Ele ajuda a trabalhar mais rapidamente com chats de inteligência artificial como ChatGPT, Gemini, Claude, Copilot e outros sites com campos de texto.

O script substitui comandos curtos como `PT1`, `PT3` ou `PT10` por prompts de IA longos e já preparados.

---

## Para que serve

Serve para inserir rapidamente prompts prontos para tradução, resumo, análise de cartas, extração de fatos, respostas oficiais e redação de textos.

---

## Como funciona

Se um campo de entrada contiver exatamente um comando conhecido, por exemplo:

```text
PT1
```

esse comando será substituído por um prompt completo. Texto comum não é alterado.

---

## Exemplos

- `PT1` — tradução precisa para português.
- `PT3` — resumo temático de uma carta em uma linha.
- `PT8` — extração de datas, valores, pessoas, organizações e documentos.
- `PT10` — carta oficial em alemão simples A2-B1.

---

## Onde usar

ChatGPT, Google Gemini, Claude, Microsoft Copilot e outros sites com campos de texto.

```javascript
// @match        *://*/*
```

O script funciona em vários sites, mas substitui apenas comandos exatos.

---

## Antes da instalação

Instale primeiro a extensão **Tampermonkey** no navegador. Ela permite instalar e executar scripts `.user.js`.

---

## Instalação rápida via Raw

1. Instale Tampermonkey.
2. Abra este link Raw:

```text
https://raw.githubusercontent.com/1777maxim7771/pt_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Confirme a instalação no Tampermonkey.
4. Teste `PT1` em um chat de IA.

---

## Instalação pelo GitHub

Abra `tampermonkey-universal-ai-prompt-commands.user.js`, clique em **Raw** e confirme no Tampermonkey.

---

## Importar por URL

Tampermonkey → Dashboard → Utilities → Import from URL → cole o link Raw.

---

## Instalação manual

Tampermonkey → Create a new script → remova o modelo → cole o conteúdo do `.user.js` → salve com **Ctrl + S**.

---

## Por que o Tampermonkey reconhece o script

Pelo cabeçalho `// ==UserScript==` e pela extensão `.user.js`. O script é instalado no **Tampermonkey**, não no GitHub nem em um site específico.

---

## Comandos

- `PT1` — tradução para português.
- `PT2` — resumo em português.
- `PT3` — resumo de carta em uma linha.
- `PT4` — tradução para alemão A2-B1.
- `PT5` — correção de texto em português.
- `PT6` — resposta oficial curta.
- `PT7` — explicação simples.
- `PT8` — extração de fatos importantes.
- `PT9` — lista de ações necessárias.
- `PT10` — carta oficial em alemão.

---

## Verificação

Digite `PT1`. Se for substituído por um prompt completo, o script funciona.

---

## Problemas possíveis

Verifique se Tampermonkey e o script estão ativados, se a página foi atualizada e se o comando foi escrito sozinho.

---

## Arquivo do script

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

---

## Objetivo do projeto

Acelerar o trabalho repetitivo com chats de IA usando comandos curtos que inserem prompts completos.