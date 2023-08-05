import { Component } from '@angular/core';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { loadBuckets } from '../../store/actions/buckets.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent {

  constructor(
    public panelConfigurationService: PanelConfigurationService,
    private store: Store
  ) { }

  public bucketChanged(): void {
    this.store.dispatch(loadBuckets());
  }
}
