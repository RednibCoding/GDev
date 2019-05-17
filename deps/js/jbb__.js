var jBB;
(function (jBB) {
    var jColor = /** @class */ (function () {
        function jColor(red, green, blue, alpha) {
            var _this = this;
            if (red === void 0) { red = 0; }
            if (green === void 0) { green = 0; }
            if (blue === void 0) { blue = 0; }
            if (alpha === void 0) { alpha = 1.0; }
            this.red = 0;
            this.green = 0;
            this.blue = 0;
            this.alpha = 1.0;
            this.rgba = function () {
                return "rgba(" + _this.red + ", " + _this.green + ", " + _this.blue + ", " + _this.alpha + ")";
            };
            this.set = function (r, g, b, a) {
                if (r === void 0) { r = 0; }
                if (g === void 0) { g = 0; }
                if (b === void 0) { b = 0; }
                if (a === void 0) { a = 1.0; }
                _this.red = r;
                _this.green = g;
                _this.blue = b;
                _this.alpha = a;
            };
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
        }
        return jColor;
    }());
    jBB.jColor = jColor;
})(jBB || (jBB = {}));
var jBB;
(function (jBB) {
    var jFont = /** @class */ (function () {
        function jFont(path, name, context) {
            var _this = this;
            this.set = function (size, bold, italic, weight) {
                if (size === void 0) { size = 16; }
                if (bold === void 0) { bold = false; }
                if (italic === void 0) { italic = false; }
                if (weight === void 0) { weight = 0; }
                var data = "";
                if (bold == true) {
                    if (weight > 0) {
                        data += weight;
                    }
                    else {
                        data += "bold ";
                    }
                }
                if (italic == true)
                    data += "oblique ";
                _this.ctx.data.canvas.ctx.font = data + size + "px " + _this.name;
            };
            this.draw = function (text, x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                _this.ctx.data.canvas.ctx.fillStyle = _this.ctx.data.color.draw.rgba();
                _this.ctx.data.canvas.ctx.fillText(text, x, y);
            };
            this.ctx = context;
            this.name = name;
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = "@font-face{ font-family: '" + this.name + "'; src: url(" + path + "); }";
            document.body.appendChild(css);
        }
        return jFont;
    }());
    jBB.jFont = jFont;
})(jBB || (jBB = {}));
var jBB;
(function (jBB) {
    var jImage = /** @class */ (function () {
        function jImage(arg01, arg02, arg03, arg04, arg05, arg06) {
            var _this = this;
            this.img = new Image();
            this.loaded = false;
            this.frame = { num: 1, width: 0, height: 0, start: 1, current: 1 };
            this.hndl = { x: 0, y: 0 };
            this.autoMidHandle = false;
            this.localMidHandle = false;
            this.scaleFac = { x: 1.0, y: 1.0 };
            this.rotation = 0;
            this.draw = function (x, y, frame) {
                if (frame === void 0) { frame = 1; }
                var origX = x;
                var origY = y;
                x /= _this.scaleFac.x;
                y /= _this.scaleFac.y;
                if (_this.loaded == true) {
                    var tilePos = _this.getTilePos(frame - 1);
                    var dx = x - _this.hndl.x;
                    var dy = y - _this.hndl.y;
                    if (_this.autoMidHandle == true || _this.localMidHandle) {
                        dx -= (_this.frame.width / 2);
                        dy -= (_this.frame.height / 2);
                    }
                    _this.cnv.save();
                    _this.cnv.translate(origX, origY);
                    _this.cnv.rotate(_this.rotation * Math.PI / 180);
                    _this.cnv.translate(-origX, -origY);
                    _this.cnv.scale(_this.scaleFac.x, _this.scaleFac.y);
                    _this.cnv.drawImage(_this.img, tilePos.x, tilePos.y, _this.frame.width, _this.frame.height, dx, dy, _this.frame.width, _this.frame.height);
                    _this.cnv.scale(1.0, 1.0);
                    _this.cnv.restore();
                }
            };
            this.handle = function (x, y) {
                if (x === void 0) { x = undefined; }
                if (y === void 0) { y = undefined; }
                if (x === undefined) {
                    if (_this.autoMidHandle == true || _this.localMidHandle) {
                        return { x: _this.hndl.x + _this.img.width / 2, y: _this.hndl.y + _this.img.height / 2 };
                    }
                    else {
                        return _this.hndl;
                    }
                }
                else {
                    x /= _this.scaleFac.x;
                    y /= _this.scaleFac.y;
                    _this.hndl = { x: x, y: y };
                }
            };
            this.midHandle = function (value) { _this.localMidHandle = value; };
            this.imageDataObject = function () {
                // create image data
                _this.ctx.clearBackbuffer();
                _this.ctx.data.canvas.bbf.drawImage(_this.img, 0, 0);
                _this.imgData = _this.ctx.data.canvas.bbf.getImageData(0, 0, _this.img.width, _this.img.height);
                return _this.imgData;
            };
            this.width = function () { return _this.img.width; };
            this.height = function () { return _this.img.height; };
            this.rotate = function (value) { _this.rotation = value; };
            this.scale = function (x, y) {
                if (x === void 0) { x = 1.0; }
                if (y === void 0) { y = 1.0; }
                _this.scaleFac = { x: x, y: y };
            };
            this.rectOverlap = function (x, y, startX, startY, width, height) {
                var r1 = { left: x, top: y, right: x + _this.img.width, bottom: y + _this.img.height };
                var r2 = { left: startX, top: startY, right: startX + width, bottom: startY + height };
                return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
            };
            this.cellsPerRow = function () { return _this.img.width / _this.frame.width; };
            this.getTilePos = function (index) {
                return { x: (index % _this.cellsPerRow() * _this.frame.width), y: (Math.floor(index / _this.cellsPerRow())) * _this.frame.height };
            };
            this.getTileIndex = function (x, y) { return (x / _this.frame.width) + (y / _this.frame.height * _this.cellsPerRow()); };
            this.ctx = arg06;
            this.cnv = this.ctx.data.canvas.ctx;
            this.autoMidHandle = this.ctx.data.global.autoMidHandle;
            if (typeof (arg01) === "string") {
                // load image
                this.img.src = arg01;
                if (typeof (arg02) === "number")
                    this.frame.width = arg02;
                if (typeof (arg03) === "number")
                    this.frame.height = arg03;
                this.frame.start = arg04;
                this.frame.num = arg05;
                this.ctx = arg06;
                this.img.onload = function (data) {
                    _this.loaded = true;
                    if (_this.frame.num === 1) {
                        _this.frame.width = _this.img.width;
                        _this.frame.height = _this.img.height;
                    }
                };
            }
            else if (typeof (arg01) === "number") {
                // create a new image
                this.img.width = arg01;
                this.img.height = arg02;
                this.frame.num = arg03;
                this.ctx = arg04;
                this.img = new Image(arg01, arg02);
            }
        }
        return jImage;
    }());
    jBB.jImage = jImage;
})(jBB || (jBB = {}));
/**
 * @preferred
 */
