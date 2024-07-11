

    In a file named AgentType.ts, write a TypeScript type definition for an Agent type that will allow agent code to be more portable as described above. You should probably use an interface type, unless you have some experience in functional programming and you want to try a functional solution.

    In a file named Plan.txt, briefly describe how the code in Agent.ts and GameRunner.ts will have to change in order to work with your new Agent type. Use short code samples to illustrate your points, but don't write out all of the code changes explicitly yet.
    Define the following four example Agent implementations for the user to read when building their own Agent implementations.

        In a file named RightAgent.ts, define a value of your Agent type that always moves right, like the hard-coded behavior of player A in the original code.

        In a file named TuesdayAgent.ts, define a value of your Agent type that always moves up on Tuesdays and always moves down on other days of the week, using the js-joda library from assignment 2. (You can install js-joda in the robosnake project by running npm i --save-dev @js-joda/core in the project directory.)

        In a file named CycleAgent.ts, define a value of your Agent type that cycles through the moves up, up, right, down, right, like the hard-coded behavior of player C in the original code.CycleAgent.ts. Do not use any global variables to store the cycle or index.

        In a file named StairAgent.ts, define a value of your Agent type that moves left one time, up one time, left two times, up two times, left three times, up three times, etc. The number of moves in each direction should keep increasing until the player has lost. Your definition should work correctly for any size game screen, not just the default 50x50 game screen. Do not use any global variables to store numbers or directions.
