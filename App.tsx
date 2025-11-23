import React, { useState } from 'react';
import { HorrorCategory, GeneratedResult, GeneratorConfig } from './types';
import { PROMPT_TEMPLATES } from './constants';
import { generateHorrorContent, generateVisualRepresentation, generateCreepyVoiceover } from './services/geminiService';
import GeneratorControls from './components/GeneratorControls';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedResult[]>([]);
  
  const [config, setConfig] = useState<GeneratorConfig>({
    category: HorrorCategory.MONSTER,
    promptModifier: '',
    generateImage: true,
    generateAudio: false,
  });

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const template = PROMPT_TEMPLATES[config.category];
      
      // 1. Generate Text
      const textResult = await generateHorrorContent(
        config.category, 
        config.promptModifier, 
        template
      );

      let imageUrl: string | undefined;
      let audioData: string | undefined;

      // 2. Generate Image (Concurrent if possible, but sequential for clearer error handling here)
      if (config.generateImage) {
        imageUrl = await generateVisualRepresentation(
          `Subject: ${textResult.title}. Context: ${config.category}. Details: ${textResult.content}`
        );
      }

      // 3. Generate Audio
      if (config.generateAudio) {
        audioData = await generateCreepyVoiceover(textResult.content);
      }

      const newResult: GeneratedResult = {
        id: Date.now().toString(),
        category: config.category,
        title: textResult.title,
        content: textResult.content,
        imageUrl,
        audioData,
      };

      setHistory(prev => [newResult, ...prev]);

    } catch (err) {
      console.error(err);
      setError("The ritual failed. The void refused to answer. (Check console/API Key)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-300 pb-20">
      
      {/* Hero Header */}
      <header className="bg-slate-950 border-b border-red-900/20 p-8 mb-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2" style={{ textShadow: '4px 4px 0px #450a0a' }}>
              HORROR<span className="text-red-600">ENGINE</span>
            </h1>
            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              Gemini-Powered Nightmare Fabricator v1.0
            </p>
          </div>
          <div className="hidden md:block text-right">
             <div className="text-xs text-slate-600 font-mono">System Status: <span className="text-green-500 animate-pulse">ONLINE</span></div>
             <div className="text-xs text-slate-600 font-mono">Safety Protocols: <span className="text-red-500">DISABLED</span></div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        
        <GeneratorControls 
          config={config} 
          onChange={setConfig} 
          onGenerate={handleGenerate} 
          loading={loading}
        />

        {error && (
          <div className="bg-red-950/50 border border-red-800 text-red-200 p-4 rounded mb-8 text-center font-mono">
            {error}
          </div>
        )}

        <div className="space-y-12">
          {history.map((result) => (
            <ResultDisplay key={result.id} result={result} />
          ))}
          
          {history.length === 0 && !loading && (
            <div className="text-center text-slate-700 py-20 border-2 border-dashed border-slate-900 rounded-lg select-none">
              <p className="font-mono text-lg mb-2">THE VOID IS EMPTY</p>
              <p className="text-sm">Invoke a nightmare to begin.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
