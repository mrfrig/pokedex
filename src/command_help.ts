export function commandHelp(commands: Record<string, any>) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");
  for (const command in commands) {
    console.log(`${command}: ${commands[command].description}`);
  }
};