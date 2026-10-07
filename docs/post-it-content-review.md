# Post-it content review

Approved content placement for the implemented rummaging-pile experience. Original authored copy and existing browser progress are preserved.

Reviewed all **151** current post-its: **77 pile**, **72 main library**, **2 deletions**, **0 undecided**. All **25 illustrated notes go to the pile**, as requested. Implemented through the explicit placements in `src/content/notePlacements.ts`.

## The distinction

The pile should feel like discovering a particular thing Sloth left: a personal scrap, letter, odd find, drawing, or paper artifact. The library is where Mouse deliberately chooses messages for comfort, company, or a tiny next step. Tender notes can belong in the pile; silly notes can belong in the library. Format and specificity matter more than emotional category.

The main library already contains news, legal/cuteness jokes, promotions, and blanket humor. A new heading or colored sheet alone does not create a new experience. Prefer actual letters, specific personal details, distinctive artifacts, and existing illustrated scenes. Do not imply video, audio, branching responses, or new artwork exists when it does not.

## Suggested first pile

Show three persistent read/unread stickies, replacing read slots after eight hours and preserving unread slots. Always include exactly one illustrated note and two text notes. Show remaining surprises without a completion denominator; keep old finds freely readable. Suggested first six:

- `blanket-science`: existing illustration and research report.
- `pocket-love-letter`: a tender actual letter.
- `blanket-apology`: a letter from a blanket, a different comic voice.
- `tiny-smirk`: a specific thing you notice about him.
- `theodore-teaspoon`: an odd little find.
- `harlito-command`: a personal household rule with existing artwork.

Mock-up copy is illustrative, not replacement copy. Keep authored wording intact during any eventual migration. Titles beginning “when…” may need separate short outer labels for the pile; propose those separately.

## Preserve his progress

- Retain `slothmail-open-when-v1`, original note IDs, `opened`, and `favorites`. Do not clear or prune the arrays when changing where a note lives.
- Keep every previously found note accessible in kept notes, including notes assigned to the library. Preserve pins, original text, and artwork. He should not need to buy an already found note again.
- Main-library journal IDs are numeric; post-it IDs are strings. Define an explicit stable mapping before moving notes, and preserve all existing numeric journal IDs. Do not insert string IDs into the current journal array.
- Add newly transferred library notes without marking unseen content as discovered. Repeat any migration safely without duplicating entries or charging stars.
- Decide how imported pins appear in the library before implementation; the current journal does not store those post-it favorites.
- Library messages currently use `text`; post-its have paragraph arrays, closings, authored emphasis, and optional artwork. Preserve those rather than flattening away the personal content.
- Verify a saved browser with opened and pinned notes in each destination, reload, and repeat migration. Migration, reload, pin retention, and retired-note access were verified in a temporary browser profile.



## Projected main collection counts

Catalog sizes, not Mouse’s personal unlocked count. Treats are outside the message collection. All placement decisions are resolved.

| Category | Existing | Transfers | Projected total |
|---|---:|---:|---:|
| Soft | 20 | 29 | 49 |
| Silly | 20 | 11 | 31 |
| Boost | 20 | 12 | 32 |
| Love | 20 | 20 | 40 |
| **Total** | **80** | **72** | **152** |

The pile contains **77** notes, including all **25** illustrated notes. The combined active catalogs contain **229** messages/notes (152 library + 77 pile). Two removed notes are excluded.

Final category calls: independent-love-review → Love (relationship reassurance); sunset-delivery → Soft (cozy scene); smallest-cinema → Silly (absurd miniature entertainment). Tammy explicitly placed category-five, suspend-even, choose-supervisor, slothtech-startup, and suspicious-squeaking in Silly.

Assignment principle: Soft for rest, grounding, and quiet company; Love for affection and relationship reassurance; Silly when the joke is the main reward; Boost for an optional small next step. No copy or price changes are proposed here.

## Deletion and progress handling

`misplaced-evidence` and `doctor-sloth` are marked for deletion from the active catalog. If Mouse already discovered or pinned either, retain a legacy copy accessible through his kept notes. Do not erase its saved ID or favorite. This preserves his existing progress while preventing future discovery of removed content.

## Complete catalog decisions

### Pile

