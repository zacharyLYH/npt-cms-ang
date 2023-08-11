import { Component } from '@angular/core';
import { FormActionsService } from '../form-actions.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  constructor(public formActions: FormActionsService) {}
}
