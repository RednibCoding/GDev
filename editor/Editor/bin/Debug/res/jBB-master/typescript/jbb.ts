/**
 * @preferred
 */
namespace jBB{
	export class Core{
		public data = {
			ready : false,
			lastID : 0,
			canvas : {
				element : null,
				ctx : null,
				bbf : null,
				id : "",
				x : 0,
				y : 0,
				width : 640,
				height : 480
			},
			
			mainLoop : "main",

			color : {
				cls : new jColor(),
				draw : new jColor(255, 255, 255, 1.0)
			},

			global : {
				autoMidHandle : false,
				alpha : 1.0,
				scale : 1.0
			},

			mouse : null,
			keyboard : null,
			time : new jTime(),
			font : { current : null, default : null }
		};

		constructor(canvasID:string)
		constructor(canvasID:string, mainLoop:string)
		constructor(width:number, height:number)
		constructor(width:number, height:number, mainLoop:string)
		constructor(arg01?:any, arg02?:any, arg03?:any){
			if(typeof(arg01) == "number"){

				// (width, height, [mainloop])
				this.data.lastID++;
				this.data.canvas.id = "jbbCanvas" + this.data.lastID;
				this.data.canvas.width = arg01;
				if(typeof(arg02) == "number") this.data.canvas.height = arg02;
				if(typeof(arg03) == "string") this.data.mainLoop = arg03;
				this.createCanvasElement();

			}else if(typeof(arg01) == "string"){

				// (canvasID, [mainLoop])
				this.data.canvas.id = arg01;
				if(typeof(arg02) == "string") this.data.mainLoop = arg02;
				this.getCanvasElement();
			}

			this.data.canvas.ctx = this.data.canvas.element.getContext('2d');
			this.data.canvas.ctx.lineWidth = 1;
			this.data.mouse = new jMouse(this);
			this.data.keyboard = new jKeyboard(this);
			this.data.font.default = new jFont("", "Arial", this);

			window.onload = () => { this.data.ready = true; }

			this.createBackbuffer();

			window.requestAnimationFrame(this.render);
		}

		private createBackbuffer = () => {
			var bbuf:HTMLCanvasElement = document.createElement("canvas");
			var text:Text = document.createTextNode("backbuffer");
			bbuf.appendChild(text);
			bbuf.id = this.data.canvas.id + "-bbuf";
			bbuf.width = this.data.canvas.width;
			bbuf.height = this.data.canvas.height;
			bbuf.style.display = "none";
			this.data.canvas.bbf = bbuf.getContext('2d');
			document.body.appendChild(bbuf);
		}

		public clearBackbuffer = () => {
			this.data.canvas.ctx.fillStyle = "rgba(0, 0, 0, 0)";
			this.data.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
			this.data.canvas.ctx.fillRect(0, 0, this.data.canvas.width, this.data.canvas.height);
		}

		private getCanvasElement = () => {
			this.data.canvas.element = document.getElementById(this.data.canvas.id);
		}

		private createCanvasElement = () => {
			this.data.canvas.element = document.createElement("canvas");
			this.data.canvas.element.id = this.data.canvas.id;
			this.data.canvas.element.width = this.data.canvas.width;
			this.data.canvas.element.height = this.data.canvas.height;
			this.data.canvas.element.appendChild(document.createTextNode("your browser doesn't support the canvas element"));
			document.body.appendChild(this.data.canvas.element);
		}

		private preRender = () => {
			this.data.canvas.ctx.save();
		}

		private postRender = () => {
			this.data.canvas.ctx.restore();
		}

		private render = () => {
			window.requestAnimationFrame(this.render);
			this.preRender();
			window[this.data.mainLoop]();
			this.postRender();
		}

		// ==== input ====
		// ---- mouse ----
		/**
		 * Gibt die aktuelle X Koordinate des Mauszeigers im Canvas zurück
		 */
		public mouseX = ():number => { return this.data.mouse.x; }
		/**
		 * Gibt die aktuelle Y Koordinate des Mauszeigers im Canvas zurück
		 */
		public mouseY = ():number => { return this.data.mouse.y; }
		/**
		 * Gibt __true__ zurück wenn die angefragte Taste gedrückt wird, ansonsten __false__
		 * 
		 * @param - Nummer der Maustaste, beginnend bei 0
		 * @returns __true__ wenn die Taste gedrückt ist, ansonsten __false__
		 */
		public mouseDown = (key:number):boolean => { return this.data.mouse.down(key); }
		/**
		 * Gibt __true__ zurück wenn die angefragte Taste einmal gedrückt wurde, ansonsten __false__
		 * 
		 * @param - Nummer der Maustaste, beginnend bei 0
		 * @returns __true__ wenn die Taste gedrückt worden ist, ansonsten __false__
		 */
		public mouseHit = (key:number):boolean => { return this.data.mouse.hit(key); }
		/**
		 * Löscht alle evtl. noch vorhandenen Maus-Events
		 */
		public flushMouse = () => { this.data.mouse.flush(); }
		/**
		 * Gibt ein Array mit den Nummern der aktuell gedrückten Maustasten zurück
		 * 
		 * @returns Ein Array mit den Nummern aktuell gedrückter Maustasten
		 */
		public getMouse = ():number[] => { return this.data.mouse.get(); }

