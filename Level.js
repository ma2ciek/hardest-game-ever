class Level {
	constructor(map, canvas) {
		canvas.width = map.width;
		canvas.height = map.height;

		this.player = new Player(map.player);
		var opponents = map.opponents.map(o => new Opponent(o));
		this.collisionWithOpponents = new CollisionManager(this.player, opponents);
		this.entities = [].concat(opponents, [this.player]);
	}

	animate(ctx) {
		this.entities.forEach(e => e.move());
		if (this.collisionWithOpponents.collisionExist()) {
			this.player.moveToStart();
		}
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.entities.forEach(e => e.render(ctx));
	}

	destroy() {
		// TODO: destory player listeners
	}
}
