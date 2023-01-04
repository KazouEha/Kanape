//récupération du parametre orderId dans l'URL et affichage dans la pastille correspondante
const url = window.location.search;
const param = new URLSearchParams(url);
const orderId = param.get("orderId");
const orderIdplace = document.getElementById("orderId");
orderIdplace.innerHTML = orderId;