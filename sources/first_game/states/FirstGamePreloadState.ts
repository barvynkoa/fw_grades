module FirstGame {

	import PreloadState = Core.PreloadState;

	export class FirstGamePreloadState extends PreloadState {
		private _image: any;

		create(): void {
			super.create();
		}

		initVars(): void {
			super.initVars();

			this._image = this.add.image(100, 300, 'img');

			this.tweens.add({
				                targets  : this._image,
				                y        : 150,
				                duration : 1000,
				                ease     : 'Power2',
				                yoyo     : true,
				                delay    : 100,
				                repeat   : -1
			                });
		}

		protected resize(width: number, height: number): void {
			super.resize(width, height);
			this._image.x = width/2;
			this._image.y = height/2;
		}
	}
}