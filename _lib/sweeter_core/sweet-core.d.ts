declare module Core {
    abstract class EntryPoint {
        protected game: SimpleGame;
        constructor();
        protected init(): void;
        protected defineGame(): void;
        abstract addNewStates(): void;
        protected abstract startState(): void;
    }
}
declare module Core {
    import Game = Phaser.Game;
    class SimpleGame extends Game {
        positioningManager: PositioningManager;
        constructor(config?: GameConfig);
        private addListeners;
    }
}
declare module Core {
    import Scene = Phaser.Scene;
    import Container = Phaser.GameObjects.Container;
    class SimpleState extends Scene {
        protected baseGameHeight: number;
        protected baseGameWidth: number;
        protected verticalScalableContainer: Container;
        protected horizontalScalableContainer: Container;
        protected responsiveScalableContainer: Container;
        create(): void;
        protected resize(width: number, height: number): void;
        protected initVars(): void;
        protected addEventListeners(): void;
    }
}
declare module Core {
    type CustomPosition = {
        positioning: any;
        offsetX: number;
        offsetY: number;
    };
    class PositioningManager {
        game: SimpleGame;
        stack: Array<any>;
        padding: number;
        offsetX: number;
        offsetY: number;
        shift: number;
        constructor(game: SimpleGame);
        setElementPosition(element: any, position: any): void;
        getElementPosition(element: any): any;
        customPosition(position: any, offsetX: number, offsetY: number): CustomPosition;
        inheritPositionByCenter(object: any, offsetX: number, offsetY: number): CustomPosition;
        inheritPosition(position: any, objectInherit: any, currentObject: any, offsetX: number, offsetY: number): CustomPosition;
        enableGameShift(visibleGameWidth: number): void;
        private _resizeInVisibleFrame;
    }
}
declare module Core {
    enum Orientation {
        PORTRAIT = 0,
        LANDSCAPE = 1
    }
}
declare module Core {
    enum Position {
        LEFT_TOP = 0,
        RIGHT_TOP = 1,
        LEFT_BOTTOM = 2,
        RIGHT_BOTTOM = 3,
        MIDDLE_TOP = 4,
        MIDDLE_LEFT = 5,
        MIDDLE_RIGHT = 6,
        MIDDLE_BOTTOM = 7,
        CENTER = 8
    }
}
declare module Core {
    class EventName {
        static RESIZE: string;
    }
}
declare module Core {
    class StateName {
        static BOOT: string;
        static PRELOAD: string;
        static MAIN_MENU: string;
    }
}
declare module Core {
    import Point = Phaser.Geom.Point;
    abstract class BootState extends SimpleState {
        protected testText: any;
        protected bg: any;
        protected graphics: any;
        protected graphics1: any;
        protected graphics2: any;
        protected container: any;
        protected scale: number;
        protected basePosition: Point;
        create(): void;
        initVars(): void;
        update(): void;
        protected addLoadingVisualization(): void;
        protected resize(width: number, height: number): void;
        protected loadConfigsNames(): void;
        protected loadConfigs(): void;
        protected abstract loadOther(): void;
    }
}
declare module Core {
    class MainMenuState extends SimpleState {
    }
}
declare module Core {
    class PreloadState extends SimpleState {
        create(): void;
    }
}
declare module Core {
    class DesktopGameConfigVO {
        forceSetTimeOut: boolean;
        enableDebug: boolean;
        width: number;
        height: number;
        renderer: number;
        parent: any;
        transparent: boolean;
        antialias: boolean;
        physicsConfig: any;
    }
}
