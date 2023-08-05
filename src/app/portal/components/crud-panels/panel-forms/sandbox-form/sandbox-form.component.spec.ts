import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxFormComponent } from './sandbox-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { IMaskModule } from 'angular-imask';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { MathService } from 'src/app/shared/services/math.service';

describe('SandboxFormComponent', () => {
  let component: SandboxFormComponent;
  let fixture: ComponentFixture<SandboxFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, IMaskModule ],
      declarations: [ SandboxFormComponent ],
      providers: [
        SandboxService,
        MathService,
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandboxFormComponent);
    component = fixture.componentInstance;
    component.item = undefined;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