		// ---- keyboard ----
		public keyDown = (key:number):boolean => { return this.data.keyboard.down(key); }
		public keyHit = (key:number):boolean => { return this.data.keyboard.hit(key); }
		public flushKeys = () => { this.data.keyboard.flush(); }

		// ==== time & random ====
		/**
		 * Gibt die Millisekunden zurück die seit dem Start des Rechners vergangen sind
		 */
		public milliSecs = ():number => { return this.data.time.milliSecs(); }

		/**
		 * Gibt eine zufällig Zahl aus dem angegebenen Bereich zurück
		 * 
		 * @param min - kleinste Zahl im Bereich
		 * @param max - größte Zahl im Bereich
		 * 
		 * @returns Eine Zahl zwischen __min__ und __max__
		 */
		public rand = (min:number, max:number):number => { return this.data.time.rand(min, max); }

		// ==== graphics ====
		/**
		 * Löscht das Canvas in der eingestellten Farbe
		 */
		public cls = () => {
			this.data.canvas.ctx.fillStyle = this.data.color.cls.rgba();
			this.data.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
			this.data.canvas.ctx.fillRect(0, 0, this.data.canvas.width, this.data.canvas.height);
		}
		/**
		 * Setzt die Löschfarbe für [[cls]]()
		 * 
		 * @param r - die Rotkomponente der Farbe
		 * @param g - die Grünkomponente der Farbe
		 * @param b - die Blaukomponente der Farbe
		 */
		public clsColor = (r:number, g:number, b:number) => { this.data.color.cls.set(r, g, b); }
		public color = (r:number = 255, g:number = 255, b:number = 255, a:number = 1.0) => { this.data.color.draw.set(r, g, b, a); }
		public graphicsWidth = () => { return this.data.canvas.width; }
		public graphicsHeight = () => { return this.data.canvas.height; }
		public tFormFilter = (value:boolean) => { this.data.canvas.ctx.imageSmoothingEnabled = value; }

		// === drawing ====
		public rect = (x:number, y:number, width:number, height:number, filled:boolean = true) => {
			if(filled){
				this.data.canvas.ctx.fillStyle = this.data.color.draw.rgba();
				this.data.canvas.ctx.fillRect(x, y, width, height);
			}else{
				this.data.canvas.ctx.strokeStyle = this.data.color.draw.rgba();
				this.data.canvas.ctx.strokeRect(x, y, width, height);
			}
		}

		public line = (startX:number, startY:number, endX:number, endY:number)  => {
			this.data.canvas.ctx.strokeStyle = this.data.color.draw.rgba();
			this.data.canvas.ctx.beginPath();
			this.data.canvas.ctx.moveTo(startX, startY);
			this.data.canvas.ctx.lineTo(endX, endY);
			this.data.canvas.ctx.stroke();
		}

		// ==== fonts ====
		public loadFont = (path:string, name:string):jFont => {
			this.data.font.current = new jFont(path, name, this);
			return this.data.font.current;
		}
		public setFont = (font:jFont, size:number = 16, bold:boolean = false, italic:boolean = false, weight:number = 0) => {
			this.data.font.current = font;
			this.data.font.current.set(size, bold, italic, weight);
		}
		public drawText = (txt:string, x:number = 0, y:number = 0) => {
			if(this.data.font.current instanceof jFont){
				this.data.font.current.draw(txt, x, y);
			}else{
				this.data.font.default.draw(txt, x, y);
			}
			
		}

		// ==== images ====
		public autoMidHandle = (value:boolean) => { this.data.global.autoMidHandle = value; }
		public midHandle = (img:jImage, value:boolean) => { img.midHandle(value); }
		public loadImage = (path:string, cellWidth:number, cellHeight:number, startCell:number = 1, cellCount:number = 1) => { return new jImage(path, cellWidth, cellHeight, startCell, cellCount, this); }
		public drawImage = (img:jImage, x:number, y:number, frame:number = 1.0) => { img.draw(x, y, frame); }
		public imageWidth = (img:jImage):number => { return img.width(); }
		public imageHeight = (img:jImage):number => { return img.height(); }
		public rotateImage = (img:jImage, value:number) => { img.rotate(value); }
		public imageHandle = (img:jImage):any => { if(img.loaded == true){ return img.handle(); }else{ return 0; } }
		public scaleImage = (img:jImage, x:number = 1.0, y:number = 1.0) => { img.scale(x, y); }
		public createImage = (width:number, height:number, frames:number):jImage => { return new jImage(width, height, frames, this); }
		public imageRectOverlap = (img:jImage, x:number, y:number, startX:number, startY:number, width:number, height:number):boolean => { return img.rectOverlap(x, y, startX, startY, width, height); }
	}
}