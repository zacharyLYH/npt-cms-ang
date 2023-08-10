import { Injectable } from '@angular/core';
import { Bio } from 'src/interfaces/bio';
import { Commendation } from 'src/interfaces/commendation';
import { Experience } from 'src/interfaces/experience';
import { Footer } from 'src/interfaces/footer';
import { Projects } from 'src/interfaces/project';
import { Stats } from 'src/interfaces/stat';

@Injectable({
  providedIn: 'root',
})
export class ContentStorageService {
  bioData: Bio | null = null;
  commendationData: Commendation[] = [];
  experienceData: Experience[] = [];
  footerData: Footer | null = null;
  projectData: Projects[] = [];
  statsData: Stats[] = [];
  constructor() {}
}
