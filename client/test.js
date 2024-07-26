const response = "Sure! Here is a simple JavaScript function that adds two numbers together: ```javascript function addNumbers(num1, num2) { return num1 + num2; } // Example usage var result = addNumbers(5, 3); console.log(result); // Output: 8 ``` You can call this `addNumbers` function with two numbers as arguments, and it will return the sum of those two numbers."
function extractCodeFromString(message) {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks;
    }
  }


const blocks = extractCodeFromString(response);
console.log(blocks)