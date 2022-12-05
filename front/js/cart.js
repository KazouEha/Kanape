var cart = window.localStorage.getItem("cart");
if(cart === null){
    console.log("encore null");
}else{
    // cart = JSON.parse(cart);
    console.log(cart);
}