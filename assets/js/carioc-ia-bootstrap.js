import { mountCariocIA } from "./carioc-ia.js?v=20261010-avatar4";
const mount = () => mountCariocIA();
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
else mount();
