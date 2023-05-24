import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ValidatorsService } from '../services/validators.service';

export function existsPlaqueValidator(databaseService: ValidatorsService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
  
      return databaseService.checkIfPlaqueExists(value).pipe(
        map(exists => {
          if (exists) {
            return { recordExists: true };
          } else {
            return null;
          }
        }),
        catchError(() => of(null)) // Manejo de errores al hacer la verificación
      );
    };
}
