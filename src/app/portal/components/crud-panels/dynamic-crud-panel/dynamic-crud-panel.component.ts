import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, take, takeUntil } from 'rxjs';
import { CrudPanelFormDirective } from 'src/app/portal/directives/crud-panel-form.directive';
import { CrudPanelTableDirective } from 'src/app/portal/directives/crud-panel-table.directive';
import { DynamicCrudPanelConfiguration } from 'src/app/portal/models/dynamic-crud-panel-configuration';

@Component({
  selector: 'app-dynamic-crud-panel',
  templateUrl: './dynamic-crud-panel.component.html',
  styleUrls: ['./dynamic-crud-panel.component.scss']
})
export class DynamicCrudPanelComponent<T> implements OnInit, OnDestroy {
  @ViewChild(CrudPanelFormDirective) panelFormHost: CrudPanelFormDirective | undefined;
  @ViewChild(CrudPanelTableDirective) panelTableHost: CrudPanelTableDirective | undefined;
  @Input() configuration!: DynamicCrudPanelConfiguration<T>;
  @Output() changed = new EventEmitter<void>();
  public showPanel = true;
  public showDelete = false;
  public editId: number | undefined;
  public form = new FormGroup({});
  public addingOrEditing = false;
  private destroy$ = new ReplaySubject<boolean>();

  constructor(
    private changeRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.open();
  }

  private loadTableComponent(){
    this.changeRef.detectChanges();

    const viewContainerRef = this.panelTableHost?.viewContainerRef;

    if(viewContainerRef) {
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(this.configuration.tableComponent);

      componentRef.instance.edited.pipe(take(1)).subscribe(result => this.edit(<T>result.item, result.id));
    }
  }

  private loadFormComponent(item?: T): void {
    this.changeRef.detectChanges();

    const viewContainerRef = this.panelFormHost?.viewContainerRef;

    if(viewContainerRef) {
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(this.configuration.formComponent);
      componentRef.instance.item = item;

      componentRef.instance.formChanged.pipe(takeUntil(this.destroy$)).subscribe(form => this.form = form);
      componentRef.instance.saved.pipe(take(1)).subscribe(() => this.save());
    }
  }

  public togglePanel() {
    if(this.showPanel) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    this.showPanel = true;

    this.loadTableComponent();
  }

  private close(): void {
    this.showPanel = false;
    this.showDelete = false;
    this.editId = undefined;
  
    this.form = new FormGroup({});
  
    this.addingOrEditing = false;
  }

  public cancel(): void {
    this.addingOrEditing = false;

    this.loadTableComponent();
  }

  public add(): void {
    this.addingOrEditing = true;
    this.editId = undefined;

    this.loadFormComponent();
  }

  public edit(item: T, id: number): void {
    this.addingOrEditing = true;
    this.editId = id;

    this.loadFormComponent(item);
  }

  public save(): void {
    if(this.form.valid){
      this.configuration.dynamicCrudPanelClient.save(<T>this.form.value).subscribe(() => {
        this.toastr.success(`Successfully saved ${this.configuration.pascalCaseItemName.toLocaleLowerCase ()}`, );
        this.changed.emit();
        this.addingOrEditing = false;
        this.loadTableComponent();
      });
    } else {
      this.toastr.warning('Must correct errors before saving')
      this.form.markAllAsTouched();
    }
  }

  public delete(sandboxId: number): void {
    this.showDelete = false;
    this.configuration.dynamicCrudPanelClient.delete(sandboxId).subscribe(() => {
        this.toastr.success(`Successfully deleted ${this.configuration.pascalCaseItemName.toLocaleLowerCase ()}`, );
        this.changed.emit();
        this.addingOrEditing = false;
        this.loadTableComponent();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
