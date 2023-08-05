import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsComponent } from './accounts.component';
import { provideMockStore } from '@ngrx/store/testing';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DynamicCrudPanelComponent } from '../crud-panels/dynamic-crud-panel/dynamic-crud-panel.component';
import { ToastrModule } from 'ngx-toastr';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ AccountsComponent, DynamicCrudPanelComponent ],
      providers: [
        PanelConfigurationService, 
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
