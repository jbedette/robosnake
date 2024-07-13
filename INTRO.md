# Robosnake

This is an implementation of a 4-player Snake game, where each player is controlled by a different piece of AI code.

## Gameplay

There is no user input in the game: the keyboard and mouse do not do anything. All four players are controlled by AI agent code. The "Run game" button starts the game.

The game board is a square grid of square cells, drawn below the "Statistics" table. The cells on the grid are the "pixels" on the "screen" that displays the game.

Each player is represented by a different color on the board: A is green, B is blue, C is orange, and D is purple.

Each player starts in a different corner of the game board. On a player's turn, they are allowed to move into any cell adjacent to their current position.

The players take turns in order: A moves first, then B, C, D, and then A again (and so on). The game screen updates the position of every player simultaneously, but if two players try to move into the same cell, the "tie" is broken by turn order.

When a player moves into a cell, the player takes that cell. To indicate this, the cell changes to display the color of the player.

A cell may contain an apple, which is indicated by the color red. In the "Statistics" table, each player has a counter of how many apples they've taken. After each round of turns, new apples are added to the board in random unoccupied cells.

A player loses if they try to move into a cell that has already been taken, or if they try to move outside the boundaries of the game board. This includes if an AI agent tries to move "backwards" (in the opposite direction as its previous move).

The game is over when all players have lost. The "winner" is the player with the highest apples counter at the end of the game.

## Agents

The AI agents cannot "see" the entire board: on their turn, they can only "see" a 5x5 region of cells centered around their current position.
This restriction is implemented in the type of the `agentMove` function, which controls the AI's behavior on each move. This function is not given access to the data of the whole board: it's only given access to the data of the 5x5 region that the current player should be able to "see".
When users are playing the game by writing agents, each agent can do whatever it wants with the region that it can "see": it may run any kind of algorithm over the data structure, or even ignore it altogether.

## The codebase

The codebase is organized into multiple modules within the `src` folder:

- `DrawingLibrary.ts` is a library which is used by the rest of the code. You must not modify this file: it's owned by a different team of developers.
- `GameScreen.ts` defines the `Cell` and `GameScreen` types, which represent "pixels" on the "game board". Do not modify this file.
- `GameRunner.ts` defines the rules of the game, but not the behavior of the AI players.
- `Agent.ts` loads AI agents, holds the agentMove function called by `GameRunner.ts` to move the agents, and has the type definitions of `Player` and `Motion` type used by `GameRunner.ts`, `AgentType.ts`, and the user created agents in the `agents` folder 
- `AgentType.ts` holds the Agent definition and the Custom Movement Modifiers 
- `agents` contains the player programmed AI agents

## Creating agents to use in the Game

To create your own agent with its own movement AI, you will need to:

- Pick a player, `A` starting in the top left corner, `B` in the top right corner, `C` in the bottom left corner, or `D` in the bottom right corner.
- Create a new `$YOUR_AGENT_NAME$Agent.ts` in the `agents` folder using the template provided in the `Agent Template` section futher down this page.
- Modify the `Agent.ts` file to import and use your created agent following the pattern described in the file.

## Agent Template

`DemoAgent.ts`
```
import { Agent, MovementModifier } from "../AgentType";
import { Player, Motion } from "../Agent";
import { ScreenPart, MaybeCell } from "../GameRunner"; // unneccessary if not using ScreenPart

/** 
 * Agent type that always moves right,
 * contains examples for demonstration of available values for agent AI
*/


class CustomMovementModifier implements MovementModifier {
  /**
   * Define custom movement here 
   * Pass Agent itself through this if you want to modify agent.state
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
```

## Agent Movement

An Agent contains a member function movment with may be overwritten by using the MovementModifier interface. To define more complex movement, there are three available values:

- `agent.state`, an integer array contained within the agent type
- `ScreenPart`, a 5x5 graph of the current game state surrounding the head of your snake passed in to the agent.movement() function in `Agent.ts`.
- `MaybeCell`, a type that is either a `Cell` within the game board or `"outside"` signifying a position that would be outside the game board.

### Agent State

For movement based on the passing of turns or time, `agent.state` is an incrementable array of integers with an extendable length is provided. To use this, you will need to pass agent into your `modifyMovement()` function.

Define your state and initialize the contents in the `init` function.

To access and update the agent's state, you have `agent.getState()` and `agent.setState()`.

For a more in-depth example, examine [StairAgent.ts](./src/agents/StairAgent.ts).

### ScreenPart

For movement based on the current state of the game board, you have access to a 5x5 matrix of the game window expanding outward from the head of your snake. Your snake's head position is located at point 2,2.

To use ScreenPart, you will need to import `ScreenPart`, and pass it into your `modifyMovement()` function.

ScreenPart can be used to scan the for `"apple"` or `"empty"` in a cell within the section of the game board supplied by `ScreenPart`.

For a more in-depth example, examine [ScreenPartAgent.ts](./src/agents/ScreenPartAgent.ts).

### MaybeCell

`MaybeCell` type in `GameRunner.ts`, which is a type that is either a game Cell or the string `"outside"`. `MaybeCell` is useful for keeping your snake's AI movement within the game board.

To use `MaybeCell`, import `MaybeCell` in your agent file.

For a more in-depth example, examine [ScreenPartAgent.ts](./src/agents/ScreenPartAgent.ts).