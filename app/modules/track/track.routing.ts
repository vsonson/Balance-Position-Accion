import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackComponent } from './track.component';
import { MoodComponent } from './mood/mood.component';
import { PlayBookSleepComponent } from './sleep/sleep.component';
import { BodyComponent } from './body/body.component';
import { EnergyComponent } from './energy/energy.component';
import { FocusComponent } from './focus/focus.component';
import { InjuryComponent } from './injury/injury.component';
import { InterestComponent } from './interest/interest.component';
import { PerformanceComponent } from './performance/performance.component';
import { StressComponent } from './stress/stress.component';
import { AppetiteComponent } from './appetite/appetite.component';
 

export const routes: Routes = [
  { 
  	path: '', component: TrackComponent,
  	children: [
  		{
  			path: 'mood',
  			component: MoodComponent
  		},
      {
        path: 'sleep',
        component: PlayBookSleepComponent
      },
      {
        path: 'stress',
        component: StressComponent
      },
      {
        path: 'energy',
        component: EnergyComponent
      },
      {
        path: 'performance',
        component: PerformanceComponent
      },
      {
        path: 'focus',
        component: FocusComponent
      },
      {
        path: 'body',
        component: BodyComponent
      },
      {
        path: 'interest',
        component: InterestComponent
      },
      {
        path: 'injury',
        component: InjuryComponent
      },
      {
        path: 'appetite',
        component: AppetiteComponent
      }
  	]

  }
];

export const declareComponents = [
                                    TrackComponent, MoodComponent, PlayBookSleepComponent, StressComponent,
                                    EnergyComponent, PerformanceComponent, FocusComponent, BodyComponent,
                                    InterestComponent, InjuryComponent, AppetiteComponent
                                 ]