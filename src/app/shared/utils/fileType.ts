import { FormControl } from "@angular/forms";
export function requiredFileType(type: string[]) {
    return function (control: FormControl) {
        const file = control.value;

        if (file) {
            let path = file.name.replace(/^.*[\\\/]/, "");
            
            const extension = path.split(".")[1].toUpperCase();
            let existValue: boolean = false;
            for (let i = 0; i < type.length; i++) {
                let typeFile = type[i].toUpperCase();
                if (typeFile === extension.toUpperCase()) {
                    existValue = true;
                }
            }
            if (existValue == true) {
                return null;
            } else {
                return {
                    requiredFileType: true
                };
            }
        }
        return null;
    };
}