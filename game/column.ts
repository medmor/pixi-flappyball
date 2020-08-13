import * as PIXI from "pixi.js"

export default class {

  columns: PIXI.Sprite[] = []

  constructor(public height = 70, public width = 9){
    
  }

  addToGame(stage: PIXI.Container){
    for(let i = 0; i < this.columns.length; i++){
      stage.addChild(this.columns[i])
    }
  }

  removeFromGame(stage: PIXI.Container){
    for(let i = 0; i< this.columns.length; i++){
      stage.removeChild(this.columns[i])
    }
    this.columns = []
  }

  getBounds(i){
    return this.columns[i].getBounds()
  }

  move(speed){
    for(let i = 0; i < this.columns.length; i++){
      this.columns[i].x += speed
      if(this.columns[i].x<-300){
        this.columns[i].x = 600
        this.columns[i].y = this.randomY()

      }
    }
  }

  generateSprite(renderer: PIXI.Renderer){
    const graphics = new PIXI.Graphics()
    let x = 600;
    for(let i = 0; i < 3; i++){
      graphics.clear()
      //graphics.beginFill(0x995116)
      graphics.lineStyle(2, 0xffffff)
      graphics.drawPolygon(this.calcColumnPoints())
      graphics.endFill()

      const texture = renderer.generateTexture(graphics, PIXI.SCALE_MODES.LINEAR, 1);
      this.columns.push(new PIXI.Sprite(texture));
      this.columns[i].x = x
      this.columns[i].y = this.randomY()
      x+=300
    }
    graphics.destroy()
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
      return Math.random() * 100 + 200
    }
  }
}