import Level, {Map} from './Level';

export default class Game {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private levelId: number;
	private level: Level;

	constructor(selector: string) {
		this.canvas = <HTMLCanvasElement>document.querySelector(selector);
		this.ctx = this.canvas.getContext('2d');
		this.levelId = 0;
		this.loadCurrentLevel();
		this.renderCurrentLevel();
	}

	private loadCurrentLevel() {
		this.loadMapData(this.levelId).then(
			map => this.level = new Level(map, this.canvas),
			err => console.log(err)
		);
	}

	private loadMapData(levelId: number) {
		return new Promise<Map>((res, rej) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', 'levels/level_' + levelId + '.json');
			xhr.onload = () => res(JSON.parse(xhr.response));
			xhr.onerror = (err) => rej(err);
			xhr.send();
		});
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
