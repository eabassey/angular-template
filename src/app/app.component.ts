import { Component } from '@angular/core';
import { WorkflowLayoutComponent } from '4sure-default-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  layoutComponent = WorkflowLayoutComponent;
}
