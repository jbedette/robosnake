import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";

/**
 * 
 * Agent type that moves 
 * left one time, 
 * up one time, 
 * left two times, 
 * up two times, 
 * left three times, 
 * up three times, etc. 
 * The number of moves in each direction should keep increasing until the player has lost. 
 * uses state to determine which movment to take
 */
export class CustomMovementModifier implements MovementModifier {
  /**
   * Define custom movement here 
   * @returns Motion
   */
  modifyMovement(agent:Agent): Motion {
    const currState = agent.getState();
    const cycle: Motion[] = ["up",  "left"];
    // select index 0 if even, select 1 if odd
    const index = currState[0] % 2;
    const c: Motion = cycle[index];
    // if count is 0 or less
    if( currState[1] <= 0){
        currState[0]++; 
        if(currState[0]%2 != 0){
            currState[2]++
        }
        currState[1] = currState[2];
    }
    else {
        currState[1]--;
    }
    agent.setState(currState);
    return c;

  }
}

/**
 * @param player 
 * @returns Agent with custom movement
 */
export function init(player:Player):Agent{
    const s: number[] = [0,0,0];
    const agent = new Agent(player, s);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
