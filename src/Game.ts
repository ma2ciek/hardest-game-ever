import Level, { Map } from './Level';

export default class Game {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private levelId: number;
	private level: Level;

	constructor(selector: string) {
		this.canvas = <HTMLCanvasElement>document.querySelector(selector);

		let ctx = this.canvas.getContext('2d');
		if (!ctx)
			throw new Error('Cannot create 2d context');

		this.ctx = ctx;
		this.levelId = 0;
		this.loadCurrentLevel();
		this.renderCurrentLevel();
	}

	private async loadCurrentLevel() {
		await this.loadMapData(this.levelId).then(
			map => this.createLevel(map),
			err => console.error(err)
		);
	}

	private createLevel(map: Map) {
		this.level = new Level(map, this.canvas);
		this.level.success.once(() => this.next());
	}

	private loadMapData(levelId: number): Promise<Map> {
		return fetch('levels/level_' + levelId + '.json')
			.then((res: Response) => res.json() as any)
	}

	private renderCurrentLevel() {
		if (this.level)
			this.level.animate(this.ctx);
		window.requestAnimationFrame(this.renderCurrentLevel.bind(this));
	}

	private next() {
		this.levelId++;
		this.loadCurrentLevel();
	}
}
