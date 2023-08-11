import { Component } from '@angular/core';
import { FormActionsService } from '../form-actions.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  constructor(public formActions: FormActionsService) {}
}
