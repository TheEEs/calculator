var expression = "";
var evaluated_result = 0;

function updateExpression(exp) {
  e = exp ? exp : "0";
  document.getElementById("expression").innerText = e;
  try {
    displayResult(e);
  } catch (e) {}
}

function displayResult(expression) {
  const edited_expression = expression.replaceAll("×", "*").replaceAll("÷", "/");
  evaluated_result = eval(edited_expression);
  document.getElementById("result").innerText = evaluated_result;
}

document.addEventListener("DOMContentLoaded", function () {
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "×", "÷"].forEach(function (symbol) {
    document
      .getElementById(`${symbol}`)
      .addEventListener("click", function (e) {
        expression = `${expression}${symbol}`;
        updateExpression(expression);
      });
  });
  ["AC", "D"].forEach(function (symbol) {
    document
      .getElementById(`${symbol}`)
      .addEventListener("click", function (e) {
        if (symbol == "AC") {
          expression = "";
          updateExpression(expression);
        } else if (symbol == "D") {
          expression = expression.slice(0, -1);
          updateExpression(expression);
        }
      });
  });
  document.querySelector("button#eval").addEventListener("click", function (e) {
    expression = evaluated_result.toString();
    updateExpression(expression);
  });
});
