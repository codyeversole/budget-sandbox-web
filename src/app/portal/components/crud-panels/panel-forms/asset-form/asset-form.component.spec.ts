import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetFormComponent } from './asset-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { IMaskModule } from 'angular-imask';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { MathService } from 'src/app/shared/services/math.service';

describe('AssetFormComponent', () => {
  let component: AssetFormComponent;
  let fixture: ComponentFixture<AssetFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, IMaskModule ],
      declarations: [ AssetFormComponent ],
      providers: [
        SandboxService,
        MathService,
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetFormComponent);
    component = fixture.componentInstance;
    component.item = undefined;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
