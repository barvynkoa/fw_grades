module Core {
	export abstract class EntryPoint {
		protected game: SimpleGame;

		constructor () {
			this.init();
		}

		protected init(): void {
			this.defineGame();
			this.addNewStates();
			this.startState();
		}

		protected defineGame() {
			this.game = new SimpleGame();
		}

		public abstract addNewStates(): void;

		protected abstract startState(): void;

	}
}