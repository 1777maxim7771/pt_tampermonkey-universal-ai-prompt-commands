// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands PT
// @namespace    local.tampermonkey.universal.ai.prompt.commands.pt
// @version      1.1.0
// @description  Versão portuguesa: substitui os acionadores universais Q1-Q10 por prompts de IA prontos para chats de IA
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){'use strict';
/* Objetivo: acelerar o trabalho com ChatGPT, Gemini, Claude, Copilot e outros chats de IA. Q1-Q10 são acionadores universais e podem ser alterados para palavras ou frases próprias. */
const COMMANDS={
'Q1':`Traduza o texto fornecido completa e exatamente para português.
Preserve o significado, a ordem das informações, nomes, datas, valores, números de documentos, nomes de organizações e formulações importantes.
Não adicione conclusões próprias, não encurte o texto e não altere o conteúdo.`,
'Q2':`Resuma o texto fornecido em português de acordo com seu significado e contexto.
Explique sobre o que é o texto, quem escreve para quem, qual é o assunto principal e quais requisitos, pedidos, decisões, datas, prazos, valores ou detalhes importantes são mencionados.`,
'Q3':`Faça um resumo temático curto da carta em português, estritamente em uma única linha.
Indique o remetente, o assunto, o que é comunicado ou solicitado e quais datas, prazos, valores, documentos ou ações são importantes.`,
'Q4':`Traduza o texto fornecido para alemão simples e compreensível, nível A2-B1.
O texto deve ser educado, oficial e gramaticalmente correto.
Preserve o significado original, datas, nomes, valores, endereços, organizações e detalhes importantes.`,
'Q5':`Corrija o texto em português fornecido.
Torne-o gramaticalmente correto, claro e lógico, mantendo o significado original.
Remova erros, repetições, formulações inadequadas e partes demasiado informais.
Não adicione fatos que não estejam no texto original.`,
'Q6':`Escreva uma resposta curta, educada e oficial a esta carta em português.
A resposta deve ser clara e direta, sem frases desnecessárias.
Se for necessário confirmar recebimento, esclarecer documentos, pedir explicação ou comunicar informação, formule corretamente.`,
'Q7':`Explique em português, com palavras simples, o que este texto significa.
Analise o contexto: quem escreve, sobre qual assunto, o que é solicitado, o que deve ser feito e quais prazos, datas, valores, documentos ou condições são importantes.`,
'Q8':`Extraia todos os fatos importantes do texto fornecido e organize-os em português.
Indique separadamente: pessoas, organizações, endereços, datas, prazos, valores, números de documentos, requisitos, decisões, obrigações, documentos mencionados e próximos passos.
Não invente informações. Se algo estiver ausente, escreva: não indicado.`,
'Q9':`Crie em português uma lista clara das ações que devem ser realizadas com base neste texto.
Determine o que fazer, quais documentos preparar, a quem responder, onde entrar em contato, quais prazos respeitar e a que prestar atenção.
Divida as ações por prioridade: urgente, importante, pode ser feito depois.`,
'Q10':`Redija uma carta oficial educada em alemão com base no texto fornecido.
A carta deve ser simples, clara e correta, nível A2-B1.
Preserve todos os fatos importantes: nomes, datas, valores, endereços, organizações, números de documentos e circunstâncias.
Termine com: Mit freundlichen Grüßen`};
const S=['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
function ie(e){if(!e||!e.matches)return false;if(e.disabled||e.readOnly)return false;const t=e.tagName?e.tagName.toLowerCase():'';const y=(e.getAttribute('type')||'').toLowerCase();if(t==='input'&&!['text','search'].includes(y))return false;return S.some(s=>e.matches(s));}
function fe(t){if(!t)return null;if(ie(t))return t;if(t.closest){const e=t.closest(S.join(','));if(ie(e))return e;}return null;}
function gt(e){const t=e.tagName?e.tagName.toLowerCase():'';return(t==='textarea'||t==='input')?(e.value||''):(e.innerText||e.textContent||'');}
function nc(x){return String(x||'').trim().replace(/\s+/g,'').toUpperCase();}
function end(e){e.focus();const t=e.tagName?e.tagName.toLowerCase():'';if(t==='textarea'||t==='input'){const l=e.value.length;e.setSelectionRange(l,l);return;}const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);r.collapse(false);s.removeAllRanges();s.addRange(r);}
function ev(e,text){try{e.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text}));}catch(_){e.dispatchEvent(new Event('input',{bubbles:true}));}e.dispatchEvent(new Event('change',{bubbles:true}));}
function rt(e,text){const t=e.tagName?e.tagName.toLowerCase():'';e.focus();if(t==='textarea'||t==='input'){e.value=text;end(e);ev(e,text);return;}try{const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);document.execCommand('insertText',false,text);}catch(_){e.textContent=text;}end(e);ev(e,text);}
function note(m){const o=document.getElementById('tampermonkey-universal-ai-prompt-commands-notification');if(o)o.remove();const b=document.createElement('div');b.id='tampermonkey-universal-ai-prompt-commands-notification';b.textContent=m;b.style.cssText='position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35)';document.body.appendChild(b);setTimeout(()=>b.remove(),2200);}
function cr(t){const e=fe(t);if(!e)return;const c=nc(gt(e));if(!Object.prototype.hasOwnProperty.call(COMMANDS,c))return;rt(e,COMMANDS[c]);note(`Acionador ${c} substituído por um prompt de IA pronto`);}
document.addEventListener('input',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('keyup',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('paste',e=>setTimeout(()=>cr(e.target),50),true);
})();