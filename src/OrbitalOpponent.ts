import Vector, {Point} from './Vector';

export default class OrbitalOpponent {
    private radius = 8;
    private R: number;
    private pos: Vector;
    private center: Vector;
    private speed: number;
    private alpha: number;

    constructor(arr: any[]) {
        this.R = arr[0];
        this.speed = arr[1];
        this.center = Vector.fromPoint(arr[2]);
        this.alpha = arr[3];

        this.move();
    }

    public move() {
        this.pos = new Vector(
            Math.sin(this.alpha) * this.R + this.center.x,
            Math.cos(this.alpha) * this.R + this.center.y
        );
        this.alpha += this.speed / (60 * Math.PI);
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
