import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SandboxModel } from "../../models/sandbox-model";
import { DynamicCrudPanelClientBase } from "../../models/dynamic-crud-panel-client-base";

@Injectable({
    providedIn: 'root',
})
export class SandboxClientService implements DynamicCrudPanelClientBase<SandboxModel> {
    private baseUrl: string = environment.budgetSandboxApiUrl + '/sandbox';

    constructor(
        private http: HttpClient
    ) {}

    public getAll(): Observable<SandboxModel[]> {
        return this.http.get<SandboxModel[]>(this.baseUrl);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public get(sandboxId: number): Observable<SandboxModel> {
        throw new Error("Method not implemented.");
    }

    public save(sandbox: SandboxModel): Observable<void> {
        return this.http.post<void>(this.baseUrl, sandbox);
    }

    public delete(sandboxId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${sandboxId}`);
    }
}