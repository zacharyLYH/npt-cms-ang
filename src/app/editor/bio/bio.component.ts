import { Component, OnInit } from '@angular/core';
import { FormActionsService } from '../form-actions.service';
import { ContentStorageService } from 'src/app/content-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})
export class BioComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService,
    public formActions: FormActionsService
  ) {}

  ngOnInit(): void {
    for (const data of [this.contentStorage.bioData!]) {
      let formGroup: FormGroup = this._formBuilder.group({});
      formGroup = this._formBuilder.group({
        name: [data.name, Validators.required],
        hobbies: this._formBuilder.array(
          (data.hobbies || []).map((hobby: string) =>
            this._formBuilder.control(hobby, Validators.required)
          )
        ),
        socialLinks: this._formBuilder.array(
          (data.socialLinks || []).map((link: string) =>
            this._formBuilder.control(link, [
              Validators.required,
              Validators.pattern(this.formActions.urlPattern),
            ])
          )
        ),
        title: [data.title, Validators.required],
        tldr: [data.tldr, Validators.required],
        aboutMe: [data.aboutMe, Validators.required],
        image: [data.image, Validators.required],
        jobStatus: [data.jobStatus, Validators.required],
        resume: [data.docs?.resume, Validators.required],
        transcript: [data.docs?.transcript, Validators.required],
        type: 'Bio',
      });
      this.formActions.bioForm.push(formGroup);
    }
  }
}
