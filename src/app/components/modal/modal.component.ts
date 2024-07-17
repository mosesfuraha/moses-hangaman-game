import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  modalType: string | null = null;

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe((state) => {
      this.modalType = state;
    });
  }

  closeModal() {
    this.modalService.hideModal();
  }
  handleModalAction(action: string) {
    switch (action) {
      case 'continue':
        if (this.modalType === 'paused') {
          this.router.navigate(['/start']);
        }
        break;
      case 'playAgain':
        if (this.modalType === 'win' || this.modalType === 'lose') {
          this.router.navigate(['/start']);
        }
        break;
      case 'newCategory':
        this.router.navigate(['/category']);
        break;
      case 'quit':
        break;
      default:
        break;
    }
    this.closeModal();
  }
}
