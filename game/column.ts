import * as PIXI from "pixi.js"

export default class {

  column: PIXI.Sprite[] = []

  constructor(public height = 60, public width = 9){
    
  }

  addToGame(stage: PIXI.Container){
    for(let i = 0; i < this.column.length; i++){
      stage.addChild(this.column[i])
    }
  }

  getBounds(i){
    return this.column[i].getBounds()
  }

  move(speed){
    for(let i = 0; i < this.column.length; i++){
      this.column[i].x += speed
    }
  }

  generateSprite(renderer: PIXI.Renderer){
    const graphics = new PIXI.Graphics()
    let x = 600;
    for(let i = 0; i < 10; i++){
      graphics.clear()
      graphics.beginFill(0x995116)
      graphics.lineStyle(0)
      graphics.drawPolygon(this.calcColumnPoints())
      graphics.endFill()

      const texture = renderer.generateTexture(graphics, PIXI.SCALE_MODES.LINEAR, 1);
      this.column.push(new PIXI.Sprite(texture));
      this.column[i].x = x
      this.column[i].y = this.randomY()
      x+=200
    }
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

  randomY(){
    if(Math.random()>.5){
      return Math.random() * -200 - 20
    }
    else{
      return Math.random() * 200 + 100
    }
  }
}