import * as PIXI from "pixi.js"

export default class {

  ball: PIXI.Sprite = null
  verticaleSpeed: number = 0
  

  constructor(public fallSpeed, public jumpSpeed){
    this.verticaleSpeed = this.fallSpeed;
  }

  hitColumn(rx: number, ry: number, rw: number, rh: number): boolean {

    // temporary variables to set edges for testing
    let testX = this.ball.x;
    let testY = this.ball.y;

    // which edge is closest?
    if (this.ball.x < rx)         testX = rx;      // test left edge
    else if (this.ball.x > rx+rw) testX = rx+rw;   // right edge
    if (this.ball.y < ry)         testY = ry;      // top edge
    else if (this.ball.y > ry+rh) testY = ry+rh;   // bottom edge

    // get distance from closest edges
    let distX = this.ball.x-testX;
    let distY = this.ball.y-testY;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the radius, collision!
    if (distance <= 20) {
      return true;
    }
    return false;
  }




  generateSprite(renderer: PIXI.Renderer){
    const graphics = new PIXI.Graphics()
    graphics.clear()
    graphics.beginFill(0x995116)
    graphics.lineStyle(0)
    graphics.drawCircle(0, 0, 20)
    graphics.endFill()

    const texture = renderer.generateTexture(graphics, PIXI.SCALE_MODES.LINEAR, 1);
    this.ball = new PIXI.Sprite(texture);
    this. ball.anchor.set(.5)
  }

  move(){
    this.ball.y += this.verticaleSpeed
    if(this.ball.y < 0) this.ball.y = 20
  }

  verticale(speed: number){
    this.ball.y += speed
  }


  horizontale(speed: number){
    this.ball.x += speed
  }

  resetBall(){
    this.ball.x = 180
    this.ball.y = 30
  }

  addToGame(stage: PIXI.Container){
    stage.addChild(this.ball)
  }

  removeFromGame(stage: PIXI.Container){
    stage.removeChild(this.ball)
  }




}