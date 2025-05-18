import { Component } from '@angular/core';
import { AntdModule } from '../../components/antd/antd.module';
import { Word, Answer } from '../../service/word';
import { ServicesService } from '../../service/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [AntdModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  loading: boolean = true;
  words: Word[] = [];
  answer: Answer = {
    word: '',
    correctMeaning: '',
    choices: ['', '', '', ''],
  };
  selectedAnswer: number = 4;

  constructor(private service: ServicesService) {}

  ngOnInit() {
    this.selectedAnswer = 5;
    this.getData();
  }

  getData() {
    this.loading = true;
    this.service.getWords().subscribe((data) => {
      this.words = data;
      this.getQuestionSet();
    });
  }

  getQuestionSet() {
    if (this.words.length < 4) {
      return;
    }
    this.loading = false;
    const randomWord =
      this.words[Math.floor(Math.random() * this.words.length)];
    const correctMeaning = randomWord.meaning;
    const otherMeanings = this.words
      .filter((w) => w.meaning !== correctMeaning)
      .map((w) => w.meaning);

    const shuffled = otherMeanings.sort(() => 0.5 - Math.random());
    const wrongChoices = shuffled.slice(0, 3);

    const choices = [...wrongChoices, correctMeaning].sort(
      () => 0.5 - Math.random()
    );

    this.answer = {
      word: randomWord.word,
      correctMeaning,
      choices,
    };
  }

  next() {
    this.selectedAnswer = 5;
    this.getQuestionSet();
  }

  handleColor(number: number): void {
    this.selectedAnswer = number;
  }

  getBackgroundColor(number: number): string {
    if (this.selectedAnswer !== number) {
      return 'white';
    }
    return this.answer.choices[number] === this.answer.correctMeaning
      ? '#52C41A'
      : '#FF603B';
  }
}
