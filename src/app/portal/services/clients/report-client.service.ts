import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ReportCashFlowModel } from "../../models/report-cash-flow-model";
import { SandboxService } from "../sandbox.service";

@Injectable({
    providedIn: 'root',
})
export class ReportClientService {
    private baseUrl: string = environment.budgetSandboxApiUrl + '/report';

    constructor(
        private http: HttpClient,
        private sandboxService: SandboxService
    ) {}

    public get(): Observable<ReportCashFlowModel> {
        return this.http.get<ReportCashFlowModel>(`${this.baseUrl}/${this.sandboxService.currentSandbox?.sandboxId}`);
    }
}