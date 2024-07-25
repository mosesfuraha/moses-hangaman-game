import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoseComponent } from './lose.component';
import { ModalService } from '../../services/modal.service';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoseComponent', () => {
  let component: LoseComponent;
  let fixture: ComponentFixture<LoseComponent>;
  let modalServiceStub: Partial<ModalService>;
  let modalStateSubject: Subject<string | null>;

  beforeEach(async () => {
    modalStateSubject = new Subject<string | null>();

    modalServiceStub = {
      modalState$: modalStateSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoseComponent],
      providers: [{ provide: ModalService, useValue: modalServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the modal when modalState$ is "lose"', () => {
    modalStateSubject.next('lose');
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modalElement).toBeTruthy();
  });

  it('should not display the modal when modalState$ is not "lose"', () => {
    modalStateSubject.next('win');
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modalElement).toBeFalsy();
  });
});
