## This project is built using [Deno](https://deno.land/), which is a Javascript/Typescript runtime environment.

# Instalation:
Deno ships as a single executable file.
You cand install it in the following ways.

Using Shell:

```curl -fsSL https://deno.land/x/install/install.sh | sh```

Or using PowerShell:

```iwr https://deno.land/x/install/install.ps1 -useb | iex```

# Run the app:
To start the application execute the following inside the project root:

```deno --allow-read --allow-write main.ts <path config JSON file>```

# Config file
To run the project, you need a config JSON file to specify all inputs.
Check out [config.json](config.json) for an example config file.

The config file has the following base structure:

```ts
{
  // number of publications and subscriptions to generate
  entriesCount: number,
  output: {
    // path of publications output file
    publications: string,
    // path to subscriptions output file
    subscriptions: string
  },
  // array of field model config
  model: FieldConfig[]
}
```

```FieldConfig``` has the following type:
```ts
FieldConfig {
  name: string, // name of the field
  type: 'enum' | 'double' | 'date', // type of the field
  subscription?: {
    // the probability for this field to appear in any generated subscription
    // if not specified, defaults to 0.5
    frequency: number, // [0, 1] 
    // the probability that the operator generated for this subscription field is '='
    // defaults to 0.5
    // if the field type is `enum` and the enum value types are of type `string`, defaults to 1
    equal_frequency: number // [0, 1]
  }
}
```
It is further extended by
```ts
NumberFieldConfig {
  // minimum value for this field
  minValue: number,
  // maximum value for this field
  maxValue: number,
  // increment between values
  // e.g. if the step is 1 will generate just integers, if the step is 0.5, it will generate values like 0.5, 10, 12.5, ...
  step: number
}
```

```ts
DateFieldConfig {
  // lower bound of the interval from which to generate dates
  // date is represented as a string with the following format: dd-mon-yyy (e.g. 01-feb-2019)
  minDate: string,
  // upper bound of the interval specified in the same format as `minDate`
  maxDate: string
}
```

```ts
EnumFieldConfig {
  // type of the values specified inside the enum
  enumType: 'string' | 'double' | 'date',
  // array of enum elements
  // could be array of strings (for string enums or date enums) or array of numbers
  // dates are represented in the following format: dd-mon-yyyy (23-mar-2020)
  values: (string | number)[],
}
```
