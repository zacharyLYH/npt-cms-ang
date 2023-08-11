import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContentStorageService } from '../content-storage.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  isLinear = false;
  bioForm: FormGroup[] = [];
  statsForm: FormGroup[] = [];
  experienceForm: FormGroup[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService
  ) {}

  ngOnInit(): void {
    this.initFormsFromData([this.contentStorage.bioData], this.bioForm, 'bio');
    this.initFormsFromData(
      this.contentStorage.statsData,
      this.statsForm,
      'stats'
    );
    this.initFormsFromData(
      this.contentStorage.experienceData,
      this.experienceForm,
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
                  Validators.pattern(this.urlPattern),
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
                  Validators.pattern(this.urlPattern),
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
  urlPattern = '^(https?://.+)|(.+@gmail\\.com)$';
  addForm(stepForms: FormGroup[]): void {
    if (stepForms === this.bioForm) {
      stepForms.push(
        this._formBuilder.group({
          name: ['', Validators.required],
          title: ['', Validators.required],
          tldr: ['', Validators.required],
          aboutMe: ['', Validators.required],
          image: ['', Validators.required],
          resume: ['', Validators.required],
          transcript: ['', Validators.required],
          jobStatus: ['', Validators.required],
          hobbies: this._formBuilder.array([], Validators.required),
          socialLinks: this._formBuilder.array(
            [],
            Validators.pattern(this.urlPattern)
          ),
          type: 'Bio',
        })
      );
    } else if (stepForms === this.statsForm) {
      stepForms.push(
        this._formBuilder.group({
          value: ['', Validators.required],
          title: ['', Validators.required],
          description: ['', Validators.required],
          type: 'Stats',
        })
      );
    } else if (stepForms === this.experienceForm) {
      stepForms.push(
        this._formBuilder.group({
          isMember: [false],
          summary: ['', Validators.required],
          title: ['', Validators.required],
          story: ['', Validators.required],
          orgName: ['', Validators.required],
          dateStartEnd: [''],
          skills: this._formBuilder.array([], Validators.required),
          links: this._formBuilder.array(
            [],
            Validators.pattern(this.urlPattern)
          ),
          type: 'Experience',
        })
      );
    }
  }

  deleteForm(stepForms: FormGroup[], index: number): void {
    stepForms.splice(index, 1);
  }

  getFormArray(form: FormGroup, arrayName: string): FormArray {
    return form.get(arrayName) as FormArray;
  }

  getFormControl(
    form: FormGroup,
    arrayName: string,
    index: number
  ): FormControl {
    return this.getFormArray(form, arrayName).at(index) as FormControl;
  }

  addSubField(form: FormGroup, arrayName: string): void {
    if (arrayName === 'socialLinks' || arrayName === 'links') {
      this.getFormArray(form, arrayName).push(
        this._formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.urlPattern),
        ])
      );
    } else {
      this.getFormArray(form, arrayName).push(
        this._formBuilder.control('', Validators.required)
      );
    }
  }

  removeSubField(form: FormGroup, arrayName: string, index: number): void {
    this.getFormArray(form, arrayName).removeAt(index);
  }

  allFormsAreValid(): boolean {
    return [...this.bioForm, ...this.statsForm, ...this.experienceForm].every(
      (form) => form.valid
    );
  }

  submit(): void {
    console.log({
      bioForm: this.bioForm.map((form) => form.value),
      statsForm: this.statsForm.map((form) => form.value),
      experienceForm: this.experienceForm.map((form) => form.value),
    });
  }
}
