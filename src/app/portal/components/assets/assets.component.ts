import { Component } from '@angular/core';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { Store } from '@ngrx/store';
import { loadAssets } from '../../store/actions/assets.actions';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent {

  constructor(
    public panelConfigurationService: PanelConfigurationService,
    private store: Store
  ) { }

  public assetChanged(): void {
    this.store.dispatch(loadAssets());
  }
}
