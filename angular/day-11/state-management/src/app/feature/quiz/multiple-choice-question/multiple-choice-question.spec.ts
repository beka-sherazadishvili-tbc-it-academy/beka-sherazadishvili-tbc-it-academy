import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoiceQuestion } from './multiple-choice-question';

describe('MultipleChoiceQuestion Component', () => {
  let component: MultipleChoiceQuestion;
  let fixture: ComponentFixture<MultipleChoiceQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoiceQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add option when toggling unselected option', () => {
    const emitSpy = vi.spyOn(component.answer, 'emit');

    component.toggle(1);

    expect(emitSpy).toHaveBeenCalledWith([1]);
  });

  it('should allow multiple selections', () => {
    const emitSpy = vi.spyOn(component.answer, 'emit');

    component.toggle(1);
    component.toggle(2);

    expect(emitSpy).toHaveBeenCalledTimes(2);
  });
});
