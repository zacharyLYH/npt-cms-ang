import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css'],
})
export class RequiredComponent {
  @Input() form?: FormGroup<any>;
  @Input() prop?: string;
}
