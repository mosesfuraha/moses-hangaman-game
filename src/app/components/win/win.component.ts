import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css'],
})
export class WinComponent implements OnInit {
  modalState$: Observable<string | null>;

  constructor(public modalService: ModalService) {
    this.modalState$ = this.modalService.modalState$;
  }

  ngOnInit(): void {}
}
