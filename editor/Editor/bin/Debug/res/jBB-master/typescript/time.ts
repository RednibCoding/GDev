namespace jBB{
	export class jTime{
		public milliSecs = ():number => {
			return new Date().getTime();
		}

		public rand = (min:number, max:number):number => {
			return Math.floor(Math.random() * max) + min;
		}
	}
}