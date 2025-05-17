🧱 LegoKit Vision (Polaris Edition) V0.7 is:

🧪 name-spotter
	•	Companion mini-project: small, helpful, Polaris-compliant
	•	TSX/typed templates, minimal dependencies
	•	Useful for devs and POC of modular app structure


✅ Ember Polaris app scaffold
✅ Tailwind v4 (no CLI) configured
✅ name-spotter route + component created
✅ GitHub repo created and pushed
✅ (Optional tag + changelog support ready)

Let me know when you want to:
	•	🧪 Add Mirage or seed data
	•	🔧 Hook in Tailwind v4
	•	🧱 Start generating components/pages with TSX
	•	🚀 Set up CI or test scaffolding

Happy building 🧱



	1.	🚀 Generate Mirage mock data from plain text (names.txt)
	2.	🧠 Optionally extract or “spot” names (basic NLP)
	3.	🔁 Output new fixture to mirage/fixtures/names.ts
	4.	🧩 Run standalone via pnpm dlx tsx
	5.	🧪 Be testable or pipeable later (headless)



1	Component renders		✅ Done
2	Input changes tracked		✅ Done
3	Text is filtered correctly	✅ Done
4	Match is wrapped with <mark>	✅ Done
5	No match returns full list	❌ Optional
6	Case-insensitive matching	❌ Good
7	Mirage mock response exists	❌ Nice to have
8	Fallback state (no data)	❌ Optional
9	Snapshot-style test (optn HTML)	❌ Later


✅ v0.7 Generator CLI — Goals
This script should:
	1.	🚀 Generate Mirage mock data from plain text (names.txt)
	2.	🧠 Optionally extract or “spot” names (basic NLP)
	3.	🔁 Output new fixture to mirage/fixtures/names.ts
	4.	🧩 Run standalone via pnpm dlx tsx
	5.	🧪 Be testable or pipeable later (headless)



app/
├── routes/
│   └── name-spotter.ts
├── templates/
│   └── name-spotter.hbs
├── components/
│   └── name-spotter/
│       └── ui-box.ts
│       └── ui-box.hbs

mirage/
├── config.ts
├── factories/
├── fixtures/
├── models/
├── scenarios/default.ts

scripts/
├── name-spotter-cli.ts       # Entry point (TSX)
├── helpers/
│   └── extract-names.ts      # Simple name spotter logic
│   └── load-text.ts          # Read plain text or stdin
└── templates/
    └── fixture-template.ts   # TS fixture boilerplate
