import { Type } from "@angular/core";
import { DynamicCrudPanelClientBase } from "./dynamic-crud-panel-client-base";
import { PanelFormBaseComponent } from "../components/crud-panels/panel-form-base.component";
import { PanelTableBaseComponent } from "../components/crud-panels/panel-table-base.component";

export interface DynamicCrudPanelConfiguration<T> {
    pascalCaseItemName: string,
    pascalCaseItemPluralName: string,
    icon: string,
    dynamicCrudPanelClient: DynamicCrudPanelClientBase<T>,
    formComponent: Type<PanelFormBaseComponent<T>>,
    tableComponent: Type<PanelTableBaseComponent<T>>,
}