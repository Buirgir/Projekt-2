function test() {
  console.log("Image clicked!");
}
function toOtherPage(location) {
  console.log(location);
  window.location.href = location;
}
timesran = 0;



function sendProductToCart(divID){
  let div = document.getElementById(divID);
  let newProduct = {
    id: Date.now(),
    productName: divID,
    productPrice: div.querySelector("h2").innerText,
    productImage: div.querySelector("img").src
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(newProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartAmount();
}


function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((newProduct, index) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("Product")
    productDiv.innerHTML = `
    <img src="${newProduct.productImage}" />
    <div id="productStats">
      <h2>${newProduct.productName}</h2>
      <h2>${newProduct.productPrice}</h2>
      <h2 class="Button" id="Remover" onclick="deleteProduct(${newProduct.id}, this)">Ta bort produkt</h2>
    </div>
    `;



    let cartDiv= document.getElementById("CartSection");
    cartDiv.appendChild(productDiv);
  });
}

function clearCart() {
  localStorage.removeItem("cart");
}
function deleteProduct(productId, button) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(product => product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  totalPrice();
  button.parentElement.parentElement.remove();
}
function totalPrice(){
  let price = 0;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((newProduct, index) => {
      let convertedprice = parseInt(newProduct.productPrice);
      price += convertedprice
  });
  let previousPriceTotal = document.getElementById("priceTotal")
  if(previousPriceTotal !== null){
    previousPriceTotal.remove();
  }

  let priceTotal = document.createElement("h2")
  priceTotal.id = ("priceTotal")
  priceTotal.innerText = `Produkter: ${price}kr`;
  let checkoutDiv = document.getElementById("CheckoutSection");
  let subTotal = checkoutDiv.querySelector("h1");
  subTotal.insertAdjacentElement("afterend", priceTotal);
}
function updateCartAmount() {
  let previousCartNumber = document.getElementById("cartItemCounter")
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCount = cart.length.toString();
  let cartNumber = document.createElement("p")
  cartNumber.id = "cartItemCounter"
  cartNumber.innerHTML = cartCount;
  let cartIcon = document.getElementById("cartIcon")
  if(previousCartNumber !== null || cart.length < 1){
    previousCartNumber.remove();
  }
  cartIcon.insertAdjacentElement("afterend", cartNumber);
}