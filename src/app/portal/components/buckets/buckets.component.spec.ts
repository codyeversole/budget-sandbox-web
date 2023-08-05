import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketsComponent } from './buckets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ToastrModule } from 'ngx-toastr';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { DynamicCrudPanelComponent } from '../crud-panels/dynamic-crud-panel/dynamic-crud-panel.component';

describe('BucketsComponent', () => {
  let component: BucketsComponent;
  let fixture: ComponentFixture<BucketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ BucketsComponent, DynamicCrudPanelComponent ],
      providers: [
        PanelConfigurationService, 
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
