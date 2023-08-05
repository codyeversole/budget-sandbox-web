import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { PanelFormBaseComponent } from 'src/app/portal/components/crud-panels/panel-form-base.component';
import { SandboxModel } from 'src/app/portal/models/sandbox-model';

@Component({
  selector: 'app-sandbox-form',
  templateUrl: './sandbox-form.component.html',
  styleUrls: ['./sandbox-form.component.scss']
})
export class SandboxFormComponent extends PanelFormBaseComponent<SandboxModel> implements OnInit, OnDestroy {
  @Input() override item: SandboxModel | undefined;
  @Output() override formChanged = new EventEmitter<FormGroup>();
  @Output() override saved = new EventEmitter<void>();
  private destroy$ = new ReplaySubject<boolean>();

  public form = new FormGroup({
    sandboxId: new FormControl<number>(0, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required)
  });
  
  constructor() { super() }

  ngOnInit(): void {
    if(this.item) {
      this.form.controls.sandboxId.setValue(this.item.sandboxId);
      this.form.controls.description.setValue(this.item.description);
    } else {
      this.form.controls.sandboxId.setValue(0);
      this.form.controls.description.setValue(undefined);
    }

    this.formChanged.next(this.form);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.formChanged.next(this.form);
    })
  }

  public emitSave(): void {
    this.saved.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
