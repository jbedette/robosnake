import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

/**
 * Agent type that 
 * cycles through the moves 
 * up, up, right, down, right,
 * 
 */
export class CustomMovementModifier implements MovementModifier {
  /**
   * @params
   * @returns
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
 * @params
 * @returns
 */
export function init(player:Player):Agent{
    const s: number[] = [0];
    const agent = new Agent(player, s);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
