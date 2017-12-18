class Corridor extends Phaser.Image  {
	constructor(x, y, width, height) {
		super(game, x, y);

		this.loadTexture(this._generateTexture(x, y, width, height));
		game.add.existing(this);
	}

	_generateTexture(x, y, width, height) {
		let graphics = game.add.graphics(x, y);
		let texture;
		graphics.beginFill(0xCCCCCC, 1);
		graphics.drawRect(0, 0, width, height);
		graphics.endFill();
		texture = graphics.generateTexture();
		graphics.destroy();

		return texture;
	}
}