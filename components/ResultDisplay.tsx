import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { playAudio } from '../services/geminiService';

interface Props {
  result: GeneratedResult;
}

const ResultDisplay: React.FC<Props> = ({ result }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    if (result.audioData) {
      setIsPlaying(true);
      await playAudio(result.audioData);
      setIsPlaying(false);
    }
  };

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-slate-900 border border-red-900/30 rounded-lg overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-500 tracking-widest uppercase truncate pr-4">
            {result.title}
            </h2>
            <span className="text-xs text-slate-600 uppercase border border-slate-800 px-2 py-1 rounded">
                {result.category}
            </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Image Section */}
            {result.imageUrl && (
                <div className="lg:col-span-1 bg-black flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800 min-h-[300px]">
                    <img 
                        src={result.imageUrl} 
                        alt={result.title}
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                    />
                </div>
            )}

            {/* Content Section */}
            <div className={`p-6 ${result.imageUrl ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                
                {/* Audio Control */}
                {result.audioData && (
                    <div className="mb-6 flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-lg">
                        <button 
                            onClick={handlePlayAudio}
                            disabled={isPlaying}
                            className={`
                                flex items-center justify-center w-10 h-10 rounded-full transition-colors
                                ${isPlaying ? 'bg-red-900 animate-pulse' : 'bg-slate-800 hover:bg-red-900/50 text-white'}
                            `}
                        >
                             {isPlaying ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                             ) : (
                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                             )}
                        </button>
                        <div className="flex-1">
                            <div className="text-xs text-red-400 uppercase font-bold tracking-wider mb-1">Audio Log Recovered</div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full bg-red-700 w-full ${isPlaying ? 'animate-[progress_10s_linear]' : 'w-0'}`}></div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="prose prose-invert prose-red max-w-none">
                    <div className="whitespace-pre-wrap text-slate-300 font-light leading-relaxed">
                        {/* Simple markdown parser replacement for the example since we don't have a library */}
                        {result.content.split('\n').map((line, idx) => {
                            if (line.startsWith('# ')) return <h1 key={idx} className="text-3xl font-bold text-white mb-4 mt-6">{line.replace('# ', '')}</h1>;
                            if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold text-red-100 mb-3 mt-5 border-b border-red-900/30 pb-1">{line.replace('## ', '')}</h2>;
                            if (line.startsWith('### ')) return <h3 key={idx} className="text-lg font-bold text-red-200 mb-2 mt-4">{line.replace('### ', '')}</h3>;
                            if (line.startsWith('- ')) return <li key={idx} className="ml-4 text-slate-400">{line.replace('- ', '')}</li>;
                            if (line.trim() === '') return <br key={idx} />;
                            return <p key={idx} className="mb-2">{line}</p>;
                        })}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
