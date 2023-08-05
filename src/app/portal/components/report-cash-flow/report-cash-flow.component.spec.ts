import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportCashFlowComponent } from './report-cash-flow.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ReportCashFlowComponent', () => {
  let component: ReportCashFlowComponent;
  let fixture: ComponentFixture<ReportCashFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCashFlowComponent ],
      providers: [ provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