| Original ID | Original title | Artwork | Decision reason |
|---|---|---|---|
| `cloud-tour` | a very small cloud tour | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `sloth-support-ticket` | support ticket #0001 | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `dont-want-to-explain` | when you don't want to explain | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `world-too-loud` | when everything feels too loud | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `blanket-lumps` | when you want to disappear under a blanket | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `hand-under-table` | when you need a hand under the table | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `incognito-mouse` | when you’re tired of existing | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `borrow-my-lap` | when you need to borrow my lap | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `not-mouse-ish` | when you don’t feel very Mouse-ish | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `miss-stupid-face` | when you miss my stupid face | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `tiny-smirk` | when you need one specific reason | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `what-sloth-sees` | when you forget what I see | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `mouse-certificate` | when you need your Mouse certificate | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `future-sloth` | when you need future Sloth | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `choose-you` | when you wonder if I still choose you | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `tiny-love-list` | when you need the tiny list | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `our-weird-museum` | when you need proof from the archives | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `my-cuchis` | when you need a very serious fact | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `the-maccuties` | when you need the simplest version | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `home-to-sloth` | when you wonder what home looks like to me | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `pocket-love-letter` | when you need a pocket-sized love letter | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `you-contribute-home` | when your brain asks “¿yo qué contribuyo?” | — | Specific details of you two, a personal observation, or an actual little love letter; feels left by you. |
| `unlimited-kisses` | when you need ridiculous affection | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `tiny-weather` | when you need different weather | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `cloud-inspection` | when cloud inspection | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `quiet-train-ride` | when you need a train ride | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `tiny-museum` | when you need a tiny museum | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `sloth-pockets` | when Sloth checks her pockets | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `harlito-field-trip` | when you need a field trip | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `tiny-island` | when you need a tiny island | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `nice-patch-of-light` | when you need to look at one nice thing | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `woodland-gossip` | when you need woodland gossip | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `planet-mouse` | when you need a new planet | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `blueberry-mystery` | when you need a tiny mystery | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `slow-chase` | when you need an extremely slow chase scene | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `duck-pants` | when you need one weird question | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `creature-parade` | when you need a creature parade | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `tiny-garden` | when you need a tiny garden | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `theodore-teaspoon` | when you need an object with lore | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `another-channel` | when your brain needs another channel | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `hydration-pause` | when pausa de hidratacion | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `choose-nothing-menu` | when choosing is also too much | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `warm-thing` | when you’re cold inside | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `horizontal-permission` | when you need permission to horizontal | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `tiniest-mouse-plan` | when you need the tiniest possible plan | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `chief-tiny-promotion` | when you receive a promotion | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `blanket-apology` | when the blanket owes you an apology | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `woodland-court-session` | when woodland court is in session | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `woodland-committee` | when the committee has met | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `mouse-horoscope` | when you need your horoscope | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `cozy-front` | when category-5 storm | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `hr-cuteness` | when HR needs to speak with you | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `golden-acorn-award` | when you win an award | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `forehead-kiss-complaint` | when Mouse files a complaint | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `harlito-command` | when Harlito takes command | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `mouse-performance-review` | when you get a performance review | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `good-enough-memo` | when an important memo arrives | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `missing-mouse-found` | when Mouse goes missing | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `snack-negotiations` | when snack negotiations begin | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `blanket-science` | when science has an announcement | Yes | Confirmed by Tammy: every note with artwork belongs in the pile. |
| `sloth-espionage` | when Sloth attempts espionage | — | A distinctive object, absurd question, or specific miniature story makes the reveal worth opening. |
| `neighborhood-watch` | when neighborhood watch reports in | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `affection-package` | when your package arrives | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `sloth-mouse-review` | when Sloth writes a review | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `top-secret-mouse` | when this message self-destructs | — | Already reads as a ticket, letter, report, forecast, certificate, list, or notice; the paper format adds meaning. |
| `official-investigation` | an official investigation | — | Confirmed by Tammy. |
| `person-excessive` | when being a person seems excessive | — | Confirmed by Tammy. |
| `need-me-no-idea` | when you need me but don’t know what you need | — | Confirmed by Tammy. |
| `low-power-mode` | when you’re running on 2% | — | Confirmed by Tammy. |
| `productivity-report` | when you did absolutely nothing today | — | Confirmed by Tammy. |
| `guilt-submission-denied` | when guilt is being a little bitch | — | Confirmed by Tammy. |
| `original-weirdness` | when your edges feel weird | — | Confirmed by Tammy. |
| `sleepy-red-panda` | when you need something soft to imagine | — | Confirmed by Tammy. |
| `cozy-window-backstories` | when you want to watch the world from somewhere cozy | — | Confirmed by Tammy. |
| `acorn-siren` | when the acorn siren sounds | — | Confirmed by Tammy. |
| `acorn-economy` | when the woodland economy collapses | — | Confirmed by Tammy. |
| `mouse-law` | when you need legal representation | — | Confirmed by Tammy. |

### Library

