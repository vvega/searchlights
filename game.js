const maxLights = 30;
const radius = 50;

class PrisonEscapeGame extends Phaser.Game {
	constructor() {
		super(800, 600, Phaser.AUTO, null, { create: function() {
			game.corridor = new Corridor(0, 100, 800, 400);
			game.searchLights = game.corridor.addChild(game.add.group());
			game.topLights = [];
			game.theDude = game.corridor.addChild(new Dude(50, 300, 20));
			game.randomize = this.randomize;

			//blocking
			for(let i = 0; i < maxLights; i++) {
				game.searchLights.add(new SearchLight(400, radius * 2 * i, radius));
			}

			/*//non-blocking
			for(let i = 0; i < maxLights/6; i++) {
				game.searchLights.add(new SearchLight(600, radius/2 * 2 * i, radius));
			}*/

			game.topLights.connectsToBottom = function(light) {	
				light.searched = true;

				if(light.touchingBottom) {
					return true;
				}

				for(let neighbor of light.neighbors) {
					if(!neighbor.searched && neighbor.y > light.y) {
						neighbor.tint = 0x3e3e3e;
						neighbor.bringToTop();
						return this.connectsToBottom(neighbor);
					}
				}
				light.searched = false;

				return false;
			}

			game.updateSearchLightStates();
			output.innerText = "Blocked: "+ game.theDude.isBlocked(); 
		}});
	}

	updateSearchLightStates() {
		this.topLights.length = 0;
		for(let light of this.searchLights.children) {
			light.tint = 0xFFFFFF;
			light.detectCollision();
			light.touchingTop && this.topLights.push(light);
		}
	}

	randomize() {
		//game.theDude.position.setTo(Math.random() * game.corridor.width/2, Math.random() * game.corridor.height);

		for(let i = 0; i < maxLights/2; i++) {
			game.searchLights.children[i].position.setTo(Math.random() * game.corridor.width,
															Math.random() * game.corridor.height/2);
		}

		for(let i = maxLights/2; i < maxLights; i++) {
			game.searchLights.children[i].position.setTo(Math.random() * game.corridor.width,
															(Math.random() * game.corridor.height/2) + game.corridor.height/2);
		}

		game.updateSearchLightStates();

		output.innerText = "Blocked: "+ game.theDude.isBlocked(); 
	}
}

window.onload = function() {
	window.output = document.getElementById("checkBlocked");
	window.game = new PrisonEscapeGame();
	document.getElementById("randomize").onclick = game.randomize;
}