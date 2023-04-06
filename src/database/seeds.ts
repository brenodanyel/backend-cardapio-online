import fs from 'node:fs/promises';

export async function runSeeds() {
  const path = __dirname + '/seeds';
  const files = await fs.readdir(path);

  for (const fileName of files) {
    const seed = await import(`${path}/${fileName}`);
    await seed.default();
  }

  console.log('🌱 Seeds ran successfully!');
}
