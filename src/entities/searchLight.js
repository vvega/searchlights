class SearchLight extends Phaser.Image {
	constructor(x, y, radius) {

		super(game, x, y);

		this.neighbors = [];
		this.loadTexture(this._generateTexture(x, y, radius));
		//game.add.existing(this);
		this.radius = radius;

		this.anchor.setTo(.5);
	}

	_generateTexture(x, y, radius) {
		let graphics = game.add.graphics(x, y);
		let texture;
		graphics.beginFill(0xFFFF00, 1);
		graphics.drawCircle(0, 0, radius*2);
		graphics.endFill();
		texture = graphics.generateTexture();
		graphics.destroy();

		return texture;
	}

	detectCollision() {
		this.touchingTop = (this.y - radius <= 0);
		this.touchingBottom = (this.y + radius >= game.corridor.height);

		this._updateNeighbors();
		//this._updateColor();
	}

	_updateNeighbors() {
		this.neighbors.length = 0;

		for(let light of game.searchLights.children) {
			if(light === this) {
				continue;
			}
			if(Phaser.Math.distance(light.x, light.y, this.x, this.y) <= (2 * this.radius)) {
				this.neighbors.push(light);
			}
		}
	}

	_updateColor() {
		if(this.touchingTop || this.touchingBottom) {
			this.tint = 0x00FFFF;
		} else if(this.neighbors.length > 0) {
			this.tint = 0xFF5500;
		} else {
			this.tint = 0xFFFFFF;
		}
	}
}