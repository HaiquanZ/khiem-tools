import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { AntdModule } from '../../components/antd/antd.module';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-list',
  imports: [CardComponent, AntdModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  modalRefAnt?: NzModalRef;
  constructor(private modal: NzModalService) {}

  openModal(e: any) {
    this.modalRefAnt = this.modal.create({
      nzTitle: 'Add new word',
      nzContent: ModalComponent,
      nzFooter: null,
      nzData: null,
      nzWidth: 600,
      nzCentered: true,
    });

    this.modalRefAnt.afterClose.subscribe((status) => {
      if (status) {
      }
    });
  }
}
