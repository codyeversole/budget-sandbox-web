import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetTableComponent } from './asset-table.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MathService } from 'src/app/shared/services/math.service';

describe('AssetTableComponent', () => {
  let component: AssetTableComponent;
  let fixture: ComponentFixture<AssetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTableComponent ],
      providers: [ MathService, provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
