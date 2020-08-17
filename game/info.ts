import * as PIXI from "pixi.js"

export default class {
  
  //time: PIXI.Text =  new PIXI.Text('', {fontSize: 30})
  score: PIXI.Text = new PIXI.Text('',  {fontSize: 30, fill: 0xffffff})

  constructor(){
    this.resetValues()
    this.setPositions()
  }

  resetValues(){
    this.setScore(0)
    this.setTime(1)
  }

  setPositions(){

    //this.time.anchor.set(.5)
    //this.time.x = 500
    //this.time.y = 50

    //this.score.anchor.set(.5)
    this.score.x = 10
    this.score.y = 10
  }

  setScore(value: number){
    this.score.text = value.toString()
  }

  setTime(value: number){
    let minutes = Math.floor(value / 60000);
    let seconds = (value % 60000) / 1000;
    let secondsf = seconds.toFixed(1)
    //this.time.text = minutes + ":" + (parseInt(secondsf) < 10 ? '0' : '') + secondsf;
  }

  addToStage(stage: PIXI.Container){
    //stage.addChild(this.time)
    stage.addChild(this.score)
  }

  removeFromStage(stage: PIXI.Container){
    //stage.removeChild(this.time)
    stage.removeChild(this.score)
  }


}