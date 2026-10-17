import {decisions} from './decisions.js';
export const verified='2026-10-02';
export function lesson(id,title,level,topic,minutes,pre,outcomes,problem,mechanism,product,tradeoff,questions,exercise,answer,refs,quiz,extra={}) {
 return {id,title,level,topic,minutes,decision:decisions[id]||'',durationBasis:'Metin okuma (yaklaşık 180 sözcük/dk), örnek inceleme ve kısa uygulama; bireysel hız değişir.',pre,outcomes,problem,mechanism,product,tradeoff,questions,exercise,answer,refs,quiz,verified,related:extra.related||[],example:extra.example||'',misconception:extra.misconception||'',terms:extra.terms||[],caseId:extra.caseId||''};
}
