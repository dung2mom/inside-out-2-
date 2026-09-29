// Text-to-Speech utility using browser Web Speech API

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const speakText = (
  text: string,
  options: {
    voiceType?: 'male' | 'female' | 'neutral';
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onError?: () => void;
  } = {}
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported on this browser.');
    options.onEnd?.();
    return;
  }

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options.rate ?? 1.0;
  utterance.pitch = options.pitch ?? (options.voiceType === 'male' ? 0.9 : options.voiceType === 'female' ? 1.15 : 1.0);

  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));

  if (englishVoices.length > 0) {
    if (options.voiceType === 'female') {
      const femaleVoice = englishVoices.find(v => 
        /female|samantha|zira|karen|victoria|fiona|moira|google us english/i.test(v.name)
      );
      if (femaleVoice) utterance.voice = femaleVoice;
    } else if (options.voiceType === 'male') {
      const maleVoice = englishVoices.find(v => 
        /male|david|daniel|alex|george|google uk english male/i.test(v.name)
      );
      if (maleVoice) utterance.voice = maleVoice;
    }
  }

  utterance.onend = () => {
    currentUtterance = null;
    options.onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis error:', e);
    currentUtterance = null;
    options.onError?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};
