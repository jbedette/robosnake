import { agentMove, Motion, Agent } from "./Agent";
import { initializeAgent } from "./AgentType";
import { scheduleNextUpdate, updateApples, updateLost } from "./DrawingLibrary";
import { Cell, draw, GameScreen } from "./GameScreen";

// a MaybeCell is either a Cell or the string "outside"
export type MaybeCell = Cell | "outside";

// a ScreenPart is a 5x5 array of MaybeCell arrays
export type ScreenPart = MaybeCell[][];

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class SnakeState extends Point {
  public apples: number;
  public lost: boolean;

  constructor(x: number, y: number) {
    super(x, y); // call Point constructor to set x and y
    this.apples = 0;
    this.lost = false;
  }

  public setPoint(p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }
}

// x and y are the left and top coordinate of a 5x5 square region.
// cells outside the bounds of the board are represented with "outside"
export function getScreenPart(screen: GameScreen, s: SnakeState): ScreenPart {
  const part: ScreenPart = new Array<MaybeCell[]>(5);
  for (let j = 0; j < 5; j++) {
    part[j] = new Array<MaybeCell>(5);
    for (let i = 0; i < 5; i++) {
      if (s.x+i-2 >= 0 && s.y-2 + j >= 0 && s.x-2 + i < screen.length && s.y-2 + j < screen.length)
        part[j][i] = screen[s.y+j-2][s.x+i-2];
      else
        part[j][i] = "outside";
    }
  }
  return part;
}

// stepTime is a number of milliseconds
export function run(stepTime: number, newApplesEachStep: number, screen: GameScreen): void {

  // player initial positions
  const a = new SnakeState(0,0);
  const b = new SnakeState(screen.length - 1, 0);
  const c = new SnakeState(0, screen.length - 1);
  const d = new SnakeState(screen.length - 1, screen.length - 1);
  const A = initializeAgent("A",a);
  const B = initializeAgent("B",b);
  const C = initializeAgent("C",c);
  const D = initializeAgent("D",d);

  // draw starting screen
  screen[a.y][a.x] = "A";
  screen[b.y][b.x] = "B";
  screen[c.y][c.x] = "C";
  screen[d.y][d.x] = "D";
  draw(screen);

  // this will wait for stepTime milliseconds and then call step with these arguments
  scheduleNextUpdate(stepTime, () => step(stepTime, newApplesEachStep, screen, A, B, C, D));
  // the "() =>" part is important!
  // without it, step will get called immediately instead of waiting
}

function locationAfterMotion(motion: Motion, snake: SnakeState): Point {
  switch (motion) {
    case "left": return new Point(snake.x-1, snake.y);
    case "right": return new Point(snake.x+1, snake.y);
    case "up": return new Point(snake.x, snake.y-1);
    case "down": return new Point(snake.x, snake.y+1);
  }
}

export function step(
  stepTime: number,
  newApplesEachStep: number,
  screen: GameScreen,
  snakeA: Agent,
  snakeB: Agent,
  snakeC: Agent,
  snakeD: Agent
): void {
  // make snake array
  const snakes = [snakeA,snakeB,snakeC,snakeD];
  // generate new apples
  for (let i = 0; i < newApplesEachStep; i++) {
    // random integers in the closed range [0, screen.length]
    const x = Math.floor(Math.random() * screen.length);
    const y = Math.floor(Math.random() * screen.length);
    // if we generated coordinates that aren't empty, skip this apple
    if (screen[y][x] == "empty")
      screen[y][x] = "apple";
  }

  // iterate through snake array
  // players take turns in order: A -> B -> C -> D -> A -> B -> C -> D -> ...
  snakes.forEach((snake) => {
    const snakeState = snake.getSnakeState();
    if (!snakeState.lost) {
      const temp = locationAfterMotion(agentMove(snake, getScreenPart(screen, snake.getSnakeState())), snake.getSnakeState());
      if (temp.x < 0 || temp.y < 0 || temp.x >= screen.length || temp.y >= screen.length) // hit the edge of the screen
        snakeState.lost = true;
      else
        switch (screen[temp.y][temp.x]) {
          case "empty": { // make the move
            snakeState.setPoint(temp);
            screen[temp.y][temp.x] = snake.getPlayer();
            break;
          }
          case "apple": { // make the move and eat the apple
            snakeState.setPoint(temp);
            snakeState.apples++;
            screen[temp.y][temp.x] = snake.getPlayer();
            break;
          }
          default: { // lose
            snakeState.lost = true;
            break;
          }
        }
    }
    snake.setSnakeState(snakeState);
  });

  // update game screen
  draw(screen);

  // update snake statistics
  snakes.forEach((snake) => {
    updateLost(snake.getPlayer(), snake.getSnakeState().lost); updateApples(snake.getPlayer(), snake.getSnakeState().apples);
  });
  
  // run again unless everyone has lost
  if (!snakeA.getSnakeState().lost || !snakeB.getSnakeState().lost || !snakeC.getSnakeState().lost || !snakeD.getSnakeState().lost)
    scheduleNextUpdate(stepTime, () => step(stepTime, newApplesEachStep, screen, snakeA, snakeB, snakeC, snakeD));
}