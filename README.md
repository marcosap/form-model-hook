
# React form model hook

A very simple hook to abstract common patterns on form data and validation.

Premisses:

 - Have a very simple API
 - Bring the behavior implementation out of the form
 - Be very flexible with validation

Codebox sample:


[![Edit form-model-hook-sample](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/form-model-hook-sample-forked-dvbdrk?fontsize=14&hidenavigation=1&theme=dark)


## Installation


```bash
  yarn add form-model-hook
```
    
## Usage

The `useFormModel` hook, takes the initial data `Object` and a validators `Object` and returns
another `Object` with the utilities that will be used to implements the form behaviour.

The returned `FormModel` object have the following structure:

```javascript
    {
        data,       //the model data
        setField,   //a function to set the fields value: setField('name', value)
        validate,   //a function to trigger a full or field exclusive validation
        isValid,    //a function that returns if the model data is all valid
        pristine,   //a boolean that indicates if the data isn't changed yet
        errors      //a Object with the message errors by field.
    }
```

Each field of the validators Object, needs a corresponding field on the initial data Object, 
in order to known what field needs to be validated by the given validators.

A validator is simply a function that takes a value and return a string with the 
error description to be used. A empty string return means `no error`.


```javascript


...

function required(value) {
  if (value === "") {
    return "This is a required field";
  }

  return "";
}

...
```

Usage example:

```javascript

import useFormModel from 'form-model-hook'

function App() {

    const initialData = {
        name: '',
        email: ''
    }

    const validators = {
        name: [required],
        email: [required, email]
    }

    const model = useFormModel(initialData, validators)

    return <form>

        <Input
          id="name"
          label="Name"
          value={model.data.name}
          onChange={(value) => model.setField("name", value)}
          onBlur={() => model.validate("name")}
          error={model.errors.name}
        />

        <Input
          id="email"
          label="Email"
          value={model.data.email}
          onChange={(value) => model.setField("email", value)}
          error={model.errors.email}
        />

        <button disabled={model.pristine || !model.isValid()}>
            Send
        </button>

      </form>

    ....
}
```

