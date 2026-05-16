class Order {
    static _count = 1;

    constructor(userID, status, items = []) {
        this._orderID = Order.generateID();
        this._userID = userID;
        this._status = status;
        this._items = items;
    }

    static generateID() {
        return Order._count++;
    }

    calculateTotal() {
        const orderAmount = this._items.reduce((sum, item) => sum + item.price * item.qty, 0);
        const gst = orderAmount * 0.05;
        const deliveryCharge = 64;
        return { orderAmount, gst, deliveryCharge, total: orderAmount + gst + deliveryCharge };
    }

    getDescription() {
        const lines = this._items.map(item =>
            `${item.name} x${item.qty}  —  ₹${(item.price * item.qty).toFixed(2)}`
        );
        return lines.join("\n");
    }

    get orderID() { return this._orderID; }
    get userID()  { return this._userID; }
    get amount()  { return this.calculateTotal().total; }
    get status()  { return this._status; }
    get items()   { return this._items; }

    set status(value) { this._status = value; }
}
