class CollisionManager {

	constructor(player, opponents) {
		this.player = player;
		this.opponents = opponents;
	}

	collisionExist() {
		for (var opponent of this.opponents) {
			if (this.checkSingleCollision(opponent)) {
				return true;
			}
		}
		return false;
	}

	// TODO
	checkSingleCollision(opponent) {
		return this.player.x < opponent.pos.x + opponent.radius &&
			this.player.x + this.player.width > opponent.pos.x - opponent.radius &&
			this.player.y < opponent.pos.y + opponent.radius &&
			this.player.y + this.player.height > opponent.pos.y - opponent.radius;
	}
}