
class Player {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.width = 10;
		this.height  = 10;
		this.color = '#000';
		this.speed = 2;
		this.addEventListeners();
	}

	addEventListeners() {
		window.addEventListener('keydown', (e) => {
			switch(e.keyCode) {
				case 40:
					this.vy = this.speed;
					break;
				case 39: 
					this.vx = this.speed;
					break;
				case 38:
					this.vy = -this.speed;
					break;
				case 37:
					this.vx = -this.speed;
					break;
			}
		});

		window.addEventListener('keyup', (e) => {
			switch(e.keyCode) {
				case 40:
				case 38:
					this.vy = 0;
					break;
				case 39:
				case 37:
					this.vx = 0;
					break;
			}
		});
	}

	move() {
		this.x += this.vx;
		this.y += this.vy;
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	moveToStart() {
		this.x = 0;
		this.y = 0;
	}
}
