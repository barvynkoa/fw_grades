module Core {

	import Point = Phaser.Geom.Point;

	export abstract class BootState extends SimpleState {

		protected testText: any;

		protected bg: any;
		protected graphics: any;
		protected graphics1: any;
		protected graphics2: any;
		protected container: any;
		protected scale: number = 1;
		protected basePosition: Point;

		create(): void {
			this.loadConfigsNames();
			this.addLoadingVisualization();
			super.create();

		}

		initVars(): void {
			super.initVars();
			/*this.bg= this.add.graphics();
			this.bg.fillStyle(0xffffff, 1);
			this.bg.fillRect(0, 0, 1000, 1000);


			this.graphics = this.add.graphics();
			this.graphics.fillStyle(0x0000ff, 1);
			this.graphics.fillRect(0, 0, 100, 50);

			this.graphics1 = this.add.graphics();
			this.graphics1.fillStyle(0xff0000, 1);
			this.graphics1.fillRect(0.5, 50, 100, 50);

			this.graphics1 = this.add.graphics();
			this.graphics1.fillStyle(0x00ff00, 1);
			this.graphics1.fillRect(1, 100, 100, 50);

			this.container = this.add.container(100, 100, this.graphics);
			//this.container.visible = false;

			this.basePosition = new Point(100,100);*/
		}

		update(): void {
			/*this.scale += 0.009;

			//this.container.scaleX = this.container.scaleY = this.scale;

			//this.container.x = Math.floor(this.basePosition.x + (50 - 50*this.scale));
			//this.container.y = Math.floor(this.basePosition.y + (25 - 25*this.scale));

			this.container.x = 0;
			this.container.y = 0;

			console.log(this.container.x, this.container.y, this.container.getBounds().width, this.container.getBounds().height)
			*/
		}

		protected addLoadingVisualization():void {
			let text = "Loading";
			let style = { font: "65px Arial", fill: "#ffffff", align: "center" };
			this.testText = this.add.text(100, 100, text, style);
		}

		protected resize(width: number, height: number): void {
			super.resize(width, height);
			this.testText.x = width/2 - this.testText.width/2;
			this.testText.y = height/2 - this.testText.height/2;
		}

		protected loadConfigsNames(): void {
			this.load.setPath('./config/');
			this.load.json("CONFIG_PATH", './config_path.json');

			this.load.once("complete", this.loadConfigs, this);
			this.load.start();
		}

		protected loadConfigs () {
			let configsPaths: any = this.cache.json.get("CONFIG_PATH");

			_.forEach(configsPaths, (path: string, key: string) => {
				this.load.json(key, path);
			});
			this.cache.json.remove("CONFIG_PATH");
			this.load.once("complete", this.loadOther, this);
			this.load.start();

			this.load.setPath("./")
		}

		protected abstract loadOther(): void;
	}
}