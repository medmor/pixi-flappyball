
import Game from "./game/game"

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
const game = new Game()

appDiv.appendChild(game.view)
window.focus()


