import { Component } from '@angular/core';
import { FormActionsService } from '../form-actions.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})
export class BioComponent {
  constructor(public formActions: FormActionsService) {}
}
