class Calculator {
    constructor() {
      this.displayValue = '';
    }
  
    input(value) {
      if (isNaN(value)) {
        this.displayValue += ' ' + value + ' ';
      } else {
        this.displayValue += value;
      }
      this.updateDisplay();
    }
  
    calculate() {
      try {
        this.displayValue = eval(this.displayValue).toString();
        this.updateDisplay();
      } catch (error) {
        this.displayValue = 'Error';
        this.updateDisplay();
      }
    }
  
    clear() {
      this.displayValue = '';
      this.updateDisplay();
    }
  
    updateDisplay() {
      document.getElementById('display').value = this.displayValue;
    }
  }
  
  const calculator = new Calculator();
  