import * as model from "./Pizza.js"
import * as components from "./components.js"

class PizzaSelectMenu {
    constructor() {
        this.size = new model.PizzaSize("Маленькая", 100, 100);
        this.pizza = new model.EmptyPizza();

        this.cartButton = new components.AddToCartButton(document.getElementById("addToCartBtn"));
        this.pizzas = new components.Pizzas(document.getElementsByClassName("pizza-types")[0],
            [new model.PepperoniPizza(this.size), new model.MargaretPizza(this.size), new model.BavarianPizza(this.size)],
            (() => {
                this.pizza = this.pizzas.selectedItem;
                this.pizza.toppings.forEach((topping) =>
                {
                    this.pizza.removeTopping(topping);
                })
                const toppingsElement = document.getElementsByClassName("toppings")[0];
                toppingsElement.childNodes.forEach((item) =>
                {
                    item.classList.remove('active');
                });
                this.cartButton.render(this.pizza.calculatePrice(), this.pizza.calculateCalories());
            }).bind(this));
        console.log(this.pizzas.pizzas);
        this.toppings = new components.Toppings(document.getElementsByClassName("toppings")[0],
            [new model.CheesyBoard(), new model.CreamyMozarella(), new model.CheddarParmejano()],
            (() => {
                this.topping = this.toppings.selectedTopping;
                this.cartButton.render(this.pizza.calculatePrice(), this.pizza.calculateCalories());
            }).bind(this), (topping) => this.pizza.removeTopping(topping), (topping) => this.pizza.addTopping(topping));

        this.sizeButtonsGroup = new components.SizeButtonsGroup(document.getElementsByClassName("sizes")[0],
            (() => {
                this.size = new model.PizzaSize("Маленькая", 100, 100);
                this.pizza.pizzaSize = this.size;
                this.pizza.toppings = [];
                this.toppings.render(this.size);
                this.cartButton.render(this.pizza.calculatePrice(), this.pizza.calculateCalories());
            }).bind(this),
            (function () {
                this.size = new model.PizzaSize("Большая", 200, 200);
                this.pizza.pizzaSize = this.size;
                this.pizza.toppings = [];
                this.toppings.render(this.size);
                this.cartButton.render(this.pizza.calculatePrice(), this.pizza.calculateCalories());
            }).bind(this));
    }

    render() {
        this.cartButton.render(this.pizza.calculatePrice(), this.pizza.calculateCalories());
        this.pizzas.render();
        this.toppings.render(this.size);
        this.sizeButtonsGroup.render();
    }
}

alert("fsafsafgsagsdgsa")
const pizzaSelectMenu = new PizzaSelectMenu();
pizzaSelectMenu.render();