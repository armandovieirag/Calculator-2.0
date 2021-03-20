//                                                      toggle de light mode a dark mode
function darkMode() {

    let dm = document.querySelectorAll(".whitem");
    for (let i = 0; i < dm.length; i++) {
        dm[i].classList.toggle("dark-mode");
    }
}
function darkMode2() {

    let dms = document.querySelectorAll(".whitems");
    for (let i = 0; i < dms.length; i++) {
        dms[i].classList.toggle("dark-ms");
    }
}
//                                                              cerrar calculadora



function openWin(){
    window.open("index.html", "_blank", "");
}

function closeWin(){
    window.close();
}

//                                                              calculadora

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    negativeNumber(){
        this.currentOperand = this.currentOperand.toString() * -1;
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    }

    compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
        computation = prev + current
        console.log(parseFloat(this.previousOperand),  "+",   parseFloat(this.currentOperand), "=", computation)
        break
        case '-':
        computation = prev - current
        console.log(parseFloat(this.previousOperand),  "-",   parseFloat(this.currentOperand), "=", computation)
        break
        case 'x':
        computation = prev * current
        console.log(parseFloat(this.previousOperand),  "*",   parseFloat(this.currentOperand), "=", computation)
        break
        case '÷':
        computation = prev / current
        console.log(parseFloat(this.previousOperand),  "/",   parseFloat(this.currentOperand), "=", computation)
        break
        case '%':
        computation = prev * current / 100
        console.log(parseFloat(this.previousOperand),  "%",   parseFloat(this.currentOperand), "=", computation)
        break
        default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    }
//                                            Creamos una funcion para que en la pantalla final nos separe los numeros enteros
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
    }   else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    }   else {
        return integerDisplay
        }
    }
//                                                funcion para la pantalla final despues de cada operacion entregue resultado
    updateDisplay() {
    this.currentOperandTextElement.innerText =
    this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
    this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
        this.previousOperandTextElement.innerText = ''
    }
    }
}

//                                                declaracion de constantes de calculadora
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const numberNegative = document.querySelector('[data-negate]')

//                                          ejecucion de botones de calculadora declarada en la clase arriba
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
})
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
})
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

numberNegative.addEventListener('click', button => {
    calculator.negativeNumber()
    calculator.updateDisplay()
})

