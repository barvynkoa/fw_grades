module Core {
	import Game = Phaser.Game;

	export class SimpleGame extends Game {
		public positioningManager: PositioningManager;

		constructor(config?: GameConfig) {
			if (_.isUndefined(config)) {
				config = new DesktopGameConfigVO();
			}
			super(config);

			this.positioningManager = new PositioningManager(this);
			this.resize(window.innerWidth, window.innerHeight);
			this.addListeners();
		}

		private addListeners() {
			window.addEventListener(EventName.RESIZE, () => {
				this.resize(window.innerWidth, window.innerHeight);
			}, false);
		}
	}
}