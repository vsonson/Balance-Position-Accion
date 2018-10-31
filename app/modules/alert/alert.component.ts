import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../../common/services/services-index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    providers: [AlertService]
})

export class AlertComponent implements OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { 
        // subscribe to alert messages
        this.subscription = alertService.getMessage().subscribe(message => { this.message = message; 
             console.log("I am in component.....");
            setTimeout(function() {
               this.message = false;
            
            }.bind(this), 10000);

        });
    }

    
    closeMessageBox() {
        this.message = false;
    }

        ngOnDestroy(): void {
            // unsubscribe on destroy to prevent memory leaks
            this.subscription.unsubscribe();
        }
    }