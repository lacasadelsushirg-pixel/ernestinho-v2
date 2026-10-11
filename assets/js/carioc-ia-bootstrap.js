import { mountCariocIA } from "./carioc-ia.js?v=20261011-everyday1";
const mount = () => mountCariocIA();
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
else mount();
