export class AddToCartButton {
    constructor(element) {
        this.element = element;
    }

    render(pizzaPrice, pizzaCalories) {
        this.element.textContent = `Добавить в корзину за ${pizzaPrice}₽ (${pizzaCalories}кКалл)`;
        return this.element;
    }
}

export class PizzaItem {
    constructor(pizzaTypesElement, pizza, selectHandler) {
        this.pizza = pizza;
        this.pizzaTypesElement = pizzaTypesElement;
        this.selectHandler = selectHandler;
    }

    render() {
        const pizzaItem = document.createElement("a");
        const types = this.pizzaTypesElement;
        const pizza = this.pizza;
        const selectHandler = this.selectHandler;
        pizzaItem.classList.add("pizza-item");
        pizzaItem.onclick = () => {
            types.selectedItem = pizza;
            this.pizzaTypesElement.pizzasElement.childNodes.forEach(pizzaItem => {
                pizzaItem.classList.remove('active');
            });
            pizzaItem.classList.add('active');
            selectHandler();
        };
        pizzaItem.innerHTML = `
            <div>
                <img src=${this.pizza.image} alt="pizza-item-img"/>
                <p>${this.pizza.pizzaType.name}</p>
            </div>`;
        return pizzaItem;
    }
}

export class Pizzas {
    constructor(pizzasElement, pizzas, selectHandler) {
        this.pizzasElement = pizzasElement;
        this.pizzas = pizzas;
        this.selectedItem = pizzas[0];
        this.selectHandler = selectHandler;
    }

    render() {
        this.pizzasElement.textContent = '';
        this.pizzas.map((pizza) =>
        {
            const pizzaItemElement = new PizzaItem(this, pizza, this.selectHandler);
            this.pizzasElement.appendChild(pizzaItemElement.render());
        })
        return this.pizzasElement;
    }
}

export class SizeButtonsGroup {
    constructor(buttonElement, sHandler, lHandler) {
        this.buttonElement = buttonElement;
        this.smallBtn = buttonElement.querySelector("#smallBtn");
        this.largeBtn = buttonElement.querySelector("#largeBtn");

        this.smallBtn.onclick = (() =>
        {
            this.smallBtn.classList.add("active");
            this.largeBtn.classList.remove("active");
            sHandler();
        }).bind(this);

        this.largeBtn.onclick = (() => {
            this.smallBtn.classList.remove("active");
            this.largeBtn.classList.add("active");
            lHandler();
        }).bind(this);
    }

    render() {
        return this.buttonElement;
    }
}

export class ToppingItem {
    constructor(toppingsElement, topping, selectHandler, removeTopping, addTopping) {
        this.topping = topping;
        this.toppingsElement = toppingsElement;
        this.selectHandler = selectHandler;
        this.removeTopping = removeTopping;
        this.addTopping = addTopping;
    }

    render(size) {
        const toppingItem = document.createElement("a");
        const toppings = this.toppingsElement;
        const topping = this.topping;
        const handler = this.selectHandler;
        toppingItem.classList.add("topping");
        toppingItem.onclick = () => {
            toppings.selectedTopping = topping;
            toppingItem.classList.toggle('active');
            if (toppingItem.classList.contains('active'))
            {
                this.addTopping(topping);
            } else
            {
                this.removeTopping(topping);
            }
            handler();
        };
        toppingItem.innerHTML = `
            <img src=${this.topping.image} alt="topping"/>
            <p>${this.topping.name}</p>
            <span class="price">${this.topping.getPrice(size)} ₽</span>`;
        return toppingItem;
    }
}

export class Toppings {
    constructor(toppingsElement, toppings, selectHandler, removeTopping, addTopping) {
        this.toppingsElement = toppingsElement;
        this.toppings = toppings;
        this.selectedTopping = toppings[0];
        this.selectHandler = selectHandler;
        this.removeTopping = removeTopping;
        this.addTopping = addTopping;
    }

    render(size) {
        this.toppingsElement.textContent = '';
        this.toppings.map((topping) =>
        {
            const toppingElement = new ToppingItem(this, topping, this.selectHandler, this.removeTopping, this.addTopping);
            this.toppingsElement.appendChild(toppingElement.render(size));
        })
        return this.toppings;
    }
}