import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentStorageService } from '../content-storage.service';
import { FormActionsService } from './form-actions.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService,
    public formActions: FormActionsService
  ) {}

  ngOnInit(): void {
    this.initFormsFromData(
      [this.contentStorage.bioData],
      this.formActions.bioForm,
      'bio'
    );
    this.initFormsFromData(
      this.contentStorage.statsData,
      this.formActions.statsForm,
      'stats'
    );
    this.initFormsFromData(
      this.contentStorage.experienceData,
      this.formActions.experienceForm,
      'experience'
    );
  }

  initFormsFromData(
    initialData: any[],
    stepForms: FormGroup[],
    stepType: string
  ) {
    for (let data of initialData) {
      let formGroup: FormGroup = this._formBuilder.group({});
      switch (stepType) {
        case 'bio':
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
            resume: [data.docs.resume, Validators.required],
            transcript: [data.docs.transcript, Validators.required],
            type: 'Bio',
          });
          break;
        case 'stats':
          formGroup = this._formBuilder.group({
            title: [data.title, Validators.required],
            value: [data.value, Validators.required],
            description: [data.description, Validators.required],
            type: 'Stats',
          });
          break;
        case 'experience':
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
          break;
        default:
          throw new Error(`Unknown stepType: ${stepType}`);
      }
      stepForms.push(formGroup);
    }
  }
}
