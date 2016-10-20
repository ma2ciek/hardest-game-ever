import {Point} from './Vector';

export default class Meta {
    private x: number;
    private y: number;
    private width = 10;
    private height = 10;
    private color = '#0A0';

    constructor(p: Point) {
        this.x = p.x;
        this.y = p.y;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public getBoundingRect() {
        return { left: this.x, top: this.y, width: this.width, height: this.height };
    }

    public move() {
        //
    }
}
