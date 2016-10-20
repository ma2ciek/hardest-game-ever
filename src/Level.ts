import Player, {PlayerOptions} from './Player';
import CollisionManager, {Rect}  from './CollisionManager';
import OpponentFactory, {BasicOpponentDictionary} from './OpponentFactory';
import Meta from './Meta';
import Emitter from './Emitter';
import {Point} from './Vector';

export interface Entity {
	move(): void;
	render(ctx: CanvasRenderingContext2D): void;
	getBoundingRect(): Rect;
}

export interface Map {
	player: PlayerOptions;
	width: number;
	height: number;
	opponents: BasicOpponentDictionary;
	end: Point;
}

export default class Level {
	private player: Player;
	private collisionWithOpponents: CollisionManager;
	private metaCollision: CollisionManager;
	private entities: Entity[];
	public success = new Emitter();

	constructor(map: Map, canvas: HTMLCanvasElement) {
		canvas.width = map.width;
		canvas.height = map.height;

		this.player = new Player(map.player);
		const opponents = new OpponentFactory().createOpponents(map.opponents);
		const meta = new Meta(map.end);

		this.collisionWithOpponents = new CollisionManager(this.player, opponents);
		this.metaCollision = new CollisionManager(this.player, [meta]);
		this.entities = [...opponents, this.player, meta];
	}

	public animate(ctx: CanvasRenderingContext2D) {
		this.entities.forEach(e => e.move());
		if (this.collisionWithOpponents.collisionExist()) {
			this.player.moveToStart();
		}
		if (this.metaCollision.collisionExist()) {
			this.success.emit();
		}
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.entities.forEach(e => e.render(ctx));
	}

	public destroy() {
		// TODO: destory player listeners
	}
}
