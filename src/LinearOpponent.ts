import Vector, {Point} from './Vector';

export interface LinearOpponentOptions {
	start: Point;
	end: Point;
	radius?: number;
	speed?: number;
	type: 'normal';
}

export default class LinearOpponent {
	private radius: number;
	private dir: number;
	private pos: Vector;
	private start: Vector;
	private end: Vector;
	private v: Vector;
	private speed: number;
	private period: number;
	private actualPeriodState: number;

	constructor(obj: LinearOpponentOptions) {
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

	public move() {
		this.pos = this.pos.add(this.v.multiplyBy(this.dir));

		this.actualPeriodState++;
		if (this.actualPeriodState >= this.period) {
			this.dir = -this.dir;
			this.actualPeriodState = 0;
		}
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.fillStyle = '#09f';
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}

	public getBoundingRect() {
		return {
			left: this.pos.x - this.radius,
			top: this.pos.y - this.radius,
			width: this.radius * 2,
			height: this.radius * 2
		};
	}
}
