import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-singlecategory',
  templateUrl: './singlecategory.component.html',
  styleUrls: ['./singlecategory.component.css'],
})
export class SinglecategoryComponent {
  lettersRow1: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  lettersRow2: string[] = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
  lettersRow3: string[] = ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  word: string[] = ['S', '', 'O', 'R', 'T', ''];

  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.showModal();
  }
}
