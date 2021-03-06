///<amd-module name="world/ProgramUtils"/>

import Program = require("./Program");
import Graphic = require("./graphics/Graphic");

const programs:Program[] = [];

const ProgramUtils = {

	getProgram(graphic: Graphic){
		var program:Program = null;

		var programType = graphic.getProgramType();

		programs.some(function(item){
			if(item.type === graphic.getProgramType()){
				program = item;
				return true;
			}else{
				return false;
			}
		});

		if(!program){
			program = graphic.createProgram();
			programs.push(program);
		}

		return program;
	}
};

export = ProgramUtils;