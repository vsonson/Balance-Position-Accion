import { SharedService } from './shared.service';
import { AlertService } from './alert.service';

export const serviceContainer = [
    SharedService, 
    AlertService
]

export * from './shared.service'
export * from './alert.service'