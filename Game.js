class Game {
	constructor() {
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.canvas.width = 300;
		this.canvas.height = 300;

		// TODOL this.loadMap(this.currentLevel)
		var opponents = [
			new Opponent({
				start: {x: 100, y: 100},
				end: {x: 100, y: 300 },
				speed: 2,
				radius: 10,
			}),
			new Opponent({
				start: {x: 130, y: 300},
				end: {x: 130, y: 100 },
				speed: 2,
				radius: 10,
			}),
		];

		this.player = new Player();
		this.collisionManager = new CollisionManager(this.player, opponents);

		this.entities = opponents.concat([this.player]);

		this.loop();
	}


	loop() {
		this.entities.forEach(e => e.move());
		if(this.collisionManager.collisionExist()) {
			this.player.moveToStart();
		}
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.entities.forEach(e => e.render(this.ctx));
		window.requestAnimationFrame(this.loop.bind(this));
	}
}
