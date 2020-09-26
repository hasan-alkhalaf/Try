let carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Grey T-shirt",
    tag: "greytshirt",
    price: 15,
    inCart: 0,
  },
  {
    name: "Brown T-shirt",
    tag: "browntshirt",
    price: 20,
    inCart: 0,
  },
  {
    name: "Black T-shirt",
    tag: "blacktshirt",
    price: 25,
    inCart: 0,
  },
  {
    name: "Blue T-shirt",
    tag: "bluetshirt",
    price: 30,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]); /**Accessing into product */
    toltalCost(products[i]);
  });
}

function onPageLoad() {
  let productNumbers = localStorage.getItem("numbersCarts");
  if (productNumbers) {
    document.querySelector("li span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("numbersCarts");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("numbersCarts", productNumbers + 1);
    document.querySelector("li span").textContent =
      productNumbers + 1; /**Sendimg to span content */
    /**أول مرة سيدخل هنا */
  } else {
    localStorage.setItem("numbersCarts", 1);
    document.querySelector("li span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    /**First time here will enter */
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function toltalCost(product) {
  let cost = localStorage.getItem("totalCost");
  if (cost != null) {
    cost = parseInt(cost);
    localStorage.setItem("totalCost", cost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}
onPageLoad();
