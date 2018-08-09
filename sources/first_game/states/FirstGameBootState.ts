module FirstGame {
	import BootState = Core.BootState;
	import StateName = Core.StateName;

	export abstract class FirstGameBootState extends BootState {

		protected loadOther(): void {
			this.loadPreloaderAssets();
		}

		protected loadPreloaderAssets(): void {
			this.load.image('img', 'img/img.png');
			this.load.once("complete", this.startNextState, this);
			this.load.start();

		}

		protected addLoadingVisualization():void {
			let text = "AWESOME GAME ON PHASER FRAMEWORK!";
			let style = { font: "65px Arial", fill: "#ff0000", align: "center" };
			this.testText = this.add.text(100, 100, text, style);

			this.tweens.add({
				                targets  : this.testText,
				                y        : 150,
				                duration : 1000,
				                ease     : 'Power2',
				                yoyo     : true,
				                delay    : 100,
				                repeat   : -1
			                });

		}

		protected startNextState(): void {
			this.time.delayedCall(2000, () => {
				this.scene.start(StateName.PRELOAD);
			}, [], this);
		}
	}
}