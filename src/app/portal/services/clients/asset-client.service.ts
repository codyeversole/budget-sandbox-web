import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AssetModel } from "../../models/asset-model";
import { DynamicCrudPanelClientBase } from "../../models/dynamic-crud-panel-client-base";
import { SandboxService } from "../sandbox.service";

@Injectable({
    providedIn: 'root',
})
export class AssetClientService implements DynamicCrudPanelClientBase<AssetModel> {
    private baseUrl: string = environment.budgetSandboxApiUrl + '/asset';

    constructor(
        private http: HttpClient,
        private sandboxService: SandboxService
    ) {}

    public getAll(): Observable<AssetModel[]> {
        return this.http.get<AssetModel[]>(`${this.baseUrl}/all/${this.sandboxService.currentSandbox?.sandboxId}`);
    }

    public get(assetId: number): Observable<AssetModel> {
        return this.http.get<AssetModel>(`${this.baseUrl}/${assetId}`);
    }

    public save(asset: AssetModel): Observable<void> {
        return this.http.post<void>(this.baseUrl, asset);
    }

    public delete(assetId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${assetId}`);
    }
}