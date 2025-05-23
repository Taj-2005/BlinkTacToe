import { Howl } from 'howler';

const blast = new Howl({ src: ['/sounds/click1.mp3'] });
const oops = new Howl({ src: ['/sounds/disappear1.mp3'] });
const win = new Howl({ src: ['/sounds/win.mp3'] });
const start = new Howl({ src: ['/sounds/start1.mp3'] });
const click = new Howl({ src: ['/sounds/start2.mp3'] });

export default function useSound() {
  return {
    playBlast: () => blast.play(),
    playOops: () => oops.play(),
    playWin: () => win.play(),
    playStart: () => start.play(),
    playOnClick: () => click.play()
  };
}
