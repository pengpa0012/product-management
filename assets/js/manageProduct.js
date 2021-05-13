const submitBtn = document.querySelector("[data-submit]");
const productName = document.querySelector("[data-name]");
const description = document.querySelector("[data-description]");
const img = document.querySelector("[data-img]");
const checkbox = document.querySelector("[data-checkbox]");

const productWrapper = document.querySelector(".product-wrapper");

const addProductBtn = document.querySelector("[data-add]");
const updateProductBtn = document.querySelector("[data-update]");
const popUp = document.querySelector(".pop-up");
const editPopUp = document.querySelector(".edit-pop-up");
const closePopUp = document.querySelectorAll("[data-close]");

const overlay = document.querySelector(".overlay");

addProductBtn.addEventListener("click", () => {
  popUp.classList.add("active");
  overlay.classList.add("active");
});

closePopUp.forEach((popup) => {
  popup.addEventListener("click", () => {
    const parentForm = popup.closest(".form").parentNode;
    parentForm.classList.remove("active");
    overlay.classList.remove("active");
  });
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  popUp.classList.remove("active");
  editPopUp.classList.remove("active");
});

const productArray = [];
productWrapper.addEventListener("click", deleteProduct);
document.addEventListener("DOMContentLoaded", getLocalStorage);

submitBtn.addEventListener("click", submitProduct);
productWrapper.addEventListener("click", editProduct);

function submitProduct(e) {
  if (productName.value == "" || description.value == "" || img.value == "") {
    alert("Fill up all the inputs");
    return;
  }

  if (!validURL(img.value)) {
    alert("Put a valid URL");
    return;
  }

  overlay.classList.remove("active");
  // init new product
  let newProduct = {
    name: productName.value,
    date: adjustTime(new Date()),
    description: description.value,
    image: img.value,
    checkbox: checkbox.checked,
  };
  // load products on local storage
  const newProductDiv = document.createElement("div");
  newProductDiv.classList.add("product");
  newProductDiv.setAttribute("data-id", `${newProduct.date}`);
  newProductDiv.innerHTML = `
      <img src="${newProduct.image}" alt="Product Image">
      <h4>${newProduct.name}</h4>
      <span>${newProduct.date}</span>
      <p>${newProduct.description}</p>
      <div class="buttons">
          <button data-edit class="add">Edit</button>
          <button data-delete class="delete">Delete</button>
      </div>
        
    `;
  productWrapper.prepend(newProductDiv);

  saveToLocalStorage(newProduct);
  // reset form
  productName.value = "";
  description.value = "";
  img.value = "";
  checkbox.checked = false;

  // close pop up
  popUp.classList.remove("active");
}

function saveToLocalStorage(product) {
  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }

  products.push(product);
  localStorage.setItem("product", JSON.stringify(products));
}

function deleteProduct(e) {
  if (
    e.target.outerHTML !==
    '<button data-delete="" class="delete">Delete</button>'
  )
    return;
  const productDiv = e.target.closest(".product");
  productDiv.classList.add("active");
  deleteLocalStorage(productDiv);
}

function updateProduct(selectedProduct, selectedId, parent, getSelectedDate) {
  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }

  getUpdatedProduct(selectedProduct, selectedId, parent, getSelectedDate);

  // reset form
  productName.value = "";
  description.value = "";
  img.value = "";
  checkbox.checked = false;

  // close pop up
  popUp.classList.remove("active");
}

function getUpdatedProduct(
  productSelected,
  selectedId,
  parent,
  getSelectedDate
) {
  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }

  updateProductBtn.addEventListener("click", () => {
    // init updated product
    let updatedProduct = {
      id: selectedId,
      name: editPopUp.children[0].children[0].children[1].value,
      date: getSelectedDate.date,
      description: editPopUp.children[0].children[1].children[1].value,
      image: editPopUp.children[0].children[2].children[1].value,
      checkbox: editPopUp.children[0].children[3].children[1].checked,
    };
    if (
      updatedProduct.name == "" ||
      updatedProduct.description == "" ||
      updatedProduct.image == ""
    ) {
      alert("Fill up all the inputs");
      return;
    }

    // setting the updated value on initial value
    productSelected[0].name = updatedProduct.name;
    productSelected[0].date = updatedProduct.date;
    productSelected[0].description = updatedProduct.description;
    productSelected[0].image = updatedProduct.image;
    productSelected[0].checkbox = updatedProduct.checkbox;

    // change content on UI
    parent.children[0].attributes[0].value = productSelected[0].image;
    parent.children[1].textContent = productSelected[0].name;
    parent.children[2].textContent = productSelected[0].description;
    parent.children[3].textContent = productSelected[0].date;
    // saving on local storage
    const productIndex = products.filter((product) => {
      return product.date == selectedId;
    });

    /* products.splice(
      products.indexOf(productIndex[0]),
      1,
      JSON.stringify(updatedProduct)
    ); */

    // replace the value of selected object

    products[products.indexOf(productIndex[0])] = updatedProduct;
    localStorage.setItem("product", JSON.stringify(products));
    editPopUp.classList.remove("active");
  });
}

function getLocalStorage() {
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

  if (localStorage.getItem("product") === null) {
    localStorage.setItem("product", JSON.stringify(products));
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }

  products.forEach((product) => {
    const newProductDiv = document.createElement("div");
    newProductDiv.classList.add("product");
    newProductDiv.setAttribute("data-id", `${product.date}`);
    newProductDiv.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <h4>${product.name}</h4>
      <span>${product.date}</span>
      <p>${product.description}</p>
      <div class="buttons">
          <button data-edit class="add">Edit</button>
          <button data-delete class="delete">Delete</button>
      </div>
    `;
    productWrapper.prepend(newProductDiv);
  });
}

function deleteLocalStorage(product) {
  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  let selectedProduct = product.attributes[1].value;
  const productIndex = products.filter((product) => {
    return product.date == selectedProduct;
  });

  products.splice(products.indexOf(productIndex[0]), 1);
  localStorage.setItem("product", JSON.stringify(products));
}

function editProduct(e) {
  if (e.target.outerHTML !== '<button data-edit="" class="add">Edit</button>')
    return;
  editPopUp.classList.add("active");
  overlay.classList.add("active");

  const parent = e.target.closest(".product");

  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  const selectedId = e.target.closest("[data-id]").attributes[1].value;

  const selectedProduct = products.filter((product) => {
    return product.date == selectedId;
  });

  const productIndex = products.filter((product) => {
    return product.date == selectedProduct[0].date;
  });

  const getSelectedDate = products[products.indexOf(productIndex[0])];
  // embbed the info based on local storage

  editPopUp.children[0].children[0].children[1].value = selectedProduct[0].name;
  editPopUp.children[0].children[1].children[1].value =
    selectedProduct[0].description;
  editPopUp.children[0].children[2].children[1].value =
    selectedProduct[0].image;
  editPopUp.children[0].children[3].children[1].checked =
    selectedProduct[0].checkbox;

  updateProduct(selectedProduct, selectedId, parent, getSelectedDate);
}

// checked if the URL is valid
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// format Date
function adjustTime(time) {
  return moment(time).calendar();
}
