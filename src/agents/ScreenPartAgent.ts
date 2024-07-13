import { ScreenPart, MaybeCell } from "../GameRunner";
import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

/**
 * 
 * @fileoverview Go for any nearby apple,
 * otherwise random
 */

class CustomMovementModifier implements MovementModifier {
  /**
   * 
   * @param agent 
   * @param part 
   * @returns 
   */
  modifyMovement(agent:Agent, part:ScreenPart): Motion {


    const rnd: number = Math.random() * 4; // random float in the half-open range [0, 4)

    let x: Motion;
    if (rnd < 1) x = "up";
    else if (rnd < 2) x = "down";
    else if (rnd < 3) x = "left";
    else x = "right";

    // try not to hit anything
    if (this.tryMove(x, part) != "apple" && this.tryMove(x, part) != "empty") {
      switch (x) {
        case "up": return "down";
        case "right": return "left";
        case "down": return "up";
        case "left": return "right";
      }
    }

    return x;
  }

  /**
   * 
   * @param m 
   * @param p 
   * @returns 
   */
  tryMove(m: Motion, p: ScreenPart): MaybeCell {
    // the snake is positioned in the center at p[2][2]
    switch (m) {
      case "left": return p[2][1];
      case "right": return p[2][3];
      case "up": return p[1][2];
      case "down": return p[3][2];
      default : return p[2][1];
    }
  }
}

/**
 * 
 * @param player 
 * @returns 
 */
export function init(player:Player):Agent{
    const s: number[] = [];
    const agent = new Agent(player, s);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
