import React, { useState, useEffect } from 'react';
import { Star, BookOpen, Mail, TrendingUp, Gift, ChevronDown, X } from 'lucide-react';

const SAVE_KEY = 'slothmail-save-v1';
const LIMITED_NEWS_KEY = 'slothmail-limited-news-flash-seen-v1';
const UPDATE_BANNER_SEEN_KEY = 'slothmail-jul-19-message-update-seen-v1';
const UPDATE_BANNER_EXPIRES_AT = '2026-07-20T18:54:00-04:00';
const WELCOME_BACK_AFTER_MS = 8 * 60 * 60 * 1000;

type LimitedNews = { image: string; alt: string; message: string; isPreview?: boolean };

const limitedNewsByDate: Record<string, LimitedNews> = {
  '2026-06-18': {
    image: './limited/sloth-love.jpeg',
    alt: 'sweet sloth love illustration',
    message: 'un besito sorpresa',
  },
  '2026-06-19': {
    image: './limited/sloth-morning.jpeg',
    alt: 'morning sloth illustration',
    message: 'hola ojitos',
  },
  '2026-06-20': {
    image: './limited/mouse-travel.jpeg',
    alt: 'traveling mouse illustration',
    message: 'see you soon 💜',
  },
};

const treatList = [
  "breathe 🌿", "wiggle 🐭", "hydrate 💧", "nest 🛌", "snack 🍪", "unfurl 🌱", "exhale 🌙", "pause ☁️", "gentle 💜", "coffee ☕️",
  "boop 👉🐭", "cozy 🦥", "soften ✨", "float 🎈", "stretch 🐾", "nibble 🧀", "sunshine ☀️", "cuddle 🫂", "tiny 🌱", "safe 🏡",
  "blink 👀", "soup 🍲", "breathey 🌬️", "purr 🐾", "warmth 🔥", "snuggle 🛌", "glow ✨", "steady 🌊", "comfort 🧸", "peachy 🍑",
  "moonbeam 🌙", "resting 💤", "okie 🌸", "softness ☁️", "pocket 💌", "silly 🙃", "bop 🎵", "brave ⚔️", "sparkle 💫", "fuzzy 🧶",
  "smol 🐭", "biscuit 🍪", "darling 💜", "sleepy 😴", "reset 🔄", "honey 🍯", "bloom 🌷", "alive 🌈", "heal ❤️‍🩹", "always ❣️"
];

const dailyBank = [
  "Good morning, tiny mouse. The sloth has already filed paperwork declaring you worthy of softness and kindness today. 📋💜",
  "Today’s goal: exist gently and maybe acquire one pleasant little moment. Just maybe. 🌤️🐭",
  "Your only emergency today is remembering that you are loved very, very much. 🚨💜",
  "Even sleepy stars still shine. Today counts too. ✨🌙",
  "Tiny reminder from your sloth: you never have to perform wellness to deserve care and my deepest love. 🦥💜",
  "Some days are for blooming. Some days are for staying warm underground. Both are ok. 🌱",
  "The world can wait a little. Come be a cozy creature with me first. 🛌🐭",
  "You are allowed to move slowly through today like a small careful animal in the rain. 🌧️🐾",
  "Dear exhausted mouse: I am still proud of you for carrying so much for so long. 💌",
  "If today feels blurry, let’s just find one soft thing at a time. ☁️✨",
  "The sloth believes in you with frankly unreasonable intensity. 🦥⭐",
  "Your tiredness is real. Your sweetness is also real. Both can exist together. 💜🐭",
  "You make the world softer just by being in it. 🌎💞",
  "Hey sleepy love. I hope today surprises you with at least one tiny moment that feels light again. 🌈🐭"
];

