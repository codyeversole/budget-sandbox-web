import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountTableComponent } from './account-table.component';
import { MathService } from 'src/app/shared/services/math.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('AccountTableComponent', () => {
  let component: AccountTableComponent;
  let fixture: ComponentFixture<AccountTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTableComponent ],
      providers: [ MathService, provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
