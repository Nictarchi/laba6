function toUpperCase(method: Function) {
    return function (this: any, ...args: any[]) {
        const result = method.apply(this, args);
        return result.toUpperCase();
    }
}

function sealed(target: Function) {
    Object.seal(target);
    Object.seal(target.prototype);
}

@sealed
class Car {
    brand: string;
    model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }
    
    @toUpperCase
    getInformation(): string {
        return `Автомобиль: ${this.brand} ${this.model}`;
    }
}

const car = new Car("Mercedes", "AMG63");
console.log(car.getInformation());

Object.defineProperty(Car.prototype, 'year', { value: 2022 });