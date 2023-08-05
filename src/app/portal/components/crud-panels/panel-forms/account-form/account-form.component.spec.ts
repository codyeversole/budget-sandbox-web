import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormComponent } from './account-form.component';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { provideMockStore } from '@ngrx/store/testing';
import { MathService } from 'src/app/shared/services/math.service';
import { AccountModel } from 'src/app/portal/models/account-model';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;
  const accountModelMock: AccountModel = {
    sandboxId: 1,
    description: 'Checking Account',
    balance: 100,
    positive: true
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, IMaskModule ],
      declarations: [ AccountFormComponent ],
      providers: [
        SandboxService,
        MathService,
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    component.item = accountModelMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
