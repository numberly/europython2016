import {FormControl} from '@angular/forms';

var emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(c: FormControl) {
    if (!emailRegexp.test(c.value))
        return {validEmail: false}
}
