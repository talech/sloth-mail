# SlothMail product context

## What it is

SlothMail is a tiny, private-feeling web experience that delivers affection and
encouragement through a sloth-and-mouse world. It is closer to an interactive
care package than a conventional productivity product: the desired outcome is
for the recipient to feel noticed, comforted, and gently delighted.

The app should remain simple enough to open casually on a phone. It does not
require an account, server, or onboarding flow.

## Experience principles

### Warm and specific

Copy should sound like it comes from someone who knows the recipient. Prefer a
small, vivid gesture—a forehead kiss, a snack, a blanket, a leaf—over generic
motivational language.

### Gentle, never demanding

The app may invite interaction, but it should not create pressure. Rest,
slowness, low energy, and imperfect days are treated as valid. Avoid streaks,
punishment, urgency, competitive framing, or guilt about returning.

### Small surprises

Daily messages, limited notices, trip postcards, the comfort kit, and other
reveals make return visits feel alive. Scheduled experiences should degrade
gracefully outside their date window and remain testable during development.

### Cozy play

Stars, collections, reactions, animations, and tactile actions provide light
playfulness. They support the emotional experience rather than becoming a deep
game economy.

### Personal and local

Progress is stored in the visitor's browser. That keeps the app lightweight and
private, but it also means progress is specific to a browser and device and can
be lost when browser data is cleared.

## Current product areas

- A rotating daily message, including date-window variants.
- Earnable stars and treats.
- Purchasable messages grouped by emotional tone.
- A journal/collection of opened messages.
- Mouse reactions and replies.
- Limited-date news and welcome-back moments.
- Banff countdown and trip postcards.
- A comfort kit with date-gated arrivals that remain accessible after the final day.
- A subtle time-machine memory.

This list describes the current product, not a commitment to preserve every
feature forever. Update it when user-visible capabilities materially change.

## Voice and vocabulary

The established world uses “Sloth,” “Mouse,” “Cuchito,” woodland creatures,
tiny comforts, cozy domestic imagery, and occasional Spanish endearments. The
voice can be tender or silly, but it should stay kind. Humor should never mock
the recipient's tiredness or emotional state.

Emoji are part of the voice and visual rhythm. Use them deliberately rather
than filling every interface label with them.

## Product constraints

- The app is currently client-only and must work as a static site.
- It is deployed from a relative base path on GitHub Pages.
- There is no cross-device synchronization or recovery mechanism.
- Scheduled content is evaluated using the visitor's local date.
- Existing local-storage data represents real visitor progress; compatibility
  matters.
- The primary experience should remain usable on a small touch screen.

## Keeping this document current

Update this file in the same change when the product's audience, tone,
experience principles, major feature set, or user-visible constraints change.
Temporary ideas and future tasks belong in an issue tracker rather than here.
