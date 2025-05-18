import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AntdModule } from '../antd/antd.module';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  imports: [AntdModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() data: any;
  @Output() notifyParent = new EventEmitter<string>();
  modalRefAnt?: NzModalRef;

  constructor(private modal: NzModalService) {}

  openModal() {
    this.modalRefAnt = this.modal.create({
      nzTitle: 'Add/Edit new word',
      nzContent: ModalComponent,
      nzFooter: null,
      nzData: this.data,
      nzWidth: 600,
      nzCentered: true,
    });
    this.modalRefAnt.afterClose.subscribe((status) => {
      if (status) {
        this.notifyParent.emit();
      }
    });
  }
}