var jBB;
(function (jBB) {
    var Core = /** @class */ (function () {
        function Core(arg01, arg02, arg03) {
            var _this = this;
            this.data = {
                ready: false,
                lastID: 0,
                canvas: {
                    element: null,
                    ctx: null,
                    bbf: null,
                    id: "",
                    x: 0,
                    y: 0,
                    width: 640,
                    height: 480
                },
                mainLoop: "main",
                color: {
                    cls: new jBB.jColor(),
                    draw: new jBB.jColor(255, 255, 255, 1.0)
                },
                global: {
                    autoMidHandle: false,
                    alpha: 1.0,
                    scale: 1.0
                },
                mouse: null,
                keyboard: null,
                time: new jBB.jTime(),
                font: { current: null, default: null }
            };
            this.createBackbuffer = function () {
                var bbuf = document.createElement("canvas");
                var text = document.createTextNode("backbuffer");
                bbuf.appendChild(text);
                bbuf.id = _this.data.canvas.id + "-bbuf";
                bbuf.width = _this.data.canvas.width;
                bbuf.height = _this.data.canvas.height;
                bbuf.style.display = "none";
                _this.data.canvas.bbf = bbuf.getContext('2d');
                document.body.appendChild(bbuf);
            };
            this.clearBackbuffer = function () {
                _this.data.canvas.ctx.fillStyle = "rgba(0, 0, 0, 0)";
                _this.data.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
                _this.data.canvas.ctx.fillRect(0, 0, _this.data.canvas.width, _this.data.canvas.height);
            };
            this.getCanvasElement = function () {
                _this.data.canvas.element = document.getElementById(_this.data.canvas.id);
            };
            this.createCanvasElement = function () {
                _this.data.canvas.element = document.createElement("canvas");
                _this.data.canvas.element.id = _this.data.canvas.id;
                _this.data.canvas.element.width = _this.data.canvas.width;
                _this.data.canvas.element.height = _this.data.canvas.height;
                _this.data.canvas.element.appendChild(document.createTextNode("your browser doesn't support the canvas element"));
                document.body.appendChild(_this.data.canvas.element);
            };
            this.preRender = function () {
                _this.data.canvas.ctx.save();
            };
            this.postRender = function () {
                _this.data.canvas.ctx.restore();
            };
            this.render = function () {
                window.requestAnimationFrame(_this.render);
                _this.preRender();
                window[_this.data.mainLoop]();
                _this.postRender();
            };
            // ==== input ====
            // ---- mouse ----
            /**
             * Gibt die aktuelle X Koordinate des Mauszeigers im Canvas zurück
             */
            this.mouseX = function () { return _this.data.mouse.x; };
            /**
             * Gibt die aktuelle Y Koordinate des Mauszeigers im Canvas zurück
             */
            this.mouseY = function () { return _this.data.mouse.y; };
            /**
             * Gibt __true__ zurück wenn die angefragte Taste gedrückt wird, ansonsten __false__
             *
             * @param - Nummer der Maustaste, beginnend bei 0
             * @returns __true__ wenn die Taste gedrückt ist, ansonsten __false__
             */
            this.mouseDown = function (key) { return _this.data.mouse.down(key); };
            /**
             * Gibt __true__ zurück wenn die angefragte Taste einmal gedrückt wurde, ansonsten __false__
             *
             * @param - Nummer der Maustaste, beginnend bei 0
             * @returns __true__ wenn die Taste gedrückt worden ist, ansonsten __false__
             */
            this.mouseHit = function (key) { return _this.data.mouse.hit(key); };
            /**
             * Löscht alle evtl. noch vorhandenen Maus-Events
             */
            this.flushMouse = function () { _this.data.mouse.flush(); };
            /**
             * Gibt ein Array mit den Nummern der aktuell gedrückten Maustasten zurück
             *
             * @returns Ein Array mit den Nummern aktuell gedrückter Maustasten
             */
            this.getMouse = function () { return _this.data.mouse.get(); };
            // ---- keyboard ----
            this.keyDown = function (key) { return _this.data.keyboard.down(key); };
            this.keyHit = function (key) { return _this.data.keyboard.hit(key); };
            this.flushKeys = function () { _this.data.keyboard.flush(); };
            // ==== time & random ====
            /**
             * Gibt die Millisekunden zurück die seit dem Start des Rechners vergangen sind
             */
            this.milliSecs = function () { return _this.data.time.milliSecs(); };
            /**
             * Gibt eine zufällig Zahl aus dem angegebenen Bereich zurück
             *
             * @param min - kleinste Zahl im Bereich
             * @param max - größte Zahl im Bereich
             *
             * @returns Eine Zahl zwischen __min__ und __max__
             */
            this.rand = function (min, max) { return _this.data.time.rand(min, max); };
            // ==== graphics ====
            /**
             * Löscht das Canvas in der eingestellten Farbe
             */
            this.cls = function () {
                _this.data.canvas.ctx.fillStyle = _this.data.color.cls.rgba();
                _this.data.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
                _this.data.canvas.ctx.fillRect(0, 0, _this.data.canvas.width, _this.data.canvas.height);
            };
            /**
             * Setzt die Löschfarbe für [[cls]]()
             *
             * @param r - die Rotkomponente der Farbe
             * @param g - die Grünkomponente der Farbe
             * @param b - die Blaukomponente der Farbe
             */
            this.clsColor = function (r, g, b) { _this.data.color.cls.set(r, g, b); };
            this.color = function (r, g, b, a) {
                if (r === void 0) { r = 255; }
                if (g === void 0) { g = 255; }
                if (b === void 0) { b = 255; }
                if (a === void 0) { a = 1.0; }
                _this.data.color.draw.set(r, g, b, a);
            };
            this.graphicsWidth = function () { return _this.data.canvas.width; };
            this.graphicsHeight = function () { return _this.data.canvas.height; };
            this.tFormFilter = function (value) { _this.data.canvas.ctx.imageSmoothingEnabled = value; };
            // === drawing ====
            this.rect = function (x, y, width, height, filled) {
                if (filled === void 0) { filled = true; }
                if (filled) {
                    _this.data.canvas.ctx.fillStyle = _this.data.color.draw.rgba();
                    _this.data.canvas.ctx.fillRect(x, y, width, height);
                }
                else {
                    _this.data.canvas.ctx.strokeStyle = _this.data.color.draw.rgba();
                    _this.data.canvas.ctx.strokeRect(x, y, width, height);
                }
            };
            this.line = function (startX, startY, endX, endY) {
                _this.data.canvas.ctx.strokeStyle = _this.data.color.draw.rgba();
                _this.data.canvas.ctx.beginPath();
                _this.data.canvas.ctx.moveTo(startX, startY);
                _this.data.canvas.ctx.lineTo(endX, endY);
                _this.data.canvas.ctx.stroke();
            };
            // ==== fonts ====
            this.loadFont = function (path, name) {
                _this.data.font.current = new jBB.jFont(path, name, _this);
                return _this.data.font.current;
            };
            this.setFont = function (font, size, bold, italic, weight) {
                if (size === void 0) { size = 16; }
                if (bold === void 0) { bold = false; }
                if (italic === void 0) { italic = false; }
                if (weight === void 0) { weight = 0; }
                _this.data.font.current = font;
                _this.data.font.current.set(size, bold, italic, weight);
            };
            this.drawText = function (txt, x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (_this.data.font.current instanceof jBB.jFont) {
                    _this.data.font.current.draw(txt, x, y);
                }
                else {
                    _this.data.font.default.draw(txt, x, y);
                }
            };
            // ==== images ====
            this.autoMidHandle = function (value) { _this.data.global.autoMidHandle = value; };
            this.midHandle = function (img, value) { img.midHandle(value); };
            this.loadImage = function (path, cellWidth, cellHeight, startCell, cellCount) {
                if (startCell === void 0) { startCell = 1; }
                if (cellCount === void 0) { cellCount = 1; }
                return new jBB.jImage(path, cellWidth, cellHeight, startCell, cellCount, _this);
            };
            this.drawImage = function (img, x, y, frame) {
                if (frame === void 0) { frame = 1.0; }
                img.draw(x, y, frame);
            };
            this.imageWidth = function (img) { return img.width(); };
            this.imageHeight = function (img) { return img.height(); };
            this.rotateImage = function (img, value) { img.rotate(value); };
            this.imageHandle = function (img) { if (img.loaded == true) {
                return img.handle();
            }
            else {
                return 0;
            } };
            this.scaleImage = function (img, x, y) {
                if (x === void 0) { x = 1.0; }
                if (y === void 0) { y = 1.0; }
                img.scale(x, y);
            };
            this.createImage = function (width, height, frames) { return new jBB.jImage(width, height, frames, _this); };
            this.imageRectOverlap = function (img, x, y, startX, startY, width, height) { return img.rectOverlap(x, y, startX, startY, width, height); };
            if (typeof (arg01) == "number") {
                // (width, height, [mainloop])
                this.data.lastID++;
                this.data.canvas.id = "jbbCanvas" + this.data.lastID;
                this.data.canvas.width = arg01;
                if (typeof (arg02) == "number")
                    this.data.canvas.height = arg02;
                if (typeof (arg03) == "string")
                    this.data.mainLoop = arg03;
                this.createCanvasElement();
            }
            else if (typeof (arg01) == "string") {
                // (canvasID, [mainLoop])
                this.data.canvas.id = arg01;
                if (typeof (arg02) == "string")
                    this.data.mainLoop = arg02;
                this.getCanvasElement();
            }
            this.data.canvas.ctx = this.data.canvas.element.getContext('2d');
            this.data.canvas.ctx.lineWidth = 1;
            this.data.mouse = new jBB.jMouse(this);
            this.data.keyboard = new jBB.jKeyboard(this);
            this.data.font.default = new jBB.jFont("", "Arial", this);
            window.onload = function () { _this.data.ready = true; };
            this.createBackbuffer();
            window.requestAnimationFrame(this.render);
        }
        return Core;
    }());
    jBB.Core = Core;
})(jBB || (jBB = {}));
var jBB;
(function (jBB) {
    var jKeyboard = /** @class */ (function () {
        function jKeyboard(context) {
            var _this = this;
            this.saveKeyDown = function (event) { _this.keys[event.keyCode] = true; };
            this.saveKeyUp = function (event) { _this.keys[event.keyCode] = false; };
            this.down = function (key) { return _this.keys[key]; };
            this.hit = function (key) {
                var result = _this.keys[key];
                _this.keys[key] = false;
                return result;
            };
            this.flush = function () {
                for (var index in _this.keys) {
                    _this.keys[index] = false;
                }
            };
            this.ctx = context;
            this.ctx.data.canvas.element.onkeydown = this.saveKeyDown;
            this.ctx.data.canvas.element.onkeyup = this.saveKeyUp;
        }
        return jKeyboard;
    }());
    jBB.jKeyboard = jKeyboard;
})(jBB || (jBB = {}));
var jBB;
(function (jBB) {
    var jMouse = /** @class */ (function () {
        function jMouse(context) {
            var _this = this;
            this.saveMousePos = function (event) {
                var r = _this.ctx.data.canvas.element.getBoundingClientRect();
                _this.x = event.clientX - r.left;
                _this.y = event.clientY - r.top;
            };
            this.saveMouseDown = function (event) { _this.keys[event.button] = true; };
            this.saveMouseUp = function (event) { _this.keys[event.button] = false; };
            this.down = function (key) { return _this.keys[key]; };
            this.hit = function (key) {
                var result = _this.keys[key];
                _this.keys[key] = false;
                return result;
            };
            this.flush = function () {
                for (var index in _this.keys) {
                    _this.keys[index] = false;
                }
            };
            this.get = function () {
                var result = [];
                for (var index in _this.keys) {
                    if (_this.keys[index])
                        result.push(Number(index));
                }
                return result;
            };
            this.ctx = context;
            this.keys = [];
            this.ctx.data.canvas.element.onmousemove = this.saveMousePos;
            this.ctx.data.canvas.element.onmousedown = this.saveMouseDown;
            this.ctx.data.canvas.element.onmouseup = this.saveMouseUp;
        }
        return jMouse;
    }());
    jBB.jMouse = jMouse;
})(jBB || (jBB = {}));
var jBBContext = {
    context: undefined
};
// ==== graphics ====
function Graphics(width, height, mainLoop) {
    if (width === void 0) { width = 640; }
    if (height === void 0) { height = 480; }
    if (mainLoop === void 0) { mainLoop = "main"; }
    jBBContext.context = new jBB.Core(width, height, mainLoop);
}
function Cls() { jBBContext.context.cls(); }
function ClsColor(red, green, blue) {
    if (red === void 0) { red = 0; }
    if (green === void 0) { green = 0; }
    if (blue === void 0) { blue = 0; }
    jBBContext.context.clsColor(red, green, blue);
}
function Color(red, green, blue, alpha) {
    if (red === void 0) { red = 255; }
    if (green === void 0) { green = 255; }
    if (blue === void 0) { blue = 255; }
    if (alpha === void 0) { alpha = 1.0; }
    jBBContext.context.color(red, green, blue, alpha);
}
function GraphicsWidth() { return jBBContext.context.graphicsWidth(); }
function GraphicsHeight() { return jBBContext.context.graphicsHeight(); }
function TFormFilter(value) { jBBContext.context.tFormFilter(value); }
// ==== drawing ====
function Rect(x, y, width, height, filled) {
    if (filled === void 0) { filled = 1; }
    var f = true;
    if (filled !== 1)
        f = false;
    jBBContext.context.rect(x, y, width, height, filled);
}
function Line(startX, startY, endX, endY) { jBBContext.context.line(startX, startY, endX, endY); }
// ==== fonts ====
function LoadFont(path, name) { return jBBContext.context.loadFont(path, name); }
function SetFont(font, size, bold, italic) {
    if (size === void 0) { size = 16; }
    if (bold === void 0) { bold = false; }
    if (italic === void 0) { italic = false; }
    jBBContext.context.setFont(font, size, bold, italic);
}
// ==== text ====
function DrawText(txt, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    jBBContext.context.drawText(txt, x, y);
}
// ==== images ====
function AutoMidHandle(value) { jBBContext.context.autoMidHandle(value); }
function MidHandle(img, value) { jBBContext.context.midHandle(img, value); }
function LoadImage(path, cellWidth, cellHeight, startCell, cellCount) {
    if (startCell === void 0) { startCell = 1; }
    if (cellCount === void 0) { cellCount = 1; }
    return jBBContext.context.loadImage(path, cellWidth, cellHeight, startCell, cellCount);
}
function DrawImage(img, x, y, frame) {
    if (frame === void 0) { frame = 1; }
    jBBContext.context.drawImage(img, x, y, frame);
}
function HandleImage(img, x, y) { img.handle(x, y); }
function ImageWidth(img) { return jBBContext.context.imageWidth(img); }
function ImageHeight(img) { return jBBContext.context.imageHeight(img); }
function RotateImage(img, value) { jBBContext.context.rotateImage(img, value); }
function ImageXHandle(img) { return jBBContext.context.imageHandle(img).x; }
function ImageYHandle(img) { return jBBContext.context.imageHandle(img).y; }
function ScaleImage(img, x, y) {
    if (x === void 0) { x = 1.0; }
    if (y === void 0) { y = 1.0; }
    jBBContext.context.scaleImage(img, x, y);
}
function CreateImage(width, height, frames) {
    if (frames === void 0) { frames = 1; }
    return new jBB.jImage(width, height, frames, jBBContext.context);
}
function ImageRectOverlap(img, x, y, startX, startY, width, height) { return jBBContext.context.imageRectOverlap(img, x, y, startX, startY, width, height); }
// ==== input ====
// ---- mouse ----
function MouseX() { return jBBContext.context.mouseX(); }
function MouseY() { return jBBContext.context.mouseY(); }
function MouseHit(key) { return jBBContext.context.mouseHit(key); }
function MouseDown(key) { return jBBContext.context.mouseDown(key); }
function FlushMouse() { jBBContext.context.flushMouse(); }
function GetMouse() { return jBBContext.context.getMouse(); }
// ---- keyboard ----
function KeyDown(key) { return jBBContext.context.keyDown(key); }
function KeyHit(key) { return jBBContext.context.keyHit(key); }
function FlushKeys() { jBBContext.context.flushKeys(); }
// ==== time ====
function MilliSecs() { return jBBContext.context.milliSecs(); }
var jBB;
(function (jBB) {
    var jTime = /** @class */ (function () {
        function jTime() {
            this.milliSecs = function () {
                return new Date().getTime();
            };
            this.rand = function (min, max) {
                return Math.floor(Math.random() * max) + min;
            };
        }
        return jTime;
    }());
    jBB.jTime = jTime;
})(jBB || (jBB = {}));
