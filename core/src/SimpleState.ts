module Core {

	import Scene = Phaser.Scene;
	import Container = Phaser.GameObjects.Container;

	export class SimpleState extends Scene {
		protected baseGameHeight: number = 720;
		protected baseGameWidth: number = 480;
		protected verticalScalableContainer: Container;
		protected horizontalScalableContainer: Container;
		protected responsiveScalableContainer: Container;

		create(): void {
			this.initVars();
			this.addEventListeners();
			this.resize(window.innerWidth, window.innerHeight);
		}

		protected resize(width: number, height: number): void {
			this.cameras.resize(width, height);
			console.log(`SimpleState::resize width = ${width}, height = ${height}`);

			let scaleToHeight: number = this.verticalScalableContainer.scaleY = height / this.baseGameHeight;
			let scaleToWidth: number = this.horizontalScalableContainer.scaleY = width / this.baseGameWidth;

			this.verticalScalableContainer.scaleX = this.verticalScalableContainer.scaleY = scaleToHeight;
			this.verticalScalableContainer.x = width / 2;
			this.verticalScalableContainer.y = height / 2;

			this.horizontalScalableContainer.scaleX = this.horizontalScalableContainer.scaleY = scaleToWidth;
			this.horizontalScalableContainer.x = width / 2;
			this.horizontalScalableContainer.y = height / 2;


			let responsiveScale: number = 1;
			if ( width > height ) {
				responsiveScale = scaleToHeight;
			}
			else {
				responsiveScale = scaleToWidth;
			}

			this.responsiveScalableContainer.scaleX = this.responsiveScalableContainer.scaleY = responsiveScale;
			this.responsiveScalableContainer.x = width / 2;
			this.responsiveScalableContainer.y = height / 2;
		}

		protected initVars() {
			this.verticalScalableContainer = this.add.container(0, 0 );
			this.horizontalScalableContainer = this.add.container(0, 0 );
			this.responsiveScalableContainer = this.add.container(0, 0 );
		}

		protected addEventListeners() {
			this.events.on(EventName.RESIZE, this.resize, this);
		}
	}
}