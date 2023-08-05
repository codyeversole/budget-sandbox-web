/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketFormComponent } from './bucket-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { IMaskModule } from 'angular-imask';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { MathService } from 'src/app/shared/services/math.service';

describe('BucketFormComponent', () => {
  let component: BucketFormComponent;
  let fixture: ComponentFixture<BucketFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, IMaskModule ],
      declarations: [ BucketFormComponent ],
      providers: [
        SandboxService,
        MathService,
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketFormComponent);
    component = fixture.componentInstance;
    component.item = undefined;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
