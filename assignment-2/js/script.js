document.querySelectorAll(".carousel-container").forEach(container => {
    const products = container.querySelector(".hybrid-products");
    const leftArrow = container.querySelector(".left-arrow");
    const rightArrow = container.querySelector(".right-arrow");

    if (products && leftArrow && rightArrow) {
        rightArrow.addEventListener("click", () => {
            products.scrollBy({
                left: products.clientWidth,
                behavior: "smooth"
            });
        });

        leftArrow.addEventListener("click", () => {
            products.scrollBy({
                left: -products.clientWidth,
                behavior: "smooth"
            });
        });
    }
});