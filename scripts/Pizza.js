export class Pizza
{
    pizzaSize = null;
    pizzaType = null;
    toppings = [];

    constructor(pizzaType, pizzaSize)
    {
        this.pizzaType = pizzaType;
        this.pizzaSize = pizzaSize;
    }

    addTopping(topping)
    {
        this.toppings.push(topping);
    }

    removeTopping(topping)
    {
        this.toppings = this.toppings.filter((item) => item['name'] != topping['name']);
    }

    getToppings()
    {
        return this.toppings.map((top) => top.name).join(', ');
    }

    getSize()
    {
        return this.pizzaSize.name;
    }

    getStuffing()
    {
        return this.pizzaType.name;
    }

    calculatePrice()
    {
        let price = 0;
        price = this.pizzaSize.price + this.pizzaType.price;
        this.toppings.forEach((topping) =>
        {
            price += topping.getPrice(this.pizzaSize);
        });
        return price;
    }

    calculateCalories()
    {
        let calories = 0;
        calories = this.pizzaSize.calories + this.pizzaType.calories;
        this.toppings.forEach((topping) =>
        {
            calories += topping.getCalories(this.pizzaSize);
        });
        return calories;
    }
}

export class PizzaSize
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

export class PizzaType
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

export class Topping
{
    constructor(name, priceS, caloriesS, priceL, caloriesL)
    {
        this.name = name;
        this.priceS = priceS;
        this.caloriesS = caloriesS;
        this.priceL = priceL;
        this.caloriesL = caloriesL;
        this.isActive = false;
    }

    getPrice = (size) =>
    {
        if (size.name === "Большая")
        {
            return this.priceL;
        } else if (size.name === "Маленькая")
        {
            return this.priceS;
        }
    }

    getCalories = (size) =>
    {
        if (size.name === "Большая")
        {
            return this.caloriesL;
        } else if (size.name === "Маленькая")
        {
            return this.caloriesS;
        }
    }
}

export class BavarianPizza extends Pizza {
    image = "";
    constructor(pizzaSize) {
        const pizzaType = new PizzaType("Баварская", 700, 450);
        super(pizzaType, pizzaSize);
        this.image = "https://dodopizza-a.akamaihd.net/static/Img/Products/18dbb12240b041a191c9dc73c9c1f4ef_292x292.jpeg";
    }
}

export class CheddarParmejano extends Topping {
    image = "";
    constructor() {
        super("Чеддер и пармезан", 150, 50, 300, 50);
        this.image = "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796";
    }
}

export class CheesyBoard extends Topping {
    image = "";
    constructor() {
        super("Сырный бортик", 150, 50, 300, 50);
        this.image = "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/bd896a42a5b44169ae9dfdc2573c34f2.png";
    }
}

export class CreamyMozarella extends Topping {
    image = "";
    constructor() {
        super("Сливочная моцарелла", 50, 0, 100, 0);
        this.image = "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png";
    }
}

export class EmptyPizza extends Pizza {
    image = "";
    constructor() {
        const pizzaType = new PizzaType("", 0, 0);
        super(pizzaType, new PizzaSize("", 0, 0));
        this.image = "https://dodopizza-a.akamaihd.net/static/Img/Products/748949429e25404ea10aab002c910d84_292x292.jpeg";
    }
}

export class MargaretPizza extends Pizza {
    image = "";
    constructor(pizzaSize) {
        const pizzaType = new PizzaType("Маргарита", 500, 300);
        super(pizzaType, pizzaSize);
        this.image = "https://dodopizza-a.akamaihd.net/static/Img/Products/748949429e25404ea10aab002c910d84_292x292.jpeg";
    }
}

export class PepperoniPizza extends Pizza {
    image = "";
    constructor(pizzaSize) {
        const pizzaType = new PizzaType("Пепперони", 800, 400);
        super(pizzaType, pizzaSize);
        this.image = "https://dodopizza-a.akamaihd.net/static/Img/Products/fb9cc5b8ff2e47bdbcbdcb5930cddf06_292x292.webp";
    }
}
