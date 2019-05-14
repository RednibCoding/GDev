namespace jBB{
	export class jMouse{
		public x:number;
		public y:number;
		public xSpeed:number;
		public ySpeed:number;
		public zSpeed:number;
		public keys:boolean[];
		private ctx:Core;

		constructor(context:Core){
			this.ctx = context;
			this.keys = [];
			this.ctx.data.canvas.element.onmousemove = this.saveMousePos;
			this.ctx.data.canvas.element.onmousedown = this.saveMouseDown;
			this.ctx.data.canvas.element.onmouseup = this.saveMouseUp;
		}

		private saveMousePos = (event:any) => {
			var r = this.ctx.data.canvas.element.getBoundingClientRect();
			this.x = event.clientX - r.left;
			this.y = event.clientY - r.top;
		}

		private saveMouseDown = (event) => { this.keys[event.button] = true; }
		private saveMouseUp = (event) => { this.keys[event.button] = false; }

		public down = (key:number):boolean => { return this.keys[key]; }
		public hit = (key:number):boolean => {
			var result:boolean = this.keys[key];
			this.keys[key] = false;
			return result;
		}
		public flush = () => {
			for(let index in this.keys){
				this.keys[index] = false;
			}
		}
		public get = ():number[] => {
			var result:number[] = [];
			for(let index in this.keys){
				if(this.keys[index]) result.push(Number(index));
			}
			return result;
		}
	}
}