let file = await Deno.open('greeting.txt');
await Deno.copy(file, Deno.stdout);
file.close()