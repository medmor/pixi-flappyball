import * as PIXI from "pixi.js"

export default class {

  column: PIXI.Sprite = null

  constructor(public height = 60, public width = 9){
    
  }

  addToGame(stage: PIXI.Container){
    stage.addChild(this.column)
  }

  getBounds(){
    return this.column.getBounds()
  }

  move(speed){
    this.column.x += speed
  }

  generateSprite(renderer: PIXI.Renderer){
    const graphics = new PIXI.Graphics()
    graphics.clear()
    graphics.beginFill(0x995116)
    graphics.lineStyle(0)
    graphics.drawPolygon(this.calcColumnPoints())
    graphics.endFill()

    const texture = renderer.generateTexture(graphics, PIXI.SCALE_MODES.LINEAR, 1);
    this.column = new PIXI.Sprite(texture);
    this.column.x = 600
    this.column.y = 100
  }

  calcColumnPoints(){
    const points: PIXI.Point[] = []
    let x = 0
    let y = 0
    for(let i = 0; i< this.height; i++){
      if(i%2==0){
        points.push(new PIXI.Point(x,y))
      }else{
        points.push(new PIXI.Point(x-15, y))
      }
      y+=4
    }
    for(let i = 0; i<=this.width;i++){
      if(i%2==0){
        points.push(new PIXI.Point(x,y))
      }else{
        points.push(new PIXI.Point(x, y+15))
      }
      x+=4
    }
    for(let i = 0; i<= this.height; i++){
      if(i%2==0){
        points.push(new PIXI.Point(x,y))
      }else{
        points.push(new PIXI.Point(x+15, y))
      }
      y-=4
    }
    for(let i = 0; i<=this.width;i++){
      if(i%2==0){
        points.push(new PIXI.Point(x,y))
      }else{
        points.push(new PIXI.Point(x, y-15))
      }
      x-=4
    }
    points.push(new PIXI.Point(0,0))
    return points
  }
}