let product;
let data;

// fetching the data
document.addEventListener(
  "DOMContentLoaded",
  async () => {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
    );
    product = await response.json();

    data = {
      title: product.product.title,
      color: "Yellow",
      size: "Small",
      count: 1,
    };

    if (product) {
      document.querySelector(".loader-container").style.display = "none";
      document.querySelector(".product-preview").style.display = "grid";

      document.querySelector(".product-header p").textContent =
        product.product.vendor;
      document.querySelector(".product-header h2").textContent =
        product.product.title;

      document.querySelector(".price h1 span:nth-child(1)").textContent =
        product.product.price;
      document.querySelector(
        ".price h1 span:nth-child(2)"
      ).textContent = `${Math.trunc(
        ((Number(product.product.compare_at_price.replace(/[^0-9\.-]+/g, "")) -
          Number(product.product.price.replace(/[^0-9\.-]+/g, ""))) /
          Number(product.product.compare_at_price.replace(/[^0-9\.-]+/g, ""))) *
          100
      )}% off`;
      document.querySelector(".price p").textContent =
        product.product.compare_at_price;

      function createCheckbox(item) {
        const label = document.createElement("label");
        label.className = "container-checkbox";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "color";
        input.className = item[Object.keys(item)[0]];
        input.value = Object.keys(item)[0];

        const span = document.createElement("span");
        span.style.backgroundColor = item[Object.keys(item)[0]];
        span.className = "checkmark";

        label.appendChild(input);
        label.appendChild(span);

        const contentDiv = document.querySelector(".color-selector");
        contentDiv.appendChild(label);
      }

      product.product.options[0].values.map((item) => {
        createCheckbox(item);
      });

      document.querySelector(
        ".color-selector label:nth-child(1) input"
      ).checked = true;
      document.querySelector(
        ".color-selector .container-checkbox:nth-child(1)"
      ).style.border = "2px solid #ecdecc";

      function createRadioElement(name) {
        const div = document.createElement("div");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "size";
        input.id = name;
        input.value = name;

        const label = document.createElement("label");
        label.htmlFor = name;
        label.textContent = name;

        div.appendChild(input);
        div.appendChild(label);

        const container = document.querySelector(".size-selector");
        container.appendChild(div);
      }

      product.product.options[1].values.map((item) => {
        createRadioElement(item);
      });

      document.querySelector(
        ".size-selector div:nth-child(1) input"
      ).checked = true;
      document.querySelector(
        ".size-selector div:nth-child(1)"
      ).style.backgroundColor = "#e1e7fd";

      const desc = document.createElement("p");
      desc.innerHTML = product.product.description;
      desc.classList.add("description");

      document.querySelector(".detail-section").appendChild(desc);

      document.querySelectorAll(".color-selector label").forEach((item) => {
        item.addEventListener("click", (e) => {
          item.style.border = `2px solid ${
            item.querySelector("input").className
          }`;
          data.color = item.querySelector("input").value;

          document.querySelectorAll(".color-selector label").forEach((x) => {
            if (!x.querySelector("input").checked) {
              x.style.border = "2px solid transparent";
            }
          });
        });
      });

      document.querySelectorAll(".size-selector div").forEach((item) => {
        item.addEventListener("click", (e) => {
          item.style.backgroundColor = "#e1e7fd";
          data.size = item.querySelector("input").value;

          document.querySelectorAll(".size-selector div").forEach((x) => {
            if (!x.querySelector("input").checked) {
              x.style.backgroundColor = "#e8e6e6";
            }
          });
        });
      });

      document.querySelector(".button-section p").textContent = data.count;
    }
  },
  false
);

const addToCart = () => {
  document.querySelector(
    ".confirm-sec"
  ).textContent = `${data.title} with Color ${data.color} and Size ${data.size} added to cart`;
  document.querySelector(".confirm-sec").style.display = "block";
};

const incrementCount = () => {
  data.count += 1;
  document.querySelector(".button-section p").textContent = data.count;
};

const decrementCount = () => {
  if (data.count != 1) data.count -= 1;
  document.querySelector(".button-section p").textContent = data.count;
};

document
  .querySelector(".image-selector img:nth-child(1)")
  .classList.add("border-grad");

document.querySelectorAll(".image-selector img").forEach((item) => {
  item.addEventListener("click", (e) => {
    document
      .querySelector(".image-section .main-img")
      .setAttribute("src", item.getAttribute("src"));
    item.classList.add("border-grad");

    document.querySelectorAll(".image-selector img").forEach((x) => {
      if (x !== item) {
        x.classList.remove("border-grad");
      }
    });
  });
});
