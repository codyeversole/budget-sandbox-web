import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportCashFlowComponent } from '../report-cash-flow/report-cash-flow.component';
import { DynamicCrudPanelComponent } from '../crud-panels/dynamic-crud-panel/dynamic-crud-panel.component';
import { ToastrModule } from 'ngx-toastr';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ DashboardComponent, ReportCashFlowComponent, DynamicCrudPanelComponent ],
      providers: [ 
        PanelConfigurationService, 
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
