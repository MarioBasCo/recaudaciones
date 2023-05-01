import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function rucValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const auxRuc: string = control.value;

        if (!auxRuc) return { ecuadorianValid: true };

        if (auxRuc.length !== 13) return { ecuadorianValid: true };

        const tresUltimosDigitos = auxRuc.slice(-3);

        if (!(new RegExp(/^[0-9][0-9][1-9]$/)).test(tresUltimosDigitos)) return { ecuadorianValid: true };

        const tercerDigito = auxRuc[2];

        // PERSONA NATURAL
        if (new RegExp(/^[0-5]$/).test(tercerDigito)) {
            return verificarCedula(auxRuc.slice(0, 10)) ? null : { ecuadorianValid: true };
        }

        // INSTITUCIÓN PÚBLICA
        if (new RegExp(/^6$/gm).test(tercerDigito)) {
            return verificarIP(auxRuc.slice(0, 9)) ? null : { ecuadorianValid: true };
        }

        // PERSONA JURÍDICA
        if (new RegExp(/^9$/gm).test(tercerDigito)) {
            console.log(verificarPJ(auxRuc.slice(0, 10)));
            return verificarPJ(auxRuc.slice(0, 10)) ? null : { ecuadorianValid: true };
        }

        return null;
    }
}


function verificarPJ(ruc: string): boolean {
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];

    const digitoVerificador = +(ruc.split('').slice(-1));

    const multiplicacion = ruc.slice(0, 9).split('')
        .reduce((p, c, i) => ((p) + ((+c) * coeficientes[i])), 0);

    const residuo = multiplicacion % 11;

    return (residuo === 0) ? (digitoVerificador === 0) : (11 - residuo) === digitoVerificador;

}

function verificarIP(ruc: string): boolean {

    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];

    const digitoVerificador = +(ruc.split('').slice(-1));

    const multiplicacion = ruc.slice(0, 8).split('')
        .reduce((p, c, i) => ((p) + ((+c) * coeficientes[i])), 0);

    const residuo = multiplicacion % 11;

    return (residuo === 0) ? (digitoVerificador === 0) : (11 - residuo) === digitoVerificador;

}

function verificarCedula(auxCedula: string): any {
    const primeros2 = +auxCedula.slice(0, 2);

    if (primeros2 < 1 || primeros2 > 24) {
        return false;
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

    return (residuo === 0) ? (digitoVerificador === 0) : ((10 - residuo) === digitoVerificador);
}
