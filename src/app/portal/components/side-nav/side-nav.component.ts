import { Component } from '@angular/core';
import { SandboxService } from '../../services/sandbox.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  constructor(public sandboxService: SandboxService) {}
}
