namespace jBB{
	export class jFont{
		private ctx:Core;
		private name:string;

		constructor(path:string, name:string, context:Core){
			this.ctx = context;
			this.name = name;

			var css:HTMLStyleElement = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = "@font-face{ font-family: '" + this.name + "'; src: url(" + path + "); }";
			document.body.appendChild(css);
		}

		set = (size:number = 16, bold:boolean = false, italic:boolean = false, weight:number = 0) => {
			var data:string = "";
			if(bold == true){
				if(weight > 0){ data += weight;	}else{ data += "bold "; }
			}
			if(italic == true) data += "oblique ";
			this.ctx.data.canvas.ctx.font = data + size + "px " + this.name;
		}

		draw = (text:string, x:number = 0, y:number = 0) => {
			this.ctx.data.canvas.ctx.fillStyle = this.ctx.data.color.draw.rgba();
			this.ctx.data.canvas.ctx.fillText(text, x, y);
		}
	}
}