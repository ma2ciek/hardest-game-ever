class Opponent {
	constructor(obj) {
		this.radius = obj.radius || 8;
		this.pos = Vector.fromPoint(obj.start);

		this.dir = 1;

		this.start = Vector.fromPoint(obj.start);
		this.end = Vector.fromPoint(obj.end);
		this.speed = obj.speed || 2;

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
