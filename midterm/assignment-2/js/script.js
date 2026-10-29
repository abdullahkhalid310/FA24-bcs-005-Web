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
(function () {
    "use strict";

    const MAX_PER_PRODUCT = 3;   // (N mod 4) + 2, with N = 5
    let cart = [];               // [{ id, name, price }]

    const toggle = document.getElementById("cart-toggle");
    const badge  = document.getElementById("cart-badge");
    const panel  = document.getElementById("mini-cart");
    const cards  = document.querySelectorAll(".product-card");

    /* ---------- Read product data from a card ---------- */
    function readCard(card) {
        const id    = card.querySelector("img").getAttribute("src"); // unique per product
        const name  = card.querySelector(".product-name span:first-child").textContent.trim();
        const price = parseFloat(card.querySelector("strong").textContent.replace(/[^0-9.]/g, ""));
        return { id, name, price };
    }

    function countOf(id) {
        return cart.filter(item => item.id === id).length;
    }

    /* ---------- Add buttons to the cards ---------- */
    cards.forEach(card => {
        if (card.querySelector(".add-to-cart")) return; // already in the HTML
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "add-to-cart";
        btn.textContent = "Add to Cart";
        card.appendChild(btn);

        btn.addEventListener("click", () => {
            const product = readCard(card);
            if (countOf(product.id) >= MAX_PER_PRODUCT) return;
            cart.push(product);
            update();
        });
    });

    /* ---------- Rendering ---------- */
    function renderPanel() {
        panel.innerHTML = "";

        if (cart.length === 0) {
            const empty = document.createElement("p");
            empty.className = "mini-cart-empty";
            empty.textContent = "Your cart is empty.";
            panel.appendChild(empty);
            return;
        }

        const list = document.createElement("ul");
        list.className = "mini-cart-list";

        cart.forEach((item, index) => {
            const li = document.createElement("li");

            const label = document.createElement("span");
            label.className = "mini-cart-name";
            label.textContent = item.name;

            const price = document.createElement("span");
            price.className = "mini-cart-price";
            price.textContent = "US$" + item.price.toFixed(2);

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "mini-cart-remove";
            remove.textContent = "Remove";
            remove.addEventListener("click", () => {
                cart.splice(index, 1);
                update();
            });

            li.append(label, price, remove);
            list.appendChild(li);
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const totalRow = document.createElement("p");
        totalRow.className = "mini-cart-total";
        totalRow.textContent = "Total: US$" + total.toFixed(2);

        const checkout = document.createElement("a");
        checkout.href = "checkout.html";
        checkout.className = "mini-cart-checkout";
        checkout.textContent = "Checkout";

        panel.append(list, totalRow, checkout);
    }

    function updateButtons() {
        cards.forEach(card => {
            const btn = card.querySelector(".add-to-cart");
            const reached = countOf(readCard(card).id) >= MAX_PER_PRODUCT;
            btn.disabled = reached;
            btn.textContent = reached ? "Limit reached" : "Add to Cart";
        });
    }

    function update() {
        badge.textContent = cart.length;
        badge.style.display = cart.length ? "flex" : "none";
        renderPanel();
        updateButtons();
    }

    /* ---------- Open / close panel ---------- */
    toggle.addEventListener("click", event => {
        event.preventDefault();               // don't navigate to checkout.html
        const opening = panel.hidden;
        panel.hidden = !opening;
        toggle.setAttribute("aria-expanded", String(opening));
    });

    update();
})();