const productSlideshow = document.querySelector(
  ".product-slideshow .carousel-inner"
);
const productSorted = document.querySelector(".product-sorted");

document.addEventListener("DOMContentLoaded", getFeaturedProducts);
document.addEventListener("DOMContentLoaded", sortedProducts);

let products;
products = [
  {
    name: "Product 1",
    date: adjustTime("2021-05-12T23:35:45.059Z"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper vitae eros quis vulputate. Sed dapibus ut sapien vitae mollis.",
    image: "https://source.unsplash.com/random/300x300",
    checkbox: false,
  },
  {
    name: "Product 2",
    date: adjustTime("2021-05-12T23:45:45.059Z"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper vitae eros quis vulputate. Sed dapibus ut sapien vitae mollis.",
    image: "https://source.unsplash.com/random/400x300",
    checkbox: true,
  },
  {
    name: "Product 3",
    date: adjustTime("2021-05-12T23:55:45.059Z"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper vitae eros quis vulputate. Sed dapibus ut sapien vitae mollis.",
    image: "https://source.unsplash.com/random/400x400",
    checkbox: true,
  },
];
function getFeaturedProducts() {
  if (localStorage.getItem("product") === null) {
    localStorage.setItem("product", JSON.stringify(products));
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  const featuredProducts = products.filter((product) => {
    return product.checkbox === true;
  });

  featuredProducts.forEach((product) => {
    const newProductDiv = document.createElement("div");
    newProductDiv.classList.add("item");
    newProductDiv.innerHTML = ` 
    <img
      src="${product.image}"
      alt="Product Image"
      width="500"
      height="500"
    />
              `;
    productSlideshow.appendChild(newProductDiv);
  });
  productSlideshow.children[0].classList.add("active");
  localStorage.setItem("product", JSON.stringify(products));
}

function sortedProducts() {
  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  const sortedProducts = products.sort((a, b) => {
    return a.date - b.date;
  });

  sortedProducts.forEach((product) => {
    const newProductDiv = document.createElement("div");
    newProductDiv.classList.add("product");
    newProductDiv.setAttribute("data-id", `${product.date}`);
    newProductDiv.innerHTML = `    
          <img src="${product.image}" alt="Product Image">
          <h4>${product.name}</h4>
          <span>${product.date}</span>
          <p>${product.description}</p>
    `;
    productSorted.appendChild(newProductDiv);
  });
  localStorage.setItem("product", JSON.stringify(products));
}

function adjustTime(time) {
  return moment(time).calendar();
}