const messageBank = [
  { id: 1, tone: "soft", title: "little nest", text: "The sloth council recommends building the smallest possible cozy nest today and hiding inside it without shame. Blankets count as medicine. 🛌🦥", tag: "soft", cost: 30 },
  { id: 2, tone: "soft", title: "foggy paws", text: "Even foggy little mice deserve tenderness. Especially foggy little mice. 🌫️🐭", tag: "soft", cost: 30 },
  { id: 3, tone: "soft", title: "gentle mode", text: "Your system is allowed to run in gentle mode today. No sprinting. No proving. Just soft tiny existence. 🧡🩵", tag: "soft", cost: 30 },
  { id: 4, tone: "soft", title: "quiet creature", text: "You are not failing at life. You are simply a very tired woodland creature doing your best. 🌲🐭🫩", tag: "soft", cost: 30 },
  { id: 5, tone: "soft", title: "tiny harbor", text: "Come rest your little mouse heart for a while. The sloth is keeping watch. ⚓🦥", tag: "soft", cost: 30 },
  { id: 6, tone: "soft", title: "sleepy approval", text: "Congratulations. You have been officially approved for extra softness today. 📜💤", tag: "soft", cost: 30 },
  { id: 7, tone: "soft", title: "low battery", text: "You are still lovable at 2% battery. Maybe even extra lovable. 🪫💜", tag: "soft", cost: 30 },
  { id: 8, tone: "soft", title: "blanket rights", text: "You have full legal rights to burrito yourself in blankets and ignore unnecessary nonsense today. 🌯🐭", tag: "soft", cost: 30 },
  { id: 9, tone: "soft", title: "nespressy era", text: "Perhaps today is not a “conquer the world” day. Perhaps today is a “tiny coffee and survive” day. ☕️✨", tag: "soft", cost: 30 },
  { id: 10, tone: "soft", title: "held gently", text: "You do not have to carry today perfectly. Let the slothday hold you a little too. 💜🌙", tag: "soft", cost: 30 },
  { id: 41, tone: "soft", title: "little wave", text: "No rush, Cuchito. The day isn't going anywhere. Take your tiny mouse time. 🌊🐭", tag: "soft", cost: 30 },
  { id: 42, tone: "soft", title: "borrow my strength", text: "If your heart is tired today, you can borrow mine for a little while. I have more. 💜🦥", tag: "soft", cost: 30 },
  { id: 43, tone: "soft", title: "soft pause", text: "Today's assignment: treat yourself like you'd treat a tiny rescued woodland creature. 🐭🌿", tag: "soft", cost: 30 },
  { id: 44, tone: "soft", title: "blanket kingdom", text: "The Kingdom of Blankets has officially declared today a national holiday. Attendance is mandatory. 👑🛏️", tag: "soft", cost: 30 },
  { id: 45, tone: "soft", title: "today is enough", text: "You don't have to become the old you today. Just become today's you. That's enough. 🌱", tag: "soft", cost: 30 },
  { id: 46, tone: "soft", title: "gentle heartbeat", text: "Nothing is wrong with a heart that needs to beat a little slower today. 💗", tag: "soft", cost: 30 },
  { id: 47, tone: "soft", title: "mouse pause", text: "Tiny pause. Tiny breath. Tiny sip of water. That's already a lovely beginning. 💧🐭", tag: "soft", cost: 30 },
  { id: 48, tone: "soft", title: "resting forest", text: "Even forests have quiet seasons. They are still alive the whole time. 🌲💚", tag: "soft", cost: 30 },
  { id: 49, tone: "soft", title: "little anchor", text: "Just checking in to remind you that you're deeply loved. No reason. Just because. ⚓💜", tag: "soft", cost: 30 },
  { id: 50, tone: "soft", title: "cozy approval", text: "You have received five stars in today's \"being gentle with yourself\" challenge. ⭐⭐⭐⭐⭐", tag: "soft", cost: 30 },
  { id: 11, tone: "silly", title: "emergency mouse", text: "Alert: mouse detected attempting to function while dramatically undercharged. Deploy cuddles immediately. 🚨🐭", tag: "silly", cost: 40 },
  { id: 12, tone: "silly", title: "snack prophecy", text: "Ancient sloth prophecy says the tiny mouse shall soon encounter a highly restorative snack. 🔮🍪", tag: "silly", cost: 40 },
  { id: 13, tone: "silly", title: "scientific findings", text: "Scientists confirm your cuteness remains critically high despite exhaustion levels. More studies required. 🧪🐭", tag: "silly", cost: 40 },
  { id: 14, tone: "silly", title: "paparazzi creature", text: "Local mouse reportedly sighed at least seventeen times today. Authorities are monitoring the situation closely. 📰✨", tag: "silly", cost: 40 },
  { id: 15, tone: "silly", title: "cereal buff", text: "Tiny mouse has received +4 comfort and +2 emotional resistance after consuming sweet munchies. 🍵📈", tag: "silly", cost: 40 },
  { id: 16, tone: "silly", title: "side quest", text: "New side quest unlocked: wiggle toes, hydrate slightly, and survive today. 🎮💧", tag: "silly", cost: 40 },
  { id: 17, tone: "silly", title: "sleepy wizard", text: "Your magical power today is advanced blanket summoning. 🪄🛌", tag: "silly", cost: 40 },
  { id: 18, tone: "silly", title: "sloth hotline", text: "Hello, you have reached the sloth support hotline. Press 1 for kisses. Press 2 for hugs. ☎️🦥", tag: "silly", cost: 40 },
  { id: 19, tone: "silly", title: "important update", text: "The mouse remains brave, adorable, and mildly overcooked. More at eleven. 📺🐭", tag: "silly", cost: 40 },
  { id: 20, tone: "silly", title: "elite athlete", text: "Competitive resting is still technically a sport and you are currently ranked internationally. 🏆💤", tag: "silly", cost: 40 },
  { id: 51, tone: "silly", title: "important meeting", text: "Reminder: today's meeting with the Blanket Committee begins immediately. Attendance by mouse is required. 📋🛏️", tag: "silly", cost: 40 },
  { id: 52, tone: "silly", title: "loading...", text: "Mouse.com is still loading. Estimated completion time: eventually. 💻🐭", tag: "silly", cost: 40 },
  { id: 53, tone: "silly", title: "forest gossip", text: "Breaking gossip: every squirrel agrees you're adorable. 🐿️☕", tag: "silly", cost: 40 },
  { id: 54, tone: "silly", title: "battery update", text: "Battery: 4%. Cuteness: 178%. 🔋✨", tag: "silly", cost: 40 },
  { id: 55, tone: "silly", title: "sloth inspection", text: "Routine sloth inspection complete. Verdict: mouse deserves little kisses. 🦥✅", tag: "silly", cost: 40 },
  { id: 56, tone: "silly", title: "my leaf", text: "Today's emotional support leaf has been assigned to your account. Please cherish it. 🍃", tag: "silly", cost: 40 },
  { id: 57, tone: "silly", title: "tiny criminal", text: "You have been charged with being illegally adorable. Court date pending. ⚖️🐭", tag: "silly", cost: 40 },
  { id: 58, tone: "silly", title: "professional napper", text: "Congratulations! You've been promoted to Senior Resting Specialist. 💤📈", tag: "silly", cost: 40 },
  { id: 59, tone: "silly", title: "forest patch notes", text: "Version 2.3 released: +1 cozy, +2 snacks. Sloth hugs buff increased by 300%. 🎮", tag: "silly", cost: 40 },
  { id: 60, tone: "silly", title: "mouse prestige", text: "You've unlocked Legendary Tiny Mouse status. Reward: infinite apapachos. 🏆💜", tag: "silly", cost: 40 },
  { id: 21, tone: "boost", title: "one inch", text: "You do not need a giant leap today. One inch forward still counts as movement. 📏✨", tag: "boost", cost: 60 },
  { id: 22, tone: "boost", title: "tiny spark", text: "The spark is still there, even if today it only glows very quietly. 🔥💜", tag: "boost", cost: 60 },
  { id: 23, tone: "boost", title: "mouse strength", text: "Your strength has never only existed on the easy days. 🐭⭐", tag: "boost", cost: 60 },
  { id: 24, tone: "boost", title: "next tiny thing", text: "Forget the whole staircase. What is the next tiny thing? Just that one. 🪜", tag: "boost", cost: 60 },
  { id: 25, tone: "boost", title: "brave nap", text: "Rest is not quitting. Sometimes rest is the bravest move available. 💤⚔️", tag: "boost", cost: 60 },
  { id: 26, tone: "boost", title: "steady paws", text: "Slow paws still move forward. 🌱🐾", tag: "boost", cost: 60 },
  { id: 27, tone: "boost", title: "surviving counts", text: "Surviving hard days is not a side objective. It is the main quest. 🎯💜", tag: "boost", cost: 60 },
  { id: 28, tone: "boost", title: "soft persistence", text: "You keep going in ways most people cannot even see. That matters deeply. 🌊", tag: "boost", cost: 60 },
  { id: 29, tone: "boost", title: "tiny momentum", text: "Tiny actions create tiny momentum. Tiny momentum still moves mountains eventually. ⛰️✨", tag: "boost", cost: 60 },
  { id: 30, tone: "boost", title: "keep the candle", text: "You do not need to light the whole room today. Just keep one little candle alive. 🕯️💜", tag: "boost", cost: 60 },
  { id: 71, tone: "boost", title: "keep showing up", text: "The only thing you have to prove today is that you kept showing up for yourself. Aunque te cueste trabajo. 🌱", tag: "boost", cost: 60 },
  { id: 72, tone: "boost", title: "future mouse", text: "I think future-you is going to be really grateful you were so gentle today. ❤️‍🩹", tag: "boost", cost: 60 },
  { id: 73, tone: "boost", title: "one percent", text: "One percent boost. From me, to you. Tiny math. Big victory. 📈🐭", tag: "boost", cost: 60 },
  { id: 74, tone: "boost", title: "hope survives", text: "Hope doesn't have to roar. Sometimes it just whispers, \"Let's try again tomorrow.\" 🌤️", tag: "boost", cost: 60 },
  { id: 75, tone: "boost", title: "slow healing", text: "Healing is sneaky. It often happens before it feels like it's happening. 🌿", tag: "boost", cost: 60 },
  { id: 76, tone: "boost", title: "tiny horizon", text: "You don't need to think of the future. Just the next tiny step. 🌅", tag: "boost", cost: 60 },
  { id: 77, tone: "boost", title: "steady", text: "The fact that you keep trying tells me everything I need to know about your strength. 🤍", tag: "boost", cost: 60 },
  { id: 78, tone: "boost", title: "quiet courage", text: "Your courage has become so quiet it almost looks like ordinary living. It is still strength. ⭐", tag: "boost", cost: 60 },
  { id: 79, tone: "boost", title: "little victories club", text: "Hydrated? Amazing. Showered? Incredible. Got out of bed? Standing ovation. 👏🐭", tag: "boost", cost: 60 },
  { id: 80, tone: "boost", title: "still becoming", text: "You are not stuck. You're simply growing underground for a little while. 🌱", tag: "boost", cost: 60 },
  { id: 31, tone: "romantic", title: "lighthouse", text: "Even on your foggiest days, I can still find my way to you. 🌙💜", tag: "romantic", cost: 80 },
  { id: 32, tone: "romantic", title: "favorite place", text: "My favorite place keeps being wherever your little mouse heart is. 🐭✨", tag: "romantic", cost: 80 },
  { id: 33, tone: "romantic", title: "tiny orbit", text: "I keep orbiting back toward you, like a sleepy little moon. 🌎💫", tag: "romantic", cost: 80 },
  { id: 34, tone: "romantic", title: "soft landing", text: "I hope loving me feels a little like finding a soft place to always land. 🦥💜", tag: "romantic", cost: 80 },
  { id: 35, tone: "romantic", title: "my creature", text: "Of all the creatures in the forest, you are still my favorite tiny mouse. 🌲🐭", tag: "romantic", cost: 80 },
  { id: 36, tone: "romantic", title: "held close", text: "If today feels too big, come closer. We can make the world smaller together. 💞", tag: "romantic", cost: 80 },
  { id: 37, tone: "romantic", title: "starlight mouse", text: "Somewhere inside all the tiredness, your light is still there. I see it every day. ✨🐭", tag: "romantic", cost: 80 },
  { id: 38, tone: "romantic", title: "always worth loving", text: "There has never been a version of you that was difficult for me to love. 💜", tag: "romantic", cost: 80 },
  { id: 39, tone: "romantic", title: "tiny heartbeat", text: "I love every tiny brave heartbeat inside your sleepy little chest. 🫀🐭", tag: "romantic", cost: 80 },
  { id: 40, tone: "romantic", title: "home", text: "Even when everything feels strange and heavy, you still feel like home to me. 🏡💜", tag: "romantic", cost: 80 },
  { id: 61, tone: "romantic", title: "favorite hello", text: "Every time I get to say hi to you feels like one of my favorite moments of the day. ☀️🐭", tag: "romantic", cost: 80 },
  { id: 62, tone: "romantic", title: "still choosing you", text: "Today, just like yesterday, I choose you. Happily. Easily. Completely. Always. 💜", tag: "romantic", cost: 80 },
  { id: 63, tone: "romantic", title: "safe place", text: "I hope my love feels like somewhere you can just exhale and let go. 🌿🦥", tag: "romantic", cost: 80 },
  { id: 64, tone: "romantic", title: "pasitas forever", text: "If we become two wrinkly little woodland creatures someday, I'll still think you're ridiculously cute. 🐭🤍", tag: "romantic", cost: 80 },
  { id: 65, tone: "romantic", title: "just mine", text: "Sometimes the happiest part of my day is simply remembering that you're mine to love. 🌙", tag: "romantic", cost: 80 },
  { id: 66, tone: "romantic", title: "closer", text: "Come here. That's the whole message. 🫂💜", tag: "romantic", cost: 80 },
  { id: 67, tone: "romantic", title: "heart pocket", text: "You accidentally left your heart with me. And I'll always take excellent care of it. 💌", tag: "romantic", cost: 80 },
  { id: 68, tone: "romantic", title: "always enough", text: "You have never once needed to sparkle for me to adore you. ✨", tag: "romantic", cost: 80 },
  { id: 69, tone: "romantic", title: "little universe", text: "My world got significantly brighter the day you wandered into it. And it still is 🌎💜", tag: "romantic", cost: 80 },
  { id: 70, tone: "romantic", title: "homecoming", text: "Every hug with you feels a little like coming home. 🏡🫂", tag: "romantic", cost: 80 },
];

