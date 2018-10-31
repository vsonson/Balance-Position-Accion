import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[email]',
    providers: [{provide: NG_VALIDATORS, useExisting: IsEmailDirective, multi: true}]
})
export class IsEmailDirective implements Validator {

    public constructor() {}

    public validate(control: AbstractControl): {[key: string]: any} {
        let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        let valid = emailRegEx.test(control.value);
        return control.value < 1 || valid ? null : {'email': true};
    }

}