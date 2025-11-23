import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { HorrorCategory } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing. Application will fail.");
}

// Helper to decode base64 string to ArrayBuffer
function decodeBase64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export const generateHorrorContent = async (
  category: HorrorCategory,
  promptModifier: string,
  template: string
): Promise<{ title: string; content: string }> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = 'gemini-2.5-flash';

  const fullPrompt = `
    You are a master horror writer and game designer.
    Task: ${template}
    User Specifics: ${promptModifier || "None provided, surprise me with something pure nightmare fuel."}
    
    Output format: JSON with keys "title" and "content". Content should be Markdown.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: fullPrompt,
    config: {
        responseMimeType: "application/json"
    }
  });

  const text = response.text;
  if (!text) throw new Error("No text generated");
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON", text);
    return { title: "Unknown Horror", content: text };
  }
};

export const generateVisualRepresentation = async (description: string): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  // Using general image generation model as per guidelines
  const model = 'gemini-2.5-flash-image'; 
  
  const prompt = `A highly detailed, dark, atmospheric horror illustration of: ${description.slice(0, 300)}. Cinematic lighting, gritty texture, terrifying.`;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
  } catch (e) {
      console.warn("Image generation failed", e);
      return undefined;
  }
  return undefined;
};

export const generateCreepyVoiceover = async (text: string): Promise<string | undefined> => {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const model = 'gemini-2.5-flash-preview-tts';
    
    // We only read a summary to avoid hitting limits or too long audio
    const shortText = text.length > 300 ? text.substring(0, 300) + "..." : text;
    const prompt = `Read this in a slow, whispering, terrifying voice, as if recounting a nightmare: ${shortText}`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Puck' } // Puck often sounds a bit deeper/raspy
                    }
                }
            }
        });

        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return audioData;
    } catch (e) {
        console.warn("TTS generation failed", e);
        return undefined;
    }
}

export const playAudio = async (base64Data: string): Promise<void> => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    
    try {
        const arrayBuffer = decodeBase64ToArrayBuffer(base64Data);
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    } catch (e) {
        console.error("Error playing audio", e);
    }
};
