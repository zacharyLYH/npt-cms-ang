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
  footerForm: FormGroup[] = [];

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
          transcript: [''],
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
          orgName: [''],
          dateStartEnd: [''],
          skills: this._formBuilder.array([]),
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
          name: ['', Validators.required],
          current: [false],
          featured: [false],
          summary: ['', Validators.required],
          story: ['', Validators.required],
          dateStartEnd: [''],
          skills: this._formBuilder.array([]),
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
    } else if (stepForms === this.footerForm) {
      stepForms.push(
        this._formBuilder.group({
          author: ['', Validators.required],
          links: this._formBuilder.array(
            [],
            Validators.pattern(this.urlPattern)
          ),
          type: 'Footer',
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

  invalidForms(): string[] {
    const allForms = [
      { name: ' Bio', forms: this.bioForm },
      { name: ' Stats', forms: this.statsForm },
      { name: ' Experience', forms: this.experienceForm },
      { name: ' Project', forms: this.projectForm },
      { name: ' Commendation', forms: this.commendationForm },
      { name: ' Footer', forms: this.footerForm },
    ];

    return allForms.reduce((invalidFormNames: string[], formGroup) => {
      const invalidFormsInGroup = formGroup.forms.filter((form) => !form.valid);
      if (invalidFormsInGroup.length > 0) {
        invalidFormNames.push(formGroup.name);
      }
      return invalidFormNames;
    }, []);
  }

  allFormsAreValid(): boolean {
    return this.invalidForms().length === 0;
  }

  submit(): void {
    const serializedArray = JSON.stringify([
      ...this.bioForm.map((formGroup) => formGroup.value),
      ...this.statsForm.map((formGroup) => formGroup.value),
      ...this.experienceForm.map((formGroup) => formGroup.value),
      ...this.projectForm.map((formGroup) => formGroup.value),
      ...this.commendationForm.map((formGroup) => formGroup.value),
      ...this.footerForm.map((formGroup) => formGroup.value),
    ]);
    const blob = new Blob([serializedArray], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Renderfile.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
