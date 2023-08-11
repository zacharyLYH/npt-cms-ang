import { Component } from '@angular/core';
import { FormActionsService } from './form-actions.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  constructor(public formActions: FormActionsService) {}
}
