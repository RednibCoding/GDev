namespace jBB{
	export class jImage{
		private path:string;
		private img:HTMLImageElement = new Image();
		private imgData;
		public loaded:boolean = false;
		private ctx:Core;
		private cnv:any;
		private frame = { num : 1, width : 0, height: 0, start: 1, current: 1 };
		private hndl = { x : 0, y : 0 };
		private autoMidHandle:boolean = false;
		private localMidHandle:boolean = false;
		private scaleFac = { x : 1.0, y : 1.0 };
		private rotation:number = 0;

		constructor(width:number, height:number, frames:number, context:Core)
		constructor(path:string, cellWidth:number, cellHeight:number, startCell:number, cellCount:number, context:Core)
		constructor(arg01?:any, arg02?:any, arg03?:any, arg04?:any, arg05?:any, arg06?:any){
			this.ctx = arg06;
			this.cnv = this.ctx.data.canvas.ctx;
			this.autoMidHandle = this.ctx.data.global.autoMidHandle;

			if(typeof(arg01) === "string"){
				// load image
				this.img.src = arg01;

				if(typeof(arg02) === "number") this.frame.width = arg02;
				if(typeof(arg03) === "number") this.frame.height = arg03;
				this.frame.start = arg04;
				this.frame.num = arg05;
				this.ctx = arg06;

				this.img.onload = (data) => {
					this.loaded = true;
					
					if(this.frame.num === 1){
						this.frame.width = this.img.width;
						this.frame.height = this.img.height;
					} 
				}

			}else if(typeof(arg01) === "number"){
				// create a new image
				this.img.width = arg01;
				this.img.height = arg02;
				this.frame.num = arg03;
				this.ctx = arg04;
				this.img = new Image(arg01, arg02);
			}
		}

		public draw = (x:number, y:number, frame:number = 1) => {
			var origX = x; 
			var origY = y;
			x /= this.scaleFac.x;
			y /= this.scaleFac.y;

			if(this.loaded == true){
				var tilePos = this.getTilePos(frame - 1);
				var dx = x - this.hndl.x; var dy = y - this.hndl.y;
				
				if(this.autoMidHandle == true || this.localMidHandle){
					dx -= (this.frame.width / 2);
					dy -= (this.frame.height / 2);
				}
				
				this.cnv.save();
				this.cnv.translate(origX, origY);
				this.cnv.rotate(this.rotation * Math.PI / 180);
				this.cnv.translate(-origX, -origY);
				this.cnv.scale(this.scaleFac.x, this.scaleFac.y);
				this.cnv.drawImage(this.img, tilePos.x, tilePos.y, this.frame.width, this.frame.height, dx, dy, this.frame.width, this.frame.height);
				this.cnv.scale(1.0, 1.0);
				this.cnv.restore();
			}
		}

		public handle = (x:number = undefined, y:number = undefined) => {
			if(x === undefined){
				if(this.autoMidHandle == true || this.localMidHandle){
					return { x : this.hndl.x + this.img.width / 2, y : this.hndl.y + this.img.height / 2 };
				}else{
					return this.hndl;
				}
			}else{
				x /= this.scaleFac.x;
				y /= this.scaleFac.y;
				this.hndl = { x : x, y : y };
			}
		}

		public midHandle = (value:boolean) => { this.localMidHandle = value; }

		public imageDataObject = ():ImageData => {
			// create image data
			this.ctx.clearBackbuffer();
			this.ctx.data.canvas.bbf.drawImage(this.img, 0, 0);
			this.imgData = this.ctx.data.canvas.bbf.getImageData(0, 0, this.img.width, this.img.height);

			return this.imgData;
		}

		public width = ():number => { return this.img.width; }
		public height = ():number => { return this.img.height; }
		public rotate = (value:number) => { this.rotation = value; }
		public scale = (x:number = 1.0, y:number = 1.0) => { this.scaleFac = { x : x, y : y }; }
		public rectOverlap = (x:number, y:number, startX:number, startY:number, width:number, height:number):boolean => {
			var r1 = { left : x, top : y, right : x + this.img.width, bottom : y + this.img.height };
			var r2 = { left : startX, top : startY, right : startX + width, bottom : startY + height };
			
			return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
		}

		private cellsPerRow = ():number => { return this.img.width / this.frame.width; }
		private getTilePos = (index:number):any => {
			return { x : (index % this.cellsPerRow() * this.frame.width), y : (Math.floor(index / this.cellsPerRow())) * this.frame.height };
		}
		private getTileIndex = (x:number, y:number):number => { return (x / this.frame.width) + (y / this.frame.height * this.cellsPerRow()); }
	}
}