namespace jBB{
	export class jColor{
		public red = 0;
		public green = 0;
		public blue = 0;
		public alpha = 1.0;

		constructor(red:number = 0, green:number = 0, blue:number = 0, alpha:number = 1.0){
			this.red = red;
			this.green = green;
			this.blue = blue;
			this.alpha = alpha;
		}

		rgba = () => {
			return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
		}

		set = (r:number = 0, g:number = 0, b:number = 0, a:number = 1.0 ) => {
			this.red = r;
			this.green = g;
			this.blue = b;
			this.alpha = a;
		}
	}
}