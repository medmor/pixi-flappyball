import * as PIXI from "pixi.js"
import Ball from "./ball"
import Column from "./column"
export default class extends PIXI.Application {

  ball: Ball = null
  started = false
  column: Column = null


  constructor(){
    super({width: 600, height: 400, backgroundColor: 0x00BDF0})

    this. ball = new Ball(5, -10);
    this.ball.generateSprite(this.renderer)
    this.ball.addToGame(this.stage)

    this.ball.resetBall()

    this.startTicker()

    this.column = new Column()
    this.column.generateSprite(this.renderer)
    this.column.addToGame(this.stage)

    this.input()
  }

  startTicker(){
    this.ticker.start
    this.ticker.add(this.loop.bind(this))
    
  }

  loop(deltatime){
    if(this.started){
      this.ball.move()
      if(this.ball.verticaleSpeed<this.ball.fallSpeed){
        this.ball.verticaleSpeed += .6
      }
      this.column.move(-1*deltatime)
    }
    const rect = this.column.column.getBounds()
    if(this.ball.hitColumn(rect.x, rect.y, rect.width, rect.height)){
      console.log("hit")
    }
  }

  input(){
    document.addEventListener('keydown', (e: KeyboardEvent)=>{
      if(e.keyCode === 32){
        if(this.started)
        this.ball.verticaleSpeed = this.ball.jumpSpeed
        if(!this.started) this.started = true
      }
    })

    document.addEventListener('mousedown', ()=>{
      if(this.started)
      this.ball.verticaleSpeed = this.ball.jumpSpeed
      if(!this.started) this.started = true
    })
  }

}