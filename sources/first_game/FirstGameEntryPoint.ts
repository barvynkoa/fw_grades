module FirstGame {
	import EntryPoint = Core.EntryPoint;
	import StateName = Core.StateName;
	import MainMenuState = Core.MainMenuState;

	export class FirstGameEntryPoint extends EntryPoint {

		public addNewStates() {
			this.game.scene.add(StateName.BOOT, FirstGameBootState);
			this.game.scene.add(StateName.PRELOAD, FirstGamePreloadState);
			this.game.scene.add(StateName.MAIN_MENU, MainMenuState);
		}

		protected startState(): void {
			this.game.scene.start(StateName.BOOT);
		}
	}
}

/**
 *
 */
window.onload = () => {
	new FirstGame.FirstGameEntryPoint();
};