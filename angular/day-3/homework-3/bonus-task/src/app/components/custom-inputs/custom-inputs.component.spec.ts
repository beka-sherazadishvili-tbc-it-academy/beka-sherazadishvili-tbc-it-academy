import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputsComponent } from './custom-inputs.component';

describe('CustomInputsComponent', () => {
  let component: CustomInputsComponent;
  let fixture: ComponentFixture<CustomInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputsComponent]
    });
    fixture = TestBed.createComponent(CustomInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
