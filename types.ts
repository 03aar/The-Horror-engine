export enum HorrorCategory {
  MONSTER = 'MONSTER',
  SCENARIO = 'SCENARIO',
  SOUND_DESIGN = 'SOUND_DESIGN',
  CURSED_ITEM = 'CURSED_ITEM',
  SURVIVAL_BIOME = 'SURVIVAL_BIOME',
  PSYCHOLOGICAL = 'PSYCHOLOGICAL',
  CULT = 'CULT',
  ANTAGONIST = 'ANTAGONIST'
}

export interface GeneratedResult {
  id: string;
  category: HorrorCategory;
  title: string;
  content: string; // Markdown content
  imageUrl?: string;
  audioData?: string; // Base64 audio for TTS
}

export interface GeneratorConfig {
  category: HorrorCategory;
  promptModifier: string; // User input to guide generation
  generateImage: boolean;
  generateAudio: boolean;
}
