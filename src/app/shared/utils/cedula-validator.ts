import { AbstractControl, ValidatorFn } from '@angular/forms'

export function cedulaValidation(): ValidatorFn {
    return(control: AbstractControl): { [key: string]: boolean } | null => {
        const auxCedula: string = control.value;

        if(!auxCedula) {
            return { ecuadorianValid: true };
        }

        if (auxCedula.length !== 10) {
            return { ecuadorianValid: true };
        }

        const primeros2 = +auxCedula.slice(0, 2);

        if (primeros2 < 1 || primeros2 > 24) {
            return { ecuadorianValid: true };
        }

        const digitoVerificador = +(auxCedula.split('').slice(-1));

        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];

        const sumaT = auxCedula.slice(0, 9).split('').reduce((p, c, i) => {
            let aux = 0;

            const mult = (+c) * coeficientes[i];

            aux = mult > 9 ? mult - 9 : mult;

            return p + aux;
        }, 0);

        const residuo = sumaT % 10;

        const resp = ( (residuo === 0) ? (digitoVerificador === 0) : ((10 - residuo) === digitoVerificador) );
        
        if (resp == true) {
            return null;
        } else {
            return { ecuadorianValid: true };
        }
    
    }
}