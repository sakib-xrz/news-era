const loadCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategory(data.data.news_category);
};

const displayCategory = (categories) => {
  const menu_div = document.getElementById("menu-div");

  categories.forEach((category) => {
    // console.log(category);
    const create_li = document.createElement("li");
    create_li.classList.add('px-4', 'font-semibold')
    create_li.innerHTML = `<p onclick = "loadCategoryData('${category.category_id}')">${category.category_name}</p>`;
    menu_div.appendChild(create_li);
  });
};

const loadCategoryData = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id} `
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}

loadCategory();
