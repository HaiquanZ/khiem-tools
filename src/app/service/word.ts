export interface Word {
  id?: string;
  word: string;
  meaning: string;
}

export interface Answer {
  word: string;
  correctMeaning: string;
  choices: string[];
}
