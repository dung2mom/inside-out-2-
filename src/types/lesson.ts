export type SlideId = number; // 1 to 20

export interface QuizQuestion {
  id: string;
  slideNumber: number;
  questionNumber: number;
  question: string;
  koreanQuestion?: string;
  options: {
    key: 'A' | 'B' | 'C';
    text: string;
    koreanText?: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C';
  explanation: string;
  koreanExplanation: string;
  clipStart: number; // in seconds
  clipEnd: number;   // in seconds
  clueTimestamp: string; // e.g. "0:15"
  clueHint: string;
  transcriptSnippet: string;
}

export interface ListeningItem {
  id: number;
  sentenceBefore: string;
  blankWord: string;
  sentenceAfter: string;
  koreanTranslation: string;
}

export interface ListeningRound {
  roundNumber: number;
  slideNumber: number;
  title: string;
  clipStart: number;
  clipEnd: number;
  wordBank: string[];
  items: ListeningItem[];
}

export interface DialogueLine {
  speaker: 'Leo' | 'Emma' | 'A' | 'B';
  characterName: string;
  role: 'A' | 'B';
  avatar: string;
  english: string;
  korean: string;
  keyPhrase?: string;
  tone?: string;
}

export interface TopicCard {
  id: string;
  title: string;
  koreanTitle: string;
  prompt: string;
  koreanPrompt: string;
  color: string;
  iconName: string;
  sampleIdeas: string[];
}
