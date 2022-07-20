import { useState } from "react";

export default function useFormModel(data, validators) {

    const [model, setModel] = useState(data)
    const [errors, setErrors] = useState({})
    const [pristine, setPristine] = useState(true)

    const setError = (field, message) => {

        if (message !== '') {
            errors[field] = message
        } else {
            delete errors[field]
        }

        setErrors({ ...errors })

    }

    const setField = (field, value) => {

        if(pristine)
            setPristine(false)

        model[field] = value
        setModel({...model})

        if (!validators[field]) return

        runValidators(field, value)

    }

    const runValidators = (field, value) => {


        if(!Array.isArray(validators[field])){

            let message = validators[field](value)
            setError(field, message)
            return
        }

        for(let validator of validators[field]){


            let message = validator(value)
            setError(field, message)

            if(message !== '')
                break
        }
    }

    const validate = (field, value) => {

        if(!value)
            value = model[field]

        if(pristine)
            setPristine(false)

        if(field) {
            runValidators(field, value)
            return
        }

        for(let key in validators) {
            runValidators(key, model[key])
        }
    }

    const isValid = () => {

        return Object.keys(errors).length === 0
    }

    return {
        data: model,
        setField: setField,
        validate: validate,
        isValid: isValid,
        pristine: pristine,
        errors: errors
    }

}