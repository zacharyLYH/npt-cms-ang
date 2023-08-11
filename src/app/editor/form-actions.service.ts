import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormActionsService {
  bioForm: FormGroup[] = [];
  statsForm: FormGroup[] = [];
  experienceForm: FormGroup[] = [];
  projectForm: FormGroup[] = [];
  commendationForm: FormGroup[] = [];

  constructor(private _formBuilder: FormBuilder) {}

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
          current: [false],
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
    } else if (stepForms === this.projectForm) {
      stepForms.push(
        this._formBuilder.group({
          name: [''],
          current: [false],
          featured: [false],
          summary: ['', Validators.required],
          story: ['', Validators.required],
          dateStartEnd: [''],
          skills: this._formBuilder.array([], Validators.required),
          links: this._formBuilder.array(
            [],
            Validators.pattern(this.urlPattern)
          ),
          type: 'Project',
        })
      );
    } else if (stepForms === this.commendationForm) {
      stepForms.push(
        this._formBuilder.group({
          name: [''],
          compliment: ['', Validators.required],
          image: [''],
          credentials: ['', Validators.required],
          link: ['', Validators.pattern(this.urlPattern)],
          type: 'Commendation',
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
    return [
      ...this.bioForm,
      ...this.statsForm,
      ...this.experienceForm,
      ...this.projectForm,
    ].every((form) => form.valid);
  }

  submit(): void {
    console.log({
      bioForm: this.bioForm.map((form) => form.value),
      statsForm: this.statsForm.map((form) => form.value),
      experienceForm: this.experienceForm.map((form) => form.value),
      projectForm: this.projectForm.map((form) => form.value),
      commmendationForm: this.commendationForm.map((form) => form.value),
    });
  }
}
