// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands PT
// @namespace    local.tampermonkey.universal.ai.prompt.commands.pt
// @version      1.0.0
// @description  Substitui comandos curtos PT1-PT10 por prompts de IA prontos em chats de inteligência artificial.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Versão portuguesa. Apenas um comando exato é substituído por um prompt completo.
    const COMMANDS = {
        'PT1': `Traduza o texto fornecido para português de forma completa e precisa. Preserve o sentido, a ordem das informações, nomes, datas, valores, números de documentos, organizações e formulações importantes. Não acrescente conclusões próprias e não reduza o conteúdo.`,
        'PT2': `Resuma o texto fornecido em português de acordo com o sentido e o contexto. Explique do que se trata, quem escreve a quem, qual é o assunto principal e quais pedidos, decisões, datas, prazos, valores ou detalhes importantes são mencionados.`,
        'PT3': `Crie em português um resumo temático muito curto desta carta, estritamente em uma única linha. Indique remetente, assunto, o que é comunicado ou solicitado e quais datas, prazos, valores, documentos ou ações são importantes.`,
        'PT4': `Traduza o texto fornecido para alemão simples e compreensível, nível A2-B1. Formule o texto de modo educado, oficial e gramaticalmente correto. Preserve sentido, nomes, datas, valores, endereços, organizações e detalhes importantes.`,
        'PT5': `Corrija o texto português fornecido. Torne-o gramaticalmente correto, claro, lógico e natural, mantendo o sentido original. Remova erros, repetições e formulações inadequadas. Não acrescente fatos ausentes do texto original.`,
        'PT6': `Escreva uma resposta curta, educada e oficial a esta carta em português. Responda ao conteúdo de forma concreta, sem frases desnecessárias. Se necessário, confirme o recebimento, peça esclarecimentos, mencione documentos ou comunique as informações solicitadas.`,
        'PT7': `Explique em português, com palavras simples, o que este texto significa. Analise o contexto, quem escreve, para quem, sobre qual assunto, o que é solicitado, o que deve ser feito e quais datas, prazos, valores, documentos ou condições são importantes.`,
        'PT8': `Extraia do texto todos os fatos importantes e organize-os em português. Indique separadamente pessoas, organizações, endereços, datas, prazos, valores, números de documentos, exigências, decisões, obrigações, documentos mencionados e próximos passos. Não invente informações.`,
        'PT9': `Crie em português uma lista clara de ações necessárias com base neste texto. Indique o que fazer, quais documentos preparar, a quem responder, onde se dirigir, quais prazos respeitar e a que pontos prestar atenção. Ordene as ações por prioridade.`,
        'PT10': `Redija com base no texto fornecido uma carta oficial e educada em alemão simples, nível A2-B1. Preserve nomes, datas, valores, endereços, organizações, números de documentos e circunstâncias. Estruture a carta com saudação, breve explicação, pedido principal e encerramento. Termine com: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea', 'input[type="text"]', 'input[type="search"]', '[contenteditable="true"]', '[contenteditable="plaintext-only"]', '[role="textbox"]'];
    function isEditableElement(element) { if (!element || !element.matches) return false; if (element.disabled || element.readOnly) return false; const tagName = element.tagName ? element.tagName.toLowerCase() : ''; const inputType = (element.getAttribute('type') || '').toLowerCase(); if (tagName === 'input' && !['text', 'search'].includes(inputType)) return false; return EDITABLE_SELECTORS.some(selector => element.matches(selector)); }
    function findEditableElement(target) { if (!target) return null; if (isEditableElement(target)) return target; if (target.closest) { const element = target.closest(EDITABLE_SELECTORS.join(',')); if (isEditableElement(element)) return element; } return null; }
    function getText(element) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; return tagName === 'textarea' || tagName === 'input' ? element.value || '' : element.innerText || element.textContent || ''; }
    function normalizeCommand(text) { return String(text || '').trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element, text) { try { element.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertReplacementText', data: text })); } catch (error) { element.dispatchEvent(new Event('input', { bubbles: true })); } element.dispatchEvent(new Event('change', { bubbles: true })); }
    function setCursorToEnd(element) { element.focus(); if ('selectionStart' in element) { const length = element.value.length; element.setSelectionRange(length, length); return; } const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
    function replaceText(element, newText) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; element.focus(); if (tagName === 'textarea' || tagName === 'input') { element.value = newText; } else { try { const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText', false, newText); } catch (error) { element.textContent = newText; } } setCursorToEnd(element); dispatchInputEvents(element, newText); }
    function showNotification(message) { const oldBox = document.getElementById('tm-ai-prompt-commands-notification'); if (oldBox) oldBox.remove(); const box = document.createElement('div'); box.id = 'tm-ai-prompt-commands-notification'; box.textContent = message; box.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35);max-width:420px;line-height:1.4'; document.body.appendChild(box); setTimeout(() => box.remove(), 2200); }
    function checkAndReplace(target) { const editable = findEditableElement(target); if (!editable) return; const command = normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) return; replaceText(editable, COMMANDS[command]); showNotification(`Comando ${command} substituído por um prompt de IA pronto`); }
    document.addEventListener('input', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('keyup', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('paste', event => setTimeout(() => checkAndReplace(event.target), 50), true);
})();