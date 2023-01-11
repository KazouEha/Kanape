//get parameter orderId in URL to get order confirmation from API
const url = window.location.search;
const param = new URLSearchParams(url);
const orderId = param.get("orderId");
const orderIdplace = document.getElementById("orderId");
orderIdplace.innerHTML = orderId;