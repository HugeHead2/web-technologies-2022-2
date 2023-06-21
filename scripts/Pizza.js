class PizzaType
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class PizzaSize
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class Topping
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class Pizza
{
    pizzaSize = null;
    pizzaType = null;
    price = 0;
    calories = 0;
    toppings = [];

    constructor(pizzaType, pizzaSize)
    {
        this.pizzaType = pizzaType;
        this.pizzaSize = pizzaSize;
        this.price = pizzaType.price + pizzaSize.price;
        this.calories = pizzaType.price + pizzaSize.price;
    }

    addCaloriesAndPrice(item)
    {
        this.price += item.price;
        this.calories += item.calories;
    }

    removeCaloriesAndPrice(item)
    {
        this.price -= item.price;
        this.calories -= item.calories;
    }

    addTopping(topping)
    {
        this.toppings.push(topping);
        this.addCaloriesAndPrice(topping);
    }

    removeTopping(topping)
    {
        this.toppings = this.toppings.filter((item) => item['name'] != topping['name']);
        this.removeCaloriesAndPrice(topping);
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
        return this.price;
    }

    calculateCalories()
    {
        return this.calories;
    }
}