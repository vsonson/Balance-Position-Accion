import { Routes } from '@angular/router';
// app
import { DatapointsComponent } from './datapoints/datapoints.component';
import { MoodComponent } from './mood/mood.component'
import { SleepComponent } from './sleep/sleep.component'
import { StressComponent } from './stress/stress.component'
import { PerformanceComponent } from './performance/performance.component'
import { EnergyComponent } from './energy/energy.component'
import { NutritionComponent } from './nutrition/nutrition.component'
import { FocusComponent } from './focus/focus.component'
import { InterestComponent } from './interest/interest.component'
import { InjuryComponent } from './injury/injury.component'
import { BodyComponent } from './body/body.component'
import { InfoComponent } from './info/info.component'
import { MoodtrackComponent } from './track/moodtrack/moodtrack.component'
import { MoodtrackViewComponent } from './track/moodtrack-view/moodtrack-view.component'
import { FocustrackViewComponent } from './track/focustrack-view/focustrack-view.component'
import { PerformancetrackViewComponent } from './track/performancetrack-view/performancetrack-view.component'

export const DatapointsRoutes: Routes = [
    {
        path: '',
        component: DatapointsComponent
    },
   
    {
      path: 'mood',
      component: MoodComponent
      },
      {
          path: 'sleep',
          component: SleepComponent
      },
      {
          path: 'stress',
          component: StressComponent
      },
      {
          path: 'performance',
          component: PerformanceComponent
      },

    {
        path: 'energy',
        component: EnergyComponent
    },
    {
        path: 'appetite',
        component: NutritionComponent
    },
    {
        path: 'focus',
        component: FocusComponent
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
        path: 'body',
        component: BodyComponent
    },
    {
        path: 'info',
        component: InfoComponent
    },
    {
        path: 'trackMood',
        component: MoodtrackComponent
    },
    {
        path: 'trackMoodView',
        component: MoodtrackViewComponent
    },
    {
        path: 'trackFocusView',
        component: FocustrackViewComponent
    },
    {
        path: 'trackPerformanceView',
        component: PerformancetrackViewComponent
    }
];
