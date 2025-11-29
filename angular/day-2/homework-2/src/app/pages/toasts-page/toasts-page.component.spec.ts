import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsPageComponent } from './toasts-page.component';

describe('ToastsPageComponent', () => {
  let component: ToastsPageComponent;
  let fixture: ComponentFixture<ToastsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastsPageComponent]
    });
    fixture = TestBed.createComponent(ToastsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
