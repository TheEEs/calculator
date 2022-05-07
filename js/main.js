var expression = ""; //Khai báo biến expression để lưu trữ biểu thức người dùng đã nhập
var evaluated_result = 0; //Biến evaluated_result dùng để lưu trữ kết quả của biểu thức trong biến expression


// Hàm này được dùng để cập nhật biểu thức lên màn hình và hiển thị kết quả
function updateExpression(exp /* exp: biểu thức cần cập nhật */ ) {
  var e = exp ? exp : "0"; // nếu tham số exp là các giá trị truthy (thức là không bỏ trống), thì gán e = exp, nếu không thì e = "0"
  document.getElementById("expression").innerText = e; // cập nhật nội dung của biểu thức trên giao diện
  try { // chúng ta sử dụng khối try-catch để xử lý các lỗi có thể xảy ra
    displayResult(e); // hiển thị kết quả của biểu thức lên giao diện
  } catch (e) {} // nếu lỗi thì bỏ qua, không làm gì cả
}


// Hàm displayResult dùng để tính giá trị của biểu thức và hiển thị nó lên giao diện
function displayResult(expression /* expression: biểu thức cần hiển thị kết quả */ ) {
  //chúng ta thay thế tất cả các dấu nhân "×" bằng dấu sao "*" và dấu chia "÷" thành dấu "/" do trong Javascript thì dấu nhân là *, chia là /. Sau đó gán chuỗi ký tự vừa thay thế vào hằng số edited_expression
  const edited_expression = expression
    .replaceAll("×", "*")
    .replaceAll("÷", "/"); // ví dụ : (9 ÷ 3) × 2 ===> (9 / 3) * 2 ; lúc này edited_expression là một biểu thức javascript hợp lệ.
  evaluated_result = eval(edited_expression); // hàm eval dùng để thực thi các biểu thức javascript và lấy kết quả của biểu thức đó. Sau khi thực thi xong thì kết quả sẽ được gán cho evaluated_result
  document.getElementById("result").innerText = evaluated_result; // hiển thị giá trị của biến evaluated_result lên giao diện
}

// Chúng ta lắng nghe sự kiện "DOMContentLoaded", đây là sự kiện xảy ra khi trang web đã được load 100%, sẵn sàng để sử dụng.
document.addEventListener("DOMContentLoaded",
  // Function dưới đây sẽ được thực thi khi sự kiện DOMContentLoaded xảy ra. Các function dùng để lắng nghe các sự kiện như vậy được gọi là các callback-function.
  function () {
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
    /* 
      Chúng ta tiếp tục thao tác với 2 nút bấm có ID là "AC" và "D"
      Với mỗi một id, ta sẽ...
    */
    ["AC", "D"].forEach(function (symbol) {
      document
        .getElementById(`${symbol}`) // ... lấy ra button có id đó ...
        // ... và lắng nghe sự kiện click của nó.
        .addEventListener("click", function (e) { // Khi nút đã được nhấn ...
          if (symbol == "AC") { // ... nếu id của nó là "AC" ...
            expression = ""; //... ta reset biểu thức thành một chuỗi trống "" ...
            updateExpression(expression); // ... và cập nhật lại nó lên màn hình.
          } else if (symbol == "D") { // Nếu id của nút bấm là D ...
            expression = expression.slice(0, -1); // ... ta sẽ xóa đi ký tự cuối cùng bên phải của nó ...
            updateExpression(expression); // ... và hiển thị lại nó lên màn hình
          }
        });
    });



    document.querySelector("button#eval") // Lấy ra button có id là "eval" ...
      .addEventListener("click" /* ... và lắng nghe sự kiện "click" của button đó */ , function (e) {
        expression = evaluated_result.toString(); // nếu expression = "3 + 4", evaluated_result = 7 ---> ta gán expression = "7"
        updateExpression(expression); // hiển thị lại biểu thức lên màn hình
      });
  });