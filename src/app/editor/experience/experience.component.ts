import { Component, OnInit } from '@angular/core';
import { FormActionsService } from '../form-actions.service';
import { ContentStorageService } from 'src/app/content-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService,
    public formActions: FormActionsService
  ) {}
  ngOnInit(): void {
    for (const data of this.contentStorage.experienceData!) {
      let formGroup: FormGroup = this._formBuilder.group({});
      formGroup = this._formBuilder.group({
        title: [data.title, Validators.required],
        summary: [data.summary, Validators.required],
        story: [data.story, Validators.required],
        orgName: [data.orgName, Validators.required],
        dateStartEnd: [data.dateStartEnd, Validators.required],
        current: [data.current],
        skills: this._formBuilder.array(
          (data.skills || []).map((skill: string) =>
            this._formBuilder.control(skill, Validators.required)
          )
        ),
        links: this._formBuilder.array(
          (data.links || []).map((link: string) =>
            this._formBuilder.control(link, [
              Validators.required,
              Validators.pattern(this.formActions.urlPattern),
            ])
          )
        ),
        type: 'Experience',
      });
      this.formActions.experienceForm.push(formGroup);
    }
  }
}
