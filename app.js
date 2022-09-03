const loadCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategory(data.data.news_category);
};

const displayCategory = (categories) => {
  const menu_div = document.getElementById("menu-div");

  categories.forEach((category) => {
    console.log(category);
    const create_li = document.createElement("li");
    create_li.classList.add(
      "px-4",
      "font-semibold",
      "hover:bg-indigo-600",
      "hover:text-white",
      "rounded",
      "cursor-pointer"
    );
    create_li.innerHTML = `<p class ="text-center px-3 py-3" onclick = "loadCategoryData('${category.category_id}')">${category.category_name}</p>`;
    menu_div.appendChild(create_li);
  });
};

const loadCategoryData = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id} `;
  const res = await fetch(url);
  const data = await res.json();
  displayCategoryData(data.data);
};

const displayCategoryData = (allCategoryData) => {
  const card_div = document.getElementById("card-div");
  card_div.innerHTML = ``;

  allCategoryData.forEach((categoryData) => {
    // console.log(categoryData);
    const create_div = document.createElement("div");
    create_div.classList.add(
      "card",
      "card-side",
      "shadow-xl",
      "w-11/12",
      "lg:w-10/12",
      "flex",
      "flex-col",
      "lg:flex-row",
      "mx-auto",
      "my-10"
    );
    create_div.style.backgroundColor = "white";
    create_div.innerHTML = `
    <img
    style="border-radius: 2rem"
    class="p-5"
    src="${categoryData.thumbnail_url}"
    alt="Movie"
  />
  <div class="card-body">
    <h2 class="font-bold text-2xl md:text-3xl">${categoryData.title}</h2>
    <p style = "overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    max-height: 100px;" 
    class="text-gray-600">
      ${categoryData.details}
    </p>

    <div class="flex flex-col lg:flex-row w-full justify-between items-center mt-5">
      <div class="flex mb-5">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img src="${categoryData.author.img}" />
          </div>
        </div>
        <div class="pl-4">
          <h4 class="font-semibold">${categoryData.author.name}</h4>
          <p>${categoryData.author.published_date.slice(0,11)}</p>
        </div>
      </div>
      <div class="mb-5">
        <h3><i class="fa-regular fa-eye"></i> <span class="font-bold">${
          categoryData.total_view
        }</span></h3>
      </div>
      <div class="card-actions justify-end">
        <button
          class="btn bg-indigo-600 text-white border-0 hover:bg-indigo-600"
        >
          Show Details
        </button>
      </div>
    </div>
  </div>`;
    card_div.appendChild(create_div);
  });
};

loadCategory();
loadCategoryData('01')