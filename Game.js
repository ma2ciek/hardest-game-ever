class Game {
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext('2d');
		this.levelId = 0;
		this.loadCurrentLevel();
		this.renderCurrentLevel();
	}

	loadCurrentLevel() {
		this.loadMapData(this.levelId).then(
			map => this.level = new Level(map, this.canvas),
			err => console.log(err)
		);
	}

	loadMapData(levelId) {
		return new Promise((res, rej) => {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'levels/level_' + levelId + '.json');
			xhr.onload = () => res(JSON.parse(xhr.response));
			xhr.onerror = (err) => rej(err);
			xhr.send();
		});
	}

	renderCurrentLevel() {
		this.level && this.level.animate(this.ctx);
		window.requestAnimationFrame(this.renderCurrentLevel.bind(this));
	}

	next() {
		this.levelId++;
		this.loadCurrentLevel();
	}
}
