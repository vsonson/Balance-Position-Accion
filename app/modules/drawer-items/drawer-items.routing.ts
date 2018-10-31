import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawerItemComponent } from './drawer-items.component';
import { SettingComponent } from './setting/setting.component';
import { ReferComponent } from './refer/refer.component';
import { PremiumComponent } from './premium/premium.component';
import { ResourcesComponent } from './resources/resources.component';
import { FAQModalComponent } from './faq-modal/faq-modal.component';
import { ModalComponent } from './modal/modal.component';


export const routes: Routes = [
  {
    path: '', component: DrawerItemComponent,
    children: [
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: 'refer',
        component: ReferComponent
      },
      {
        path: 'premium',
        component: PremiumComponent
      },
    
      {
        path: 'popup',
        component: ModalComponent
      },
      {
        path: 'resources',
        component: ResourcesComponent
      },
      {
        path: 'faq',
        component: FAQModalComponent
      }

    ]

  }
];