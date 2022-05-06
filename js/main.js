var expression = ""; //Khai báo biến expression để lưu trữ biểu thức người dùng đã nhập
var evaluated_result = 0; //Biến evaluated_result dùng để lưu trữ kết quả của biểu thức trong biến expression


// Hàm này được dùng để cập nhật biểu thức lên màn hình và hiển thị kết quả
function updateExpression(exp) {
  var e = exp ? exp : "0"; // nếu tham số exp là các giá trị truthy (thức là không bỏ trống), thì gán e = exp, nếu không thì e = "0"
  document.getElementById("expression").innerText = e; // cập nhật nội dung của biểu thức trên giao diện
  try { // chúng ta sử dụng khối try-catch để xử lý các lỗi có thể xảy ra
    displayResult(e); // hiển thị kết quả của biểu thức lên giao diện
  } catch (e) {} // nếu lỗi thì bỏ qua, không làm gì cả
}


// Hàm displayResult dùng để tính giá trị của biểu thức và hiển thị nó lên giao diện
function displayResult(expression) {
  //chúng ta thay thế tất cả các dấu nhân "×" bằng dấu sao "*" và dấu chia "÷" thành dấu "/" do trong Javascript thì dấu nhân là *, chia là /. Sau đó gán chuỗi ký tự vừa thay thế vào hằng số edited_expression
  const edited_expression = expression
    .replaceAll("×", "*")
    .replaceAll("÷", "/"); // ví dụ : (9 ÷ 3) × 2 ===> (9 / 3) * 2 ; lúc này edited_expression là một biểu thức javascript hợp lệ.
  var evaluated_result = eval(edited_expression); // hàm eval dùng để thực thi các biểu thức javascript và lấy kết quả của biểu thức đó. Sau khi thực thi xong thì kết quả sẽ được gán cho evaluated_result
  document.getElementById("result").innerText = evaluated_result; // hiển thị giá trị của biến evaluated_result lên giao diện
}

// Chúng ta lắng nghe sự kiện "DOMContentLoaded", đây là sự kiện xảy ra khi trang web đã được load 100%, sẵn sàng để sử dụng.
document.addEventListener("DOMContentLoaded", function () {
  //Lặp qua tất cả các id của các nút bấm, với mỗi một id, chúng ta sẽ ...
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "×", "÷"].forEach(function (symbol) {
    document
      // ... lấy ra nút bấm đó ...
      .getElementById(`${symbol}`)  
      // ... và lắng nghe sự kiện click của nó
      .addEventListener("click", function (e) { // Khi nút bấm với id tương ứng đã được nhấn ...
        expression = `${expression}${symbol}`; // ... ta sẽ thêm ký tự tượng ứng của nút bấm đó vào cuối biến `expression`
        updateExpression(expression); // hiển thị biểu thức mới nhập lên giao diện
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
