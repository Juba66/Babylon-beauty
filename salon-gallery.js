
// salon-gallery.js

const galleryData = {
  glamour: [
    "https://source.unsplash.com/featured/?beauty,salon1",
    "https://source.unsplash.com/featured/?hair,salon2",
    "https://source.unsplash.com/featured/?makeup,salon3"
  ],
  elegance: [
    "https://source.unsplash.com/featured/?nails,salon4",
    "https://source.unsplash.com/featured/?spa,salon5",
    "https://source.unsplash.com/featured/?haircut,salon6"
  ],
  stylezone: [
    "https://source.unsplash.com/featured/?hairdresser,salon7",
    "https://source.unsplash.com/featured/?skincare,salon8",
    "https://source.unsplash.com/featured/?beautysalon,salon9"
  ]
};

const select = document.getElementById("salon");
const gallery = document.getElementById("gallery");

function displayImages(salon) {
  gallery.innerHTML = "";
  galleryData[salon].forEach(url => {
    const img = document.createElement("img");
    img.src = url + "&" + Math.random(); // force reload
    gallery.appendChild(img);
  });
}

select.addEventListener("change", () => {
  displayImages(select.value);
});

displayImages(select.value); // Initial load
