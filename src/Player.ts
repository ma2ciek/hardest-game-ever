import Vector, {Point} from './Vector';

export interface PlayerOptions {
	x: number;
	y: number;
}

export default class Player {
	private x: number;
	private y: number;
	private dirX: number;
	private dirY: number;
	private width: number;
	private height: number;
	private startPosition: Point;
	private color: string;
	private speed: number;

	constructor(obj: PlayerOptions) {
		this.startPosition = { x: obj.x, y: obj.y };
		this.x = obj.x;
		this.y = obj.y;
		this.dirX = 0;
		this.dirY = 0;
		this.width = 10;
		this.height = 10;
		this.color = '#000';
		this.speed = 2;
		this.addEventListeners();
	}

	private addEventListeners() {
		window.addEventListener('keydown', (e) => {
			switch (e.keyCode) {
				case 40:
					this.dirY = 1;
					break;
				case 39:
					this.dirX = 1;
					break;
				case 38:
					this.dirY = -1;
					break;
				case 37:
					this.dirX = -1;
					break;
			}
		});

		window.addEventListener('keyup', (e) => {
			switch (e.keyCode) {
				case 40:
				case 38:
					this.dirY = 0;
					break;
				case 39:
				case 37:
					this.dirX = 0;
					break;
			}
		});
	}

	public move() {
		let v = new Vector(this.dirX, this.dirY).toSize(this.speed);
		this.x += v.x;
		this.y += v.y;
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	public moveToStart() {
		this.x = this.startPosition.x;
		this.y = this.startPosition.y;
	}

	public getBoundingRect() {
		return { left: this.x, top: this.y, width: this.width, height: this.height };
	}
}