const tones = [
  { id: "treats", label: "Treats", emoji: "🌈", cost: 10 },
  { id: "soft", label: "Soft", emoji: "☁️", cost: 30 },
  { id: "silly", label: "Silly", emoji: "🤭", cost: 40 },
  { id: "boost", label: "Boost", emoji: "⭐", cost: 60 },
  { id: "romantic", label: "Love", emoji: "💜", cost: 80 },
];

const collectionCategories = tones.filter(tone => tone.id !== 'treats');

const lockedHints: Record<string, string[]> = {
  soft: [
    "Something cozy...", "For foggy little days...", "Permission to go gently...", "A note for tired creatures...",
    "A tiny safe harbor...", "Official softness paperwork...", "Love at low battery...", "Important blanket law...",
    "For tiny coffee days...", "A soft place to be held...", "A small ripple of reassurance...", "A little strength to borrow...",
    "Time for a gentle pause...", "A royal blanket decree...", "Enough for this one day...", "A slower rhythm...",
    "One tiny beginning...", "A quiet season...", "Something steady nearby...", "Five cozy stars...",
  ],
  silly: [
    "An urgent mouse alert...", "Something about snacks...", "Highly scientific findings...", "Tiny breaking news...",
    "A mysterious comfort bonus...", "An important side quest...", "Advanced blanket magic...", "The sloth hotline says...",
    "More at eleven...", "A prestigious resting title...", "The Blanket Committee is gathering...", "Still loading...",
    "Whispers from the squirrels...", "A highly important battery report...", "An official sloth verdict...",
    "Your assigned support item...", "A tiny pending court case...", "A major career advancement...",
    "The latest forest update...", "A legendary new status...",
  ],
  boost: [
    "One brave little inch...", "A quiet spark...", "A note about mouse strength...", "The next tiny thing...",
    "A brave kind of rest...", "For steady little paws...", "A very important main quest...", "Quiet persistence...",
    "A bit of tiny momentum...", "One little candle...", "For showing up again...", "A note from future-you...",
    "A tiny mathematical victory...", "A whisper for tomorrow...", "Something quietly healing...",
    "Just beyond the next step...", "What trying says about you...", "An ordinary-looking courage...",
    "The club is applauding...", "Something growing out of sight...",
  ],
  romantic: [
    "A light in the fog...", "A favorite little place...", "Something in your orbit...", "A soft place to land...",
    "A favorite creature...", "Come a little closer...", "A bit of starlight...", "Always worth loving...",
    "A tiny brave heartbeat...", "Something that feels like home...", "A favorite moment of the day...",
    "The easiest choice...", "Somewhere safe to exhale...", "For two future woodland creatures...",
    "A happy little reminder...", "One very short invitation...", "A heart kept carefully...",
    "Adored without the sparkle...", "A brighter little world...", "A familiar kind of hug...",
  ],
};

