class Dude extends Phaser.Image {
	constructor(x, y, radius) {
		super(game, x, y);

		this.loadTexture(this._generateTexture(x, y, radius));
		game.add.existing(this);
		this.anchor.setTo(.5);
	}

	_generateTexture(x, y, radius) {
		let graphics = game.add.graphics(x, y);
		let texture;
		graphics.beginFill(0xFF0000, 1);
		graphics.drawCircle(0, 0, radius*2);
		graphics.endFill();
		texture = graphics.generateTexture();
		graphics.destroy();

		return texture;
	}

	isBlocked() {
		let blocked = false;

		game.updateSearchLightStates();

		for(let light of game.topLights) {
			light.tint = 0x3e3e3e;
			this._resetSearch();
			if(game.topLights.connectsToBottom(light)) {
				blocked = true;
				break;
			}

		}

		this._resetSearch();

		return blocked;
	}

	_resetSearch() {
		for(let light of game.searchLights.children) {
			light.searched = false;
		}
	}
}