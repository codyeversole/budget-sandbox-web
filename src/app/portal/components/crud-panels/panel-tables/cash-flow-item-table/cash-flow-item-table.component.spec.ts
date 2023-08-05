import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashFlowItemTableComponent } from './cash-flow-item-table.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MathService } from 'src/app/shared/services/math.service';

describe('CashFlowItemTableComponent', () => {
  let component: CashFlowItemTableComponent;
  let fixture: ComponentFixture<CashFlowItemTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CashFlowItemTableComponent ],
      providers: [ MathService, provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
