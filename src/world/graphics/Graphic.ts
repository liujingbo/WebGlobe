﻿///<amd-module name="world/graphics/Graphic"/>

import Kernel = require("../Kernel");
import Geometry = require("../geometries/Geometry");
import Material = require("../materials/Material");
import Program = require("../Program");
import ProgramUtils = require("../ProgramUtils");
import PerspectiveCamera = require("../PerspectiveCamera");

interface GraphicOptions{
    geometry: Geometry;
    material: Material;
    parent: any;
    visible?: boolean;
}

abstract class Graphic{
    id:number;
    visible: boolean = true;
    parent: any;
    program: Program;

    constructor(public geometry: Geometry, public material: Material){
        this.id = ++Kernel.idCounter;
        this.parent = null;
        this.program = ProgramUtils.getProgram(this);
    }

    setVisible(visible: boolean){
        this.visible = visible;
    }

    abstract createProgram(): Program

    getProgramType() {
        return this.material.getType();
    }

    isReady(): boolean{
        return this.geometry && this.material && this.material.isReady();
    }

    isDrawable(): boolean{
        return this.visible &&  this.isReady();
    }

    draw(camera: PerspectiveCamera){
        if(this.isDrawable()){
            this.program.use();
            this.onDraw(camera);
        }
    }

    abstract onDraw(camera: PerspectiveCamera):void

    destroy(){
        this.parent = null;
        //释放显卡中的资源
        this.geometry.destroy();
        this.material.destroy();
        this.geometry = null;
        this.material = null;
    }
}

export = Graphic;