const itemsContainer = document.getElementById("items");
const url = "http://localhost:3000/api/products";
const cart = window.localStorage.getItem("cart");
getDatas(url, showAllCanape);


/**
 * 
 * @param {*} url 
 * @param {*} fonction 
 * @returns 
 */
async function getDatas(url, callback){
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  }
  catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * Initialisation for the article construction
 * 
 * @param {*} data 
 */
function showAllCanape(data){
    data.forEach(canape => {
        constructArticleCanape(itemsContainer, canape);
    });
}
   
/**
 * Build articles for all the canapes
 * @param {*} itemsContainer 
 * @param {*} canape 
 */
function constructArticleCanape(itemsContainer, canape){

    var img = document.createElement("img");
    img.setAttribute("src", canape.imageUrl)
    img.setAttribute("alt", canape.altTxt)
    
    var name = document.createElement("h3");
    name.innerHTML = canape.name;

    var description = document.createElement("p");
    description.innerHTML = canape.description;
    
    var article = document.createElement("article");
    article.appendChild(img);
    article.appendChild(name);
    article.appendChild(description);
    
    let link = document.createElement("a");
    link.dataset.idCanape = canape._id;
    link.setAttribute("href", "product.html?id="+canape._id)
    link.appendChild(article);

    itemsContainer.appendChild(link);
}
