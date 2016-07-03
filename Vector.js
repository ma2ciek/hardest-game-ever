class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toSize(value) {
        var currentSize = this.getSize();
        this.x *= value / currentSize;
        this.y *= value / currentSize;
        return this;
    }

    getSize() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    multiplyBy(value) {
        return new Vector(this.x * value, this.y * value);
    }
}

Vector.fromDiff = function (v1, v2) {
    return new Vector(v2.x - v1.x, v2.y - v1.y);
}

Vector.fromPoint = function (p) {
    return new Vector(p.x, p.y);
}
