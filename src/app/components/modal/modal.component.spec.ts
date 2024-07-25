import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from './modal.component';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: jest.Mocked<ModalService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const modalServiceMock = {
      modalState$: of('win'), 
      hideModal: jest.fn(),
    } as unknown as jest.Mocked<ModalService>;

    const routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService) as jest.Mocked<ModalService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    fixture.detectChanges();
  });

  it('should navigate to home on continue action when modalType is paused', () => {
    component.modalType = 'paused';
    component.handleModalAction('continue');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should navigate to category on playAgain action when modalType is win', () => {
    component.modalType = 'win';
    component.handleModalAction('playAgain');
    expect(router.navigate).toHaveBeenCalledWith(['/category']);
  });

  it('should navigate to category on newCategory action', () => {
    component.handleModalAction('newCategory');
    expect(router.navigate).toHaveBeenCalledWith(['/category']);
  });

  it('should navigate to home on quit action', () => {
    component.handleModalAction('quit');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should call hideModal after handling action', () => {
    component.handleModalAction('quit');
    expect(modalService.hideModal).toHaveBeenCalled();
  });
  
});
