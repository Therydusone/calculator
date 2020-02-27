class Calculator {
    constructor(prevNumberText, currNumberText) {
        this.prevNumberText = prevNumberText
        this.currNumberText = currNumberText
        this.clear()
    }

    clear() {
        this.currentNumber = ""
        this.previousNumber = ""
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentNumber === '') return
        if (this.previousNumber !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = " "
    }
    negate() {
        let negation
        const current = parseFloat(this.currentNumber)
        negation = current * -1
        this.currentNumber = negation
    }

    makePercent() {
        let percenting
        const current = parseFloat(this.currentNumber)
        percenting = current * 0.01
        this.currentNumber = percenting
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'X':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default: 
                return
        }
        this.currentNumber = computation
        this.operation = undefined
        this.previousOperand = ' '
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    updateDisplay() {
        this.currNumberText.innerText =
          this.getDisplayNumber(this.currentNumber)
        if (this.operation != null) {
          this.prevNumberText.innerText =
            `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`
        } else {
          this.prevNumberText.innerText = ''
        }
      }
    }


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const percentButton = document.querySelector('[data-percent]');
const negateButton = document.querySelector('[data-negate]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevNumberText = document.querySelector('[data-prev-number]');
const currNumberText = document.querySelector('[data-curr-number]');

const calculator = new Calculator(prevNumberText, currNumberText)

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

negateButton.addEventListener('click', button => {
    calculator.negate()
    calculator.updateDisplay()
})

percentButton.addEventListener("click", button => {
    calculator.makePercent()
    calculator.updateDisplay
})