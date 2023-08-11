import { Component, OnInit } from '@angular/core';
import { FormActionsService } from '../form-actions.service';
import { ContentStorageService } from 'src/app/content-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService,
    public formActions: FormActionsService
  ) {}
  ngOnInit(): void {
    for (const data of this.contentStorage.statsData!) {
      let formGroup: FormGroup = this._formBuilder.group({});
      formGroup = this._formBuilder.group({
        title: [data.title, Validators.required],
        value: [data.value, Validators.required],
        description: [data.description, Validators.required],
        type: 'Stats',
      });
      this.formActions.statsForm.push(formGroup);
    }
  }
}
