import fs from 'fs/promises';
import readline from 'readline';
import path from 'path';

async function readInputText(): Promise<string> {
  const fileFlagIndex = process.argv.indexOf('--file');
  if (fileFlagIndex !== -1 && process.argv[fileFlagIndex + 1]) {
    const filePath = process.argv[fileFlagIndex + 1];
    return await fs.readFile(filePath, 'utf-8');
  }

  const rl = readline.createInterface({
    input: process.stdin,
    terminal: false,
  });

  let input = '';
  for await (const line of rl) {
    input += line + '\n';
  }

  return input.trim();
}

function extractNames(text: string): string[] {
  const words = text.split(/\s+/);
  return Array.from(new Set(
    words.filter(w => /^[A-ZÄÖÜ][a-zäöüß]+$/.test(w))
  ));
}

function toFixture(names: string[]) {
  return names.map((n, i) => ({
    id: String(i + 1),
    text: `${n} was spotted in the text.`,
  }));
}

async function main() {
  const input = await readInputText();
  const names = extractNames(input);
  const fixture = toFixture(names);

  const tsOutput = `export default ${JSON.stringify(fixture, null, 2)};\n`;
  const jsonOutput = JSON.stringify(fixture, null, 2);

  await fs.mkdir('mirage/fixtures', { recursive: true });
  await fs.mkdir('public', { recursive: true });

  await fs.writeFile('mirage/fixtures/names.ts', tsOutput);
  await fs.writeFile('public/names.json', jsonOutput);

  console.log(`✅ ${names.length} name(s) extracted`);
  console.log(`📄 Mirage fixture saved: mirage/fixtures/names.ts`);
  console.log(`🌍 Public JSON saved: public/names.json`);
  console.log(`🛠 Source: name-spotter-cli.ts`);
}

main().catch((err) => {
  console.error('❌ Error in name-spotter-cli:', err);
  process.exit(1);
});
