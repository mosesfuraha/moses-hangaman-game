import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<string | null>(null);
  modalState$ = this.modalState.asObservable();

  showModal(modalType: string) {
    this.modalState.next(modalType);
  }

  hideModal() {
    this.modalState.next(null);
  }
}
