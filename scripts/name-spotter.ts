// ===================================
// Script: name-spotter.ts
// Purpose: CLI name extractor
// Usage:
//   echo "Alice and Bob" | pnpm dlx tsx scripts/name-spotter.ts
//   pnpm dlx tsx scripts/name-spotter.ts --file data/text.txt
// ===================================


//# # Pipe-Modus:
//#     echo "Alice and Bob met Clara" | pnpm dlx tsx scripts/name-spotter.ts
//# # Datei-Modus:
//#     pnpm dlx tsx scripts/name-spotter.ts --file data/sample.txt# Pipe-Modus:

import fs from 'fs/promises';
import readline from 'readline';

async function readInputText(): Promise<string> {
  const fileFlagIndex = process.argv.indexOf('--file');
  if (fileFlagIndex !== -1 && process.argv[fileFlagIndex + 1]) {
    const filePath = process.argv[fileFlagIndex + 1];
    return await fs.readFile(filePath, 'utf-8');
  }

  // Fallback: read from stdin
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

function buildFixture(names: string[]): string {
  const fixture = names.map((n, i) => ({
    id: `${i + 1}`,
    text: `${n} was spotted in the text.`
  }));

  return `export default ${JSON.stringify(fixture, null, 2)};\n`;
}

async function main() {
  const input = await readInputText();
  const names = extractNames(input);
  const fixtureContent = buildFixture(names);

  await fs.mkdir('mirage/fixtures', { recursive: true });
  await fs.writeFile('mirage/fixtures/names.ts', fixtureContent);

  console.log(`✅ Extrahiert: ${names.length} Namen`);
  console.log(`📄 Gespeichert nach mirage/fixtures/names.ts`);
}

main().catch((err) => {
  console.error('❌ Fehler beim Ausführen:', err);
  process.exit(1);
});
