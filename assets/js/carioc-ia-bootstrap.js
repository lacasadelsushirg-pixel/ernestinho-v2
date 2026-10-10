import { mountCariocIA } from "./carioc-ia.js";
const mount = () => mountCariocIA();
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
else mount();
