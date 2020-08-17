import {Howl, Howler} from 'howler';

export default class SoundManager{
  static music : Howl = null
  static jump : Howl = null
  static hit : Howl = null



  static load(callback: ()=>void){
    this.music = new Howl({
      src: ['https://github.com/medmor/pixi-flappyball/raw/master/sounds/music.mp3'],
      volume: .6,
      loop: true
      });
    this.jump = new Howl({src: ['https://github.com/medmor/pixi-flappyball/raw/master/sounds/jump.wav']})
    this.hit = new Howl({src: ['https://github.com/medmor/pixi-flappyball/raw/master/sounds/hit.wav']})
      

    this.music.on('load', ()=>{
      this.music.play()
      callback()
    })
  }
}

