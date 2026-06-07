// ===================================================================
// Aryavarta — Master Story Script
// Beat types:
//   "narration"  — atmospheric text (no speaker)
//   "dialogue"   — character speaks (speakerId, lines[])
//   "choice"     — player chooses (choices[]: {text, karma:{axis,val}, next?})
//   "battle"     — triggers a battle (battleId)
//   "item"       — player receives item (itemName, itemDesc)
//   "seal"       — player earns a Dharma Seal (sealName, sealDesc)
//   "title"      — big location/chapter title card
//   "tutorial"   — game-mechanic tutorial overlay (tutorialId)
//   "continue"   — just a "Continue →" with narration
// ===================================================================

// ─── Chapter definitions ──────────────────────────────────────────
// Each chapter is an array of BEATS executed in sequence.
// A "battle" beat pauses the story; after the battle resolves, the
// story resumes at the next beat automatically.
// ─────────────────────────────────────────────────────────────────

export const STORY_CHAPTERS = [

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 1 — AWAKENING IN THE TRAINING HALL
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch1_awakening",
    title: "Chapter I — Awakening",
    location: "The Vashistha Academy, Ayodhya",
    timeOfDay: "Dusk — Year of the Broken Eclipse",
    bg: "bg-ayodhya",
    beats: [
      {
        type: "title",
        heading: "Chapter I",
        subheading: "Awakening",
        location: "The Vashistha Academy, Ayodhya",
        time: "Dusk — Year of the Broken Eclipse",
      },
      {
        type: "narration",
        lines: [
          "The spires of Ayodhya catch the last light of the sun like golden needles threading the clouds.",
          "But today, something is wrong with the light.",
          "A bruised purple shadow creeps along the horizon — not a storm cloud, not a monsoon. Something older. Something that remembers a time before the gods had names.",
          "The Sarayu River has turned the colour of a dying ember. Birds — whole flocks of Garuda-Ansh — spiral upward and scatter, fleeing something beneath the water that has no name yet.",
        ],
      },
      {
        type: "narration",
        lines: [
          "You are in the inner training hall of the Vashistha Academy.",
          "The floor is warm white marble, worn smooth by five hundred years of seekers sitting exactly where you sit now — cross-legged, spine straight, palms open on your knees.",
          "You have been here since dawn. You can feel the Tapas building in your chest like a slow fire.",
          "Then the door opens.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "vashistha",
        lines: [
          "Open your eyes, child.",
          "The Tapas in your chest — that restlessness you are trying to master — do you feel it now?",
          "Good. That is not a distraction. That is the world calling to you.",
        ],
      },
      {
        type: "choice",
        prompt: "You open your eyes. Vashistha stands before you, his white beard trailing silver light. How do you respond?",
        choices: [
          {
            text: '"I feel a great weight in the air, Master. Like something ancient has shifted."',
            karma: { axis: "dharma", val: 1 },
            label: "Jnana (Observation)",
            labelColor: "#9ad0ec",
          },
          {
            text: '"My Atma is ready! Whatever the challenge, I will meet it head-on."',
            karma: { axis: "shakti", val: 1 },
            label: "Shakti (Courage)",
            labelColor: "#ff6b35",
          },
          {
            text: '"The river... it looks wrong. And the birds fled. Something is happening to the Atmas."',
            karma: { axis: "jnana", val: 1 },
            label: "Dharma (Perception)",
            labelColor: "#f0d080",
          },
        ],
      },
      {
        type: "dialogue",
        speakerId: "vashistha",
        lines: [
          "Yes. All of those things are true.",
          "Five nights ago, the ancient seals in the deep south began to crack. The seals that were placed there after the last great war — when darkness last walked the land in ten directions.",
          "The shadow you see in the sky is called the Eclipse of Maya. It is not an astronomical event. It is a spiritual one.",
          "The Atmas of the wild — the creatures who carry the world's life-force — are forgetting their nature. The Maya is seeping into them like poison into groundwater, turning their spirits inward and cruel. Corrupting them.",
          "Within days, the Tataka Forest to the south will be unpassable. Within weeks, it will reach these walls.",
        ],
      },
      {
        type: "narration",
        lines: [
          "Vashistha moves to the window. Below, you can see the marketplace — normally a riot of colour and sound — is strangely quiet. A vendor has abandoned his cart mid-sale. Three children stand in a doorway, staring at the sky.",
          "The old Sage presses one palm flat against the glass, and for just a moment, you see something cross his face that you have never seen there before.",
          "Fear.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "vashistha",
        lines: [
          "I cannot leave the Academy. My presence here is the last thing holding the protective mantras around the city walls intact.",
          "But you... you are ready. Perhaps the readiest student I have had in forty years.",
          "You must walk the path of the ancient Ramayanam — south through the Tataka Wilds, through Kishkindha, to the shore. You must purify the corrupted Atmas, pass the Tests of the Rishis, and find the source of the breaking seals.",
          "Before you go, you must choose your companion. Come.",
        ],
      },
      {
        type: "narration",
        lines: [
          "He gestures. On the stone pedestal at the centre of the room, three small spheres of compressed Tapas-light float and rotate slowly. Each one pulses with a different coloured warmth.",
          "The first glows amber-gold, flicking with tiny flames.",
          "The second glows mossy green, and tiny flowers bloom and fade around it like a time-lapse of seasons.",
          "The third glows deep river-blue, and droplets of water orbit it like a private miniature cosmos.",
          "These are the Trimurti Orbs — each one is the compressed spirit of a creature that has chosen to bond with a Seeker. Once you choose, the bond is permanent.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 2 — THE TRIMURTI CHOICE
  // (Triggers the starter selection screen)
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch2_trimurti",
    title: "Chapter II — The Trimurti Choice",
    location: "The Training Hall — The Pedestal of First Bonds",
    timeOfDay: "Dusk",
    bg: "bg-ayodhya",
    beats: [
      {
        type: "title",
        heading: "Chapter II",
        subheading: "The Trimurti Choice",
        location: "The Pedestal of First Bonds",
        time: "Dusk, The Training Hall",
      },
      {
        type: "narration",
        lines: [
          "Your footsteps echo as you approach the pedestal.",
          "The three orbs sense your presence and rotate faster, each one reaching toward you like a plant toward sunlight.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "vashistha",
        lines: [
          "The one of Fire — Vaan-Jyoti — is kin to the great Hanuman-lineage. Swift, fierce, and loyal to a fault. If your heart burns to act, to protect, to charge forward when others freeze — this one.", 
          "The one of Earth — Gaja-Pushpa — carries the patience of mountains and the memory of deep roots. If you are a guardian, someone who weathers storms so others don't have to — this one.",
          "The one of Water — Makar-Shishu — is clever, adaptable, and reads the shape of a conflict before engaging it. If you trust your mind as much as your spirit — this one.",
          "This is your first Sankalpa. Your first Vow. Choose freely.",
        ],
      },
      {
        type: "starterSelection",
        prompt: "Approach the pedestal. Which spirit calls to you?",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 3 — THE BREACH AT THE SARAYU GATE
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch3_breach",
    title: "Chapter III — The Breach at the Sarayu Gate",
    location: "The Southern Marketplace of Ayodhya",
    timeOfDay: "Dusk — The Eclipse deepens overhead",
    bg: "bg-marketplace",
    beats: [
      {
        type: "title",
        heading: "Chapter III",
        subheading: "The Breach at the Sarayu Gate",
        location: "The Southern Marketplace",
        time: "Dusk — The Eclipse deepens overhead",
      },
      {
        type: "narration",
        lines: [
          "You barely have a moment to feel the weight of your new companion on your shoulder before the alarm bells start.",
          "They ring from the South Gate — three long blasts, then a pause, then three more. The merchant code for: something is wrong with the Atmas.",
          "You run.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The Southern Marketplace is normally the most vibrant place in Ayodhya — a corridor of silk merchants, channa sellers, flower stalls, and musicians playing for coins.",
          "Instead you find overturned carts. Scattered grain in rivers across the stone floor. A child crying behind a pillar.",
          "And in the centre of it all, a cluster of Mushika-Ratna — the small, noble grey mice that every merchant keeps to sense hidden items and ward off theft — are moving wrong.",
          "Their eyes are red. Their fur carries a crackling purple static. They are five times their normal size and tearing through grain sacks with claws that shouldn't be that long.",
          "They have been touched by the Eclipse.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "citizen",
        lines: [
          "Help! They've gone mad! My Mushika — Chotu, I've had him for eight years — he won't respond to my commands!",
          "They're not the only ones! Look at the stalls near the east wall — something is pulling them toward the gate!",
          "Please, Seeker! You're from the Academy — do something!",
        ],
      },
      {
        type: "tutorial",
        tutorialId: "corrupted_state",
        heading: "The Corrupted State",
        icon: "💀",
        lines: [
          "Atmas touched by the Eclipse of Maya cannot be captured — their spirit-link is broken and hostile.",
          "You must first PURIFY them through battle — reduce their Tamas (aggression) until their own light reasserts itself.",
          "Defeating a Corrupted Atma does NOT harm it permanently. It restores them to their natural state.",
          "Your first Astra will be your opening move. Trust the bond.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "player",
        lines: [
          "Steady. I see you. Whatever has hold of you — it is not stronger than you are.",
        ],
      },
      {
        type: "narration",
        lines: [
          "Your starter Atma drops into a battle stance beside you, eyes blazing. It lets out a defiant cry that cuts through the purple static in the air like a bell through fog.",
          "The corrupted Mushikas turn. Their red eyes lock onto you.",
          "Your first battle begins.",
        ],
      },
      {
        type: "battle",
        battleId: "ch3_corrupted_mushika",
        enemyTeamSpec: [
          { speciesId: "mushikaRatna", level: 3, label: "Corrupted Mushika-Ratna" },
          { speciesId: "mushikaRatna", level: 3, label: "Corrupted Mushika-Ratna" },
        ],
        intro: "Two Corrupted Mushika-Ratna lunge forward! Use your Astra to purify them!",
        winText: "The purple static fractures. The Mushikas shrink back to their normal size, looking dazed and confused.",
        loseText: "The corruption overwhelms you — but a burst of Tapas from the Academy ward flings the Mushikas back momentarily. A chance to recover.",
      },
      {
        type: "narration",
        lines: [
          "The two Mushikas blink. The red drains from their eyes like ink washing out in water.",
          "They look around at the chaos they have caused — the scattered grain, the overturned stalls — and their little faces crumple into an expression of pure, animal regret.",
          "They bow their heads to you. Then they scurry back across the marble and curl up against their owner's ankle.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "citizen",
        lines: [
          "You... you broke the fever! Oh thank the Devas. Thank you, thank you!",
          "I don't have much — the stall is a wreck — but take this. It's a Sanjeevani Extract. I was saving it for the cold season, but you'll need it far more than I will.",
          "And Seeker? Be careful south of the gate. A young man went through there an hour ago — dark silks, a serpent crown. I didn't like the look of his bird.",
        ],
      },
      {
        type: "item",
        itemName: "Sanjeevani Extract",
        itemDesc: "A concentrated preparation of the Sanjeevani herb. Restores 40 HP to one Atma.",
        itemGlyph: "🌿",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 4 — THE SHADOW ON THE BRIDGE
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch4_bridge",
    title: "Chapter IV — The Shadow on the Bridge",
    location: "The Great Stone Bridge, South Gate of Ayodhya",
    timeOfDay: "Evening — Full Eclipse overhead",
    bg: "bg-bridge",
    beats: [
      {
        type: "title",
        heading: "Chapter IV",
        subheading: "The Shadow on the Bridge",
        location: "The Great Stone Bridge, South Gate",
        time: "Evening — Full Eclipse overhead",
      },
      {
        type: "narration",
        lines: [
          "The Great Stone Bridge spans the Sarayu at her widest point.",
          "In better times, this bridge is crowded with pilgrims, traders, and children racing each other between the carved stone elephants that line the railings.",
          "Tonight, it is empty.",
          "Except for one person.",
        ],
      },
      {
        type: "narration",
        lines: [
          "He is leaning against the east railing with the casual confidence of someone who has never, in his entire life, felt threatened by anything.",
          "Dark silk clothes that catch the purple light of the Eclipse and throw it back as something colder. A serpent-themed crown — not a crown exactly, more like a circlet of interlocking nagas forged from black iron — sits at his temple.",
          "On his shoulder sits a Shyena — a falcon Atma — but not one you've ever seen in the Academy rosters. This falcon is too large, too sharp-edged, its talons trailing purple sparks.",
          "He turns to look at you, and his expression doesn't change. Not surprise. Not hostility. Pure, bored assessment.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "indrajit",
        lines: [
          "So. Vashistha finally sent his prize student out into the mud.",
          "I wondered when you'd get here. You were slower than I expected.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "player",
        lines: [
          "Who are you?",
        ],
      },
      {
        type: "dialogue",
        speakerId: "indrajit",
        lines: [
          "Indrajit. Student of the Dravida Academy — though I suppose 'student' isn't quite accurate anymore. More like... graduate.",
          "Your mentor's counterpart down south runs a quieter program than Vashistha's lamp-and-lotus approach. We are taught that Atmas are not companions. They are capacities.",
          "That bird on my shoulder? I didn't earn her trust. I unlocked her potential. The difference is that mine actually works.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The falcon spreads its wings slightly, and where the feathers catch the light, you can see it — a thin lattice of purple-black energy woven into every quill.",
          "Maya-Binding. You've read about it in forbidden scrolls at the Academy library. A technique for forcing an Atma's evolution by overriding its natural resistance.",
          "The results are always more powerful. And always less stable.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "indrajit",
        lines: [
          "Look at the city. Look at the sky. The old order is cracking. The seals that Vashistha's lineage spent centuries reinforcing are failing anyway.",
          "The question is not whether the world changes — it already has. The question is who is positioned to shape what comes next.",
          "Dharma? Dharma is a myth told to people who can't win. Power is the only truth that doesn't require you to look away from reality.",
        ],
      },
      {
        type: "choice",
        prompt: "The wind picks up. Indrajit's falcon screeches. How do you answer?",
        choices: [
          {
            text: '"Strength without Dharma is just a slow suicide, Indrajit. You are building a house on sand during a flood."',
            karma: { axis: "dharma", val: 2 },
            label: "Dharma",
            labelColor: "#f0d080",
          },
          {
            text: '"Fine. Let it be a test of power then. Fight me here, now, on this bridge."',
            karma: { axis: "shakti", val: 2 },
            label: "Shakti",
            labelColor: "#ff6b35",
          },
          {
            text: '"That bird is suffering. I can see it in the way it holds its wings. Whatever you\'ve done — it\'s not loyalty, it\'s a wound."',
            karma: { axis: "karuna", val: 2 },
            label: "Karuna (Compassion)",
            labelColor: "#66cc66",
          },
        ],
      },
      {
        type: "dialogue",
        speakerId: "indrajit",
        lines: [
          "Hmm.",
          "You're more interesting than I thought you'd be. Vashistha's usual batch answers challenges like scrolls being read aloud. You actually mean what you say.",
          "But don't mistake being interesting for being right.",
          "I have somewhere to be. A certain Sage in the Forest of Tataka has something I need. If you survive long enough to follow me south, maybe I'll show you what 'real Siddhi' looks like.",
          "Or maybe you'll figure it out on your body first. Either way — good luck, Seeker. You're going to need every scrap of Dharma you've ever earned.",
        ],
      },
      {
        type: "narration",
        lines: [
          "Indrajit makes a single sharp gesture with two fingers.",
          "The falcon's body erupts. Not painfully — it doesn't scream — but it EXPANDS. Wings that were already large double in span, triple. Its eyes ignite with cold violet light. The purple lattice in its feathers blazes like a circuit board in a storm.",
          "In three seconds, the bird that was on his shoulder is now large enough to carry him. He steps back onto the railing, then onto its back with practiced ease.",
          "It launches from the bridge with a gust of wind so powerful it staggers you back three steps. The torch-flames on the bridge railings all blow sideways and go out simultaneously.",
          "Then he is gone. A dark shape against the purple sky, heading south.",
          "Your starter Atma presses quietly against your ankle, steady and warm.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 5 — THE THRESHOLD
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch5_threshold",
    title: "Chapter V — The Threshold",
    location: "The Edge of the Tataka Wilds",
    timeOfDay: "Night — Stars hidden by the Eclipse",
    bg: "bg-forest-edge",
    beats: [
      {
        type: "title",
        heading: "Chapter V",
        subheading: "The Threshold",
        location: "Edge of the Tataka Wilds",
        time: "Night — Stars hidden by the Eclipse",
      },
      {
        type: "narration",
        lines: [
          "The golden stone of Ayodhya ends so abruptly it feels like a wound.",
          "One step you are on the King's Road — smooth, lamplit, smelling of incense from the southern shrines. The next step, the stone gives way to black earth and root.",
          "Ahead lies the Tataka Wilds.",
          "This forest has been here since before Ayodhya had a name.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The trees are immense. Not beautiful-immense the way temple trees are, with their painted trunks and marigold offerings.",
          "These trees are old-immense. Their roots have buckled the remains of three civilisations. Their canopies are so dense that even at midday the forest floor exists in a permanent amber twilight.",
          "And now, at night, with the Eclipse pulling strange colours through the sky, the forest is a wall of darkness so complete it feels deliberate. Like it is watching you decide whether to enter.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "player",
        lines: [
          "... All right.",
          "Let's go.",
        ],
      },
      {
        type: "narration",
        lines: [
          "Your Atma doesn't hesitate. It is already three paces ahead, looking back at you with an expression that, in the bronze light, reads suspiciously like impatience.",
          "You take a breath — the last full breath of city-cleaned air you will have for a long time — and step into the forest.",
        ],
      },
      {
        type: "tutorial",
        tutorialId: "wild_encounters",
        heading: "The Tataka Wilds",
        icon: "🌿",
        lines: [
          "You have entered a wild area. Atmas live here — some corrupted, some merely startled.",
          "Move through the tall grass and you may encounter wild Atmas.",
          "Some Atmas can be BOUND to you after battle using a Spirit Mantra — watch for the prompt when an Atma's health is low.",
          "Not all encounters are hostile. Some Atmas will test you. Some will flee.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The forest swallows you.",
          "The sounds of Ayodhya — bells, wheels, voices — fade in seconds as if the trees themselves absorb noise.",
          "Instead there is: the deep creak of wood settling in darkness. The high trill of insects you cannot name. The soft percussion of something large moving parallel to you, always just out of sight.",
          "And sometimes — rarely, briefly — a flicker of natural light between the roots. A bioluminescent mushroom. A firefly that glows a healthy gold instead of the Eclipse's purple. Small signs that the forest still has a healthy heart somewhere.",
          "You walk deeper in.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 6 — THE HERMIT AND THE HUNT
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch6_hermit",
    title: "Chapter VI — The Hermit and the Hunt",
    location: "Deep Tataka — The Rishi's Clearing",
    timeOfDay: "Late Night — A clearing lit by floating flame",
    bg: "bg-forest-dark",
    beats: [
      {
        type: "title",
        heading: "Chapter VI",
        subheading: "The Hermit and the Hunt",
        location: "Deep Tataka — The Rishi's Clearing",
        time: "Late Night. A clearing lit by floating flame.",
      },
      {
        type: "narration",
        lines: [
          "You smell the sandalwood before you see the clearing.",
          "It is a small circle of open ground — ten paces across — where the trees have parted as if by agreement. The forest floor here is different: soft, dark soil instead of the gnarled root-network. In the centre, a man sits cross-legged on a mat of woven deer skin.",
          "He is old — very old — in the way that certain mountains are old. Not frail. Dense.",
          "Around him float seven small flames, perfectly still in the windless air, orbiting him like the slowest possible solar system.",
          "He does not open his eyes as you enter.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "agniVesha",
        lines: [
          "Your footsteps are heavy, child of the Academy.",
          "You walk like you are trying to make an impression on the ground. The forest is not impressed. It has felt the footsteps of gods and armies. One determined student changes nothing.",
          "Come. Sit. You are breathing too fast.",
        ],
      },
      {
        type: "narration",
        lines: [
          "You sit, uncertain. Your Atma curls beside you, watching the floating flames with careful eyes.",
          "The old hermit — you recognise him now from an illustration in one of Vashistha's rarer scrolls — is Rishi Agni-Vesha. Master of the Agni-Vyuha. A man who once held back a Rakshasa army for nine days using only formation tactics and three students.",
          "The seven flames drift slightly closer.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "agniVesha",
        lines: [
          "You come from the north with a fresh bond and urgent purpose. This I can read from the way your companion watches you — still measuring you, not yet fully certain.",
          "You have not fought anything truly wild yet. The marketplace disruption was a warm breeze. What waits south of here is a storm.",
          "Before you walk into a storm, you should know how storms move.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The clearing erupts.",
          "From the dark treeline, a Vriksha-Bhoot crashes through — a tree spirit Atma, the kind that normally guards ancient groves from poachers. This one is enormous, its wooden frame crackling with the purple-black static of the Eclipse. Moss and bark flies as it swings two arms the size of branches.",
          "The flames around Agni-Vesha don't even flicker.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "agniVesha",
        lines: [
          "A restless grove-keeper. The Maya has turned it against its own territory.",
          "Show me what you are. Can you calm the storm, child? Or will you add to the noise?",
        ],
      },
      {
        type: "tutorial",
        tutorialId: "binding_mantra",
        heading: "The Binding Mantra",
        icon: "🔮",
        lines: [
          "Wild Atmas can be BOUND to you — but only when their spirit is calm enough to hear you.",
          "Lower the Atma's HP significantly in battle (below 30%). Once weakened, the 'Bind' command appears.",
          "When you Bind an Atma: your character clasps their hands, Sanskrit mantras rise from your lips, and the Atma's spirit — its true nature — answers.",
          "A successfully Bound Atma is added to your Spirit Collection. They remember the bond forever.",
        ],
      },
      {
        type: "battle",
        battleId: "ch6_vriksha_bhoot",
        enemyTeamSpec: [
          { speciesId: "vrikshaAnsh", level: 5, label: "Corrupted Vriksha-Bhoot" },
        ],
        intro: "The Vriksha-Bhoot charges! Its wooden limbs crack like breaking trees. Weaken it and then attempt to Bind it!",
        winText: "The Vriksha-Bhoot staggers. The purple light dims. Its thrashing slows... and it turns wide, confused eyes toward you.",
        loseText: "The tree spirit's raw power sends you stumbling back. But Agni-Vesha's flames form a protective ring — a temporary shield. Regroup.",
        canBind: true,
      },
      {
        type: "narration",
        lines: [
          "The binding works.",
          "The Sanskrit letters — the ancient syllables of the mantra Vashistha spent three years teaching you — rise from your mouth like golden smoke.",
          "They wrap around the Vriksha-Bhoot. It goes still. Not paralysed. Just... quiet. Still. The way a person goes still when they finally hear a truth they've been running from.",
          "The purple light collapses inward. The Atma shrinks to a more natural size. Its eyes clear to a deep amber.",
          "Then it bows — a slow, full bow of respect — and dissolves into a Spirit Gem that drifts into your palm. Warm. Vibrating gently, like a finger on a singing bowl.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "agniVesha",
        lines: [
          "Not bad. You have Kshatriya in your hands and Brahmin in your voice. A useful combination.",
          "But knowing how to bind a single Atma is not the same as knowing how to fight a war.",
          "Ravana's forces — and yes, child, I use that name deliberately — they do not fight as individuals. They fight as bodies. As formations. If you charge south without understanding Vyuha, you will be crushed by the first coordinated resistance you encounter.",
          "Watch.",
        ],
      },
      {
        type: "tutorial",
        tutorialId: "vyuha_intro",
        heading: "Vyuha — The Sacred Formation",
        icon: "⚔",
        lines: [
          "A VYUHA is a battle formation that changes how your entire team fights.",
          "GARUDA-VYUHA (Eagle): Massive speed boost. Your lead Atma acts first and hits hard. Weak defence.",
          "CHAKRA-VYUHA (Wheel): Strong defence. Attackers take RECOIL damage back. Slower.",
          "SUCHI-VYUHA (Needle): Pierces enemy defences. 1.25x attack. But your own defence suffers.",
          "PADMA-VYUHA (Lotus): Your reserve Atmas slowly heal each turn. Good for endurance.",
          "Change formation any time for 20 Tapas — but it uses your turn. Choose wisely.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "agniVesha",
        lines: [
          "Every battle is two questions: what do I have, and what does the enemy not expect?",
          "Learn to answer both and you will not need to be the strongest.",
          "You only need to be the least wrong.",
        ],
      },
      {
        type: "item",
        itemGlyph: "📜",
        itemName: "Scroll of the First Vyuha",
        itemDesc: "Unlocks the Suchi-Vyuha (Needle Formation) in your battle menu. Attack piercingly — but guard your flanks.",
      },
      {
        type: "narration",
        lines: [
          "Agni-Vesha fades.",
          "Not dramatically. Not with a speech. He simply becomes indistinct, like a figure in mist growing fainter as the distance between you grows, even though neither of you has moved.",
          "His seven flames hang in the air a moment longer — then dart south, south, south, scattering into the forest like sparks from a fire.",
          "The clearing is empty again. The path ahead opens between two root-arches, leading deeper into the Tataka Wilds.",
          "Whatever waits beyond — the first real dungeon, the first Test of the Rishis — it starts now.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 7 — WHISPERS IN THE DEEP FOREST
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch7_whispers",
    title: "Chapter VII — Whispers in the Deep",
    location: "Tataka Wilds — The Crossroads of Spirits",
    timeOfDay: "Before Dawn — Fog lifts from the forest floor",
    bg: "bg-forest-deep",
    beats: [
      {
        type: "title",
        heading: "Chapter VII",
        subheading: "Whispers in the Deep",
        location: "The Crossroads of Spirits",
        time: "Before Dawn — Fog rolling through the roots",
      },
      {
        type: "narration",
        lines: [
          "Hours pass. Maybe more.",
          "You lose track of time the way you always do in forests — the light doesn't shift by the sun here, only by the slow drift of the Eclipse overhead.",
          "You have fought three more corrupted Atmas since the clearing — a Mayur-Pankh whose illusions made you unsure which direction was up, a Kapi-Shaka whose speed felt less like quickness and more like teleportation, and something that might have been a Baka-Nadi, which you never actually saw clearly because it moved through the fog with a silence that seemed unfair.",
          "You are tired. Your starter is tired. But the path pushes south, and south is the only direction that matters.",
        ],
      },
      {
        type: "narration",
        lines: [
          "Then you reach the Crossroads.",
          "It is exactly what it sounds like: four paths meeting at a point marked by a single stone carving — a Yaksha figure, ancient and mossy, standing on a square plinth.",
          "But the carving is not a carving.",
          "It blinks.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "yakshaGuide",
        lines: [
          "Seeker. I have been waiting at this crossroads for one hundred and twelve years for someone to carry the right frequency of Tapas.",
          "You are close enough.",
          "My name is Vanarasi. I am the memory of this forest. Every creature that has passed through this crossroads since the First Age — I have their pattern in me.",
          "The one who passed before you, an hour ago. Dark clothing. Falcon. He did not stop here. He did not see me. This is telling.",
        ],
      },
      {
        type: "choice",
        prompt: "Vanarasi watches you with eyes that hold entire forests inside them. What do you ask?",
        choices: [
          {
            text: '"What is Indrajit doing in this forest? What does he want?"',
            karma: { axis: "jnana", val: 1 },
            label: "Jnana",
            labelColor: "#9ad0ec",
          },
          {
            text: '"What is causing the Eclipse? Tell me about the breaking seals."',
            karma: { axis: "dharma", val: 1 },
            label: "Dharma",
            labelColor: "#f0d080",
          },
          {
            text: '"How do I reach Prince Bharata? I need to pass the Test of Discipline."',
            karma: { axis: "shakti", val: 1 },
            label: "Shakti — Direct",
            labelColor: "#ff6b35",
          },
        ],
      },
      {
        type: "dialogue",
        speakerId: "yakshaGuide",
        lines: [
          "All three questions are the same question.",
          "The one in dark silk seeks the Ravana Sutras — fragments of texts that the Rishi Valmiki hid in various parts of this forest after the last great war. The Sutras are maps. They show the location of the original seals that hold the darkness below Lanka contained.",
          "Someone with those maps could locate the seals. Someone with the right technique — the Maya-Binding technique — could force the seals open rather than break them by waiting.",
          "The Eclipse you see is not natural decay. It is preparation. Preparation for something deliberate.",
          "Who is behind it? I am a forest memory, not a prophet. But I remember what the world felt like the last time that particular darkness breathed.",
          "It felt like this.",
        ],
      },
      {
        type: "narration",
        lines: [
          "A long silence.",
          "Somewhere deep in the forest, something heavy moves — slow, immense, patient.",
          "Then it stops.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "yakshaGuide",
        lines: [
          "Take the southern path. Prince Bharata's courtyard is two hours' walk through the Nishada territory. You will encounter a river crossing — it is guarded by corrupted Sarp-Dhara. They will not let you pass without a test.",
          "One more thing, Seeker.",
          "The dark seeker — Indrajit — his Atmas carry the Maya-Binding, yes. But the binding is not just force. It is a mirror. It reflects the worst version of what an Atma could become.",
          "Your bond is the opposite. What you call Bhakti — that devotion — is a mirror too. The best version.",
          "Neither mirror is neutral. Be careful which one you hold toward the world.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The stone figure is still again.",
          "Vanarasi has retreated back into the rock and the root and the memory.",
          "But the path south is lit, just slightly, by a faint trail of golden bioluminescence — as if the forest itself has decided to guide your feet.",
          "You follow it.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 8 — THE TEST OF DISCIPLINE
  // (First Rishi Boss Battle)
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch8_bharata",
    title: "Chapter VIII — The Test of Discipline",
    location: "The Golden Courtyard of Bharata",
    timeOfDay: "Dawn — Just before the sun breaks the Eclipse",
    bg: "bg-courtyard",
    beats: [
      {
        type: "title",
        heading: "Chapter VIII",
        subheading: "The Test of Discipline",
        location: "The Golden Courtyard",
        time: "Dawn — The sun fighting through the Eclipse",
      },
      {
        type: "narration",
        lines: [
          "The forest releases you just as the sky begins its hourly war with the Eclipse.",
          "There is always a moment at dawn when the natural sun rallies — when the normal gold of morning pushes back against the Maya-purple and, for a few minutes, the world looks almost as it should. The river glitters. Dew on leaves flashes silver.",
          "You emerge into a wide stone courtyard that smells of fresh water and sandalwood ash.",
          "The courtyard is ringed by training dummies — carved wood padded in hemp cloth, some of them clearly well-used. A lotus pond sits at the eastern end. And at the centre of it all stands Prince Bharata.",
        ],
      },
      {
        type: "narration",
        lines: [
          "He is not what you expected from the stories.",
          "The stories say Bharata is a prince of extraordinary gentleness. What you see is a young man in light armour, sitting in a low guard stance beside his Atma — the Ashvamedh, a white war-horse made of layered earth-crystal that catches the morning light and breaks it into dust-coloured prisms.",
          "When Bharata sees you, he does not bow or call out.",
          "He waits.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "bharata",
        lines: [
          "You made it through the Tataka by night. That means you understand something about patience.",
          "Good. Patience is the first virtue on the path south. The rest of what follows will test everything you know about controlling what you feel in the middle of a crisis.",
          "The south road is not for seekers who are brilliant in calm moments. It is for those who remain clear when the battle turns against them.",
          "I don't need to know your name. I need to see your steadiness. That is what the prince who watches this gate requires of every Seeker who passes through.",
        ],
      },
      {
        type: "choice",
        prompt: "Prince Bharata stands ready before the gate. How do you meet him?",
        choices: [
          {
            text: '"Then I am ready for the test, Prince. Show me what steadiness requires."',
            karma: { axis: "dharma", val: 1 },
            label: "Dharma — Resolve",
            labelColor: "#f0d080",
          },
          {
            text: '"I passed through the Tataka alone. I think that speaks for itself."',
            karma: { axis: "shakti", val: 1 },
            label: "Shakti — Confidence",
            labelColor: "#ff6b35",
          },
          {
            text: '"I\'m not here to impress a gate. I\'m here because the world is breaking. Please step aside."',
            karma: { axis: "dharma", val: -1 },
            label: "Impatience",
            labelColor: "#cc4444",
          },
        ],
      },
      {
        type: "dialogue",
        speakerId: "bharata",
        lines: [
          "Well answered.",
          "I use the Chakra formation — you will need to break through its centre to defeat me. Pure aggression will not work. You will need to think.",
          "The Ashvamedh is patient. Its hooves can crack stone. Its spirit cannot be easily rattled.",
          "But every formation has a seam. Find it.",
          "Begin.",
        ],
      },
      {
        type: "battle",
        battleId: "ch8_bharata_boss",
        enemyTeamSpec: [
          { speciesId: "mushikaRatna", level: 8 },
          { speciesId: "vrikshaAnsh", level: 9 },
          { speciesId: "ASHVAMEDH_BOSS", level: 12, label: "Ashvamedh", glyph: "🐎",
            type: "Prithvi", hp: 90, atk: 55, def: 70, spAtk: 40, spDef: 65, speed: 45,
            astras: ["prahar", "shilaPaat", "vajraMushti", "sanjeevani"] },
        ],
        enemyVyuha: "chakra",
        intro: "Prince Bharata adopts the Chakra-Vyuha! His Ashvamedh stamps its hoof and the ground CRACKS. This will require precision, not force!",
        winText: "The Ashvamedh goes to one knee — not in defeat, but in acknowledgement. Bharata exhales slowly.",
        loseText: "The Chakra formation proves too strong. Bharata steps forward and catches you before you fall. 'Rest. The test does not expire. Only pride does.'",
        isBossBattle: true,
      },
      {
        type: "dialogue",
        speakerId: "bharata",
        lines: [
          "Good.",
          "You found the seam. Most seekers try to out-muscle the Chakra formation and exhaust themselves in four turns. You adapted.",
          "That is what Dharma requires of a warrior: not the absence of force, but the wisdom to apply it at the right point.",
          "Take this. And carry it honestly.",
        ],
      },
      {
        type: "seal",
        sealName: "Dharma-Shakti Seal",
        sealGlyph: "☸",
        sealDesc: "The First Seal. Earned from Prince Bharata, Guardian of the Gate. Authorises command over Atmas up to Level 20. Grants access to the Astra: Vajra-Mushti (Diamond Fist) — which can also break cracked walls in the overworld.",
      },
      {
        type: "narration",
        lines: [
          "The gate opens. Smooth, silent, as if it was always going to open for you specifically and was just waiting for the right moment.",
          "Beyond it, the southern road stretches through denser forest, the treetops lost in cloud.",
          "Bharata doesn't watch you leave. He's already back in his training stance, the Ashvamedh beside him, making small adjustments to his grip.",
          "Some people stand guard not because they're waiting for someone to arrive, but because the standing matters in itself.",
          "You understand that a little better now.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 9 — THE FOREST OF ILLUSIONS
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch9_illusions",
    title: "Chapter IX — The Forest of Illusions",
    location: "Southern Tataka — The Shifting Panchavati",
    timeOfDay: "Midday — though no light reaches the forest floor",
    bg: "bg-forest-deep",
    beats: [
      {
        type: "title",
        heading: "Chapter IX",
        subheading: "The Forest of Illusions",
        location: "Southern Tataka — The Shifting Panchavati",
        time: "Midday — though no light reaches the forest floor",
      },
      {
        type: "narration",
        lines: [
          "The forest changes.",
          "Not all at once. It is gradual, the way a mood can change a room — you only notice it's different when you realise you haven't seen a recognisable landmark in an hour, and the path that has been perfectly clear suddenly has a fork that wasn't there five minutes ago.",
          "This is the Panchavati — the inner heart of Tataka, where the forest's own consciousness is the strongest. It shifts. It tests.",
          "Once, a hundred years ago, an army of three thousand men entered here. Sixty-seven emerged, three weeks later, in the wrong kingdom entirely, with no memory of what happened in between.",
          "You are one person. This should, theoretically, be easier.",
          "It isn't.",
        ],
      },
      {
        type: "narration",
        lines: [
          "First comes the sound.",
          "Voices you recognise — Vashistha, Indrajit, the merchant Dhanpal — speaking from just behind the next tree. When you go to look, no one is there. The voices move.",
          "Then come the images. The trees seem to rearrange when you aren't watching. A stream you crossed ten minutes ago appears ahead of you.",
          "Your Atma doesn't react to any of it. It walks steadily at your side, occasionally pressing against your leg — a small, grounding weight.",
          "Its calm is the anchor you need.",
        ],
      },
      {
        type: "battle",
        battleId: "ch9_panchavati_gauntlet",
        enemyTeamSpec: [
          { speciesId: "mayurPankh", level: 10 },
          { speciesId: "mayurPankh", level: 10 },
        ],
        intro: "Two Mayur-Pankh materialise from the shifting air — their feathers releasing cascading illusion-light! They will hit your accuracy hard. Fight through the confusion!",
        winText: "The Mayur-Pankh vanish back into the forest canopy, their illusions shredding into golden motes that fall like slow rain.",
        loseText: "The double-illusion overwhelms you. You sit, you breathe, your Atma presses close until the forest stops spinning.",
        canBind: true,
      },
      {
        type: "narration",
        lines: [
          "On the other side of the illusion-birds' territory, the forest begins to thin.",
          "The trees spread farther apart. The light, while still filtered and green, actually reaches the ground now.",
          "In a wide space between three ancient figs, a man is seated on an outcropping of rock, reading from a scroll.",
          "He hears your footsteps without turning, and speaks before you have greeted him.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "vishwamitra",
        lines: [
          "I have been expecting you.",
          "Not you specifically — I have been expecting a student of Vashistha's who survived the Panchavati intact. You are the third in fifty years to make it through without turning back or getting lost for longer than a day.",
          "The first was a girl who became the greatest Healer the southern kingdoms have seen in two generations. The second was a boy who is now the guardian of the Kishkindha Pass.",
          "I am curious what you will become.",
          "But first — you will take my test. I am Vishwamitra. And I am not a gentle examiner.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The three fig trees in the clearing suddenly shudder. From the forest around the clearing, a sound rises — not wind, exactly, but like wind learning to speak.",
          "And at the edges of the clearing, the shadows begin to move.",
          "Small Yaksha-figures — the peaceful kind, the ones whose whole purpose is to protect ancient groves — are backing rapidly towards the centre. They look terrified. Their glow is wrong: flickering, pale, with that edge of purple-static that means the Eclipse has found them.",
          "More than a dozen. Flooding into the clearing. And behind them, from the forest, something massive and hostile that you cannot yet see.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "vishwamitra",
        lines: [
          "Protect them.",
          "Do not let a single Yaksha be touched by what comes from the forest.",
          "And understand: what you protect defines you more clearly than what you fight.",
          "You have until my owl counts seven.",
        ],
      },
      {
        type: "narration",
        lines: [
          "An enormous owl manifests on Vishwamitra's shoulder — the Kaushika-Pakshi, made of pure Ether-light. Its eyes are the colour of deep space.",
          "It begins to count. Not in any language, but in a sound that somehow means COUNT.",
          "The shadows at the forest's edge converge toward the frightened Yakshas.",
          "You plant your feet.",
        ],
      },
      {
        type: "battle",
        battleId: "ch9_yaksha_protection",
        enemyTeamSpec: [
          { speciesId: "sarpDhara", level: 11 },
          { speciesId: "vrikshaAnsh", level: 11 },
          { speciesId: "kapiShaka", level: 12 },
        ],
        intro: "Three Corrupted Atmas surge out of the darkness! Protect the Yakshas — do not let them be overwhelmed! Use your best Astras!",
        winText: "The last corrupted Atma retreats into the forest. The Yakshas cluster around you, their frightened glow slowly steadying, warming back to gold.",
        loseText: "A wave of corruption surges through, but Vishwamitra's owl releases a pulse of pure Ether-light — a single reprieve. 'Again,' Vishwamitra says, calm as stone.",
        isBossBattle: false,
      },
      {
        type: "narration",
        lines: [
          "The clearing is still.",
          "The Yakshas sit in a circle around you, their light fully returned — warm amber-gold, pulsing gently. One of them, a small one that barely reaches your knee, reaches up with a hand made of woven reeds and touches your wrist.",
          "It leaves a mark: a tiny golden impression, like a seal, on your skin.",
          "You look up. Vishwamitra is watching with an expression that, on a face usually carved from discipline, reads like something close to satisfaction.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CHAPTER 10 — THE TEST OF COMPASSION & THE ROAD AHEAD
  // (Second Rishi Boss Battle + Cliffhanger)
  // ════════════════════════════════════════════════════════════════
  {
    id: "ch10_compassion",
    title: "Chapter X — The Test of Compassion",
    location: "The Clearing of the Ancient Figs — Vishwamitra's Ground",
    timeOfDay: "Afternoon — A single shaft of clean sunlight",
    bg: "bg-courtyard",
    beats: [
      {
        type: "title",
        heading: "Chapter X",
        subheading: "The Test of Compassion",
        location: "Vishwamitra's Ground",
        time: "Afternoon — A single shaft of clean sunlight breaks through",
      },
      {
        type: "dialogue",
        speakerId: "vishwamitra",
        lines: [
          "The Yakshas chose you. That is not nothing.",
          "They are the oldest judges in this forest. They do not respond to titles or technique. They respond to intention.",
          "Your intention is... unusually clear. Not perfect — I can see the edges where impatience lives in you, where pride has not yet been burned away — but clear enough.",
          "Now face me directly. The Yaksha protection was a question about your heart.",
          "This is a question about your mind.",
        ],
      },
      {
        type: "narration",
        lines: [
          "The Kaushika-Pakshi rises from Vishwamitra's shoulder and expands — massively, filling the air above the clearing with wings of pure compressed Ether.",
          "Its eyes focus on you, and you have the distinct sensation of being read. Not your current state but your pattern: the whole shape of you, every battle you've fought today, every choice that led here.",
          "Then Vishwamitra's hand rises. In his palm, a sphere of Akash-energy forms — cold, dense, humming with something ancient.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "vishwamitra",
        lines: [
          "Compassion is not weakness. Every third-rate philosopher will tell you that — usually just before they do something unkind and call it 'necessary'.",
          "True compassion is seeing accurately. Seeing what is, not what you wish was, not what fear tells you is.",
          "My Kaushika-Pakshi will not yield to aggression. It will only yield to a Seeker who has understood what it means to hold power gently.",
          "You have thirty turns. Prove it.",
        ],
      },
      {
        type: "battle",
        battleId: "ch10_vishwamitra_boss",
        enemyTeamSpec: [
          { speciesId: "mayurPankh", level: 13 },
          { speciesId: "shyenaVeg", level: 13 },
          {
            speciesId: "KAUSHIKA_BOSS", level: 16, label: "Kaushika-Pakshi",
            glyph: "🦉", type: "Akash",
            hp: 100, atk: 50, def: 55, spAtk: 80, spDef: 70, speed: 60,
            astras: ["mayaJaal", "nidraMantra", "prahar", "brahmastra"],
          },
        ],
        enemyVyuha: "garuda",
        intro: "Vishwamitra's team is fast and mind-bending! The Kaushika-Pakshi hits hard with Ether-type Astras. Use status effects and formations wisely — brute force will not work here!",
        winText: "The Kaushika-Pakshi glides down slowly, its Ether-wings folding. It bows its great head to you — a gesture of recognition. Not submission. Recognition.",
        loseText: "The pure Ether overwhelms you. Vishwamitra catches your Atma as it stumbles. 'You saw it,' he says. 'You just have not yet learned to hold what you see. You will. Come, rest.'",
        isBossBattle: true,
      },
      {
        type: "dialogue",
        speakerId: "vishwamitra",
        lines: [
          "Two seals in one day. Unusual.",
          "The south will be harder than this. The Kishkindha pass is guarded by forces that have not been tested in decades. And Lanka —",
          "Lanka is not a place you go to. Lanka is a place you become ready for.",
          "You are not ready yet. But you are closer than any student I have tested in this generation.",
          "Take the Daya Badge. It carries a fraction of my Tapas — it will allow your Atmas above level 25 to obey you fully without question.",
          "And take this advice, which costs me more than the badge.",
        ],
      },
      {
        type: "dialogue",
        speakerId: "vishwamitra",
        lines: [
          "Indrajit was here.",
          "He came through this forest six hours before you. He did not speak to Vanarasi; the spirit told me. He did not light his way with Tapas; he burned through it.",
          "He found one of the Ravana Sutras — the third fragment, the one that maps the seal beneath the ocean floor east of Lanka.",
          "He is faster than you. He is more ruthless. And he genuinely believes he is right about Dharma being a lie.",
          "This makes him more dangerous than someone who knows they are doing wrong.",
          "Do not underestimate the certainty of a person who has never had their worldview broken.",
          "Go, Seeker. The mountains of Kishkindha wait. And your Atma's spirit — watch it. The bond is deepening. You will see it in their eyes soon.",
        ],
      },
      {
        type: "seal",
        sealName: "Daya Badge",
        sealGlyph: "🌙",
        sealDesc: "The Second Seal. Earned from Sage Vishwamitra, Witness of Willpower. Authorises command over Atmas up to Level 30. Grants access to the Astra: Jyoti-Baan — a light arrow that cures 'Blind' and 'Moha' status.",
      },
      {
        type: "narration",
        lines: [
          "You stand at the southern edge of the Panchavati.",
          "Behind you: the Tataka Wilds, Rishi Agni-Vesha's empty clearing, the Stone Bridge, Indrajit's cold smile, Ayodhya's golden spires getting smaller in your memory.",
          "Ahead: the Dandakaranya begins in earnest. The true wilderness — taller trees, deeper shadows, Atmas not seen in any Academy bestiary.",
          "And somewhere in the mountains beyond that: Kishkindha. The Vanara kingdoms. The next test.",
          "Your Atma sits on your shoulder, warm and alive and yours, and its eyes catch the one shaft of clean sunlight that has pushed through the Eclipse all morning.",
          "For just this moment, the sky above that one shaft is pure and blue and ancient.",
          "You breathe. You walk forward.",
          "The journey to Lanka has truly begun.",
        ],
      },
      {
        type: "continue",
        text: "The story of Aryavarta continues... The road south leads to the Kishkindha Mountains, the Test of Humility, and the truth behind the breaking seals.",
        subtext: "Thank you for playing the Aryavarta story demo. More chapters coming.",
        isEnding: true,
      },
    ],
  },

]; // end STORY_CHAPTERS

// ─── Helper ──────────────────────────────────────────────────────────────────

export function getChapter(id) {
  return STORY_CHAPTERS.find((c) => c.id === id);
}

export function getAllChapterIds() {
  return STORY_CHAPTERS.map((c) => c.id);
}
