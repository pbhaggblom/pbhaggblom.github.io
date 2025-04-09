document.addEventListener("DOMContentLoaded", (e) => {
  fetch("https://fakestoreapi.com/products")
    .then((e) => e.json())
    .then(visaProdukter);
});

document.getElementById('cart-quantity').innerHTML = JSON.parse(localStorage.getItem('cart')).length;

function visaProdukter(produkter) {
  let indexDiven = document.getElementById("listaProdukterna");

  for (let i = 0; i < produkter.length; i++) {
    let produkten = produkter[i];

    // En produkt div
    let enskildProdukt = document.createElement("div");
    enskildProdukt.className =
      "card d-flex mb-4 p-3 col-12 col-md-5 col-xl-4 mx-auto border shadow-lg justify-content-between";

    // div till bild
    let bildDiv = document.createElement("div");
    bildDiv.className = "d-flex";

    // Namnet
    let titel = document.createElement("h3");
    titel.textContent = produkten.title;
    titel.classList.add("text-center", "mb-4", "px-2");

    // Beskrivning
    let beskrivning = document.createElement("p");
    beskrivning.textContent = produkten.description;
    beskrivning.classList.add(
      "text-muted",
      "small",
      "px-2",
      "d-md-block",
      "d-none",
      "overflow-visible",
      "beskrivning"
    );
    beskrivning.id = "beskrivning-" + i;

    //kategori
    let kategori = document.createElement("p");
    kategori.textContent = produkten.category;
    kategori.classList.add("text-decoration-underline", "px-2", "text-start");

    // Hämta och skapa bilden från "fakestoreapi"
    let bild = document.createElement("img");
    bild.src = produkten.image;
    bild.classList.add("img-fluid", "mx-3", "produktbild");
    bild.id = "bild-" + i;

    // Priset
    let pris = document.createElement("p");
    pris.textContent = produkten.price + "$";
    pris.classList.add("fw-bold", "mb-3");

    // Beställ btn
    let beställKnapp = document.createElement("button");
    beställKnapp.textContent = "Beställ";
    beställKnapp.className = "btn";

    beställKnapp.addEventListener("click", (e) => {
      addProduct(produkten);
    });

    //Bild & text
    let bild_Beskrivning = document.createElement("div");
    bild_Beskrivning.className =
      "d-flex align-items-start justify-content-center mb-2 produktinfo";

    bild_Beskrivning.appendChild(bild);
    bild_Beskrivning.appendChild(beskrivning);

    bild_Beskrivning.addEventListener("click", (e) => visaBeskrivning(i));

    //Knapp & pris
    let pris_Knapp = document.createElement("div");
    pris_Knapp.className = "d-flex flex-column mx-3";
    pris_Knapp.appendChild(pris);
    pris_Knapp.appendChild(beställKnapp);

    //Hela diven
    enskildProdukt.appendChild(kategori);
    enskildProdukt.appendChild(titel);
    enskildProdukt.appendChild(bild_Beskrivning);
    enskildProdukt.appendChild(pris_Knapp);

    indexDiven.appendChild(enskildProdukt);
  }
}

//Visar hela beskrivningen
function visaBeskrivning(i) {
  let bild = document.getElementById("bild-" + i);
  let beskrivning = document.getElementById("beskrivning-" + i);
  if (bild.style.display !== "none") {
    bild.style.display = "none";
    beskrivning.classList.remove("beskrivning");
    beskrivning.classList.remove("d-none");
  } else {
    bild.style.display = "block";
    beskrivning.classList.add("beskrivning");
    beskrivning.classList.add("d-none");    
  }
}

function addProduct(product) {
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
  }
  cart.push(product);
  document.getElementById('cart-quantity').innerHTML = cart.length;  
  localStorage.setItem('cart', JSON.stringify(cart));
}