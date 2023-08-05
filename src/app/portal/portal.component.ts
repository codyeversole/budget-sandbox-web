import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { SandboxService } from './services/sandbox.service';
import { Store } from '@ngrx/store';
import { loadSandboxes } from './store/actions/sandboxes.actions';
import { selectSandboxes } from './store/selectors/sandboxes.selector';
import { SandboxModel } from './models/sandbox-model';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {
  private sandboxes$: Observable<SandboxModel[]> = this.store.select(selectSandboxes);
  private destroy$ = new ReplaySubject<boolean>();

  constructor(
    private sandboxService: SandboxService,
    private store: Store
  ) { }

  ngOnInit() {
    this.sandboxes$.pipe(takeUntil(this.destroy$)).subscribe(sandboxes => {
      this.sandboxService.setCurrentSandbox(sandboxes);
    });

    this.store.dispatch(loadSandboxes());    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
