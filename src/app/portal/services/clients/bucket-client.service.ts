import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BucketModel } from "../../models/bucket-model";
import { DynamicCrudPanelClientBase } from "../../models/dynamic-crud-panel-client-base";
import { SandboxService } from "../sandbox.service";

@Injectable({
    providedIn: 'root',
})
export class BucketClientService implements DynamicCrudPanelClientBase<BucketModel> {
    private baseUrl: string = environment.budgetSandboxApiUrl + '/bucket';

    constructor(
        private http: HttpClient,
        private sandboxService: SandboxService
    ) {}

    public getAll(): Observable<BucketModel[]> {
        return this.http.get<BucketModel[]>(`${this.baseUrl}/all/${this.sandboxService.currentSandbox?.sandboxId}`);
    }

    public get(bucketId: number): Observable<BucketModel> {
        return this.http.get<BucketModel>(`${this.baseUrl}/${bucketId}`);
    }

    public save(bucket: BucketModel): Observable<void> {
        return this.http.post<void>(this.baseUrl, bucket);
    }

    public delete(bucketId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${bucketId}`);
    }
}