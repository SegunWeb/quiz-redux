export function createValidator(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
    }
}

export function validate(value, validation = null) {
    if(!validation) {
        return true
    }
    let isValid = true;

    if(validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}

export function validateForm(formControl) {
    let isFormValid = true;

    Object.keys(formControl).forEach(name => {
        isFormValid = formControl[name].valid && isFormValid
    })

    return isFormValid
}