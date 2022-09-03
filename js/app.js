const loadCategory = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
  } catch (err) {
    console.log(err);
  }
};

const displayCategory = (categories) => {
  const menu_div = document.getElementById("menu-div");

  categories.forEach((category) => {
    const create_li = document.createElement("li");
    create_li.classList.add(
      "px-4",
      "font-semibold",
      "hover:bg-indigo-600",
      "hover:text-white",
      "rounded",
      "cursor-pointer"
    );
    create_li.innerHTML = `<p class ="text-center px-3 py-3" onclick = "loadCategoryData('${category.category_id}','${category.category_name}')">${category.category_name}</p>`;
    create_li.style = menu_div.appendChild(create_li);
  });
};

const loadCategoryData = async (id, idName) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id} `;
  const res = await fetch(url);
  const data = await res.json();
  displayCategoryData(data.data, idName);
};

const displayCategoryData = (allCategoryData, idName) => {
  const card_div = document.getElementById("card-div");
  card_div.innerHTML = ``;

  let card_count = document.getElementById("card-count");
  let category_name = document.getElementById("category-name");

  if (allCategoryData.length > 0) {
    card_count.innerText = allCategoryData.length;
    category_name.innerText = idName;
  } else {
    card_count.innerText = allCategoryData.length;
    category_name.innerText = idName;
  }

  allCategoryData.forEach((categoryData) => {
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
          <h4 class="font-semibold">${
            categoryData.author.name
              ? categoryData.author.name
              : "Author name not found"
          }</h4>
          <p>${
            categoryData.author.published_date
              ? categoryData.author.published_date.slice(0, 11)
              : "No Publish Date Found"
          }</p>
        </div>
      </div>
      <div class="mb-5">
        <h3><i class="fa-regular fa-eye"></i> <span class="font-bold">${
          categoryData.total_view ? categoryData.total_view : 0
        }</span></h3>
      </div>
      <div class="card-actions justify-end">
        <label for="my-modal-3"
          class="btn modal-button bg-indigo-600 text-white border-0 hover:bg-indigo-600" onclick ="modalDetails('${
            categoryData._id
          }')"
        >
          Show Details
        </label>
      </div>
    </div>
  </div>`;
    card_div.appendChild(create_div);
    // console.log(categoryData._id);
  });
  spinner(false);
};

const spinner = (isLoading) => {
  const loader = document.getElementById("spinner");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

const modalDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  const details = data.data[0];
  console.log(details);

  const modal_image = document.getElementById("modal-image");
  modal_image.src = details.image_url;

  const modal_title = document.getElementById("modal-title");
  modal_title.innerText = details.title;

  const modal_details = document.getElementById("modal-details");
  modal_details.innerText = details.details;

  const author_img = document.getElementById("author-img");
  author_img.src = details.author.img;

  const author_name = document.getElementById("author-name");
  author_name.innerText = details.author.name
    ? details.author.name
    : "Author name not found";

  const published_date = document.getElementById("published-date");
  published_date.innerText = details.author.published_date
    ? details.author.published_date.slice(0, 11)
    : "No Publish Date Found";

  const total_view = document.getElementById("total-view");
  total_view.innerText = details.total_view ? details.total_view : 0;
};

loadCategory();
loadCategoryData("01", "Breaking News");