const mouseEmotes = {
  meh: { id: "meh", src: "./mice/meh.jpeg", label: "unimpressed mouse", effect: "·" },
  sleeping: { id: "sleeping", src: "./mice/sleeping.jpeg", label: "sleeping mouse", effect: "z" },
  peaceful: { id: "peaceful", src: "./mice/peaceful.jpeg", label: "peaceful mouse", effect: "✦" },
  resting: { id: "resting", src: "./mice/resting.jpeg", label: "resting mouse", effect: "·" },
  facepalmHappy: { id: "facepalm-happy", src: "./mice/facepalm-happy.jpeg", label: "amused mouse", effect: "✧" },
  delighted: { id: "delighted", src: "./mice/delighted.jpeg", label: "delighted mouse", effect: "★" },
  happy: { id: "happy", src: "./mice/happy.jpeg", label: "happy mouse", effect: "♡" },
} as const;

type MouseEmote = keyof typeof mouseEmotes;

const getOpeningMouse = (): MouseEmote => new Date().getHours() >= 20 ? "sleeping" : "meh";

const toneMouseEmotes: Record<string, MouseEmote> = {
  treats: "peaceful",
  soft: "resting",
  silly: "facepalmHappy",
  boost: "delighted",
  romantic: "happy",
};

const mouseReplies = ["eep! 💜", "tiny boost! ✨", "feeling brighter ☀️", "thank you 🐭"];