| Original ID | Original title | Library category | Decision reason |
|---|---|---|---|
| `quiet-company` | when words are too much | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `blanket-shaped-day` | for a blanket-shaped day | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `borrowed-heart` | borrow my heart for a minute | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `nothing-to-earn` | nothing to earn | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `known-by-sloth` | in case your brain forgot | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `forest-window` | look through this tiny window | Soft | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `suspiciously-tiny-quest` | a suspiciously tiny quest | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `next-inch` | only the next inch | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `rest-is-an-action` | rest is an action too | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `quiet-version` | when you need the quiet version of me | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `feel-far-away` | when you feel far away | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `nothing-for-anybody` | when you have nothing for anybody | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `day-was-a-lot` | when today has been a lot | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `quiet-afternoon` | when you need a quiet afternoon | Soft | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `sad-without-reason` | when you’re sad but don’t know why | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `five-minutes-outside` | when you need five minutes outside time | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `company-no-interaction` | when you need company but not interaction | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `nighttime-strange` | when nighttime feels strange | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `smallest-hug` | when you need the smallest hug | Love | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `stay-softly` | when you want someone to stay | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `couch-calling` | when the couch is calling | Silly | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `safe-little-room` | when you need a safe little room | Soft | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `afraid-too-much` | when you’re afraid you’re too much | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `say-nothing` | when you want to say nothing | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `stop-for-a-bit` | when you need to stop for a bit | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `all-you-can-do-exist` | when all you can do is exist | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `know-you-by-heart` | when you feel faraway | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `bad-day-still-us` | when you think a bad day changed something | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `mouse-trivia` | when you feel forgettable | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `holding-my-end` | when you feel disconnected from us | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `this-mouse-too` | when you’re worried I miss the old you | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `no-report-card` | when you think you’re disappointing me | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `quiet-not-forgotten` | when you’ve been quiet for a long time | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `carry-the-sparkle` | when you think love requires energy | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `remember-your-pieces` | when you feel like you’ve lost yourself | Soft | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `final-answer-love` | when you need the final answer | Love | Primarily reassurance or companionship; useful to choose and reread in the main library. |
| `mouse-sized-cafe` | when you need a mouse-sized café | Silly | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `five-second-vacation` | when you need a five-second vacation | Soft | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `aquarium-break` | when you need an aquarium break | Soft | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `somewhere-else` | when you need to go somewhere else | Soft | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `cozy-soundscape` | when you need a soundscape | Soft | Primarily an imagined comforting scene; better as a library message than a distinct paper surprise. |
| `five-minute-universe` | when the whole day is too big | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `soft-thing-assignment` | when you want the easiest assignment | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `mouse-nest` | when you need a Mouse nest | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `curtain-choice` | when you can choose exactly one thing | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `heart-signal` | when you want to send a signal without words | Love | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `comfier-paw` | when you’re stuck in one position | Silly | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `one-color` | when everything looks gray | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `closest-comfort-wins` | when you want Sloth to choose | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `move-one-thing` | when a task feels enormous | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `slightly-different` | when you need a tiny reset but hate resets | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `fresh-air-choice` | when you might want fresh air | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `free-the-mouse` | when your jaw is doing that thing | Silly | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `room-two-percent` | when you want the room 2% better | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `tiny-comfort-menu` | when you need a menu | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `comfortable-clothes` | when getting dressed feels ridiculous | Silly | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `past-the-phone` | when your phone became the whole universe | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `acceptable-food` | when food feels like too much of a concept | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `point-one-percent` | when you can only do 0.1% | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `tiny-paw-delivery` | when you want to hear from Sloth | Love | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `one-tab-not-now` | when your brain has 48 tabs open | Boost | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `one-sound` | when you can hear too many things | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `one-tiny-comfort` | when you want one tiny comfort | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `five-second-rest` | when even five minutes sounds ambitious | Soft | Primarily a small action, grounding prompt, or permission to rest; belongs with intentionally chosen library support. |
| `category-five` | when your brain is a category-five hurricane | Silly | Confirmed by Tammy. |
| `suspend-even` | when you can’t even | Silly | Confirmed by Tammy. |
| `independent-love-review` | when you don’t feel lovable | Love | Confirmed by Tammy. |
| `choose-supervisor` | when you need a supervisor | Silly | Confirmed by Tammy. |
| `sunset-delivery` | when you need a sunset delivered | Soft | Confirmed by Tammy. |
| `smallest-cinema` | when you need the smallest cinema | Silly | Confirmed by Tammy. |
| `slothtech-startup` | when Sloth launches a startup | Silly | Confirmed by Tammy. |
| `suspicious-squeaking` | when there is suspicious squeaking | Silly | Confirmed by Tammy. |

### Delete

| Original ID | Original title | Artwork | Decision reason |
|---|---|---|---|
| `misplaced-evidence` | when your brain misplaced the evidence | — | Remove from future discovery; preserve any previously found or pinned copy. |
| `doctor-sloth` | when Sloth becomes a doctor* | — | Remove from future discovery; preserve any previously found or pinned copy. |

## Sources

- [Post-it catalog](../src/content/openWhenLetters.ts)
- [Post-it interaction and saved progress](../src/OpenWhen.tsx)
- [Main message bank and numeric journal](../src/App.tsx)
- [Original decision list and final calls](post-it-pending-decisions.md)
