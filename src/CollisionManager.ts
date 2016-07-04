export interface Rect {
	left: number;
	top: number;
	width: number;
	height: number;
}

// TODO: Refactor
interface Collidable {
	getBoundingRect(): Rect;
}

export default class CollisionManager {
	private obj: Collidable;
	private objects: Collidable[];

	constructor(obj: Collidable, objects: Collidable[]) {
		this.obj = obj;
		this.objects = objects;
	}

	public collisionExist() {
		const b1 = this.obj.getBoundingRect();
		for (const object of this.objects) {
			if (this.checkSingleCollision(object.getBoundingRect(), b1)) {
				return true;
			}
		}
		return false;
	}

	private checkSingleCollision(b1: Rect, b2: Rect) {
		return b1.left < b2.left + b2.width &&
			b1.left + b1.width > b2.left &&
			b1.top < b2.top + b2.height &&
			b1.top + b1.height > b2.top;
	}
}
