import { Component, OnInit } from '@angular/core';
import { FormActionsService } from '../form-actions.service';
import { ContentStorageService } from 'src/app/content-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService,
    public formActions: FormActionsService
  ) {}
  ngOnInit(): void {
    for (const data of this.contentStorage.projectData!) {
      let formGroup: FormGroup = this._formBuilder.group({});
      formGroup = this._formBuilder.group({
        name: [data.name, Validators.required],
        summary: [data.summary, Validators.required],
        story: [data.story, Validators.required],
        dateStartToEnd: [data.dateStartToEnd],
        current: [data.current, Validators.required],
        featured: [data.featured, Validators.required],
        skills: this._formBuilder.array(
          (data.skills || []).map((skill: string) =>
            this._formBuilder.control(skill)
          )
        ),
        links: this._formBuilder.array(
          (data.links || []).map((link: string) =>
            this._formBuilder.control(link, [
              Validators.pattern(this.formActions.urlPattern),
            ])
          )
        ),
        type: 'Project',
      });
      this.formActions.projectForm.push(formGroup);
    }
  }
}
