import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashFlowItemsComponent } from './cash-flow-items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ToastrModule } from 'ngx-toastr';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { DynamicCrudPanelComponent } from '../crud-panels/dynamic-crud-panel/dynamic-crud-panel.component';
import { ReportCashFlowComponent } from '../report-cash-flow/report-cash-flow.component';

describe('CashFlowItemsComponent', () => {
  let component: CashFlowItemsComponent;
  let fixture: ComponentFixture<CashFlowItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ CashFlowItemsComponent, DynamicCrudPanelComponent, ReportCashFlowComponent ],
      providers: [
        PanelConfigurationService, 
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
