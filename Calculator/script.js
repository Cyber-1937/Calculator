// mvc - model view controller - to be added!

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetInput = false;

    const updateDisplay = () => {
        output.textContent = previousInput;
        input.textContent = currentInput;
    };

    const handleNumber = (number) => {
        if (currentInput === '0' || resetInput) {
            currentInput = number;
            resetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    const handleDecimal = () => {
        if (resetInput) {
            currentInput = '0.';
            resetInput = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    };

    const handleOperator = (op) => {
        if (operation && !resetInput) {
            calculate();
        }
        previousInput = currentInput;
        operation = op;
        resetInput = true;
        updateDisplay();
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            case '%': result = prev % current; break;
            default: return;
        }

        currentInput = result.toString();
        operation = null;
        resetInput = true;
        updateDisplay();
    };

    const handleEquals = () => {
        if (!operation) return;
        calculate();
        previousInput = '';
    };

    const handleClear = () => {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    };

    const handleSign = () => {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    };

    document.querySelectorAll('.keypad button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (!isNaN(value)) {
                handleNumber(value);
            } else {
                switch (value) {
                    case '.': handleDecimal(); break;
                    case 'C': handleClear(); break;
                    case '±': handleSign(); break;
                    case '=': handleEquals(); break;
                    case '%':
                        if (operation) {
                            handleOperator(value);
                        } else {
                            currentInput = (parseFloat(currentInput) / 100).toString();
                            updateDisplay();
                        }
                        break;
                    default: handleOperator(value);
                }
            }

            // Hacker animation!!!!!
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const validKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','%','Enter','Escape','Backspace'];

        if (validKeys.includes(key)) {
            e.preventDefault();
            const button = document.querySelector(`button[data-value="${key === 'Enter' ? '=' : key === 'Escape' ? 'C' : key}"]`);
            if (button) button.click();
        }

        // Keys Change
        if (key === '+' && e.shiftKey) {
            const button = document.querySelector(`button[data-value="+"]`);
            if (button) button.click();
        } else if (key === '_' || key === '-') {
            const button = document.querySelector(`button[data-value="±"]`);
            if (button) button.click();
        }
    });
});
