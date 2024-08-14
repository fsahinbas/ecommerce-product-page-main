const mainImage = document.querySelector(".main-image");
const thumbnailContainer = document.querySelector(".thumbnails");
const thumbnails = document.querySelectorAll(".thumbnail");
const title = document.querySelector(".title");
const currency = document.querySelector(".currency");
const amount = document.querySelector(".amount");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const del = document.querySelector(".delete");
const counter = document.querySelector(".counter");
const addToCart = document.querySelector(".add-to-cart");
const avatar = document.querySelector(".avatar");
const cartIcon = document.querySelector(".cart");
const cartModal = document.querySelector(".cart-modal");
const cartBody = document.querySelector(".cart-body");
const badge = document.querySelector(".badge");
const lihghtbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCloseBtn = document.querySelector(".lightbox > .close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const lightboxNextBtn = document.querySelector(".lightbox .next");
const lightboxPrevBtn = document.querySelector(".lightbox .prev");
const menuIcon = document.querySelector(".menu-icon");
const menuCloseBtn = document.querySelector(".mobile-menu .close");
const mobileMenu = document.querySelector(".mobile-menu");

thumbnailContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("thumbnail")) {
    mainImage.src = e.target.src;
    removeActiveClass();
    e.target.classList.add("active");
  }
});

const removeActiveClass = () => {
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });
};

plus.addEventListener("click", () => {
  counter.innerText = parseInt(counter.innerText) + 1;
});

minus.addEventListener("click", () => {
  if (parseInt(counter.innerText) > 0)
    counter.innerText = parseInt(counter.innerText) - 1;
});

const openCartModal = () => {
  cartModal.classList.add("open");
  const products = JSON.parse(localStorage.getItem("cart"));
  if (products != null) {
    cartBody.classList.remove("empty");
    cartBody.innerHTML = `
    <div class="cart-row">
        <img src="${products.img}" alt="product" class="product-image">
        <div>
            <div>
                <p>${products.title}</p>
                <div>
                    <span>${products.currency}</span>
                    <span>${products.price}</span>
                    <span>x</span>
                    <span>${products.count}</span>
                    <strong>
                        <span>${products.currency}</span>
                        <span>${products.total}</span>
                    </strong>
                </div>
            </div>
        </div>
        <img src="images/icon-delete.svg" alt="delete" class="delete" onClick="deleteProduct()">
    </div>
    `;
  } else {
    deleteProduct();
  }
};

cartIcon.addEventListener("click", () => {
  cartModal.classList.add("open");
});

document.body.addEventListener("click", (e) => {
  const reservedClasses = [
    "cart",
    "cart-header",
    "cart-body",
    "add-to-cart",
    "checkout",
    "delete",
    "badge",
    "icon",
  ];

  if (
    !reservedClasses.some((reservedClasses) =>
      e.target.classList.contains(reservedClasses)
    )
  ) {
    cartModal.classList.remove("open");
  }
});

addToCart.addEventListener("click", () => {
  if (localStorage.getItem("cart") == null) {
    const product = {
      img: mainImage.src,
      title: title.innerText,
      price: parseInt(amount.innerText),
      count: parseInt(counter.innerText),
      total: 0,
      currency: currency.innerText,
    };
    product.total = product.price * product.count;
    localStorage.setItem("cart", JSON.stringify(product));
    badge.innerText = product.count;
    badge.classList.remove("hidden");
  }
  openCartModal();
});

const deleteProduct = () => {
  localStorage.removeItem("cart");
  cartBody.classList.add("empty");
  cartBody.innerHTML = `Your cart is empty.`;
  badge.innerText = 0;
  badge.classList.add("hidden");
};

lightboxCloseBtn.addEventListener("click", () => {
  lihghtbox.classList.remove("open");
});

mainImage.addEventListener("click", (e) => {
  if (window.innerWidth > 375) {
    lightboxImage.src = e.target.src;
    lihghtbox.classList.add("open");
  }
});

const nextImage = () => {
  const activeImage = document.querySelector(".thumbnail.active");
  const nextImage = activeImage.nextElementSibling;
  if (nextImage !== null) {
    lightboxImage.src = activeImage.nextElementSibling.src;
    if (window.innerWidth < 375)
      mainImage.src = activeImage.nextElementSibling.src;
    activeImage.classList.remove("active");
    nextImage.classList.add("active");
  }
};

const prevImage = () => {
  const activeImage = document.querySelector(".thumbnail.active");
  const prevImage = activeImage.previousElementSibling;
  if (prevImage !== null) {
    lightboxImage.src = activeImage.previousElementSibling.src;
    if (window.innerWidth < 375)
      mainImage.src = activeImage.previousElementSibling.src;
    activeImage.classList.remove("active");
    prevImage.classList.add("active");
  }
};

prevBtn.addEventListener("click", nextImage);
nextBtn.addEventListener("click", prevImage);

lightboxNextBtn.addEventListener("click", nextImage);
lightboxPrevBtn.addEventListener("click", prevImage);

menuIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = "hidden";
});

menuCloseBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "scroll";
});
