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
      data.forEach((item: any) => {
        if (item.type) {
          if (item.type === 'Bio') {
            this.contentStorage.bioData = item;
          }
        }
      });
    } catch (error) {
      alert('Failed to process this JSON with error: ' + error);
    }
  }
}
