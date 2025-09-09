const loadTrees = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

// Load ALL plants by default
const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      displayPlants(data.plants);
    });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");

  // clear container first
  categoriesContainer.innerHTML = "";

  for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadlevelword('${category.id}')" class="btn flex flex-col gap-5">
        ${category.category_name}
      </button>
    `;
    categoriesContainer.append(btnDiv);
  }
};

let cart = []; // array to store cart items

// Add item to cart
const addToCart = (plant) => {
  const existingItem = cart.find(item => item.id === plant.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }
  updateCart();
};

// Remove item from cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCart();
};

// Update cart display
const updateCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center", "border-b", "pb-1");

    div.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <div class="flex gap-2 items-center">
        <span>৳${item.price * item.quantity}</span>
        <button onclick="removeFromCart(${item.id})" class="text-gray-500 font-bold">×</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.innerText = total;
};

// Display plants
const displayPlants = (plants) => {
  const diffPlants = document.getElementById("first_card");
  diffPlants.innerHTML = "";

  for (let plant of plants) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <div class="card w-80 shadow-sm">
        <figure>
          <img src="${plant.image}" alt="${plant.name}" class="h-80  md:w-full object-cover" />
        </figure>
        <div class="card-body">
          <h2 class="card-title"  onclick="loadPlantDetails(${plant.id})">${plant.name}</h2>
          <p>${plant.description}</p>
          <div class="card-actions justify-between items-center">
            <div class="badge bg-[#DCFCE7] text-green-600">${plant.category}</div>
            <div class="font-bold text-2xl">৳${plant.price}</div>
          </div>
          <button onclick='addToCart(${JSON.stringify(plant)})' class="btn bg-[#15803D] text-white rounded-3xl w-11/12">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    diffPlants.appendChild(btnDiv);
  }
};

const loadPlantDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetails(details.plants); 
};

const displayPlantDetails = (plant) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <h2 class="text-xl font-bold">${plant.name}</h2>
    <img src="${plant.image}" alt="${plant.name}" class="w-full h-60 object-cover my-3"/>
    <p>${plant.description}</p>
    <p class="font-bold text-lg">Price: ৳${plant.price}</p>
  `;
  document.getElementById("word_modal").showModal();
};









const loadlevelword = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayPlants(data.plants);
    });
};





// Load categories + all plants by default
loadTrees();
loadAllPlants();   // default load
