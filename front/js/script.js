getAllProducts();

const itemsContainer = document.getElementById("items");
const url = "http://localhost:3000/api/products";

//Fonction d'initialisation de la page, récupération de tous les canapés sur l'api et mise en page
function getAllProducts(url){
    
    window.fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        afficheAllCanape(data);
      }).catch(function() {
        console.log("Pas de canapé");
      });
}

// Fonction de mise en page grâce aux données récupérées sur l'API
// Rajout de l'addevent listener et requete pour passer au panier
function afficheAllCanape(data){
    console.log("afficheallcanape",data);
    console.log("id", itemsContainer);
    data.forEach(canape => {
        constructionArticleCanape(itemsContainer, canape);
    });
}
   
//// Mise en forme du dom en reprenant l'exemple d'article sur index.html
function constructionArticleCanape(itemsContainer, canape){
    console.log("itemscontainer", itemsContainer);
    console.log("canape", canape);

    var img = document.createElement("img");
    img.setAttribute("src", canape.imageUrl)
    img.setAttribute("alt", canape.altTxt)
    
    var nom = document.createElement("h3");
    nom.innerHTML = canape.name;

    var description = document.createElement("p");
    description.innerHTML = canape.description;
    
    var article = document.createElement("article");
    article.appendChild(img);
    article.appendChild(nom);
    article.appendChild(description);
    
    let lien = document.createElement("a");
    lien.dataset.idCanape = canape._id;
    lien.setAttribute("href", "http://localhost:3000/api/product?="+canape._id )
    lien.appendChild(article);

    itemsContainer.appendChild(lien);
}
