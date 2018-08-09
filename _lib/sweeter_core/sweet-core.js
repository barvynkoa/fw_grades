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
var Core;
(function (Core) {
    var EntryPoint = (function () {
        function EntryPoint() {
            this.init();
        }
        EntryPoint.prototype.init = function () {
            this.defineGame();
            this.addNewStates();
            this.startState();
        };
        EntryPoint.prototype.defineGame = function () {
            this.game = new Core.SimpleGame();
        };
        return EntryPoint;
    }());
    Core.EntryPoint = EntryPoint;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Game = Phaser.Game;
    var SimpleGame = (function (_super) {
        __extends(SimpleGame, _super);
        function SimpleGame(config) {
            var _this = this;
            if (_.isUndefined(config)) {
                config = new Core.DesktopGameConfigVO();
            }
            _this = _super.call(this, config) || this;
            _this.positioningManager = new Core.PositioningManager(_this);
            _this.resize(window.innerWidth, window.innerHeight);
            _this.addListeners();
            return _this;
        }
        SimpleGame.prototype.addListeners = function () {
            var _this = this;
            window.addEventListener(Core.EventName.RESIZE, function () {
                _this.resize(window.innerWidth, window.innerHeight);
            }, false);
        };
        return SimpleGame;
    }(Game));
    Core.SimpleGame = SimpleGame;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Scene = Phaser.Scene;
    var SimpleState = (function (_super) {
        __extends(SimpleState, _super);
        function SimpleState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseGameHeight = 720;
            _this.baseGameWidth = 480;
            return _this;
        }
        SimpleState.prototype.create = function () {
            this.initVars();
            this.addEventListeners();
            this.resize(window.innerWidth, window.innerHeight);
        };
        SimpleState.prototype.resize = function (width, height) {
            this.cameras.resize(width, height);
            console.log("SimpleState::resize width = " + width + ", height = " + height);
            var scaleToHeight = this.verticalScalableContainer.scaleY = height / this.baseGameHeight;
            var scaleToWidth = this.horizontalScalableContainer.scaleY = width / this.baseGameWidth;
            this.verticalScalableContainer.scaleX = this.verticalScalableContainer.scaleY = scaleToHeight;
            this.verticalScalableContainer.x = width / 2;
            this.verticalScalableContainer.y = height / 2;
            this.horizontalScalableContainer.scaleX = this.horizontalScalableContainer.scaleY = scaleToWidth;
            this.horizontalScalableContainer.x = width / 2;
            this.horizontalScalableContainer.y = height / 2;
            var responsiveScale = 1;
            if (width > height) {
                responsiveScale = scaleToHeight;
            }
            else {
                responsiveScale = scaleToWidth;
            }
            this.responsiveScalableContainer.scaleX = this.responsiveScalableContainer.scaleY = responsiveScale;
            this.responsiveScalableContainer.x = width / 2;
            this.responsiveScalableContainer.y = height / 2;
        };
        SimpleState.prototype.initVars = function () {
            this.verticalScalableContainer = this.add.container(0, 0);
            this.horizontalScalableContainer = this.add.container(0, 0);
            this.responsiveScalableContainer = this.add.container(0, 0);
        };
        SimpleState.prototype.addEventListeners = function () {
            this.events.on(Core.EventName.RESIZE, this.resize, this);
        };
        return SimpleState;
    }(Scene));
    Core.SimpleState = SimpleState;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Point = Phaser.Geom.Point;
    var PositioningManager = (function () {
        function PositioningManager(game) {
            this.stack = [];
            this.padding = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.shift = 0;
            this.game = game;
        }
        PositioningManager.prototype.setElementPosition = function (element, position) {
            var _this = this;
            var gameWidth = 0;
            var gameHeight = 0;
            var origin = new Point(0, 0);
            if (typeof position == "object") {
                this.padding = 0;
                this.offsetX = position.offsetX;
                this.offsetY = position.offsetY;
                position = position.positioning;
            }
            else {
                this.padding = 5;
                this.offsetX = 0;
                this.offsetY = 0;
            }
            var padding = this.padding;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;
            switch (position) {
                case Core.Position.LEFT_TOP:
                    element.x = (padding + offsetX) + element.width / 2 + this.shift;
                    element.y = (padding + offsetY) + element.height / 2;
                    break;
                case Core.Position.RIGHT_TOP:
                    element.x = gameWidth - (padding + offsetX) - element.width / 2 - origin.x - this.shift;
                    element.y = (padding + offsetY) + element.height / 2;
                    break;
                case Core.Position.LEFT_BOTTOM:
                    element.x = (padding + offsetX) + element.width / 2 + this.shift;
                    element.y = gameHeight - (padding + offsetY) - element.height / 2;
                    break;
                case Core.Position.RIGHT_BOTTOM:
                    element.x = gameWidth - (padding + offsetX) - element.width / 2 - origin.x - this.shift;
                    element.y = gameHeight - (padding + offsetY) - element.height / 2;
                    break;
                case Core.Position.MIDDLE_TOP:
                    element.x = (gameWidth - origin.x) / 2 + offsetX;
                    element.y = (padding + offsetY) + element.height / 2;
                    break;
                case Core.Position.MIDDLE_LEFT:
                    element.x = (padding + offsetX) + element.width / 2 + this.shift;
                    element.y = gameHeight / 2 + offsetY;
                    break;
                case Core.Position.MIDDLE_RIGHT:
                    element.x = gameWidth - (padding + offsetX) - element.width / 2 - origin.x - this.shift;
                    element.y = gameHeight / 2 + offsetY;
                    break;
                case Core.Position.MIDDLE_BOTTOM:
                    element.x = (gameWidth - origin.x) / 2 + offsetX;
                    element.y = gameHeight - (padding + offsetY) - element.height / 2;
                    break;
                case Core.Position.CENTER:
                    element.x = (gameWidth - origin.x) / 2 + offsetX;
                    element.y = gameHeight / 2 + offsetY;
                    break;
                default:
                    if (typeof position == "object") {
                        element.x = offsetX;
                        element.y = offsetY;
                    }
                    break;
            }
            var onElementDestroy = function () {
                if (element.events)
                    element.events.onDestroy.remove(onElementDestroy, self);
                else if (element.onDestroy)
                    element.onDestroy.remove(onElementDestroy, self);
                for (var i = 0; i < _this.stack.length; i++) {
                    var obj = _this.stack[i].element;
                    if (obj == element)
                        _this.stack.splice(i, 1);
                }
            };
            if (element && element.events) {
                element.events.onDestroy.add(onElementDestroy, this);
            }
            else if (element && element.onDestroy) {
                element.onDestroy.add(onElementDestroy, this);
            }
            var newObj = { element: element, position: position };
            for (var i = 0; i < this.stack.length; i++) {
                var obj = this.stack[i].element;
                if (obj == newObj.element)
                    return;
            }
            this.stack.push(newObj);
        };
        PositioningManager.prototype.getElementPosition = function (element) {
            for (var i = 0; i < this.stack.length; i++) {
                var obj = this.stack[i];
                if (obj.element == element) {
                    if (typeof obj.position == "object") {
                        return obj.position["positioning"];
                    }
                    else {
                        return obj.position;
                    }
                }
            }
        };
        PositioningManager.prototype.customPosition = function (position, offsetX, offsetY) {
            return {
                positioning: position,
                offsetX: offsetX,
                offsetY: offsetY
            };
        };
        PositioningManager.prototype.inheritPositionByCenter = function (object, offsetX, offsetY) {
            return this.customPosition(null, offsetX + object.x, offsetY + object.y);
        };
        PositioningManager.prototype.inheritPosition = function (position, objectInherit, currentObject, offsetX, offsetY) {
            var kx;
            var ky;
            switch (position) {
                case Core.Position.LEFT_TOP:
                    kx = -1;
                    ky = -1;
                    break;
                case Core.Position.MIDDLE_TOP:
                    kx = 0;
                    ky = -1;
                    break;
                case Core.Position.RIGHT_TOP:
                    kx = 1;
                    ky = -1;
                    break;
                case Core.Position.MIDDLE_LEFT:
                    kx = -1;
                    ky = 0;
                    break;
                case Core.Position.CENTER:
                    kx = 0;
                    ky = 0;
                    break;
                case Core.Position.MIDDLE_RIGHT:
                    kx = 1;
                    ky = 0;
                    break;
                case Core.Position.LEFT_BOTTOM:
                    kx = -1;
                    ky = 1;
                    break;
                case Core.Position.MIDDLE_BOTTOM:
                    kx = 0;
                    ky = 1;
                    break;
                case Core.Position.RIGHT_BOTTOM:
                    kx = 1;
                    ky = 1;
                    break;
            }
            return this.customPosition(null, offsetX +
                objectInherit.x +
                kx * (objectInherit.getBounds().width * objectInherit.anchor.x + currentObject.getBounds().width * currentObject.anchor.x), offsetY +
                objectInherit.y +
                ky * (objectInherit.getBounds().height * objectInherit.anchor.y + currentObject.getBounds().height * currentObject.anchor.y));
        };
        PositioningManager.prototype.enableGameShift = function (visibleGameWidth) {
        };
        PositioningManager.prototype._resizeInVisibleFrame = function () {
        };
        return PositioningManager;
    }());
    Core.PositioningManager = PositioningManager;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Orientation;
    (function (Orientation) {
        Orientation[Orientation["PORTRAIT"] = 0] = "PORTRAIT";
        Orientation[Orientation["LANDSCAPE"] = 1] = "LANDSCAPE";
    })(Orientation = Core.Orientation || (Core.Orientation = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Position;
    (function (Position) {
        Position[Position["LEFT_TOP"] = 0] = "LEFT_TOP";
        Position[Position["RIGHT_TOP"] = 1] = "RIGHT_TOP";
        Position[Position["LEFT_BOTTOM"] = 2] = "LEFT_BOTTOM";
        Position[Position["RIGHT_BOTTOM"] = 3] = "RIGHT_BOTTOM";
        Position[Position["MIDDLE_TOP"] = 4] = "MIDDLE_TOP";
        Position[Position["MIDDLE_LEFT"] = 5] = "MIDDLE_LEFT";
        Position[Position["MIDDLE_RIGHT"] = 6] = "MIDDLE_RIGHT";
        Position[Position["MIDDLE_BOTTOM"] = 7] = "MIDDLE_BOTTOM";
        Position[Position["CENTER"] = 8] = "CENTER";
    })(Position = Core.Position || (Core.Position = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var EventName = (function () {
        function EventName() {
        }
        EventName.RESIZE = "resize";
        return EventName;
    }());
    Core.EventName = EventName;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var StateName = (function () {
        function StateName() {
        }
        StateName.BOOT = "STATE_BOOT";
        StateName.PRELOAD = "STATE_PRELOAD";
        StateName.MAIN_MENU = "STATE_MAIN_MENU";
        return StateName;
    }());
    Core.StateName = StateName;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.scale = 1;
            return _this;
        }
        BootState.prototype.create = function () {
            this.loadConfigsNames();
            this.addLoadingVisualization();
            _super.prototype.create.call(this);
        };
        BootState.prototype.initVars = function () {
            _super.prototype.initVars.call(this);
        };
        BootState.prototype.update = function () {
        };
        BootState.prototype.addLoadingVisualization = function () {
            var text = "Loading";
            var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
            this.testText = this.add.text(100, 100, text, style);
        };
        BootState.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this.testText.x = width / 2 - this.testText.width / 2;
            this.testText.y = height / 2 - this.testText.height / 2;
        };
        BootState.prototype.loadConfigsNames = function () {
            this.load.setPath('./config/');
            this.load.json("CONFIG_PATH", './config_path.json');
            this.load.once("complete", this.loadConfigs, this);
            this.load.start();
        };
        BootState.prototype.loadConfigs = function () {
            var _this = this;
            var configsPaths = this.cache.json.get("CONFIG_PATH");
            _.forEach(configsPaths, function (path, key) {
                _this.load.json(key, path);
            });
            this.cache.json.remove("CONFIG_PATH");
            this.load.once("complete", this.loadOther, this);
            this.load.start();
            this.load.setPath("./");
        };
        return BootState;
    }(Core.SimpleState));
    Core.BootState = BootState;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MainMenuState;
    }(Core.SimpleState));
    Core.MainMenuState = MainMenuState;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var PreloadState = (function (_super) {
        __extends(PreloadState, _super);
        function PreloadState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreloadState.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        return PreloadState;
    }(Core.SimpleState));
    Core.PreloadState = PreloadState;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var DesktopGameConfigVO = (function () {
        function DesktopGameConfigVO() {
            this.forceSetTimeOut = false;
            this.enableDebug = false;
            this.width = 640;
            this.height = 480;
            this.renderer = Phaser.AUTO;
            this.parent = "gameContainer";
            this.transparent = false;
            this.antialias = true;
            this.physicsConfig = {
                p2: true
            };
        }
        return DesktopGameConfigVO;
    }());
    Core.DesktopGameConfigVO = DesktopGameConfigVO;
})(Core || (Core = {}));

//# sourceMappingURL=sweet-core.js.map
