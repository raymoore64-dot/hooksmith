import { useState, useRef, useEffect } from "react";

const LOGO_SRC = "data:image/webp;base64,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";

const FEW_SHOT_EXAMPLES = [
  { cluster: "Ballad", prompt: `Piano ballad, intimate and luminous, female vocal, warm and unhurried, sparse piano opening, strings entering gently at pre-chorus, emotional peak at bridge, raw and unguarded delivery, soft kick and brushed snare from second verse, key change upward at final chorus, ad lib vocal runs and harmonies layered over final chorus, gospel-influenced ad lib style but restrained and tearful rather than celebratory, fades on solo piano after vocal ad libs resolve, 4/4 time, 68 BPM, melancholic but transcendent, soul and folk influence, British singer-songwriter tone, lyric-forward production, no synths` },
  { cluster: "Electronic", prompt: `Sensual liquid drum and bass, female vocal breathy and intimate, mid-nineties dark atmospheric production, rolling Amen break processed and deep, heavy sub-bass breathing slow, half-time verse feel with full liquid DnB drop on chorus, sparse atmospheric pads with reverb tails, bridge strips to sub-bass heartbeat and whispered vocal only before break rebuilds, final chorus deepest mix, outro dissolves to looped vocal fragment over sub-bass pulse, no acoustic instruments, dark and cinematic, sensual not aggressive, 170bpm with half-time vocal phrasing, key of D minor, production cold and intimate simultaneously` },
  { cluster: "Electronic", prompt: `Trip-hop, dark orchestral soul, haunted cinematic, Bristol sound, melancholic downtempo, orchestral strings over cracking vinyl warmth, ghostly female vocal fractured, intimate, aching, never oversinging. Brushed snare, deep slow hip-hop kick, bass that breathes underneath. Muted trumpet distant in the mix. Wax crackle throughout. Bridge stripped to voice, bass pulse, single piano note repeating. Final chorus almost a whisper. 68 BPM, D minor. Quietly devastating.` },
  { cluster: "Folk", prompt: `Dark folk ballad, acoustic fingerpicked guitar, sparse piano, slow brushed drums, female vocal, soft cello undertone, wide reverb, intimate and aching, cinematic indie folk, pastoral and longing, gentle swell in chorus, whispered harmonies, warm analog warmth, pentatonic minor melody, windswept Celtic undertone, unhurried tempo 68bpm, emotional and restrained` },
  { cluster: "Folk", prompt: `Abstract art song, sparse and devotional. Female vocal close-mic'd, breath audible, often half-whispered, phrases drifting into silence. Sustained low drone in D, bowed double bass with harmonics, single struck piano notes with full sustain pedal, fingerpicked acoustic guitar in open tuning, soft tape hiss. No drums. Rubato throughout. Cathedral reverb on some words, bone-dry on others. Slow revelation. End on a single footstep, a door opening, then silence.` },
  { cluster: "Rock", prompt: `Mid-90s British alternative rock, melancholic and anthemic, clean arpeggiated guitar intro building to distorted layers, restrained rim-heavy drums, string dissonance, female falsetto vocal with emotional rawness, minor key, dynamic shifts from quiet verse to full chorus, feedback outro, cinematic and literary, Bends-era production, introspective lyrics about love and release` },
  { cluster: "Rock", prompt: `Melodic sludge metal, downtuned drop B guitars, crushing slow riffs, female vocals with raw melodic breaks, massive distortion, pounding half-time drums, feedback-drenched, primal, oppressive bass tone, whispered spoken word bridge, 70 BPM` },
  { cluster: "Rock", prompt: `Progressive rock, 1973-1975 style. Four-movement suite. Mellotron M400 strings and flute and choir patches, Hammond C3 organ through Leslie speaker, Rickenbacker bass, 12-string acoustic guitar, classical guitar with harmonics. Time signatures shifting between 3/4, 5/4, 7/8, and 6/8. Theatrical female vocals from barely audible whisper to full dramatic declamation. Cathedral dynamics with absolute silences. Analog production, vintage warmth, vast reverb.` },
  { cluster: "Electronic", prompt: `Driving euphoric deep house, female vocal building from low restrained verses to full-throated powerful chorus, propulsive kick, bass-heavy with rolling sub-bass line, synth arpeggios accelerating and layering, 120 BPM, bright open hi-hats, bridge breaks down to piano and breath then final chorus drops with layered synths, driving bass, shimmering pads, euphoric but earned not given.` },
  { cluster: "Experimental", prompt: `Female lead vocal, sultry mezzo with breathy intimacy, hypnotic and incantatory delivery, half-sung half-whispered legato phrases. Psychedelic desert groove, Anatolian psych influence, Mediterranean dub. 88 BPM, 4/4. Syncopated tabla and hand percussion, deep fretless bass in circular patterns, nylon-string guitar arpeggios, tremolo guitar lead with heavy spring reverb, bansuri flute in second verse, no drum kit. Wide tape reverb, mix dusky and sunlit.` },
  { cluster: "Country", prompt: `Mid-tempo modern country, 98 bpm, warm female vocal with Southern grit and emotional tenderness, fingerpicked acoustic guitar lead, fiddle accents, pedal steel woven through the mix, understated electric guitar, Nashville-style rhythm section with brushed snare and walking bass, lush background vocal harmonies, honest heartland feel, dust and open road imagery, uplifting without being saccharine, Appalachian soul, storytelling vocal performance` },
  { cluster: "Hip-Hop", prompt: `Dark progressive electronic, hypnotic late-night atmosphere with intimate male spoken-word vocals, tension-filled bassline, motorik techno pulse, layered ambient pads, ghostly synth motifs, cinematic movement through rain-soaked historic city. Emotional but controlled, urban but haunted, sensual, melancholic. Repeating phrases, poetic fragments, elegant build. 122 BPM, D minor, Scottish-accented delivery, field recordings of rain on stone.` },
  { cluster: "Pop", prompt: `Melodic indie-dance ballad, anthemic but restrained, deeply emotional. Female vocal lead, intimate and close-mic'd, breathy in verses, opening into full chest voice at choruses. Start sparse: single sustained analog synth pad in D minor, soft piano in wide voicings, deep sub-bass pulse at 110 BPM. First chorus lifts into four-on-the-floor kick, brushed hi-hats, arpeggiated synth line. Bridge strips back to piano, pad and voice. Final chorus opens into full release: layered harmonies, wide reverb, driving kick. Outro dissolves back to piano, voice fading to silence.` },
  { cluster: "Ballad", prompt: `Trip-hop, dark orchestral soul, haunted cinematic, Bristol sound, melancholic downtempo, orchestral strings over cracking vinyl warmth, ghostly female vocal. Brushed snare, deep slow hip-hop kick, bass that breathes underneath. Wax crackle throughout. Bridge stripped to voice, bass pulse, single piano note repeating. Final chorus almost a whisper. Outro dissolves into static hiss. Tempo 68 BPM, D minor. Female vocal carries everything. Quietly devastating.` },
];

