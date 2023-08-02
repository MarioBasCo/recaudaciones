import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ValidatorsService } from "../services/validators.service";
import { Observable, catchError, map, of } from "rxjs";

export function existsCedulaValidator(databaseService: ValidatorsService, initialValue: string | null = null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const value = control.value;
        
        if (value === initialValue) {
            return of(null);
        }

        return databaseService.checkIfCedulaExists(value).pipe(
            map(exists => {
                if (exists) {
                    return { cedulaExists: true };
                } else {
                    return null;
                }
            }),
            catchError(() => of(null))
        );
    };
};