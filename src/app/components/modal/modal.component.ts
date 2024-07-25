import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  modalType: string | null = null;
  private modalSubscription: Subscription | null = null;

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this.modalSubscription = this.modalService.modalState$.subscribe(
      (state) => {
        this.modalType = state;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  closeModal() {
    this.modalService.hideModal();
  }

  handleModalAction(action: string) {
    switch (action) {
      case 'continue':
        if (this.modalType === 'paused') {
          this.router.navigate(['']);
        }
        break;
      case 'playAgain':
        if (this.modalType === 'win' || this.modalType === 'lose') {
          this.router.navigate(['/category']);
        }
        break;
      case 'newCategory':
        this.router.navigate(['/category']);
        break;
      case 'quit':
        this.router.navigate(['']);
        break;
      default:
        break;
    }
    this.closeModal();
  }
}
