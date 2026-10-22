
const products = document.querySelector(".hybrid-products");
const prevButton = document.querySelector(".carousel-arrows button:first-child");
const nextButton = document.querySelector(".carousel-arrows button:last-child");

if (products && prevButton && nextButton) {
    nextButton.addEventListener("click", function () {
        products.scrollBy({
            left: products.clientWidth * 0.8,
            behavior: "smooth"
        });
    });

    prevButton.addEventListener("click", function () {
        products.scrollBy({
            left: -products.clientWidth * 0.8,
            behavior: "smooth"
        });
    });
}