const SIMPLE_GENRES = [
  { id: "Ballad",        label: "Ballad",        icon: "\u2665", hint: "Tender, emotional, piano or strings" },
  { id: "Pop",           label: "Pop",           icon: "\u25c9", hint: "Catchy, warm, anthemic" },
  { id: "Folk",         label: "Folk",          icon: "\u25ce", hint: "Acoustic, gentle, storytelling" },
  { id: "Country",      label: "Country",       icon: "\u27b6", hint: "Heartfelt, roots, open roads" },
  { id: "Rock",         label: "Rock",          icon: "\u2593", hint: "From tender acoustic to powerful" },
  { id: "Electronic",   label: "Electronic",    icon: "\u25c8", hint: "Modern, atmospheric, beats" },
  { id: "Hip-Hop",      label: "Hip-Hop",       icon: "\u2295", hint: "Spoken from the heart, rhythmic" },
  { id: "Experimental", label: "Cinematic",     icon: "\u2298", hint: "Something different, unique, yours" },
];

const SIMPLE_MOODS = [
  { id: "Dark",        color: "#8a7ec8" },
  { id: "Warm",        color: "#c8956e" },
  { id: "Euphoric",    color: "#c8c86e" },
  { id: "Melancholic", color: "#7a9e8a" },
  { id: "Raw",         color: "#c8a96e" },
];

const SIMPLE_VOCALS = [
  { id: "Female",        label: "Female" },
  { id: "Male",          label: "Male" },
  { id: "Duo",           label: "Duo" },
  { id: "Instrumental",  label: "Instrumental" },
];

const DEEP_GENRES = ["Country","Country Rock","Country Ballad","Indie Rock","Alternative Rock","Sludge Metal","Progressive Rock","Piano Ballad","Liquid Drum & Bass","Deep Electronic","Ambient","Folk","Blues Rock","Post-Rock","Psychedelic Soul","Spoken Word Electronic","Singer-Songwriter","Gospel","Dark Folk","Shoegaze"];
const DEEP_MOODS = ["Longing","Euphoric","Melancholic","Defiant","Tender","Aching","Hopeful","Devotional","Haunted","Raw","Meditative","Triumphant","Bittersweet","Restless","Serene"];
const DEEP_INSTRUMENTS = ["Acoustic Guitar","Electric Guitar","12-String Guitar","Mandolin","Piano","Organ","Synthesizer","Strings","Pedal Steel","Drums","Electronic Drums","Bass","Cello","Violin","Lap Steel","Banjo","Harmonica","Trumpet","Ambient Pads"];
const DEEP_ERAS = ["Late 60s","Early 70s","Late 70s","Early 80s","Mid 80s","Late 80s","Early 90s","Mid 90s","Late 90s","Early 2000s","2010s","Contemporary","Timeless"];
const DEEP_VOCALS = ["Female \u2014 warm, unguarded, gospel-tinged","Female \u2014 breathy, intimate, half-time phrasing","Female \u2014 fractured, close-mic'd, never oversinging","Female \u2014 theatrical, whisper to full declamation","Female \u2014 sultry mezzo, incantatory, half-sung","Female \u2014 weathered, searching, slight accent","Female \u2014 fragile, breath audible, often wordless","Female \u2014 Scottish, laconic swagger to full chorus","Female \u2014 raw melodic breaks, whispered bridge","Male \u2014 introspective, plain-spoken, Scottish","Male \u2014 Scots accent, intimate, close-mic'd","Male \u2014 spoken word, dry, urban","Male \u2014 bellowing, broken","Duet \u2014 male/female intertwined","Choir \u2014 gospel, restrained and tearful","No vocal \u2014 instrumental only"];
const KEYS = ["","A major","A minor","Bb major","Bb minor","B major","B minor","C major","C minor","C# minor","D major","D minor","Eb major","Eb minor","E major","E minor","F major","F minor","F# minor","G major","G minor","Ab major","Ab minor","Drop B","Drop C","Drop D","Modal / open","Rubato / atonal"];
const ALL_CLUSTERS = ["Ballad","Electronic","Folk","Rock","Hip-Hop","Country","Experimental","Pop","My Prompts"];
const SEED_ROLES = ["chorus","opening line","verse","bridge","outro","title","not sure"];
const STRUCTURES = [
  { id: "verse",     label: "Verse",      seedRoles: ["opening line","verse","title"], placeholder: "Set the scene..." },
  { id: "prechorus", label: "Pre-Chorus", seedRoles: [],                               placeholder: "Build the tension..." },
  { id: "chorus",    label: "Chorus",     seedRoles: ["chorus"],                       placeholder: "The emotional peak..." },
  { id: "bridge",    label: "Bridge",     seedRoles: ["bridge"],                       placeholder: "The turn..." },
  { id: "outro",     label: "Outro",      seedRoles: ["outro"],                        placeholder: "Resolution or fade..." },
];

const inp = { width: "100%", background: "#0d0d0d", border: "1px solid #1e1e1e", borderLeft: "2px solid #2a2a2a", color: "#ccc", padding: "10px 14px", fontSize: "14px", outline: "none", transition: "border-color 0.2s", fontFamily: "'Lora', serif", boxSizing: "border-box" };
const mono = { ...inp, fontFamily: "'DM Mono', monospace", fontSize: "12px" };