type Message = (typeof messageBank)[number];
type ActiveMessage = Pick<Message, 'title' | 'text' | 'tag'> & Partial<Pick<Message, 'id' | 'tone' | 'cost'>>;

type SaveData = {
  stars: number;
  starRate: number;
  maxStars: number;
  journalIds: number[];
  lastDailyClaim: string | null;
  lastOpenedAt: string | null;
};

const freshSave: SaveData = {
  stars: 100,
  starRate: 1,
  maxStars: 500,
  journalIds: [],
  lastDailyClaim: null,
  lastOpenedAt: null,
};

const getTodayKey = () => new Date().toLocaleDateString('en-CA');

const getLimitedNews = () => {
  const previewDate = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('limitedNews') : null;
  const previewNews = previewDate ? limitedNewsByDate[previewDate] : null;
  if (previewNews) return { ...previewNews, isPreview: true };

  const todayNews = limitedNewsByDate[getTodayKey()];
  return todayNews && localStorage.getItem(LIMITED_NEWS_KEY) !== 'true' ? todayNews : null;
};

const shouldShowWelcomeBack = (lastOpenedAt: string | null) => {
  if (!lastOpenedAt) return false;

  const lastOpenedTime = new Date(lastOpenedAt).getTime();
  return Number.isFinite(lastOpenedTime) && Date.now() - lastOpenedTime > WELCOME_BACK_AFTER_MS;
};

