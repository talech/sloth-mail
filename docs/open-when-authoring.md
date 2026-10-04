# Writing post-it content

All need choices and post-its live in
[`src/content/openWhenLetters.ts`](../src/content/openWhenLetters.ts). Adding a
post-it does not require editing the component or its styles.

## Add a post-it

Copy an existing object in `openWhenLetters` and change these five fields:

```ts
{
  id: 'short-unique-name',
  needs: ['sit-with-me'],
  title: 'when the room feels too quiet',
  message: [
    'The first short paragraph goes here.',
    'A second paragraph can go here.',
  ],
  closing: 'One warm closing line. 💜',
},
```

- `id` must be unique and should not change after the post-it ships.
- `needs` controls which choices and collection sections include the post-it. A
  post-it can appear under more than one need.
- `title` completes the phrase “Open when…”
- `message` accepts one or more paragraphs.
- `closing` is the emphasized last line from Sloth.

An optional `artwork` field pairs a note with an illustration:

```ts
artwork: {
  src: './open-when/example.jpg',
  alt: 'Sloth and Mouse share a blanket on the couch.',
},
```

Art appears uncropped on the open note and as a small thumbnail in the
collection, including super sticky notes. Keep the message as readable text;
artwork is a companion to it. Messages and closings support `_italic_`,
`**bold**`, and `**_bold italic_**` emphasis. Use separate message-array entries
for paragraph breaks. The catalog includes 28 author-provided “Remind me I’m
loved” notes, with their secondary needs retained, and 25 paired illustrations.

The picker and collection use regular-weight helper text and note titles,
medium-weight controls, and semibold section headings. The note body uses
regular weight, with a semibold closing and medium-weight title;
reserve bold emphasis for words deliberately marked in the content. Review the
provisional [artwork pairings](post-it-artwork.md) before changing an assignment.

The available need IDs are listed in `companyNeeds` at the top of the same
file. A new need can be added there without changing the UI.

## Preview

Start the development server and open:

```text
http://localhost:5173/?openWhenPreview=1
```

The development-only parameter opens the complete post-it collection immediately.
Select any title to inspect the finished post-it, then use “back” to return to
the main need picker. Preview mode bypasses the daily
discovery limit and intentionally reveals the full catalog; visitors only see
post-its they have discovered.

## Discovery rhythm

Mouse can discover up to two new post-its per local calendar day. Opening a
previously discovered post-it does not use one of those discoveries. “Make
super sticky” adds or removes a discovered post-it from the super-sticky
section at the top of the collection. This progress uses the existing
`slothmail-open-when-v1` key
and continues accepting the original save shape.

## Writing guardrails

- Keep the first useful feeling within the first sentence.
- Prefer specific companionship over generic inspiration.
- Do not imply that Mouse must complete an action or improve their mood.
- Do not add urgency, streaks, costs, or expiring access.
- Keep most post-its short enough to fit comfortably on a phone.

The “Distract me gently” batch adds 27 author-provided notes, preserving
secondary needs, paragraph breaks, and authored italic emphasis.

The “One tiny thing” batch adds 28 author-provided notes, preserving secondary
needs, menu/step paragraph breaks, and the deliberate bold “NOTHING” option.

The “Make me laugh” batch adds 26 author-provided notes with their secondary
needs. Nine existing illustrations now accompany the notes that explicitly
describe their scenes; note IDs and saved progress remain unchanged.
