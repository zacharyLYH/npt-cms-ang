import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { RequiredComponent } from './editor/required/required.component';
import { BioComponent } from './editor/bio/bio.component';
import { StatsComponent } from './editor/stats/stats.component';
import { ExperienceComponent } from './editor/experience/experience.component';
import { ProjectComponent } from './editor/project/project.component';
import { CommendationComponent } from './editor/commendation/commendation.component';

@NgModule({
  declarations: [AppComponent, EditorComponent, HomeComponent, RequiredComponent, BioComponent, StatsComponent, ExperienceComponent, ProjectComponent, CommendationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
