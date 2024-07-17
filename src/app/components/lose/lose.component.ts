import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrl: './lose.component.css',
})
export class LoseComponent implements OnInit {
  modalState$: Observable<string | null>;

  constructor(public modalService: ModalService) {
    this.modalState$ = this.modalService.modalState$;
  }
  ngOnInit(): void {}
}
