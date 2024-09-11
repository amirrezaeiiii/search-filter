// http://localhost:3000/items
const searchInput = document.querySelector("#search");
const productsDom = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");

let allProductsData = [];
const filters = {
  searchItem: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      //   render products of dom
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title
      .toLowerCase()
      .trim()
      .includes(_filters.searchItem.toLowerCase().trim());
  });
  console.log(filteredProducts);
  productsDom.innerHTML = " ";

  filteredProducts.forEach((item, index) => {
    // create
    // content
    // append to .products
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = ` 
          <div class="img-container">
            <img src=${item.image} alt="p-${index}" />
          </div>
          <div class="product-desc">
            <p class="product-price">${item.price} $</p>
            <p class="product-title">${item.title}</p>
          </div> `;

    // append to DOM
    productsDom.appendChild(productsDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  //   console.log(e.target.value);
  filters.searchItem = e.target.value;
  renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    console.log(filter);
    filters.searchItem = filter;
    renderProducts(allProductsData, filters);
  });
});
