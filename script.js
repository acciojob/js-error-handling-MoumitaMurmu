

// Custom error class for expressions out of range
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = 'OutOfRangeError';
  }
}

// Custom error class for invalid expressions
class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of operators');
    this.name = 'InvalidExprError';
  }
}

// Function to evaluate the validity of the input expression
function evalString(expression) {
  try {
    // Check for invalid combinations of operators
    if (/[\+\-\*\/]{2,}/.test(expression)) {
      throw new InvalidExprError();
    }

    // Check if the expression starts with an invalid operator
    if (/^[\*\/\+]/.test(expression)) {
      throw new SyntaxError('Expression should not start with an invalid operator');
    }

    // Check if the expression ends with an invalid operator
    if (/[\*\/\+\-]$/.test(expression)) {
      throw new SyntaxError('Expression should not end with an invalid operator');
    }

    // Add additional checks for out-of-range expressions if needed

    // If all checks pass, return the evaluated expression
    return eval(expression);
  } catch (error) {
    // Handle custom errors
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      // Handle other errors
      console.error(`Error: ${error.message}`);
    }
  }
}

// Example usage
try {
  // Test cases
  console.log(evalString("2 + 3")); // Valid expression
  console.log(evalString("4 * 5 - 2")); // Valid expression
  console.log(evalString("1 / 0")); // Invalid expression (division by zero)
  console.log(evalString("5 + + 2")); // Invalid expression (invalid combination)
  console.log(evalString("+7 * 3")); // Invalid expression (starts with invalid operator)
  console.log(evalString("6 / 2 -")); // Invalid expression (ends with invalid operator)
  console.log(evalString("10 ** 2")); // Invalid expression (unsupported operator)
} catch (error) {
  console.error(`Unexpected error: ${error.message}`);
}
