import { HorrorCategory } from './types';

export const CATEGORY_LABELS: Record<HorrorCategory, string> = {
  [HorrorCategory.MONSTER]: 'Abomination Generator',
  [HorrorCategory.SCENARIO]: 'Atmospheric Scenario',
  [HorrorCategory.SOUND_DESIGN]: 'Audio Hallucination',
  [HorrorCategory.CURSED_ITEM]: 'Cursed Artifact',
  [HorrorCategory.SURVIVAL_BIOME]: 'Hostile Biome',
  [HorrorCategory.PSYCHOLOGICAL]: 'Sanity Event',
  [HorrorCategory.CULT]: 'Occult Ritual',
  [HorrorCategory.ANTAGONIST]: 'Stalking Entity',
};

export const PROMPT_TEMPLATES: Record<HorrorCategory, string> = {
  [HorrorCategory.MONSTER]: `Create a terrifying monster. Describe its unpredictable movement patterns, visual horror, and specific lethal abilities. Include a weakness that is difficult to exploit. Format as Markdown with headers for 'Visuals', 'Behavior', and 'Weakness'.`,
  [HorrorCategory.SCENARIO]: `Invent an atmospheric horror scenario in an abandoned structure. Describe the sensory details (smell, sound, lighting), the hidden history, and a lurking threat that isn't immediately visible. Focus on building tension.`,
  [HorrorCategory.SOUND_DESIGN]: `Design a creepy soundscape with layered tension. Describe specific auditory elements (e.g., wet footsteps, metallic grinding, whispers) and how they manipulate player anxiety. Suggest a crescendo event.`,
  [HorrorCategory.CURSED_ITEM]: `Create a cursed item that provides a benefit but manipulates player behavior or sanity. Describe its appearance, its useful effect, and the terrible cost of using it.`,
  [HorrorCategory.SURVIVAL_BIOME]: `Generate a dangerous biome with rare resources and lurking threats. Describe the weather patterns, environmental toxicity, and flora/fauna that actively hunt the player.`,
  [HorrorCategory.PSYCHOLOGICAL]: `Invent a psychological horror event that distorts reality. Describe how the environment shifts, how the player's perception is tricked, and the feeling of isolation.`,
  [HorrorCategory.CULT]: `Invent a secret cult with disturbing rituals. Describe their belief system, their grotesque ceremonies, and the signs of their presence in the world.`,
  [HorrorCategory.ANTAGONIST]: `Develop an antagonist who stalks the player. Describe their obsession, their tracking methods, and the subtle signs that indicate they are nearby before they attack.`,
};
