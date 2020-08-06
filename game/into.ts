import * as PIXI from "pixi.js"

export default class Intro{
  graphics = new PIXI.Graphics();
  rectangle: PIXI.Sprite
  circle: PIXI.Sprite
  triangle: PIXI.Sprite
  clickCallback: () => void


  constructor(public app: PIXI.Application, clickCallback: ()=> void){
    this.rectangle = this.rectangleGenerate()
    this.rectangle.alpha = .5
    this.circle = this.circleGenerate()
    this.circle.anchor.set(.5)
    this.circle.x = 300
    this.circle.y = 200
    this.triangle = this.triangelGenerate()
    this.triangle.anchor.set(.5)
    this.triangle.x = 300 + 3
    this.triangle.y = 200

    this.setButton()
    this.clickCallback = clickCallback
    this.graphics.destroy()
  }

  rectangleGenerate(){
    this.graphics.clear()
    this.graphics.beginFill(0x9951FF);
    this.graphics.lineStyle(0);
    this.graphics.drawRect(0, 0, 600, 400);
    this.graphics.endFill();

    let texture = this.app.renderer.generateTexture(this.graphics, PIXI.SCALE_MODES.LINEAR, 1);
    return new PIXI.Sprite(texture);
  }
  
  circleGenerate(){
    this.graphics.clear()
    this.graphics.beginFill(0xFF);
    this.graphics.lineStyle(0);
    this.graphics.drawCircle(0, 0, 30);
    this.graphics.endFill();

    let texture = this.app.renderer.generateTexture(this.graphics, PIXI.SCALE_MODES.LINEAR, 1);
    return new PIXI.Sprite(texture);
  }

  triangelGenerate(){
    this.graphics.clear()
    this.graphics.beginFill(0x00ff00)
    this.graphics.lineStyle(0)
    this.graphics.drawPolygon([0, 0, 30, 15, 0, 30])
    this.graphics.endFill()

    return new PIXI.Sprite(this.app.renderer.generateTexture(this.graphics, PIXI.SCALE_MODES.LINEAR, 1))
  }

  setButton(){
    this.circle.interactive = true;
    this.circle.buttonMode = true;

    this.circle
        .on('pointerup', this.onClick.bind(this))
        .on('pointerover', this.onMouseEnter.bind(this))
        .on('pointerout', this.onMouseLeave.bind(this));
  }

  onClick(){
    this.removeFromStage()
    this.clickCallback()
  }

  onMouseLeave(){
    this.circle.scale.set(1)
    this.triangle.scale.set(1)
  }

  onMouseEnter(){
    this.circle.scale.set(1.2)
    this.triangle.scale.set(1.2)
  }

  addToStage(){
    this.app.stage.addChild(this.rectangle)
    this.app.stage.addChild(this.circle)
    this.app.stage.addChild(this.triangle)
  }

  removeFromStage(){
    this.app.stage.removeChild(this.rectangle)
    this.app.stage.removeChild(this.circle)
    this.app.stage.removeChild(this.triangle)
  }


}