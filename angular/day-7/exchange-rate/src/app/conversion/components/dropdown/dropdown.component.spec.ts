import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAccounts } from 'src/app/conversion/models/accounts.model';

describe('DropdownComponent', () => {
  let component: DropdownComponent<IAccounts>;
  let fixture: ComponentFixture<DropdownComponent<IAccounts>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [DropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent<IAccounts>);
    component = fixture.componentInstance;

    component.items = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
