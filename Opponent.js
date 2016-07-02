class Opponent {
	constructor(obj) {
		this.radius = obj.radius;
		this.pos = new Vector(obj.start.x, obj.start.y);

		this.dir = 1;

		this.start = new Vector(obj.start.x, obj.start.y);
		this.end = new Vector(obj.end.x, obj.end.y);
		this.speed = obj.speed;

		this.v = Vector.fromDiff(this.start, this.end).toSize(this.speed);
		
		this.period = Vector.fromDiff(this.start, this.end).getSize() / this.speed;
		this.actualPeriodState = 0;
	}

	move() {
		this.pos = this.pos.add(this.v.multiplyBy(this.dir));

		this.actualPeriodState++;
		if(this.actualPeriodState >= this.period) {
			this.dir = -this.dir;
			this.actualPeriodState = 0;
		}
	}

	render(ctx) {
		ctx.beginPath();
		ctx.fillStyle = '#09f';
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}
}

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

Vector.fromDiff = function(v1, v2) {
	return new Vector(v2.x - v1.x, v2.y - v1.y);
}

