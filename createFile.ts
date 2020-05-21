const encoder = new TextEncoder();

const greetText = encoder.encode("Hello World.\n SUDOAK is calling you");

await Deno.writeFile("greeting.txt", greetText);