var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FirstGame;
(function (FirstGame) {
    var EntryPoint = Core.EntryPoint;
    var StateName = Core.StateName;
    var MainMenuState = Core.MainMenuState;
    var FirstGameEntryPoint = (function (_super) {
        __extends(FirstGameEntryPoint, _super);
        function FirstGameEntryPoint() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FirstGameEntryPoint.prototype.addNewStates = function () {
            this.game.scene.add(StateName.BOOT, FirstGame.FirstGameBootState);
            this.game.scene.add(StateName.PRELOAD, FirstGame.FirstGamePreloadState);
            this.game.scene.add(StateName.MAIN_MENU, MainMenuState);
        };
        FirstGameEntryPoint.prototype.startState = function () {
            this.game.scene.start(StateName.BOOT);
        };
        return FirstGameEntryPoint;
    }(EntryPoint));
    FirstGame.FirstGameEntryPoint = FirstGameEntryPoint;
})(FirstGame || (FirstGame = {}));
window.onload = function () {
    new FirstGame.FirstGameEntryPoint();
};
var FirstGame;
(function (FirstGame) {
    var BootState = Core.BootState;
    var StateName = Core.StateName;
    var FirstGameBootState = (function (_super) {
        __extends(FirstGameBootState, _super);
        function FirstGameBootState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FirstGameBootState.prototype.loadOther = function () {
            this.loadPreloaderAssets();
        };
        FirstGameBootState.prototype.loadPreloaderAssets = function () {
            this.load.image('img', 'img/img.png');
            this.load.once("complete", this.startNextState, this);
            this.load.start();
        };
        FirstGameBootState.prototype.addLoadingVisualization = function () {
            var text = "AWESOME GAME ON PHASER FRAMEWORK!";
            var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
            this.testText = this.add.text(100, 100, text, style);
            this.tweens.add({
                targets: this.testText,
                y: 150,
                duration: 1000,
                ease: 'Power2',
                yoyo: true,
                delay: 100,
                repeat: -1
            });
        };
        FirstGameBootState.prototype.startNextState = function () {
            var _this = this;
            this.time.delayedCall(2000, function () {
                _this.scene.start(StateName.PRELOAD);
            }, [], this);
        };
        return FirstGameBootState;
    }(BootState));
    FirstGame.FirstGameBootState = FirstGameBootState;
})(FirstGame || (FirstGame = {}));
var FirstGame;
(function (FirstGame) {
    var PreloadState = Core.PreloadState;
    var FirstGamePreloadState = (function (_super) {
        __extends(FirstGamePreloadState, _super);
        function FirstGamePreloadState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FirstGamePreloadState.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        FirstGamePreloadState.prototype.initVars = function () {
            _super.prototype.initVars.call(this);
            this._image = this.add.image(100, 300, 'img');
            this.tweens.add({
                targets: this._image,
                y: 150,
                duration: 1000,
                ease: 'Power2',
                yoyo: true,
                delay: 100,
                repeat: -1
            });
        };
        FirstGamePreloadState.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this._image.x = width / 2;
            this._image.y = height / 2;
        };
        return FirstGamePreloadState;
    }(PreloadState));
    FirstGame.FirstGamePreloadState = FirstGamePreloadState;
})(FirstGame || (FirstGame = {}));

//# sourceMappingURL=game.js.map
