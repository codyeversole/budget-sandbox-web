import { Component, EventEmitter, Output } from '@angular/core';
import { PanelTableBaseComponent } from 'src/app/portal/components/crud-panels/panel-table-base.component';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { SandboxModel } from 'src/app/portal/models/sandbox-model';
import { selectSandboxes } from 'src/app/portal/store/selectors/sandboxes.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sandbox-table',
  templateUrl: './sandbox-table.component.html',
  styleUrls: ['./sandbox-table.component.scss']
})
export class SandboxTableComponent extends PanelTableBaseComponent<SandboxModel> {
  @Output() override edited = new EventEmitter<{item: SandboxModel, id: number}>();
  public sandboxes$: Observable<SandboxModel[]> = this.store.select(selectSandboxes);

  constructor(public sandboxService: SandboxService, private store: Store) { super() }

  public emitEdit(sandbox: SandboxModel): void {
    this.edited.next({ item: sandbox, id: sandbox.sandboxId});
  }

  public setSelectedSandbox(sandbox: SandboxModel): void {
    this.sandboxService.setCurrentSandboxDirectly(sandbox);
  }

}
