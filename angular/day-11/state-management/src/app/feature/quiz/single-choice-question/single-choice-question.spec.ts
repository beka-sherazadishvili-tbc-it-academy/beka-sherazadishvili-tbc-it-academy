import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleChoiceQuestion } from './single-choice-question';

describe('SingleChoiceQuestion Component', () => {
  let component: SingleChoiceQuestion;
  let fixture: ComponentFixture<SingleChoiceQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleChoiceQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleChoiceQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit answer with selected option id', () => {
    const emitSpy = vi.spyOn(component.answer, 'emit');

    component.select(1);

    expect(emitSpy).toHaveBeenCalledWith([1]);
  });

  it('should emit only one option for single choice', () => {
    const emitSpy = vi.spyOn(component.answer, 'emit');

    component.select(2);

    expect(emitSpy).toHaveBeenCalledWith([2]);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
