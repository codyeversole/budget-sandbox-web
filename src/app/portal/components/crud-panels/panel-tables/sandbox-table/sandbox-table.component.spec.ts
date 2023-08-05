import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxTableComponent } from './sandbox-table.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MathService } from 'src/app/shared/services/math.service';

describe('SandboxTableComponent', () => {
  let component: SandboxTableComponent;
  let fixture: ComponentFixture<SandboxTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxTableComponent ],
      providers: [ MathService, provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandboxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
