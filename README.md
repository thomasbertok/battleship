# Battleship

install: `npm install`\
run: `npm run dev`\
lint: `npm run lint`\
test: `npm run test`\

## Challenge
> The challenge is to program a simple version of the game Battleships. Create an application to allow a single human player to play a one-sided game of Battleships against ships placed by the computer.

> The program should create a __10x10__ grid, and place a number of ships on the grid at random with the following sizes:
>- 1x Battleship (5 squares)
>- 2x Destroyers (4 squares)

>The player enters coordinates of the form “__A5__”, where "__A__" is the column and "__5__" is the row, to specify a square to target. Shots result in hits, misses or sinks. The game ends when all ships are sunk.

>You can write a console application or UI to complete the task.

>Try to code the challenge as you would approach any typical work task; we are not looking for you to show knowledge of frameworks or unusual programming language features. Most importantly, keep it simple.

## Tech stack
- React with Vite
- Zustand state management
- Vitest unit testing
- eslint for linting
- github pages for deplyment

## Components
Dashboard:\
wrapper for all the components, root of the app\
\
Board:\
the actual battlefield, 10x10 cells\
\
Cell:\
one unit on the board, body of water or ship with hit state\
\
Stats:\
shows current game state, remaining ships, successful hits, and checkbox to show ships' position\
\
CoordsInput:\
form with text input and button to launch\
\
Winner:\
simple component to show some congratulations at the certain end. \
\
\
Battlefield creation happens in utils/Battlefield.js, then it's given to state on dashboard load. \
Styling is done via React CSS modules.\World exists until page reload.
