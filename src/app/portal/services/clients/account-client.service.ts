import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccountModel } from "../../models/account-model";
import { DynamicCrudPanelClientBase } from "../../models/dynamic-crud-panel-client-base";
import { SandboxService } from "../sandbox.service";

@Injectable({
    providedIn: 'root',
})
export class AccountClientService implements DynamicCrudPanelClientBase<AccountModel> {
    private baseUrl: string = environment.budgetSandboxApiUrl + '/account';

    constructor(
        private http: HttpClient,
        private sandboxService: SandboxService
    ) {}

    public getAll(): Observable<AccountModel[]> {
        return this.http.get<AccountModel[]>(`${this.baseUrl}/all/${this.sandboxService.currentSandbox?.sandboxId}`);
    }

    public get(accountId: number): Observable<AccountModel> {
        return this.http.get<AccountModel>(`${this.baseUrl}/${accountId}`);
    }

    public save(account: AccountModel): Observable<void> {
        return this.http.post<void>(this.baseUrl, account);
    }

    public delete(accountId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${accountId}`);
    }
}