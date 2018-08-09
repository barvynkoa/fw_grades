module Core {

	export class DesktopGameConfigVO {
		forceSetTimeOut: boolean = false;
		enableDebug: boolean = false;
		width: number = 640;
		height: number = 480;
		renderer: number = Phaser.AUTO;
		parent: any = "gameContainer";
		transparent: boolean = false;
		antialias: boolean = true;
		physicsConfig: any = {
			p2: true
		};

	}
}