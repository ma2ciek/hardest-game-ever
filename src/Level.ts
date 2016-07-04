import Player, {PlayerOptions} from './Player';
import Opponent, {OpponentOptions} from './Opponent';
import CollisionManager from './CollisionManager';

export interface Entity {
	move(): void;
	render(ctx: CanvasRenderingContext2D): void;
}

export interface Map {
	player: PlayerOptions;
	width: number;
	height: number;
	opponents: OpponentOptions[];
}

export default class Level {
	private player: Player;
	private collisionWithOpponents: CollisionManager;
	private entities: Entity[];

	constructor(map: Map, canvas: HTMLCanvasElement) {
		canvas.width = map.width;
		canvas.height = map.height;

		this.player = new Player(map.player);
		const opponents = map.opponents.map(o => new Opponent(o));
		this.collisionWithOpponents = new CollisionManager(this.player, opponents);
		this.entities = [].concat(opponents, [this.player]);
	}

	public animate(ctx: CanvasRenderingContext2D) {
		this.entities.forEach(e => e.move());
		if (this.collisionWithOpponents.collisionExist()) {
			this.player.moveToStart();
		}
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.entities.forEach(e => e.render(ctx));
	}

	public destroy() {
		// TODO: destory player listeners
	}
}
