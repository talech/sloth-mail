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
Select any title to inspect the finished post-it, then use “back to kept notes” to return. Preview mode reveals the complete source archive, including library transfers and retired notes, without recording discoveries. Visitors only see their own finds in kept notes.

## Discovery and placement

Mouse sees three scraps at a time, can read the three persistent scraps, and can reread every find in “My kept notes.” Opening a scrap saves it; “Make super sticky” pins it. Existing discoveries and pins use the unchanged `slothmail-open-when-v1` key. Read stickies stay visible and refresh individually eight hours after first reading. Unread stickies do not expire. The pile always includes exactly one artwork note and two text notes, with familiar artwork reused after unseen illustrated notes run out. Found notes and pins can be reread freely; rereading does not restart the clock. The remaining-surprises count includes only unseen pile notes.

The catalog is also the source archive for transferred and retired notes. Placement is explicit in `src/content/notePlacements.ts`: 77 pile IDs and 72 stable numeric library mappings. All illustrated notes belong in the pile. Never change a published library mapping or original note ID. New entries need an explicit placement; adding to the archive alone does not expose them for discovery. The two retired notes remain readable only if previously found or pinned.

Library transfers join Soft, Silly, Boost, or Love at their existing star prices. Previously discovered transfers unlock without charge. The [content review](post-it-content-review.md) records each placement.

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
