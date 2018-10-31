import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyplaybookComponent } from './myplaybook.component';
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
    path: '', component: MyplaybookComponent,
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
        path: 'appetite',
        component: AppetiteComponent
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
      }
    ]

  }
];

export const declareComponents = [
  MyplaybookComponent, MoodComponent, PlayBookSleepComponent, StressComponent,
  EnergyComponent, PerformanceComponent, AppetiteComponent, FocusComponent, BodyComponent,
  InterestComponent, InjuryComponent
]