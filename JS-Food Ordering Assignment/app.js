class FoodOrderingApp {
    constructor() {
        this.cart = [];
        this.user = null;
        this.orders = new Map();
        this.finalAmount = 0;
        this.paid = false;
        this.currentOrder = null;
    }

    addToCart(key, name, price) {
        const existing = this.cart.find(item => item.key === key);
        if (existing) {
            existing.qty += 1;
        } else {
            this.cart.push({ key, name, price, qty: 1 });
        }
        this.updateMenuControls(key, name, price);
        this.renderCart();
    }

    updateQty(key, delta) {
        const existing = this.cart.find(item => item.key === key);
        if (!existing) return;
        existing.qty += delta;
        if (existing.qty <= 0) this.cart.splice(this.cart.indexOf(existing), 1);
        this.updateMenuControls(key, existing.name, existing.price);
        this.renderCart();
    }

    updateMenuControls(key, name, price) {
        const ctrl = document.getElementById(`item-ctrl-${key}`);
        if (!ctrl) return;
        const existing = this.cart.find(item => item.key === key);
        if (!existing) {
            ctrl.innerHTML = `<button class="add-to-cart-btn" onclick="app.addToCart(${key}, '${name}', ${price})">+ Add</button>`;
        } else {
            ctrl.innerHTML = `<div class="qty-controls">
                <button class="qty-btn" onclick="app.updateQty(${key}, -1)">&#8722;</button>
                <span class="qty-count">${existing.qty}</span>
                <button class="qty-btn" onclick="app.updateQty(${key}, 1)">&#43;</button>
            </div>`;
        }
    }

    clearCart() {
        this.cart = [];
        menuItems.forEach((item, key) => this.updateMenuControls(key, item.name, item.price));
        this.renderCart();
    }

    renderCart() {
        const cartSection = document.getElementById("cart-section");
        if (this.cart.length === 0) {
            cartSection.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
            return;
        }
        const totalItems = this.cart.reduce((sum, item) => sum + item.qty, 0);
        const total = this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        let html = `<h3 class="cart-title">Cart (${totalItems})</h3><ul class="cart-list">`;
        this.cart.forEach(item => {
            html += `<li class="cart-item">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-qty">x${item.qty}</span>
                <span class="cart-item-price">&#8377;${(item.price * item.qty).toFixed(2)}</span>
            </li>`;
        });
        html += `</ul>
        <div class="cart-total">Total: &#8377;${total.toFixed(2)}</div>
        <div class="cart-actions">
            <button class="clear-cart-btn" onclick="app.clearCart()">Clear Cart</button>
            <button class="btn-checkout" onclick="app.showCheckOutScreen()">Check out</button>
        </div>`;
        cartSection.innerHTML = html;
    }

    showCheckOutScreen() {
        document.getElementById("address-text").innerText = this.user.address;
        document.getElementById("home-screen").style.display = "none";
        document.getElementById("check-out-screen").style.display = "flex";
        this.currentOrder = new Order(this.user.id, "Pending", this.cart);
        const { orderAmount, gst, deliveryCharge, total } = this.currentOrder.calculateTotal();
        this.finalAmount = total;
        document.getElementById("order-description").innerText = this.currentOrder.getDescription();
        let html = `<li id="order-amount">
                        <span class="label">Order Amount</span>
                        <span class="amount">&#8377;${orderAmount.toFixed(2)}</span>
                    </li>
                    <li id="gst">
                        <span class="label">GST (5%)</span>
                        <span class="amount">&#8377;${gst.toFixed(2)}</span>
                    </li>
                    <li id="delivery-charge">
                        <span class="label">Delivery Charge</span>
                        <span class="amount">&#8377;${deliveryCharge.toFixed(2)}</span>
                    </li>
                    <li id="final-amount">
                        <span class="label">Final Amount</span>
                        <span class="amount">&#8377;${total.toFixed(2)}</span>
                    </li>`;
        document.getElementById("bill-breakup").innerHTML = html;
    }

    validateLogin() {
        const userContact = Number(document.getElementById("user-no").value);
        const password = document.getElementById("password").value;
        this.user = users.get(userContact);
        if (this.user) {
            if (this.user.password === password) {
                document.getElementById("login-screen").style.display = "none";
                this.showHomeScreen();
            } else {
                document.getElementById("validation-msg").style.color = "red";
                document.getElementById("validation-msg").innerText = "Wrong password";
            }
        } else {
            document.getElementById("validation-msg").style.color = "red";
            document.getElementById("validation-msg").innerText = "User not found";
        }
    }

    showHomeScreen() {
        document.getElementById("home-screen").style.display = "flex";
        document.getElementById("welcome-msg").innerText = "Hello, " + this.user.name + "!";
        this.renderMenu();
    }

    renderMenu() {
        const categories = {};
        menuItems.forEach((item, key) => {
            if (!categories[item.category]) categories[item.category] = [];
            categories[item.category].push({ item, key });
        });

        let html = "";
        for (const category in categories) {
            html += `<details class="category-group">
                <summary class="category-header">${category}</summary>
                <ul class="item-list">`;

            categories[category].forEach(({ item, key }) => {
                const isSpecial = item instanceof SpecialItem;
                html += `<li class="menu-item">
                    <span class="item-name">
                        ${item.name}
                        ${isSpecial ? `<span class="special-badge">Chef's Special</span>` : ""}
                    </span>
                    <span class="item-price">&#8377;${item.price.toFixed(2)}</span>
                    <div id="item-ctrl-${key}">
                        <button class="add-to-cart-btn" onclick="app.addToCart(${key}, '${item.name}', ${item.price})">+ Add</button>
                    </div>
                </li>`;
            });

            html += `</ul></details>`;
        }
        document.getElementById("menu-list").innerHTML = html;
        this.renderCart();
    }

    async showOrderConfirmationScreen() {
        if (this.paid) return;
        this.paid = true;

        const btnPay = document.getElementById("btn-pay");
        btnPay.disabled = true;
        btnPay.innerText = "Processing...";

        const order = this.currentOrder;
        order.status = "Placed";
        this.orders.set(order.orderID, order);

        document.getElementById("check-out-screen").style.display = "none";
        document.getElementById("payment-screen").style.display = "flex";
        document.getElementById("order-msg").innerText = "Processing Payment...";

        await PaymentService.processPayment(this.finalAmount);

        document.getElementById("order-msg").innerText = "Payment Successful! Order Placed.";

        const tracker = new DeliveryTracker();
        const stageNames = tracker.stages;

        await tracker.track((stage) => {
            order.status = stage;
            const idx = stageNames.indexOf(stage);
            const fillPercent = (idx / (stageNames.length - 1)) * 100;

            document.getElementById("progress-fill").style.width = fillPercent + "%";

            setTimeout(() => {
                stageNames.forEach((s, i) => {
                    const el = document.getElementById(`stage-${i}`);
                    el.classList.remove("active", "completed");
                    if (i < idx) el.classList.add("completed");
                    if (i === idx) el.classList.add("active");
                });
            }, 2000);
        });
    }
}

const app = new FoodOrderingApp();
