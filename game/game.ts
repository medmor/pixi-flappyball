import * as PIXI from "pixi.js"
import Ball from "./ball"
import Column from "./column"
import Sound from "./sound"
import Intro from "./into"


export default class extends PIXI.Application {

  intro: Intro = null
  ball: Ball = null
  started = false
  column: Column = null



  constructor(){
    super({width: 600, height: 400, backgroundColor: 0x00BDF0})

    this.intro = new Intro(this, this.beginGame.bind(this))
    this.intro.addToStage()

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
    this.ticker.add(this.loop, this)
  }

  loop(deltatime){
    if(this.started){
      this.ball.move()
      if(this.ball.verticaleSpeed<this.ball.fallSpeed){
        this.ball.verticaleSpeed += .6
      }
      this.column.move(-1*deltatime)
    }

    for(let i = 0; i < this.column.columns.length; i++){
      const rect = this.column.getBounds(i)
      if(this.ball.hitColumn(rect.x, rect.y, rect.width, rect.height)){
        Sound.hit.play()
        this.ball.removeFromGame(this.stage)
        this.ticker.stop()
        this.ticker.remove(this.loop, this)
        this.ball.generateParticles(this.stage)
        this.ticker.add(this.ball.animateBall, this.ball)
        this.ticker.start()
      }
    }
  }

  input(){
    document.addEventListener('keydown', (e: KeyboardEvent)=>{
      if(e.keyCode === 32){
        if(this.started){
          this.ball.verticaleSpeed = this.ball.jumpSpeed
          Sound.jump.play()
        }
      }
    })

    document.addEventListener('mousedown', ()=>{
      if(this.started){
        this.ball.verticaleSpeed = this.ball.jumpSpeed
        Sound.jump.play()
      }

    })
  }

  beginGame(){
    this.started = true
    Sound.load()
    this.intro.removeFromStage()
  }

}