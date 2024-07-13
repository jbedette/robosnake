import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

/**
 * @fileoverview Agent type that 
 * cycles through the moves 
 * up, up, right, down, right,
 * 
 */

class CustomMovementModifier implements MovementModifier {
  /**
   * Define custom movement here 
   * @returns Motion
   */
  modifyMovement(agent:Agent) {
    const currState = agent.getState();
    const cycle: Motion[] = ["up", "up", "right", "down", "right"];

    // Set initial movement to "up"
    let c:Motion = cycle[0];

    c = cycle[currState[0]];
    currState[0]++;
    currState[0] = currState[0] % cycle.length;
    agent.setState(currState);
    return c;
  }
}

/**
 * @param player 
 * @returns Agent with custom movement
 */
export function init(player:Player):Agent{
    const s: number[] = [0];
    const agent = new Agent(player, s);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
