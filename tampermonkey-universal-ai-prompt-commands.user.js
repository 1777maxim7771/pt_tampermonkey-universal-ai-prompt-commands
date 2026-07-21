// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands PT
// @namespace    local.tampermonkey.universal.ai.prompt.commands.pt
// @version      1.0.0
// @description  Script Tampermonkey para substituir comandos curtos por prompts de IA prontos em chats de inteligência artificial.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Localized commands: replacement occurs only for an exact command.
    const COMMANDS = {
        'PT1': `Traduza integralmente e com precisão o texto fornecido para português. Preserve sentido, ordem, nomes, datas, valores, documentos, organizações e formulações importantes. Não acrescente conclusões, não resuma nem altere o conteúdo.`,

        'PT2': `Resuma o texto fornecido em português conforme o sentido e o contexto. Explique o assunto, os interlocutores e o conteúdo principal. Indique separadamente pedidos, decisões, datas, prazos, valores e detalhes importantes. Use linguagem simples e concisa.`,

        'PT3': `Crie em português um resumo temático curto da carta estritamente em uma linha. Indique remetente, assunto, o que é comunicado ou solicitado e datas, prazos, valores, documentos ou ações importantes.`,

        'PT4': `Traduza o texto fornecido para alemão simples e claro, nível A2-B1. Torne-o educado, formal e gramaticalmente correto. Preserve sentido, datas, nomes, valores, endereços, organizações e detalhes. Evite formulações alemãs complexas.`,

        'PT5': `Corrija o texto fornecido em português. Torne-o correto, claro e lógico, preservando o sentido original. Remova erros, repetições e formulações inadequadas. Se for uma carta, use tom educado e formal. Não acrescente fatos.`,

        'PT6': `Escreva uma resposta curta, educada e formal a esta carta em alemão simples, nível A2-B1. Responda objetivamente e formule corretamente confirmações e pedidos de documentos ou esclarecimentos. Termine com: Mit freundlichen Grüßen`,

        'PT7': `Explique em português simples o significado deste texto. Indique quem escreve, o assunto, o que se pretende, o que deve ser feito e prazos, datas, valores, documentos ou condições importantes. Diga se há exigência, aviso, pedido, decisão ou informação.`,

        'PT8': `Extraia todos os fatos importantes e organize-os em português: pessoas, organizações, endereços, datas, prazos, valores, documentos, requisitos, decisões, obrigações e próximos passos. Não invente dados; escreva «não indicado» quando faltar informação.`,

        'PT9': `Crie em português uma lista clara de ações necessárias com base no texto. Indique documentos, destinatários, contatos, prazos e pontos de atenção. Classifique: urgente, importante, pode esperar. Liste as questões a esclarecer.`,

        'PT10': `Redija com base no texto uma carta oficial, educada e clara em alemão, nível A2-B1. Preserve todos os fatos importantes. Estrutura: saudação, situação, pedido ou mensagem principal, eventual pedido de confirmação ou esclarecimento e encerramento. Termine com: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
    function isEditableElement(element) {
        if (!element || !element.matches || element.disabled || element.readOnly) return false;
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const inputType = (element.getAttribute('type') || '').toLowerCase();
        if (tagName === 'input' && !['text','search'].includes(inputType)) return false;
        return EDITABLE_SELECTORS.some(selector => element.matches(selector));
    }
    function findEditableElement(target) {
        if (!target) return null;
        if (isEditableElement(target)) return target;
        const element = target.closest ? target.closest(EDITABLE_SELECTORS.join(',')) : null;
        return isEditableElement(element) ? element : null;
    }
    function getText(element) {
        const tagName = element?.tagName?.toLowerCase() || '';
        return tagName === 'textarea' || tagName === 'input' ? (element.value || '') : (element?.innerText || element?.textContent || '');
    }
    function normalizeCommand(text) { return text.trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element,text) {
        try { element.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text})); }
        catch (_) { element.dispatchEvent(new Event('input',{bubbles:true})); }
        element.dispatchEvent(new Event('change',{bubbles:true}));
    }
    function replaceText(element,newText) {
        const tagName=element.tagName?.toLowerCase() || ''; element.focus();
        if (tagName==='textarea' || tagName==='input') { element.value=newText; element.setSelectionRange(newText.length,newText.length); dispatchInputEvents(element,newText); return; }
        try { const range=document.createRange(), selection=window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText',false,newText); }
        catch (_) { element.textContent=newText; }
        dispatchInputEvents(element,newText);
    }
    function showNotification(message) {
        document.getElementById('tampermonkey-universal-ai-prompt-commands-notification')?.remove();
        const box=document.createElement('div'); box.id='tampermonkey-universal-ai-prompt-commands-notification'; box.textContent=message;
        Object.assign(box.style,{position:'fixed',right:'20px',bottom:'20px',zIndex:'999999',background:'#111',color:'#fff',padding:'12px 18px',borderRadius:'10px',fontSize:'14px',fontFamily:'Arial, sans-serif',boxShadow:'0 4px 12px rgba(0,0,0,.35)',maxWidth:'420px',lineHeight:'1.4'});
        document.body.appendChild(box); setTimeout(()=>box.remove(),2200);
    }
    function checkAndReplace(target) {
        const editable=findEditableElement(target); if (!editable) return;
        const command=normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS,command)) return;
        replaceText(editable,COMMANDS[command]); showNotification("O comando {cmd} foi substituído por um prompt pronto".replace('{cmd}',command));
    }
    document.addEventListener('input',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('keyup',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('paste',event=>setTimeout(()=>checkAndReplace(event.target),50),true);
})();
