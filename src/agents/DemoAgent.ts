import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";
import { ScreenPart, MaybeCell } from "../GameRunner"; // unnessessary if not using ScreenPart

/** 
 * @fileoverview Demo Agent type that
 * always moves right,
 * contains examples for demonstration of available values for agent AI
*/


class CustomMovementModifier implements MovementModifier {
  /**
   * Define custom movement here 
   * Pass agent itself through this if you want to modify agent.state
   * Pass Screenpart for access to game state 
   */
  modifyMovement(agent:Agent, part:ScreenPart): Motion {
    let state = agent.getState();
    let rightOfAgent: MaybeCell = part[2][3]
    // do something with state or ScreenPart
    // ...
    return "right";
  }
}

export function init(player:Player):Agent{
    const s: number[] = [0]; // set length and initial values of agent state here
    const agent = new Agent(player, s);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}