const SmallToggle = ({ label, selected, onToggle, color = "#c8a96e" }) => (
  <button onClick={onToggle} style={{ padding: "5px 12px", borderRadius: "2px", border: selected ? `1px solid ${color}` : "1px solid #2a2a2a", background: selected ? `${color}18` : "transparent", color: selected ? color : "#555", fontSize: "11px", letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>{label}</button>
);

const DeepSection = ({ title, children, accent = "#c8a96e" }) => (
  <div style={{ marginBottom: "22px" }}>
    <div style={{ fontSize: "9px", letterSpacing: "0.15em", color: accent, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "2px", height: "12px", background: accent, borderRadius: "1px" }} />{title}
    </div>
    {children}
  </div>
);

const StarRating = ({ value, onChange }) => {
  const colors = ["#555","#e05555","#e09455","#e0c855","#a0c855","#5ac855"];
  const labels = ["","weak","fair","good","great","perfect"];
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange(value === n ? 0 : n)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "1px", fontSize: "13px", color: n <= value ? colors[value] : "#2a2a2a", transition: "color 0.1s" }}
          onMouseOver={e => { e.target.style.color = colors[n]; }}
          onMouseOut={e => { e.target.style.color = n <= value ? colors[value] : "#2a2a2a"; }}>
          \u2605
        </button>
      ))}
      {value > 0 && <span style={{ fontSize: "9px", color: colors[value], marginLeft: "3px", fontFamily: "'DM Mono', monospace" }}>{labels[value]}</span>}
    </div>
  );
};

