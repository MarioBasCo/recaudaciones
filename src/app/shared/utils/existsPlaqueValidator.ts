import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ValidatorsService } from '../services/validators.service';

export function existsPlaqueValidator(databaseService: ValidatorsService, initialValue: string | null = null): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    // Si initialValue es null, es un nuevo registro, no se realiza la validación
    /* if (initialValue === null) {
      return of(null);
    }  */

    // Si el valor inicial y el valor actual son iguales, no se realiza la validación
    if (value === initialValue) {
      return of(null);
    }

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
