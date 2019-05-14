namespace jBB{
	export class jKeyboard{
		private ctx:Core;
		private keys:boolean[];

		constructor(context:Core){
			this.ctx = context;

			this.ctx.data.canvas.element.onkeydown = this.saveKeyDown;
			this.ctx.data.canvas.element.onkeyup = this.saveKeyUp;
		}

		private saveKeyDown = (event) => { this.keys[event.keyCode] = true; }
		private saveKeyUp = (event) => { this.keys[event.keyCode] = false; }

		public down = (key):boolean => { return this.keys[key]; }
		public hit = (key):boolean => {
			var result:boolean = this.keys[key];
			this.keys[key] = false;
			return result;
		}
		public flush = () => {
			for(let index in this.keys){
				this.keys[index] = false;
			}
		}
	}
}