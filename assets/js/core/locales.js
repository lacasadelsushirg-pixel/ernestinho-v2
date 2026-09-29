import { LOCALES, TRANSLATION_STATUS } from "./model.js";
export const DEFAULT_LOCALE="es";
export const EDITORIAL_FALLBACK_LOCALE="es";
export function normalizeLocale(value){const v=String(value||"").toLowerCase();if(v==="pt"||v==="pt-br")return "pt-BR";if(v==="en"||v.startsWith("en-"))return "en";return "es";}
export function localeRecord(entityId,locale,input={}){const l=normalizeLocale(locale);const translationStatus=input.translationStatus||"missing";if(!TRANSLATION_STATUS.includes(translationStatus))throw new TypeError("Invalid translationStatus");return Object.freeze({entityId,locale:l,title:"",shortTitle:"",summary:"",history:"",myTake:"",whyGo:"",beforeYouGo:"",practicalNotes:"",accessibilityNotes:"",safetyNotes:"",faq:Object.freeze([]),seoTitle:"",seoDescription:"",imageAlt:Object.freeze([]),updatedAt:null,...input,translationStatus});}
export function contentForProduction(store,entityId,locale){const l=normalizeLocale(locale);return store?.[l]?.[entityId]||null;}
export function contentForEditorial(store,entityId,locale){return contentForProduction(store,entityId,locale)||store?.[EDITORIAL_FALLBACK_LOCALE]?.[entityId]||null;}
export {LOCALES};