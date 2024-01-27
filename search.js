const accessKey = "Hx1NnOKEyWodt_rBYiDMzHDJozdE9uE3siGR7oAd7oY";

const form1 = document.querySelector('form');
const user = document.getElementById("search-input");
const photo = document.querySelector(".results");
const show = document.getElementById("showmore");

let inputData = "";
let page = 1;

async function search() {
  inputData = user.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  if (page === 1) {
    photo.innerHTML = "";
  }
  results.map((result) => {
    const container = document.createElement('div');
    container.classList.add("single");

    const imagee = document.createElement('img');
    imagee.src = result.urls.small;
    imagee.alt = result.alt_description;

    const link = document.createElement("a");
    link.href = result.links.html;
    link.target = "_blank";
    link.textContent = result.alt_description;

    container.appendChild(imagee);
    container.appendChild(link);
    photo.appendChild(container);
  });

  page++;
  if (page > 1) {
    show.style.display = "block";
  }
}

form1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  search();
});

show.addEventListener("click", () => {
  search();
});
