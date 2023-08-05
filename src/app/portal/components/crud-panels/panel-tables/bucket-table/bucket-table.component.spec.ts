import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketTableComponent } from './bucket-table.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MathService } from 'src/app/shared/services/math.service';

describe('BucketTableComponent', () => {
  let component: BucketTableComponent;
  let fixture: ComponentFixture<BucketTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketTableComponent ],
      providers: [ MathService, provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