const isWelcomeBackPreview = () => (
  import.meta.env.DEV && new URLSearchParams(window.location.search).get('welcomeBack') === '1'
);

const shouldShowUpdateBanner = () => (
  Date.now() < new Date(UPDATE_BANNER_EXPIRES_AT).getTime()
  && localStorage.getItem(UPDATE_BANNER_SEEN_KEY) !== 'true'
);

const loadSave = (): SaveData => {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) ?? '') as Partial<SaveData>;

    return {
      stars: typeof saved.stars === 'number' ? saved.stars : freshSave.stars,
      starRate: typeof saved.starRate === 'number' ? saved.starRate : freshSave.starRate,
      maxStars: typeof saved.maxStars === 'number' ? saved.maxStars : freshSave.maxStars,
      journalIds: Array.isArray(saved.journalIds) ? saved.journalIds.filter(id => typeof id === 'number') : [],
      lastDailyClaim: typeof saved.lastDailyClaim === 'string' ? saved.lastDailyClaim : null,
      lastOpenedAt: typeof saved.lastOpenedAt === 'string' ? saved.lastOpenedAt : null,
    };
  } catch {
    return freshSave;
  }
};

export default function App() {
  const [save] = useState(loadSave);
  const [openedAt] = useState(() => new Date().toISOString());
  const [stars, setStars] = useState(save.stars);
  const [starRate, setStarRate] = useState(save.starRate);
  const [maxStars, setMaxStars] = useState(save.maxStars);
  const [activeMessage, setActiveMessage] = useState<ActiveMessage | null>(null);
  const [activeMouse, setActiveMouse] = useState<MouseEmote>(getOpeningMouse);
  const [messageRevealId, setMessageRevealId] = useState(0);
  const [mouseReactionId, setMouseReactionId] = useState(0);
  const [mouseReply, setMouseReply] = useState<string | null>(null);
  const [showSloth, setShowSloth] = useState(false);
  const [journal, setJournal] = useState<Message[]>(() => messageBank.filter(message => save.journalIds.includes(message.id)));
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(collectionCategories.map(category => [category.id, false]))
  );
  const [view, setView] = useState('main');
  const [lastDailyClaim, setLastDailyClaim] = useState<string | null>(save.lastDailyClaim);
  const [limitedNews, setLimitedNews] = useState(getLimitedNews);
  const [showWelcomeBack, setShowWelcomeBack] = useState(() => isWelcomeBackPreview() || shouldShowWelcomeBack(save.lastOpenedAt));
  const [showUpdateBanner, setShowUpdateBanner] = useState(shouldShowUpdateBanner);
  const canClaimDaily = lastDailyClaim !== getTodayKey();
  const currentMouse = mouseEmotes[activeMouse];

  useEffect(() => {
    const timer = setInterval(() => setStars(prev => Math.min(prev + starRate, maxStars)), 1000);
    return () => clearInterval(timer);
  }, [starRate, maxStars]);

  useEffect(() => {
    if (limitedNews && !limitedNews.isPreview) {
      localStorage.setItem(LIMITED_NEWS_KEY, 'true');
    }
  }, [limitedNews]);

  useEffect(() => {
    const nextSave: SaveData = {
      stars,
      starRate,
      maxStars,
      journalIds: journal.map(message => message.id),
      lastDailyClaim,
      lastOpenedAt: openedAt,
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(nextSave));
  }, [stars, starRate, maxStars, journal, lastDailyClaim, openedAt]);

  const showSlothBriefly = () => {
    setShowSloth(true);
    window.setTimeout(() => setShowSloth(false), 3000);
  };

  const revealMessage = (message: ActiveMessage) => {
    setActiveMessage(message);
    setMessageRevealId(current => current + 1);
    showSlothBriefly();
  };

  const handleDrawMessage = (toneId: string) => {
    if (toneId === 'treats') {
      const randomTreat = treatList[Math.floor(Math.random() * treatList.length)];
      revealMessage({ title: "Tiny Treat", text: randomTreat, tag: "TREAT", cost: 10 });
      setActiveMouse(toneMouseEmotes.treats);
      setStars(prev => prev - 10);
    } else {
      const pool = messageBank.filter(m => m.tone === toneId);
      const randomMsg = pool[Math.floor(Math.random() * pool.length)];
      if (stars >= randomMsg.cost) {
        setStars(prev => prev - randomMsg.cost);
        revealMessage(randomMsg);
        setActiveMouse(toneMouseEmotes[toneId]);
        if (!journal.find(m => m.id === randomMsg.id)) setJournal(prev => [...prev, randomMsg]);
      }
    }
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(current => ({ ...current, [categoryId]: !current[categoryId] }));
  };

  const encourageMouse = () => {
    const reply = mouseReplies[mouseReactionId % mouseReplies.length];
    setMouseReactionId(current => current + 1);
    setMouseReply(reply);
    window.setTimeout(() => setMouseReply(current => current === reply ? null : current), 1600);
  };

  const dismissLimitedNews = () => setLimitedNews(null);
  const dismissWelcomeBack = () => setShowWelcomeBack(false);
  const dismissUpdateBanner = () => {
    localStorage.setItem(UPDATE_BANNER_SEEN_KEY, 'true');
    setShowUpdateBanner(false);
  };

  const navItems = [{ id: 'main', icon: Mail }, { id: 'journal', icon: BookOpen }, { id: 'upgrades', icon: TrendingUp }];

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-2 font-sans text-slate-800">
      {showWelcomeBack && (
        <div className="welcome-back-backdrop" role="presentation">
          <section
            className="welcome-back-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-back-title"
          >
            <div className="welcome-back-sparkles" aria-hidden="true">
              <span>✦</span>
              <span>♡</span>
              <span>✧</span>
            </div>
            <div className="welcome-back-art">
              <img src="./sloth/sloth-message.png" alt="Sloth holding a sweet message" />
            </div>
            <div className="welcome-back-copy">
              <p className="welcome-back-kicker">SlothMail missed you</p>
              <h1 id="welcome-back-title">Welcome Back</h1>
              <p>The tiny inbox stayed warm while you were away.</p>
            </div>
            <button
              type="button"
              className="welcome-back-button"
              onClick={dismissWelcomeBack}
            >
              boop me
            </button>
          </section>
        </div>
      )}

      {limitedNews && (
        <div className="limited-news-backdrop" role="presentation">
          <section
            className="limited-news-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="limited-news-title"
          >
            <button
              type="button"
              className="limited-news-close"
              onClick={dismissLimitedNews}
              aria-label="Close news flash"
            >
              <X size={16} />
            </button>
            <div className="limited-news-art">
              <img
                className="limited-news-image"
                src={limitedNews.image}
                alt={limitedNews.alt}
              />
            </div>
            <div className="limited-news-copy">
              <p id="limited-news-title" className="limited-news-title">📢 News Flash</p>
              <p className="limited-news-message">{limitedNews.message}</p>
            </div>
          </section>
        </div>
      )}

      {showUpdateBanner && (
        <div className="update-banner" role="status">
          <span>Update: the sloth added messages on Jul 19! 💌</span>
          <button
            type="button"
            className="update-banner-close"
            onClick={dismissUpdateBanner}
            aria-label="Dismiss update message"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-4 flex flex-col items-center text-center space-y-3">
        <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2 bg-amber-100 px-4 py-1 rounded-full font-bold text-amber-700 text-sm">
              <Star className="fill-amber-400" size={16} />
              <span>{Math.floor(stars)}/{maxStars}</span>
            </div>
            <div className="flex gap-1">
                {navItems.map(item => (
                    <button key={item.id} onClick={() => setView(item.id)} className={`p-2 rounded-full ${view === item.id ? 'bg-rose-100 text-rose-600' : 'text-slate-400'}`}>
                        <item.icon size={18}/>
                    </button>
                ))}
            </div>
        </div>

        {view === 'main' && (
        <>
            <button
              key={`${currentMouse.id}-${mouseReactionId}`}
              type="button"
              aria-label="Give the mouse a little encouragement"
              onClick={encourageMouse}
              className={`mouse-stage mouse-stage-reacting mouse-stage-${currentMouse.id} h-36 relative flex w-full flex-col items-center justify-center`}
            >
              <div className="mouse-glow" aria-hidden="true" />
              <div className="mouse-ambient" aria-hidden="true">
                {Array.from({ length: 7 }, (_, index) => (
                  <span
                    key={index}
                    style={{
                      '--particle-delay': `${index * -0.7}s`,
                      '--particle-left': `${8 + index * 13}%`,
                      '--particle-size': `${0.65 + index * 0.04}rem`,
                      '--particle-top': `${8 + (index % 3) * 28}%`,
                    } as React.CSSProperties}
                  >
                    {currentMouse.effect}
                  </span>
                ))}
              </div>
              {mouseReply && (
                <span className="mouse-reply" role="status">{mouseReply}</span>
              )}
              <img
                src={currentMouse.src}
                alt={currentMouse.label}
                className="mouse-emote h-32 w-32 object-contain"
              />
              {showSloth && (
                <div className="absolute -top-8 right-6 flex flex-col items-center animate-[slideInUp_0.5s_ease-out]">
                  <div className="bg-white border border-rose-200 px-3 py-1 rounded-full shadow-md text-[10px] font-bold text-rose-500 mb-1">{activeMessage?.title}</div>
                  <div className="text-4xl">🦥</div>
                </div>
              )}
            </button>

            <div key={messageRevealId} className={`message-card w-full min-h-[100px] bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-center items-center ${activeMessage ? 'message-card-opening' : ''}`}>
              {activeMessage ? (
                <>
                  <div className="envelope-seal" aria-hidden="true">💌</div>
                  <div className="message-copy">
                    <p className="text-[10px] font-bold text-rose-400 uppercase">{activeMessage.tag}</p>
                    <p className="text-xs italic leading-snug">{activeMessage.text}</p>
                  </div>
                </>
              ) : (
                <p className="text-slate-400 text-xs">Select a mood for a sloth boost! 💌</p>
              )}
            </div>

            {canClaimDaily && (
                <button onClick={() => {setLastDailyClaim(getTodayKey()); setActiveMouse("happy"); revealMessage({title:"Daily Gift", text:dailyBank[Math.floor(Math.random()*dailyBank.length)], tag:"DAILY"});}} className="w-full py-2 bg-purple-100 rounded-xl text-purple-700 font-bold text-xs flex items-center justify-center gap-2">
                    <Gift size={14}/> Claim Daily Surprise
                </button>
            )}

            <div className="grid grid-cols-5 gap-1.5 w-full">
              {tones.map((t) => (
                <button key={t.id} disabled={stars < t.cost} onClick={() => handleDrawMessage(t.id)} className={`flex flex-col items-center p-1.5 rounded-xl transition-all border ${stars >= t.cost ? 'bg-slate-50 border-slate-200 hover:bg-rose-100' : 'bg-slate-100 border-slate-100 opacity-50 cursor-not-allowed'}`}>
                  <span className="text-lg">{t.emoji}</span>
                  <span className="text-[8px] font-bold uppercase">{t.label}</span>
                </button>
              ))}
            </div>
        </>
        )}

        {view === 'upgrades' && (
            <div className="w-full text-left space-y-2">
                <button disabled={stars < 100} onClick={() => {setStarRate(s => s+1); setStars(s => s-100);}} className="w-full p-3 bg-slate-50 border rounded-lg text-xs font-bold text-left disabled:opacity-50">Buy Sloth Energy (+1/s) - 100★</button>
                <button disabled={stars < 200} onClick={() => {setMaxStars(s => s+200); setStars(s => s-200);}} className="w-full p-3 bg-slate-50 border rounded-lg text-xs font-bold text-left disabled:opacity-50">Expand Pocket (+200 Cap) - 200★</button>
            </div>
        )}

        {view === 'journal' && (
            <div className="w-full h-80 overflow-y-auto text-left space-y-2 text-xs pr-0.5">
                {collectionCategories.map(category => {
                  const categoryMessages = messageBank.filter(message => message.tone === category.id);
                  const collectedMessages = categoryMessages.filter(message => journal.some(saved => saved.id === message.id));
                  const isOpen = openCategories[category.id];

                  return (
                    <section key={category.id} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center gap-2 px-3 py-2.5 text-left font-bold text-slate-700 hover:bg-rose-50"
                      >
                        <span className="text-base" aria-hidden="true">{category.emoji}</span>
                        <span className="flex-1">{category.label.toLowerCase()} ({collectedMessages.length}/{categoryMessages.length})</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div className="space-y-1.5 border-t border-slate-200 p-2">
                          {categoryMessages.map(message => {
                            const isCollected = journal.some(saved => saved.id === message.id);

                            return isCollected ? (
                              <div
                                key={message.id}
                                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-left font-bold text-slate-700"
                              >
                                {message.title}
                              </div>
                            ) : (
                              <div key={message.id} className="rounded-lg border border-slate-200 bg-slate-100 p-2 font-bold text-slate-400 opacity-70">
                                {lockedHints[category.id][categoryMessages.indexOf(message)]}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  );
                })}
            </div>
        )}
      </div>
      <style>{`@keyframes slideInUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}
