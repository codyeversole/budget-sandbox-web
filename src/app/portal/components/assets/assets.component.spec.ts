import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsComponent } from './assets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ToastrModule } from 'ngx-toastr';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { DynamicCrudPanelComponent } from '../crud-panels/dynamic-crud-panel/dynamic-crud-panel.component';

describe('AssetsComponent', () => {
  let component: AssetsComponent;
  let fixture: ComponentFixture<AssetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ AssetsComponent, DynamicCrudPanelComponent ],
      providers: [
        PanelConfigurationService, 
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
