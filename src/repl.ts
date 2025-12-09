import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim();
  if (trimmed.length > 0) {
    return trimmed
      .split(/\s+/)
      .map((word) => word.toLowerCase());
  }
  return [];
}

export function startREPL(state: State) {
  const replInterface = state.rl;
  replInterface.prompt();
  replInterface.on("line", async (line) => { 
    const commands = cleanInput(line);
    if (commands.length > 0) {
      const command = commands[0];
      const availableCommands = state.commands;
      if (command in availableCommands) {
        try {
          await availableCommands[command].callback(state);
        } catch (error) {
          console.log(`Error executing command`);
        }
      } else {
        console.log(`Unknown command`);
      }
    }
    
    replInterface.prompt();
  });
}