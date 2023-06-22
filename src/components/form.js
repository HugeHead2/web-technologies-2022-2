class Form {
    el = null
    rules = null
    callback = null
    fields = null

    constructor(el, rules, callback) {
        this.el = el
        this.rules = rules
        this.callback = callback

        this.findFields()
        this.initListeners()
    }

    initListeners() {
        this.el.addEventListener('submit', (event) => {
            event.preventDefault();

            const {
                isValid: isFormValid,
                values
            } = this.validateFields()

            if (isFormValid) {
                this.callback(values)
            }
        })
    }

    findFields() {
        const fields = []

        Object.keys(this.rules).forEach(name => {
            const input = this.el.querySelector(`input[name=${name}]`)

            fields.push({
                input,
                name,
                validator: this.rules[name]
            })
        })

        this.fields = fields
    }

    validateFields() {
        let isValid = true;
        const values = {}

        this.fields.forEach(field => {
            const { isValid: isFieldValid, value, name } = this.validateField(field)

            values[name] = value

            if (!isFieldValid) {
                isValid = false
            }
        })

        return {
            isValid,
            values
        }
    }

    validateField(field) {
        const value = field.input.value
        const result = field.validator(value, this.fields)

        if (typeof result === "string") {
            this.setInputErrorMessage(field.input, result)
            return {
                isValid: false,
                errorMessage: result,
                value,
                name: field.name
            }
        } else {
            this.setInputErrorMessage(field.input, '')
            return {
                isValid: true,
                errorMessage: '',
                value,
                name: field.name
            }
        }
    }

    setInputErrorMessage(input, errorMessage) {
        const errorEl = input.nextElementSibling
        errorEl.innerText = errorMessage
    }
}

export default Form