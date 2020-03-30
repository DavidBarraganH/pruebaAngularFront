import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FieldValidator {

    static noOnlyEmpty(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).trim().length <= 0){
            return {noOnlyEmpty: true}
        }
        return null;

    }

    static isNumericValidation(control: AbstractControl) : ValidationErrors | null {
      
        if(!(control.value === parseInt(control.value, 10))){
            return {isNumericValidation: true}
        }
        return null;
    }


}