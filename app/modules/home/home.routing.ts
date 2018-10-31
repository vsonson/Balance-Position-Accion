import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkComponent } from './network/network.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { PracticeComponent } from './practice/practice.component';
import { FoundationPrograms } from './foundationPrograms/foundationPrograms.component';
import { HomeComponent } from './home.component';
import { NoteBookComponent } from './notebook/notebook.component';
import { FoundationAudio } from './foundationAudio/foundationAudio.component';
import { FoundationVideo } from './foundationVideo/foundationVideo.component';

export const routes: Routes = [
  { 
  	path: '', component: HomeComponent,
  	children: [
  		{
  			path: 'dashboard',
  			component: DashBoardComponent
      },
      {
        path: 'network',
        component: NetworkComponent
    },
      {
        path: 'practice',
        component: PracticeComponent
      },
     
      {
        path: 'foundation',
        component: FoundationPrograms
      },

      {
        path: 'notebook',
        component: NoteBookComponent
      },
      {
        path: 'audio',
        component: FoundationAudio
      },
      {
        path: 'video',
        component: FoundationVideo
      }
	]
  }
  ];