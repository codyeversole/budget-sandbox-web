import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicCrudPanelComponent } from './dynamic-crud-panel.component';
import { ToastrModule } from 'ngx-toastr';
import { PanelFormBaseComponent } from '../panel-form-base.component';
import { PanelTableBaseComponent } from '../panel-table-base.component';
import { DynamicCrudPanelConfiguration } from 'src/app/portal/models/dynamic-crud-panel-configuration';
import { Observable, of } from 'rxjs';

class TestObj {}

describe('DynamicCrudPanelComponent', () => {
  let component: DynamicCrudPanelComponent<TestObj>;
  let fixture: ComponentFixture<DynamicCrudPanelComponent<TestObj>>;
  const configurationMock: DynamicCrudPanelConfiguration<TestObj> = {
    pascalCaseItemName: 'Item',
    pascalCaseItemPluralName: 'Items',
    icon: 'fa-chart-pie',
    dynamicCrudPanelClient: { save: (): Observable<void> => of(undefined), delete: (): Observable<void> => of(undefined)},
    formComponent: PanelFormBaseComponent,
    tableComponent: PanelTableBaseComponent,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ToastrModule.forRoot() ],
      declarations: [ DynamicCrudPanelComponent<TestObj> ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicCrudPanelComponent<TestObj>);
    component = fixture.componentInstance;
    component.configuration = configurationMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
