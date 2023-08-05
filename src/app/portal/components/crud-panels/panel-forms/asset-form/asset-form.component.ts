import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetModel } from 'src/app/portal/models/asset-model';
import { MathService } from 'src/app/shared/services/math.service';
import { currencyFormMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { PanelFormBaseComponent } from '../../panel-form-base.component';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss']
})
export class AssetFormComponent extends PanelFormBaseComponent<AssetModel> implements OnInit, OnDestroy {
  @Input() override item: AssetModel | undefined;
  @Output() override formChanged = new EventEmitter<FormGroup>();
  @Output() override saved = new EventEmitter<void>();
  public currencyFormMaskOptions = currencyFormMaskOptions;
  private destroy$ = new ReplaySubject<boolean>();

  public form = new FormGroup({
    sandboxId: new FormControl<number>(0, Validators.required),
    assetId: new FormControl<number>(0, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
    amountValue: new FormControl<number | undefined>(undefined, Validators.required),
    amountValueFormatted: new FormControl<string>('')
  });
  
  constructor(private sandboxService: SandboxService, private mathService: MathService) { super() }

  ngOnInit(): void {
    this.form.controls.sandboxId.setValue(this.sandboxService.currentSandbox?.sandboxId ?? 0);

    if(this.item) {
      this.form.controls.assetId.setValue(this.item.assetId ?? 0);
      this.form.controls.description.setValue(this.item.description);
      this.form.controls.amountValue.setValue(this.item.amountValue);
      this.form.controls.amountValueFormatted.setValue(this.item.amountValue.toString());
    } else {
      this.form.controls.assetId.setValue(0);
      this.form.controls.description.setValue(undefined);
      this.form.controls.amountValue.setValue(undefined);
      this.form.controls.amountValueFormatted.setValue('');
    }

    this.form.controls.amountValue.setValue(this.mathService.preciseNumber(this.form.controls.amountValueFormatted.value), { emitEvent: false });
    this.formChanged.next(this.form);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.form.controls.amountValue.setValue(this.mathService.preciseNumber(this.form.controls.amountValueFormatted.value), { emitEvent: false });

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