export default function Hooksmith() {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [simpleGenre, setSimpleGenre] = useState(null);
  const [simpleMood, setSimpleMood] = useState(null);
  const [simpleVocal, setSimpleVocal] = useState(null);
  const [deepOpen, setDeepOpen] = useState(false);
  const [deepGenres, setDeepGenres] = useState([]);
  const [deepMoods, setDeepMoods] = useState([]);
  const [deepInstruments, setDeepInstruments] = useState([]);
  const [deepEra, setDeepEra] = useState([]);
  const [deepVocal, setDeepVocal] = useState("");
  const [bpm, setBpm] = useState("");
  const [songKey, setSongKey] = useState("");
  const [timeSig, setTimeSig] = useState("");
  const [outputMode, setOutputMode] = useState("prose");
  const [songOpen, setSongOpen] = useState(false);
  const [seed, setSeed] = useState("");
  const [seedRole, setSeedRole] = useState(null);
  const [seedBuilding, setSeedBuilding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);
  const [lyrics, setLyrics] = useState({ verse: "", prechorus: "", chorus: "", bridge: "", outro: "" });
  const [lyricAssist, setLyricAssist] = useState("");
  const [lyricLoading, setLyricLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [myPrompts, setMyPrompts] = useState([]);
  const [history, setHistory] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [showMine, setShowMine] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [newPromptText, setNewPromptText] = useState("");
  const [newPromptTitle, setNewPromptTitle] = useState("");
  const [newPromptCluster, setNewPromptCluster] = useState("My Prompts");
  const [savedFlash, setSavedFlash] = useState(false);
  const promptRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const r1 = await window.storage.get("hooksmith-my-prompts");
        if (r1?.value) setMyPrompts(JSON.parse(r1.value));
        const r2 = await window.storage.get("hooksmith-history");
        if (r2?.value) setHistory(JSON.parse(r2.value));
      } catch {}
      setStorageReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    (async () => { try { await window.storage.set("hooksmith-my-prompts", JSON.stringify(myPrompts)); } catch {} })();
  }, [myPrompts, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    (async () => { try { await window.storage.set("hooksmith-history", JSON.stringify(history)); } catch {} })();
  }, [history, storageReady]);

  useEffect(() => { setCharCount(generatedPrompt.length); }, [generatedPrompt]);

  const dtoggle = (arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const allLyrics = [
    seed ? `[SEED \u2014 ${seedRole || "key line"}]\n"${seed}"` : "",
    ...STRUCTURES.map(s => lyrics[s.id] ? `[${s.label}]\n${lyrics[s.id]}` : "")
  ].filter(Boolean).join("\n\n");

  const buildContext = () => {
    const genre = deepOpen && deepGenres.length > 0 ? deepGenres.join(", ") : simpleGenre || "unspecified";
    const mood = deepOpen && deepMoods.length > 0 ? deepMoods.join(", ") : simpleMood || "unspecified";
    const vocal = deepOpen && deepVocal ? deepVocal : simpleVocal ? `${simpleVocal} vocal` : "unspecified";
    const instruments = deepOpen && deepInstruments.length > 0 ? deepInstruments.join(", ") : "";
    const era = deepOpen && deepEra.length > 0 ? deepEra.join(", ") : "";
    return { genre, mood, vocal, instruments, era };
  };

  const getExamples = () => {
    const cluster = simpleGenre || "Ballad";
    const userEx = myPrompts.map(p => ({ cluster: p.cluster, prompt: p.text }));
    const topRated = history.filter(h => h.rating >= 4).map(h => ({ cluster: h.cluster || cluster, prompt: h.prompt }));
    const allEx = [...topRated, ...userEx, ...FEW_SHOT_EXAMPLES];
    const primary = allEx.filter(e => e.cluster === cluster).slice(0, 3);
    const others = allEx.filter(e => e.cluster !== cluster).sort(() => Math.random() - 0.5).slice(0, 2);
    return [...primary, ...others].slice(0, 4).map((ex, i) =>
      `EXAMPLE ${i + 1} [${ex.cluster}]:\n${ex.prompt}`
    ).join("\n\n---\n\n");
  };

  const generatePrompt = async () => {
    setLoading(true); setGeneratedPrompt("");
    const { genre, mood, vocal, instruments, era } = buildContext();
    const isTags = outputMode === "tags";
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: isTags
            ? `You are an expert Suno AI prompt writer. Output ONLY a comma-separated style tag list. Under 200 characters. Genre first, then era, mood, instruments, production, vocal. NO artist names.`
            : `You are an expert Suno AI prompt writer. Study these examples carefully.

RULES:
- Output ONLY the prompt text, no preamble or explanation
- Stay under 950 characters
- NO artist names, use era and genre descriptors only
- Map the full production arc: opening, build, peak, ending
- Include BPM, time signature, key where provided
- Render place names phonetically
- End with vocal delivery descriptor
- If a SEED line is provided, treat it as sacred and build the prompt around it

EXAMPLES:\n${getExamples()}`,
          messages: [{
            role: "user",
            content: `Generate a Suno ${isTags ? "tag list" : "prompt"} for:\n\nTitle: ${title || "Untitled"}\nGenre: ${genre}\nMood: ${mood}\nVocal: ${vocal}${instruments ? `\nInstruments: ${instruments}` : ""}${era ? `\nEra: ${era}` : ""}${bpm ? `\nBPM: ${bpm}` : ""}${songKey ? `\nKey: ${songKey}` : ""}${timeSig ? `\nTime: ${timeSig}` : ""}\nTheme: ${theme || "none provided"}\n${allLyrics ? `\nLyrics:\n${allLyrics}` : ""}`
          }]
        })
      });
      const data = await res.json();
      const text = (data.content?.find(b => b.type === "text")?.text || "").trim();
      setGeneratedPrompt(text);
      setHistory(prev => [{
        id: Date.now(), title: title || "Untitled",
        cluster: simpleGenre || "Ballad", genre, mood, vocal, bpm, songKey,
        prompt: text, mode: outputMode, rating: 0,
        savedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })
      }, ...prev].slice(0, 50));
    } catch { setGeneratedPrompt("Error generating prompt. Please try again."); }
    setLoading(false);
  };

  const buildAroundSeed = async () => {
    if (!seed.trim()) return;
    setSeedBuilding(true); setSeedResult(null);
    const { genre, mood, vocal } = buildContext();
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a skilled co-writer. The user has one line they cannot shake. Your job is to honour that seed completely and build the rest of the song outward from it.

Rules:
- The seed is sacred. Never rewrite or replace it.
- Write in the implied voice of the seed, not a generic voice.
- Be specific and concrete. No clichés.
- If the seed is a title or image rather than a lyric line, suggest what the opening line and chorus might be.
- Keep suggestions short and usable, 2-4 lines per section.
- Format clearly with section labels: [Verse], [Chorus], [Bridge] etc.
- Do not write the whole song. Suggest the key missing pieces that build toward and away from the seed.
- End with one sentence explaining the emotional logic of your choices.`,
          messages: [{
            role: "user",
            content: `My seed line:\n"${seed}"\n\nThis feels like my: ${seedRole || "unknown part"}\n\nGenre: ${genre}\nMood: ${mood}\nVocal: ${vocal}\n${theme ? `Theme: ${theme}` : ""}\n\nWhat does the rest of the song look like?`
          }]
        })
      });
      const data = await res.json();
      const text = (data.content?.find(b => b.type === "text")?.text || "").trim();
      setSeedResult(text);
      if (seedRole && seedRole !== "not sure") {
        const roleMap = { "chorus": "chorus", "opening line": "verse", "verse": "verse", "bridge": "bridge", "outro": "outro", "title": "verse" };
        const section = roleMap[seedRole];
        if (section) setLyrics(prev => ({ ...prev, [section]: prev[section] ? prev[section] : seed }));
      }
    } catch { setSeedResult("Something went wrong. Please try again."); }
    setSeedBuilding(false);
  };

  const applyToSong = (text) => {
    const secs = { verse: "", prechorus: "", chorus: "", bridge: "", outro: "" };
    let cur = null;
    for (const line of text.split("\n")) {
      const l = line.toLowerCase();
      if (l.includes("[verse]")) { cur = "verse"; continue; }
      if (l.includes("[pre-chorus]") || l.includes("[prechorus]")) { cur = "prechorus"; continue; }
      if (l.includes("[chorus]")) { cur = "chorus"; continue; }
      if (l.includes("[bridge]")) { cur = "bridge"; continue; }
      if (l.includes("[outro]")) { cur = "outro"; continue; }
      if (cur && line.trim()) secs[cur] += (secs[cur] ? "\n" : "") + line;
    }
    if (Object.values(secs).some(v => v.trim())) {
      setLyrics(prev => {
        const next = { ...prev };
        Object.entries(secs).forEach(([k, v]) => { if (v.trim() && !next[k]) next[k] = v.trim(); });
        return next;
      });
    }
  };

  const getLyricAssist = async () => {
    setLyricLoading(true); setLyricAssist("");
    const { genre, mood, vocal } = buildContext();
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: `You are a lyricist with a gift for emotional precision. No clichés. Specific images over abstractions. Truth over technique. Suggest lines for weak or missing sections only. Be concise.`,
          messages: [{ role: "user", content: `Song:\nTitle: ${title || "Untitled"}\nGenre: ${genre}\nMood: ${mood}\nVocal: ${vocal}\nTheme: ${theme || "none"}\n\nCurrent lyrics:\n${allLyrics || "None yet."}\n\nSuggest lines for the weakest or missing sections.` }]
        })
      });
      const data = await res.json();
      setLyricAssist((data.content?.find(b => b.type === "text")?.text || "").trim());
    } catch { setLyricAssist("Error. Please try again."); }
    setLyricLoading(false);
  };

  const saveMyPrompt = () => {
    if (!newPromptText.trim()) return;
    setMyPrompts(prev => [{ id: Date.now(), title: newPromptTitle.trim() || "Untitled", cluster: newPromptCluster, text: newPromptText.trim(), savedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" }) }, ...prev]);
    setNewPromptText(""); setNewPromptTitle("");
    setSavedFlash(true); setTimeout(() => setSavedFlash(false), 1800);
  };

  const exportLyrics = () => {
    if (!seed && !STRUCTURES.some(s => lyrics[s.id]?.trim())) return;
    const lines = [`${title || "Untitled"}\n${"---".repeat(14)}\n`];
    if (theme) lines.push(`Theme: ${theme}\n`);
    if (seed) lines.push(`[SEED LINE]\n"${seed}"\n`);
    STRUCTURES.forEach(s => { if (lyrics[s.id]?.trim()) lines.push(`[${s.label.toUpperCase()}]\n${lyrics[s.id].trim()}\n`); });
    if (generatedPrompt) lines.push(`\n${"---".repeat(14)}\nSUNO PROMPT\n${"---".repeat(14)}\n${generatedPrompt}`);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    a.download = `${(title || "song").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
  };

  const copyPrompt = () => { navigator.clipboard.writeText(generatedPrompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const charColor = charCount > 950 ? "#e05555" : charCount > 800 ? "#e0a855" : "#5a8a5a";
  const topRated = history.filter(h => h.rating >= 4).length;

  const ExpandToggle = ({ open, onToggle, label, labelOpen, hint, color }) => (
    <button onClick={onToggle} style={{ background: "none", border: "none", color: open ? color : "#383838", fontSize: "10px", cursor: "pointer", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.2s", padding: 0 }}>
      <span style={{ fontSize: "14px", display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>\u203a</span>
      {open ? labelOpen : label}
      {!open && hint && <span style={{ color: "#252525", fontSize: "9px", marginLeft: "4px" }}>{hint}</span>}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#d4d4d4", fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #1e1e1e; }
        textarea::placeholder, input::placeholder { color: #333; }
        select option { background: #0d0d0d; }
        .genre-tile:hover { border-color: #c8a96e !important; }
        .genre-tile:hover .gt-icon { color: #c8a96e !important; }
        .genre-tile:hover .gt-label { color: #c8a96e !important; }
        .genre-tile:hover .gt-hint { color: #555 !important; }
        .mood-pill:hover { opacity: 1 !important; transform: translateY(-1px); }
        .vocal-btn:hover { border-color: #c8956e !important; color: #c8956e !important; }
        .gen-btn:hover:not(:disabled) { background: #e0b860 !important; transform: translateY(-1px); }
        .seed-build:hover:not(:disabled) { background: #b090ff !important; }
        .apply-btn:hover { border-color: #9a8aee !important; color: #9a8aee !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes flashIn { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #0f0f0f", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#050505" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={LOGO_SRC} alt="Hooksmith" style={{ width: "44px", height: "44px", objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: "20px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#c8a96e", letterSpacing: "0.02em", lineHeight: 1 }}>Hooksmith</div>
            <div style={{ fontSize: "8px", letterSpacing: "0.22em", color: "#2e2e2e", marginTop: "3px" }}>WRITE. SHAPE. RELEASE.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {topRated > 0 && <span style={{ fontSize: "9px", color: "#5a7a5a" }}>\u2605 {topRated} rated</span>}
          <button onClick={() => { setShowHistory(!showHistory); setShowMine(false); }} style={{ background: "none", border: "none", color: showHistory ? "#c8a96e" : "#333", fontSize: "10px", cursor: "pointer", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", transition: "color 0.15s" }}>
            HISTORY{history.length > 0 ? ` (${history.length})` : ""}
          </button>
          <button onClick={() => { setShowMine(!showMine); setShowHistory(false); }} style={{ background: "none", border: "none", color: showMine ? "#c8a96e" : "#333", fontSize: "10px", cursor: "pointer", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", transition: "color 0.15s" }}>
            MY PROMPTS{myPrompts.length > 0 ? ` (${myPrompts.length})` : ""}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "36px 20px 60px" }}>

        {/* MY PROMPTS PANEL */}
        {showMine && (
          <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "20px", marginBottom: "24px", animation: "slideDown 0.2s ease" }}>
            <div style={{ fontSize: "9px", color: "#7a9e8a", letterSpacing: "0.15em", marginBottom: "14px" }}>MY PROMPT BANK</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
              <input value={newPromptTitle} onChange={e => setNewPromptTitle(e.target.value)} placeholder="Title..." style={{ ...inp, fontSize: "12px", padding: "8px 10px" }} onFocus={e => e.target.style.borderLeftColor = "#7a9e8a"} onBlur={e => e.target.style.borderLeftColor = "#2a2a2a"} />
              <select value={newPromptCluster} onChange={e => setNewPromptCluster(e.target.value)} style={{ ...mono, padding: "8px 10px", cursor: "pointer", fontSize: "11px" }}>
                {ALL_CLUSTERS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <textarea value={newPromptText} onChange={e => setNewPromptText(e.target.value)} placeholder="Paste a Suno prompt that worked well..." rows={4}
              style={{ width: "100%", background: "#0d0d0d", border: "1px solid #1e1e1e", borderLeft: "2px solid #2a2a2a", color: "#ccc", padding: "10px", fontSize: "12px", lineHeight: "1.6", fontFamily: "'Lora', serif", resize: "vertical", outline: "none", marginBottom: "8px", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderLeftColor = "#7a9e8a"} onBlur={e => e.target.style.borderLeftColor = "#2a2a2a"} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={saveMyPrompt} disabled={!newPromptText.trim()} style={{ padding: "7px 18px", background: newPromptText.trim() ? "#7a9e8a" : "#1a1a1a", border: "none", color: newPromptText.trim() ? "#080808" : "#444", fontSize: "10px", cursor: newPromptText.trim() ? "pointer" : "default", fontFamily: "'DM Mono', monospace" }}>SAVE</button>
              {savedFlash && <span style={{ fontSize: "10px", color: "#5a9a5a", animation: "flashIn 0.2s" }}>\u2713 saved</span>}
            </div>
            {myPrompts.length > 0 && (
              <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {myPrompts.map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 10px", background: "#0d0d0d", border: "1px solid #161616" }}>
                    <span style={{ fontSize: "12px", color: "#aaa", fontFamily: "'Lora', serif", fontStyle: "italic" }}>{p.title} <span style={{ fontSize: "9px", color: "#7a9e8a", fontStyle: "normal" }}>{p.cluster}</span></span>
                    <button onClick={() => setMyPrompts(prev => prev.filter(x => x.id !== p.id))} style={{ background: "none", border: "none", color: "#333", fontSize: "11px", cursor: "pointer" }}>\u2715</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORY PANEL */}
        {showHistory && (
          <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "20px", marginBottom: "24px", animation: "slideDown 0.2s ease" }}>
            <div style={{ fontSize: "9px", color: "#9e7a6e", letterSpacing: "0.15em", marginBottom: "14px" }}>GENERATION HISTORY</div>
            {history.length === 0
              ? <div style={{ color: "#333", fontSize: "12px" }}>No history yet</div>
              : <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {history.map(entry => (
                    <div key={entry.id} style={{ background: "#0d0d0d", border: "1px solid #161616", borderLeft: entry.rating >= 4 ? "2px solid #5a9a5a" : "1px solid #161616", padding: "10px 12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                        <span style={{ fontSize: "12px", color: "#999", fontFamily: "'Lora', serif", fontStyle: "italic" }}>{entry.title} <span style={{ fontSize: "9px", color: "#9e7a6e", fontStyle: "normal" }}>{entry.cluster}</span></span>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button onClick={() => { setGeneratedPrompt(entry.prompt); setShowHistory(false); }}
                            style={{ padding: "2px 8px", background: "transparent", border: "1px solid #2a2a2a", color: "#4a4a4a", fontSize: "9px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
                            onMouseOver={e => { e.target.style.color = "#c8a96e"; e.target.style.borderColor = "#c8a96e"; }}
                            onMouseOut={e => { e.target.style.color = "#4a4a4a"; e.target.style.borderColor = "#2a2a2a"; }}>USE</button>
                          <button onClick={() => setHistory(prev => prev.filter(h => h.id !== entry.id))} style={{ background: "none", border: "none", color: "#2a2a2a", fontSize: "10px", cursor: "pointer" }}>\u2715</button>
                        </div>
                      </div>
                      <StarRating value={entry.rating || 0} onChange={r => setHistory(prev => prev.map(h => h.id === entry.id ? { ...h, rating: r } : h))} />
                      <div style={{ fontSize: "11px", color: "#3a3a3a", marginTop: "5px", fontFamily: "'Lora', serif", lineHeight: "1.5" }}>{entry.prompt.slice(0, 140)}&hellip;</div>
                    </div>
                  ))}
                  <button onClick={() => setHistory([])} style={{ alignSelf: "flex-start", padding: "5px 12px", background: "transparent", border: "1px solid #1e1e1e", color: "#333", fontSize: "9px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>CLEAR ALL</button>
                </div>
            }
          </div>
        )}

        {/* TITLE */}
        <div style={{ marginBottom: "20px" }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What do you want to call it? (optional)"
            style={{ ...inp, fontSize: "18px", padding: "12px 0", borderLeft: "none", border: "none", borderBottom: "1px solid #1a1a1a", background: "transparent", color: "#ccc" }}
            onFocus={e => e.target.style.borderBottomColor = "#c8a96e"}
            onBlur={e => e.target.style.borderBottomColor = "#1a1a1a"} />
        </div>

        {/* THEME */}
        <div style={{ marginBottom: "28px" }}>
          <textarea value={theme} onChange={e => setTheme(e.target.value)} placeholder="Who is it for? What do you want to say to them? (optional)" rows={2}
            style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #1a1a1a", color: "#888", padding: "8px 0", fontSize: "15px", lineHeight: "1.6", fontFamily: "'Lora', serif", resize: "none", outline: "none", transition: "border-color 0.2s" }}
            onFocus={e => e.target.style.borderBottomColor = "#c8a96e"}
            onBlur={e => e.target.style.borderBottomColor = "#1a1a1a"} />
        </div>

        {/* GENRE */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "9px", color: "#444", letterSpacing: "0.15em", marginBottom: "12px" }}>GENRE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
            {SIMPLE_GENRES.map(g => (
              <button key={g.id} className="genre-tile" onClick={() => setSimpleGenre(simpleGenre === g.id ? null : g.id)}
                style={{ background: simpleGenre === g.id ? "#0f0f0c" : "#0a0a0a", border: simpleGenre === g.id ? "1px solid #c8a96e" : "1px solid #161616", padding: "12px 10px", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div className="gt-icon" style={{ fontSize: "16px", color: simpleGenre === g.id ? "#c8a96e" : "#2e2e2e", marginBottom: "4px", transition: "color 0.15s" }}>{g.icon}</div>
                <div className="gt-label" style={{ fontSize: "12px", color: simpleGenre === g.id ? "#c8a96e" : "#666", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", marginBottom: "2px", transition: "color 0.15s" }}>{g.label}</div>
                <div className="gt-hint" style={{ fontSize: "9px", color: "#2a2a2a", lineHeight: "1.3", transition: "color 0.15s" }}>{g.hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* MOOD */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "9px", color: "#444", letterSpacing: "0.15em", marginBottom: "12px" }}>MOOD</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {SIMPLE_MOODS.map(m => (
              <button key={m.id} className="mood-pill" onClick={() => setSimpleMood(simpleMood === m.id ? null : m.id)}
                style={{ padding: "8px 20px", border: simpleMood === m.id ? `1px solid ${m.color}` : "1px solid #1e1e1e", background: simpleMood === m.id ? `${m.color}18` : "transparent", color: simpleMood === m.id ? m.color : "#444", fontSize: "12px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s", opacity: simpleMood && simpleMood !== m.id ? 0.4 : 1 }}>
                {m.id}
              </button>
            ))}
          </div>
        </div>

        {/* VOCAL */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "9px", color: "#444", letterSpacing: "0.15em", marginBottom: "12px" }}>VOCAL</div>
          <div style={{ display: "flex", gap: "6px" }}>
            {SIMPLE_VOCALS.map(v => (
              <button key={v.id} className="vocal-btn" onClick={() => setSimpleVocal(simpleVocal === v.id ? null : v.id)}
                style={{ flex: 1, padding: "9px 8px", border: simpleVocal === v.id ? "1px solid #c8956e" : "1px solid #1e1e1e", background: simpleVocal === v.id ? "#c8956e18" : "transparent", color: simpleVocal === v.id ? "#c8956e" : "#444", fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s" }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* BUILD YOUR SONG */}
        <div style={{ marginBottom: "28px" }}>
          <ExpandToggle open={songOpen} onToggle={() => setSongOpen(!songOpen)} label="BUILD YOUR SONG \u2192" labelOpen="\u2190 HIDE SONG" hint="ONE LINE \u00b7 AI BUILDS AROUND IT \u00b7 VERSE \u00b7 CHORUS \u00b7 BRIDGE" color="#9a8aee" />

          {songOpen && (
            <div style={{ marginTop: "18px", animation: "slideDown 0.25s ease" }}>

              {/* SEED PANEL */}
              <div style={{ background: "#09090e", border: "1px solid #1e1e30", borderLeft: "3px solid #9a8aee", padding: "20px", marginBottom: "20px" }}>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "14px", color: "#9a8aee", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginBottom: "4px" }}>Your line</div>
                  <div style={{ fontSize: "10px", color: "#38384a", lineHeight: "1.6" }}>One line. A movie title. A headline. Something that won't leave you alone. Anything.</div>
                </div>

                <textarea value={seed} onChange={e => setSeed(e.target.value)} rows={3}
                  placeholder={"\"She left her shoes at the bottom of the stairs\"\n\"Everything Burns Clean\"\n\"I found your handwriting in a book I've never read\""}
                  style={{ width: "100%", background: "#060609", border: "1px solid #1a1a28", borderLeft: "2px solid #4a4a88", color: "#c8c4e8", padding: "12px 14px", fontSize: "14px", lineHeight: "1.8", fontFamily: "'Lora', serif", fontStyle: "italic", resize: "none", outline: "none", transition: "border-color 0.2s", marginBottom: "14px" }}
                  onFocus={e => e.target.style.borderLeftColor = "#9a8aee"}
                  onBlur={e => e.target.style.borderLeftColor = "#4a4a88"} />

                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "9px", color: "#38384a", letterSpacing: "0.15em", marginBottom: "8px" }}>THIS FEELS LIKE MY...</div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {SEED_ROLES.map(role => (
                      <button key={role} onClick={() => setSeedRole(seedRole === role ? null : role)}
                        style={{ padding: "5px 12px", border: seedRole === role ? "1px solid #9a8aee" : "1px solid #1e1e30", background: seedRole === role ? "#9a8aee18" : "transparent", color: seedRole === role ? "#9a8aee" : "#3a3a5a", fontSize: "10px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s", textTransform: "uppercase" }}>
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="seed-build" onClick={buildAroundSeed} disabled={!seed.trim() || seedBuilding}
                  style={{ padding: "10px 22px", background: seed.trim() && !seedBuilding ? "#9a8aee" : "#1a1a28", border: "none", color: seed.trim() && !seedBuilding ? "#08080e" : "#3a3a5a", fontSize: "11px", letterSpacing: "0.12em", cursor: seed.trim() && !seedBuilding ? "pointer" : "default", fontFamily: "'DM Mono', monospace", transition: "all 0.2s" }}>
                  {seedBuilding ? <span style={{ animation: "pulse 1.5s infinite", display: "inline-block" }}>BUILDING...</span> : "\u2726 BUILD AROUND THIS"}
                </button>

                {seedResult && (
                  <div style={{ marginTop: "16px", animation: "slideDown 0.2s ease" }}>
                    <div style={{ fontSize: "9px", color: "#6a6a9a", letterSpacing: "0.15em", marginBottom: "8px" }}>CO-WRITER \u2014 built around your line</div>
                    <pre style={{ color: "#9a96c8", fontSize: "13px", lineHeight: "1.9", fontFamily: "'Lora', serif", fontStyle: "italic", whiteSpace: "pre-wrap", margin: 0, borderLeft: "2px solid #2a2a48", paddingLeft: "14px" }}>{seedResult}</pre>
                    <button className="apply-btn" onClick={() => applyToSong(seedResult)}
                      style={{ marginTop: "10px", padding: "6px 14px", background: "transparent", border: "1px solid #2a2a48", color: "#5a5a8a", fontSize: "9px", cursor: "pointer", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", transition: "all 0.15s" }}>
                      \u2193 APPLY TO SONG BELOW
                    </button>
                  </div>
                )}
              </div>

              {/* FULL SONG */}
              <div style={{ fontSize: "9px", color: "#383838", letterSpacing: "0.15em", marginBottom: "12px" }}>FULL SONG \u2014 edit freely or leave blank</div>
              {STRUCTURES.map(s => {
                const isSeedSec = seed && seedRole && seedRole !== "not sure" && s.seedRoles.includes(seedRole);
                return (
                  <div key={s.id} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ fontSize: "9px", color: isSeedSec ? "#6a6a9a" : "#3a3a5a", letterSpacing: "0.12em" }}>{s.label.toUpperCase()}</div>
                      {isSeedSec && <div style={{ fontSize: "8px", color: "#6a6a9a", border: "1px solid #2a2a48", padding: "1px 5px", letterSpacing: "0.06em" }}>\u2190 YOUR SEED</div>}
                    </div>
                    <textarea value={lyrics[s.id]} onChange={e => setLyrics(prev => ({ ...prev, [s.id]: e.target.value }))} placeholder={s.placeholder} rows={s.id === "chorus" ? 4 : 3}
                      style={{ width: "100%", background: "#0d0d0d", border: "1px solid #1a1a1a", borderLeft: `2px solid ${isSeedSec ? "#4a4a7a" : lyrics[s.id] ? "#3a3a6a" : "#1e1e1e"}`, color: "#ccc", padding: "9px 12px", fontSize: "13px", lineHeight: "1.7", fontFamily: "'Lora', serif", resize: "vertical", outline: "none", transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderLeftColor = "#9a8aee"}
                      onBlur={e => e.target.style.borderLeftColor = isSeedSec ? "#4a4a7a" : lyrics[s.id] ? "#3a3a6a" : "#1e1e1e"} />
                  </div>
                );
              })}

              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button onClick={getLyricAssist} disabled={lyricLoading}
                  style={{ padding: "7px 16px", background: "transparent", border: "1px solid #3a3a6a", color: "#6a6aaa", fontSize: "10px", letterSpacing: "0.1em", cursor: lyricLoading ? "default" : "pointer", fontFamily: "'DM Mono', monospace" }}>
                  {lyricLoading ? "THINKING..." : "\u2726 AI LYRIC ASSIST"}
                </button>
                <button onClick={exportLyrics} style={{ padding: "7px 14px", background: "transparent", border: "1px solid #2a3a2a", color: "#4a6a4a", fontSize: "10px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>
                  \u2b07 EXPORT
                </button>
              </div>

              {lyricAssist && (
                <div style={{ background: "#0a0a14", border: "1px solid #1e1e3a", borderLeft: "2px solid #6a6aaa", padding: "12px 14px", marginTop: "10px" }}>
                  <div style={{ fontSize: "9px", color: "#6a6aaa", letterSpacing: "0.12em", marginBottom: "6px" }}>AI LYRIC SUGGESTIONS</div>
                  <pre style={{ color: "#888", fontSize: "12px", lineHeight: "1.8", fontFamily: "'Lora', serif", whiteSpace: "pre-wrap", margin: 0 }}>{lyricAssist}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* GO DEEPER */}
        <div style={{ marginBottom: "28px" }}>
          <ExpandToggle open={deepOpen} onToggle={() => setDeepOpen(!deepOpen)} label="GO DEEPER \u2192" labelOpen="\u2190 KEEP IT SIMPLE" hint="BPM \u00b7 KEY \u00b7 INSTRUMENTS \u00b7 ERA \u00b7 MORE" color="#c8a96e" />

          {deepOpen && (
            <div style={{ marginTop: "20px", animation: "slideDown 0.25s ease" }}>
              <div style={{ background: "#0a0a08", border: "1px solid #1a1a16", borderLeft: "2px solid #4a4a30", padding: "20px" }}>
                <div style={{ fontSize: "9px", color: "#4a4a30", letterSpacing: "0.18em", marginBottom: "18px" }}>SIMPLE BY DEFAULT \u00b7 DEEP ON DEMAND</div>
                <DeepSection title="Vocal Detail" accent="#c8956e">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {DEEP_VOCALS.map(v => <SmallToggle key={v} label={v} selected={deepVocal === v} onToggle={() => setDeepVocal(deepVocal === v ? "" : v)} color="#c8956e" />)}
                  </div>
                </DeepSection>
                <DeepSection title="Genre Detail">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {DEEP_GENRES.map(g => <SmallToggle key={g} label={g} selected={deepGenres.includes(g)} onToggle={() => dtoggle(deepGenres, setDeepGenres, g)} />)}
                  </div>
                </DeepSection>
                <DeepSection title="Mood Detail" accent="#8a7ec8">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {DEEP_MOODS.map(m => <SmallToggle key={m} label={m} selected={deepMoods.includes(m)} onToggle={() => dtoggle(deepMoods, setDeepMoods, m)} color="#8a7ec8" />)}
                  </div>
                </DeepSection>
                <DeepSection title="Instruments" accent="#6e9e8a">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {DEEP_INSTRUMENTS.map(i => <SmallToggle key={i} label={i} selected={deepInstruments.includes(i)} onToggle={() => dtoggle(deepInstruments, setDeepInstruments, i)} color="#6e9e8a" />)}
                  </div>
                </DeepSection>
                <DeepSection title="Era" accent="#9e7a6e">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {DEEP_ERAS.map(e => <SmallToggle key={e} label={e} selected={deepEra.includes(e)} onToggle={() => dtoggle(deepEra, setDeepEra, e)} color="#9e7a6e" />)}
                  </div>
                </DeepSection>
                <DeepSection title="Key / BPM / Time" accent="#9e7a6e">
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "8px" }}>
                    <input value={bpm} onChange={e => setBpm(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="BPM" style={{ ...mono, padding: "7px 10px", fontSize: "12px" }} onFocus={e => e.target.style.borderLeftColor = "#9e7a6e"} onBlur={e => e.target.style.borderLeftColor = "#2a2a2a"} />
                    <select value={songKey} onChange={e => setSongKey(e.target.value)} style={{ ...mono, padding: "7px 10px", fontSize: "11px", cursor: "pointer" }}>
                      {KEYS.map(k => <option key={k} value={k}>{k || "--- key"}</option>)}
                    </select>
                    <select value={timeSig} onChange={e => setTimeSig(e.target.value)} style={{ ...mono, padding: "7px 10px", cursor: "pointer" }}>
                      {["", "4/4", "3/4", "6/8", "5/4", "7/8", "7/4", "Shifting", "Rubato"].map(t => <option key={t} value={t}>{t || "--- time sig"}</option>)}
                    </select>
                  </div>
                </DeepSection>
              </div>
            </div>
          )}
        </div>

        {/* GENERATE */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
          <button className="gen-btn" onClick={generatePrompt} disabled={loading}
            style={{ flex: 1, padding: "16px", background: loading ? "#1a1a14" : "#c8a96e", border: "none", color: loading ? "#555" : "#080808", fontSize: "13px", letterSpacing: "0.15em", cursor: loading ? "default" : "pointer", fontFamily: "'DM Mono', monospace", fontWeight: "500", transition: "all 0.2s" }}>
            {loading ? <span style={{ animation: "pulse 1.5s infinite", display: "inline-block" }}>GENERATING...</span> : "GENERATE SUNO PROMPT"}
          </button>
          <div style={{ display: "flex", gap: "3px" }}>
            {["prose", "tags"].map(m => (
              <button key={m} onClick={() => setOutputMode(m)} style={{ padding: "10px", background: outputMode === m ? "#1a1a1a" : "transparent", border: outputMode === m ? "1px solid #2a2a2a" : "1px solid #141414", color: outputMode === m ? "#c8a96e" : "#333", fontSize: "9px", cursor: "pointer", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", transition: "all 0.15s" }}>
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "9px", color: "#252525", letterSpacing: "0.1em", marginBottom: "32px", textAlign: "center" }}>
          {simpleGenre ? `${simpleGenre}${simpleMood ? ` \u00b7 ${simpleMood}` : ""}${simpleVocal ? ` \u00b7 ${simpleVocal}` : ""}${seed ? " \u00b7 seed line active" : ""}` : "choose a genre above, or just generate"}
        </div>

        {/* OUTPUT */}
        {(generatedPrompt || loading) && (
          <div style={{ animation: "slideDown 0.3s ease" }}>
            <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #1e1e1e, transparent)", marginBottom: "24px" }} />
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderLeft: "2px solid #c8a96e", padding: "18px", marginBottom: "10px", minHeight: "80px" }}>
              {loading
                ? <div style={{ color: "#333", fontSize: "13px", animation: "pulse 1.5s infinite" }}>Forging your prompt...</div>
                : <div ref={promptRef} contentEditable suppressContentEditableWarning onInput={e => setGeneratedPrompt(e.currentTarget.textContent)}
                    style={{ color: "#d4c4a0", fontSize: "14px", lineHeight: "1.8", fontFamily: "'Lora', serif", outline: "none" }}>{generatedPrompt}</div>
              }
            </div>
            {!loading && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace" }}>
                    <span style={{ color: charColor }}>{charCount}</span>
                    <span style={{ color: "#252525" }}>{outputMode === "tags" ? " / 200" : " / 950"} chars</span>
                    {outputMode === "prose" && charCount > 950 && <span style={{ color: "#e05555", marginLeft: "8px" }}>\u26a0 too long</span>}
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={generatePrompt} style={{ padding: "6px 12px", background: "transparent", border: "1px solid #1e1e1e", color: "#444", fontSize: "10px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>\u21ba RETRY</button>
                    <button onClick={copyPrompt} style={{ padding: "6px 18px", background: copied ? "#1a2a1a" : "#c8a96e", border: "none", color: copied ? "#5a9a5a" : "#080808", fontSize: "10px", cursor: "pointer", fontFamily: "'DM Mono', monospace", transition: "all 0.2s" }}>
                      {copied ? "\u2713 COPIED" : "COPY TO SUNO"}
                    </button>
                  </div>
                </div>
                {history.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "9px 13px", background: "#090909", border: "1px solid #141414" }}>
                    <span style={{ fontSize: "9px", color: "#333", letterSpacing: "0.1em" }}>RATE RESULT</span>
                    <StarRating value={history[0]?.rating || 0} onChange={r => setHistory(prev => prev.map((h, i) => i === 0 ? { ...h, rating: r } : h))} />
                    <span style={{ fontSize: "9px", color: "#1e1e1e", marginLeft: "auto" }}>4\u20135\u2605 improves future prompts</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
