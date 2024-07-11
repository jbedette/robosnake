import { Agent, MovementModifier, Player, Motion } from "../Agent";
import { SnakeState } from "../GameRunner";

// Agent type that moves 
// left one time, 
// up one time, 
// left two times, 
// up two times, 
// left three times, 
// up three times, etc. 
// The number of moves in each direction should keep increasing until the player has lost. 
// uses state to determine which movment to take

class CustomMovementModifier implements MovementModifier {
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

export function init(player:Player,snakeState:SnakeState):Agent{
    const s: number[] = [0,0,0];
    const agent = new Agent(player, s, snakeState);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
