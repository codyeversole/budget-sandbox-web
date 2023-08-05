import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CashFlowItemModel } from "../../models/cash-flow-item-model";
import { DynamicCrudPanelClientBase } from "../../models/dynamic-crud-panel-client-base";
import { SandboxService } from "../sandbox.service";

@Injectable({
    providedIn: 'root',
})
export class CashFlowItemClientService implements DynamicCrudPanelClientBase<CashFlowItemModel> {
    private baseUrl: string = environment.budgetSandboxApiUrl + '/cashflowitem';

    constructor(
        private http: HttpClient,
        private sandboxService: SandboxService
    ) {}

    public getAll(): Observable<CashFlowItemModel[]> {
        return this.http.get<CashFlowItemModel[]>(`${this.baseUrl}/all/${this.sandboxService.currentSandbox?.sandboxId}`);
    }

    public get(cashFlowItemId: number): Observable<CashFlowItemModel> {
        return this.http.get<CashFlowItemModel>(`${this.baseUrl}/${cashFlowItemId}`);
    }

    public save(cashFlowItem: CashFlowItemModel): Observable<void> {
        return this.http.post<void>(this.baseUrl, cashFlowItem);
    }

    public delete(cashFlowItemId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${cashFlowItemId}`);
    }
}