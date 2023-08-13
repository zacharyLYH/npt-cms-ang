import { Component, OnInit } from '@angular/core';
import { FormActionsService } from '../form-actions.service';
import { ContentStorageService } from 'src/app/content-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private contentStorage: ContentStorageService,
    public formActions: FormActionsService
  ) {}

  ngOnInit(): void {
    for (const data of [this.contentStorage.footerData!]) {
      let formGroup: FormGroup = this._formBuilder.group({});
      formGroup = this._formBuilder.group({
        author: [data.author, Validators.required],
        links: this._formBuilder.array(
          (data.links || []).map((link: string) =>
            this._formBuilder.control(link, [
              Validators.pattern(this.formActions.urlPattern),
            ])
          )
        ),
        type: 'Footer',
      });
      this.formActions.footerForm.push(formGroup);
    }
  }
}
