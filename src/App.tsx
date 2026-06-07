import React, { useState, useEffect } from 'react';
import { Star, BookOpen, Mail, TrendingUp, Gift } from 'lucide-react';

const SAVE_KEY = 'slothmail-save-v1';

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
];

const tones = [
  { id: "treats", label: "Treats", emoji: "🌈", cost: 10 },
  { id: "soft", label: "Soft", emoji: "☁️", cost: 30 },
  { id: "silly", label: "Silly", emoji: "🤭", cost: 40 },
  { id: "boost", label: "Boost", emoji: "⭐", cost: 60 },
  { id: "romantic", label: "Love", emoji: "💜", cost: 80 },
];

type Message = (typeof messageBank)[number];
type ActiveMessage = Pick<Message, 'title' | 'text' | 'tag'> & Partial<Pick<Message, 'id' | 'tone' | 'cost'>>;

type SaveData = {
  stars: number;
  starRate: number;
  maxStars: number;
  journalIds: number[];
  lastDailyClaim: string | null;
};

const freshSave: SaveData = {
  stars: 100,
  starRate: 1,
  maxStars: 500,
  journalIds: [],
  lastDailyClaim: null,
};

const getTodayKey = () => new Date().toLocaleDateString('en-CA');

const loadSave = (): SaveData => {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) ?? '') as Partial<SaveData>;

    return {
      stars: typeof saved.stars === 'number' ? saved.stars : freshSave.stars,
      starRate: typeof saved.starRate === 'number' ? saved.starRate : freshSave.starRate,
      maxStars: typeof saved.maxStars === 'number' ? saved.maxStars : freshSave.maxStars,
      journalIds: Array.isArray(saved.journalIds) ? saved.journalIds.filter(id => typeof id === 'number') : [],
      lastDailyClaim: typeof saved.lastDailyClaim === 'string' ? saved.lastDailyClaim : null,
    };
  } catch {
    return freshSave;
  }
};

export default function App() {
  const [save] = useState(loadSave);
  const [stars, setStars] = useState(save.stars);
  const [starRate, setStarRate] = useState(save.starRate);
  const [maxStars, setMaxStars] = useState(save.maxStars);
  const [activeMessage, setActiveMessage] = useState<ActiveMessage | null>(null);
  const [showSloth, setShowSloth] = useState(false);
  const [journal, setJournal] = useState<Message[]>(() => messageBank.filter(message => save.journalIds.includes(message.id)));
  const [view, setView] = useState('main');
  const [lastDailyClaim, setLastDailyClaim] = useState<string | null>(save.lastDailyClaim);
  const canClaimDaily = lastDailyClaim !== getTodayKey();

  useEffect(() => {
    const timer = setInterval(() => setStars(prev => Math.min(prev + starRate, maxStars)), 1000);
    return () => clearInterval(timer);
  }, [starRate, maxStars]);

  useEffect(() => {
    const nextSave: SaveData = {
      stars,
      starRate,
      maxStars,
      journalIds: journal.map(message => message.id),
      lastDailyClaim,
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(nextSave));
  }, [stars, starRate, maxStars, journal, lastDailyClaim]);

  const showSlothBriefly = () => {
    setShowSloth(true);
    window.setTimeout(() => setShowSloth(false), 3000);
  };

  const handleDrawMessage = (toneId: string) => {
    if (toneId === 'treats') {
      const randomTreat = treatList[Math.floor(Math.random() * treatList.length)];
      setActiveMessage({ title: "Tiny Treat", text: randomTreat, tag: "TREAT", cost: 10 });
      setStars(prev => prev - 10);
    } else {
      const pool = messageBank.filter(m => m.tone === toneId);
      const randomMsg = pool[Math.floor(Math.random() * pool.length)];
      if (stars >= randomMsg.cost) {
        setStars(prev => prev - randomMsg.cost);
        setActiveMessage(randomMsg);
        if (!journal.find(m => m.id === randomMsg.id)) setJournal(prev => [...prev, randomMsg]);
      }
    }
    showSlothBriefly();
  };

  const navItems = [{ id: 'main', icon: Mail }, { id: 'journal', icon: BookOpen }, { id: 'upgrades', icon: TrendingUp }];

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-2 font-sans text-slate-800">
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
            <div className="h-32 relative flex flex-col items-center justify-center">
              <div className="animate-[bounce_3s_infinite] text-6xl">🐭</div>
              {showSloth && (
                <div className="absolute -top-10 flex flex-col items-center animate-[slideInUp_0.5s_ease-out]">
                  <div className="bg-white border border-rose-200 px-3 py-1 rounded-full shadow-md text-[10px] font-bold text-rose-500 mb-1">{activeMessage?.title}</div>
                  <div className="text-4xl">🦥</div>
                </div>
              )}
            </div>

            <div className="w-full min-h-[100px] bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-center items-center">
              {activeMessage ? (
                <div className="animate-in fade-in duration-500">
                  <p className="text-[10px] font-bold text-rose-400 uppercase">{activeMessage.tag}</p>
                  <p className="text-xs italic leading-snug">{activeMessage.text}</p>
                </div>
              ) : (
                <p className="text-slate-400 text-xs">Select a mood for a sloth boost! 💌</p>
              )}
            </div>

            {canClaimDaily && (
                <button onClick={() => {setLastDailyClaim(getTodayKey()); setActiveMessage({title:"Daily Gift", text:dailyBank[Math.floor(Math.random()*dailyBank.length)], tag:"DAILY"}); showSlothBriefly();}} className="w-full py-2 bg-purple-100 rounded-xl text-purple-700 font-bold text-xs flex items-center justify-center gap-2">
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
            <div className="w-full h-80 overflow-y-auto text-left space-y-2 text-xs">
                {messageBank.map(m => (
                    <div key={m.id} className={`p-2 rounded-lg border ${journal.find(j => j.id === m.id) ? 'bg-white' : 'bg-slate-100 opacity-50'}`}>
                        <p className="font-bold">{journal.find(j => j.id === m.id) ? m.title : "Locked"}</p>
                    </div>
                ))}
            </div>
        )}
      </div>
      <style>{`@keyframes slideInUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}
