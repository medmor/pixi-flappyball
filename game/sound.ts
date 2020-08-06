import {Howl, Howler} from 'howler';

export default class SoundManager{
  music : Howl = null
  win : Howl = null
  lose : Howl = null



  load(){
    this.music = new Howl({
      src: ['https://github.com/medmor/alphabets/raw/master/sounds/bensoundMusic.mp3'],
      volume: .6,
      loop: true
      });
    this.win = new Howl({src: ['https://github.com/medmor/alphabets/raw/master/sounds/win.wav']})
    this.lose = new Howl({src: ['https://github.com/medmor/alphabets/raw/master/sounds/lose.wav']})
      

    this.music.on('load', ()=>{
      this.music.play()
    })
  }

}

