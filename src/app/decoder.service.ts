import { Injectable } from '@angular/core';
import { ContentStorageService } from './content-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  constructor(private contentStorage: ContentStorageService) {}
  decodeAndPopulate(content: string) {
    try {
      const data = JSON.parse(content);
      this.populate(data);
    } catch (error) {
      alert('Failed to process this JSON with error: ' + error);
    }
  }
  populate(data: any[]) {
    data.forEach((item: any) => {
      if (item.type) {
        if (item.type === 'Bio') {
          this.contentStorage.bioData = item;
        }
        if (item.type === 'Commendation') {
          this.contentStorage.commendationData.push(item);
        }
        if (item.type === 'Experience') {
          this.contentStorage.experienceData.push(item);
        }
        if (item.type === 'Footer') {
          this.contentStorage.footerData = item;
        }
        if (item.type === 'Project') {
          this.contentStorage.projectData.push(item);
        }
        if (item.type === 'Stats') {
          this.contentStorage.statsData.push(item);
        }
      }
    });
  }
}
