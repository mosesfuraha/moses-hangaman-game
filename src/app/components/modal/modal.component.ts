import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  modalVisible = false;
  constructor(private modalService: ModalService) {}
  ngOnInit(): void {
    this.modalService.modalVisible$.subscribe((visible) => {
      this.modalVisible = visible;
    });
  }
  closeModal() {
    this.modalService.hideModal();
  }
}
