import { Component, Inject, inject } from '@angular/core';
import { AntdModule } from '../antd/antd.module';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicesService } from '../../service/services.service';
import { Word } from '../../service/word';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal',
  imports: [AntdModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  validateForm!: FormGroup;
  private fb = inject(NonNullableFormBuilder);

  constructor(
    @Inject(NZ_MODAL_DATA) public data: any,
    private service: ServicesService,
    private modal: NzModalRef<ModalComponent>
  ) {
    this.validateForm = this.fb.group({
      word: this.fb.control(data ? data.word : '', [Validators.required]),
      meaning: this.fb.control(data ? data.meaning : '', [Validators.required]),
    });
  }

  submitForm(): void {
    const newWord: Word = {
      word: this.validateForm.value.word,
      meaning: this.validateForm.value.meaning,
    };
    if (this.validateForm.valid) {
      if (this.data) {
        this.service
          .updateWord(this.data.id, newWord)
          .then(() => {
            console.log('Updated');
            this.modal.close(true);
          })
          .catch((err) => console.error('Error:', err));
      } else {
        this.service
          .addWord(newWord)
          .then((ref) => {
            console.log('Added with ID:', ref.id);
            this.modal.close(true);
          })
          .catch((err) => console.error('Error:', err));
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  delete(){
    this.service.deleteWord(this.data.id);
    this.modal.close(true);
  }
}
