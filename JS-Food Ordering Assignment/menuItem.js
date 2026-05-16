class MenuItem {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    getDescription() {
        return `${this.name} | $${this.price.toFixed(2)} | ${this.category}`;
    }
}

class SpecialItem extends MenuItem {
    constructor(name, price, category, chefName) {
        super(name, price, category);
        this.chefName = chefName;
    }

    getDescription() {
        return `Chef's Special: ${this.name} by Chef ${this.chefName} | $${this.price.toFixed(2)} | ${this.category}`;
    }
}
