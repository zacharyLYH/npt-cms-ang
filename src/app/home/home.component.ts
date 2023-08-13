import { Component } from '@angular/core';
import { DecoderService } from '../decoder.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  fileName = '';

  constructor(
    private decoderService: DecoderService,
    private router: Router,
    private http: HttpClient
  ) {}

  useTemplate() {
    this.http.get<any[]>('/assets/template.json').subscribe({
      next: (data) => {
        this.decoderService.populate(data);
        this.router.navigate(['/edit']);
      },
      error: (error) => {
        console.error('Failed to load JSON file', error);
      },
    });
  }

  cancelUpload() {
    document.querySelector('.progress')?.classList.remove('active');
    this.fileName = '';
  }

  onFileSelected(event: Event) {
    document.querySelector('.progress')?.classList.add('active');
    const input = event.target as HTMLInputElement;
    if (!input || !input.files || input.files.length === 0) {
      console.error('No file selected');
      return;
    }
    const file = input.files[0];
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result;
      if (typeof fileContent !== 'string') {
        console.error('Unexpected file content format');
        return;
      }
      this.decoderService.decodeAndPopulate(fileContent);
      this.router.navigate(['/edit']);
    };
    reader.onerror = (error) => {
      console.error('Failed to read file:', error);
    };
    reader.readAsText(file);
  }
}
