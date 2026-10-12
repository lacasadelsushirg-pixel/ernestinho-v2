import { mountCariocIA } from "./carioc-ia.js?v=20261012-cariocia4";
const mount = () => mountCariocIA();
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
else mount();
