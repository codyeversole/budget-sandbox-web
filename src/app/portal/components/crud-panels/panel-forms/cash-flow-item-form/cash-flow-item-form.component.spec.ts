import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashFlowItemFormComponent } from './cash-flow-item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { IMaskModule } from 'angular-imask';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { MathService } from 'src/app/shared/services/math.service';

describe('CashFlowItemFormComponent', () => {
  let component: CashFlowItemFormComponent;
  let fixture: ComponentFixture<CashFlowItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, IMaskModule ],
      declarations: [ CashFlowItemFormComponent ],
      providers: [
        SandboxService,
        MathService,
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowItemFormComponent);
    component = fixture.componentInstance;
    component.item = undefined;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
