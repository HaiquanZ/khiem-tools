import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { AntdModule } from '../../components/antd/antd.module';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ModalComponent } from '../../components/modal/modal.component';
import { ServicesService } from '../../service/services.service';
import { Word } from '../../service/word';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CardComponent, AntdModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  modalRefAnt?: NzModalRef;
  words: Word[] = [];
  loading: boolean = true;

  constructor(
    private modal: NzModalService,
    private service: ServicesService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getWords().subscribe((data) => {
      this.words = data;
      this.loading = false;
    });
  }

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
        this.getData();
      }
    });
  }
}
