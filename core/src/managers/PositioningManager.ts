module Core {
	import Point = Phaser.Geom.Point;

	export type CustomPosition = {
		positioning: any;
		offsetX: number;
		offsetY: number;
	}

	export class PositioningManager {
		public game: SimpleGame;
		public stack: Array<any> = [];
		public padding: number = 0;
		public offsetX: number = 0;
		public offsetY: number = 0;
		public shift: number = 0;

		constructor(game: SimpleGame) {
			this.game = game;

			/*this.game.signalManager.addListener(SignalName.GAME_RESIZED, () => {
				// if (this.visibleGameWidth){
				// 	this._resizeInVisibleFrame();
				// }

				for (let i = 0; i < this.stack.length; i++) {
					let obj = this.stack[i];
					if (obj["inherit"]) {
						this.setElementPosition(obj.element, this.inheritPosition(obj.position, obj["inherit"], obj.element, obj.offsetX, obj.offsetY));
					}
					else {
						this.setElementPosition(obj.element, obj.position);
					}
				}
			});*/
		}

		public setElementPosition (element: any, position: any){
			let gameWidth: number = 0;//this.game.sceneManager.clientWidth;
			let gameHeight: number = 0;//this.game.sceneManager.clientHeight;
			let origin: Point = new Point(0,0);//this.game.sceneManager.origin;

			if (typeof position == "object"){
				this.padding = 0;
				this.offsetX = position.offsetX;
				this.offsetY = position.offsetY;
				position = position.positioning;
			}
			else{
				this.padding = 5;
				this.offsetX = 0;
				this.offsetY = 0;
			}

			let padding = this.padding;
			let offsetX = this.offsetX;
			let offsetY = this.offsetY;

			switch (position){
				case Position.LEFT_TOP: // TOP_LEFT
					element.x = (padding + offsetX) + element.width/2 + this.shift;
					element.y = (padding + offsetY) + element.height/2;
					break;
				case Position.RIGHT_TOP: // TOP_RIGHT
					element.x = gameWidth - (padding + offsetX) - element.width/2 - origin.x - this.shift;
					element.y = (padding + offsetY) + element.height/2;
					break;
				case Position.LEFT_BOTTOM: // BOTTOM_LEFT
					element.x = (padding + offsetX) + element.width/2 + this.shift;
					element.y = gameHeight-(padding + offsetY)-element.height/2;
					break;
				case Position.RIGHT_BOTTOM: // BOTTOM_RIGHT
					element.x = gameWidth - (padding + offsetX) - element.width/2 - origin.x - this.shift;
					element.y = gameHeight -(padding + offsetY) - element.height/2;
					break;
				case Position.MIDDLE_TOP: // MIDDLE_TOP
					element.x = (gameWidth - origin.x)/2 + offsetX;
					element.y = (padding + offsetY) + element.height/2;
					break;
				case Position.MIDDLE_LEFT: // MIDDLE_LEFT
					element.x = (padding + offsetX) + element.width/2 + this.shift;
					element.y = gameHeight/2 + offsetY;
					break;
				case Position.MIDDLE_RIGHT: // MIDDLE_RIGHT
					element.x =  gameWidth - (padding + offsetX) - element.width/2 - origin.x - this.shift;
					element.y = gameHeight/2 + offsetY;
					break;
				case Position.MIDDLE_BOTTOM: // MIDDLE_BOTTOM
					element.x = (gameWidth - origin.x)/2 + offsetX;
					element.y = gameHeight - (padding + offsetY) - element.height/2;
					break;
				case Position.CENTER:
					element.x = (gameWidth - origin.x)/2 + offsetX;
					element.y = gameHeight/2 + offsetY;
					break;
				default:
					if (typeof position == "object") {
						element.x = offsetX;
						element.y = offsetY;
					}
					break;
			}

			let onElementDestroy = () => {
				if (element.events)
					element.events.onDestroy.remove(onElementDestroy, self);
				else if (element.onDestroy)
					element.onDestroy.remove(onElementDestroy, self);
				for (let i = 0; i < this.stack.length; i++) {
					let obj = this.stack[i].element;
					if (obj == element) this.stack.splice(i, 1);
				}
			};
			if (element && element.events) {
				element.events.onDestroy.add(onElementDestroy, this);
			}
			else if (element && element.onDestroy) {
				element.onDestroy.add(onElementDestroy, this);
			}
			let newObj = {element: element, position: position};
			for (let i = 0; i < this.stack.length; i++) {
				let obj = this.stack[i].element;
				if (obj == newObj.element) return;
			}
			this.stack.push(newObj);
		}

		public getElementPosition (element: any) {
			for (let i = 0; i < this.stack.length; i++) {
				let obj = this.stack[i];
				if (obj.element == element) {
					if (typeof obj.position == "object") {
						return obj.position["positioning"];
					}
					else {
						return obj.position;
					}
				}
			}
		}

		public customPosition (position: any, offsetX: number, offsetY: number): CustomPosition {
			return {
				positioning: position,
				offsetX: offsetX,
				offsetY: offsetY
			} as CustomPosition;
		}

		public inheritPositionByCenter (object: any, offsetX: number, offsetY: number){
			return this.customPosition(null, offsetX + object.x, offsetY + object.y);
		}

		public inheritPosition (position: any, objectInherit: any, currentObject: any, offsetX: number, offsetY: number){
			let kx: number
			let ky: number;
			switch (position){
				case  Position.LEFT_TOP:       kx = -1;   ky = -1;   break;
				case  Position.MIDDLE_TOP:     kx = 0;    ky = -1;   break;
				case  Position.RIGHT_TOP:      kx = 1;    ky = -1;   break;
				case  Position.MIDDLE_LEFT:    kx = -1;   ky = 0;    break;
				case  Position.CENTER:         kx = 0;    ky = 0;    break;
				case  Position.MIDDLE_RIGHT:   kx = 1;    ky = 0;    break;
				case  Position.LEFT_BOTTOM:    kx = -1;   ky = 1;    break;
				case  Position.MIDDLE_BOTTOM:  kx = 0;    ky = 1;    break;
				case  Position.RIGHT_BOTTOM:   kx = 1;    ky = 1;    break;
			}

			return this.customPosition(
				null,

				offsetX +
				objectInherit.x +
				kx*(objectInherit.getBounds().width*objectInherit.anchor.x + currentObject.getBounds().width*currentObject.anchor.x),

				offsetY +
				objectInherit.y +
				ky*(objectInherit.getBounds().height*objectInherit.anchor.y + currentObject.getBounds().height*currentObject.anchor.y)
			);
		}

		public enableGameShift (visibleGameWidth: number) {
			//this.visibleGameWidth = visibleGameWidth;
			//this._resizeInVisibleFrame();
		}

		private _resizeInVisibleFrame () {
			// var layoutWidth = Phaser.DOM.layoutBounds.width;
			// if (layoutWidth>fl.gameScreenWidth*fl.scale)
			// 	this.shift = (Math.min(layoutWidth, fl.game.width*fl.scale) - this.visibleGameWidth*fl.scale)/2/fl.scale;
			// else
			// 	this.shift = 0;
		}
	}
}