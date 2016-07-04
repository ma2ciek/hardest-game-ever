export interface Point {
    x: number;
    y: number;
}

export default class Vector {
    public x: number;
    public y: number;

    public static fromDiff(v1: Point, v2: Point) {
        return new Vector(v2.x - v1.x, v2.y - v1.y);
    }

    public static fromPoint(p: Point) {
        return new Vector(p.x, p.y);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toSize(value: number) {
        const currentSize = this.getSize();
        if (currentSize === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x *= value / currentSize;
            this.y *= value / currentSize;
        }
        return this;
    }

    public getSize() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public add(vector: Point) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    public multiplyBy(value: number) {
        return new Vector(this.x * value, this.y * value);
    }

}
