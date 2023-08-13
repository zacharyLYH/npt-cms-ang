import { Component, OnInit } from '@angular/core';
import { FormActionsService } from '../form-actions.service';
import { ContentStorageService } from 'src/app/content-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commendation',
  templateUrl: './commendation.component.html',
  styleUrls: ['./commendation.component.css'],
})
export class CommendationComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService,
    public formActions: FormActionsService
  ) {}

  ngOnInit(): void {
    for (const data of this.contentStorage.commendationData!) {
      let formGroup: FormGroup = this._formBuilder.group({});
      formGroup = this._formBuilder.group({
        name: [data.name],
        compliment: [data.compliment, Validators.required],
        image: [data.image],
        credentials: [data.credentials, Validators.required],
        link: [data.link],
        type: 'Commendation',
      });
      this.formActions.commendationForm.push(formGroup);
    }
  }
}
