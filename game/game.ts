import * as PIXI from "pixi.js"
import Ball from "./ball"
import Column from "./column"
import Sound from "./sound"
import Intro from "./intro"


export default class extends PIXI.Application {

  intro: Intro = null
  ball: Ball = null
  column: Column = null



  constructor(){
    super({width: 600, height: 400, backgroundColor: 0x00BDF0})

    this.intro = new Intro(this, this.beginGame.bind(this))
    this.intro.addToStage()

    this. ball = new Ball(5, -10);
    this.ball.generateSprite(this.renderer)
    this.ball.addToGame(this.stage)

    this.ball.resetBall()

    this.ticker.start

    this.column = new Column()
    this.column.generateSprite(this.renderer)
    this.column.addToGame(this.stage)

    this.input()
  }


  loop(deltatime){
      this.ball.move()
      if(this.ball.verticaleSpeed<this.ball.fallSpeed){
        this.ball.verticaleSpeed += .6
      }
      this.column.move(-1*deltatime)

    for(let i = 0; i < this.column.columns.length; i++){
      const rect = this.column.getBounds(i)
      if(this.ball.hitColumn(rect.x, rect.y, rect.width, rect.height)){
        Sound.hit.play()
        this.ball.removeFromGame(this.stage)
        this.ticker.remove(this.loop, this)
        this.ball.generateParticles(this.stage, ()=>{
          this.intro.addToStage()
          this.ball.addToGame(this.stage)
          this.ball.resetBall()
        })
        this.ticker.add(this.ball.animateParticles, this.ball)
      }
    }
  }

  input(){
    document.addEventListener('keydown', (e: KeyboardEvent)=>{
      if(e.keyCode === 32){
          this.ball.verticaleSpeed = this.ball.jumpSpeed
          Sound.jump.play()
      }
    })

    document.addEventListener('mousedown', ()=>{
        this.ball.verticaleSpeed = this.ball.jumpSpeed
        if(Sound.jump)
        Sound.jump.play()

    })
  }

  beginGame(){
    this.ticker.add(this.loop, this)
    if(!Sound.music)
    Sound.load()
    this.intro.removeFromStage()
  }

}