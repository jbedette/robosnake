import { Agent, MovementModifier, Player, Motion } from "../Agent";
import { SnakeState } from "../GameRunner";

// Agent type that 
// cycles through the moves 
// up, up, right, down, right,

class CustomMovementModifier implements MovementModifier {
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

export function init(player:Player, snakeState:SnakeState):Agent{
    const s: number[] = [0];
    const agent = new Agent(player, s, snakeState);
    const customModifier = new CustomMovementModifier();

    agent.setMovement(customModifier);
    return agent;
}
