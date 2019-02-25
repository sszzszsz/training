/* ----------------------------------------
POST
--------------------------------------- */
function send3() {
  var frm = document.form3;
  var frmNum = document.form3.elements.length;
  /* テキストボックスが空でないならTRUEを返してフォーム送信 */

  for (i = 0; i <= frmNum; i++) {
    if (frm.elements[i].value == "") {
      /* テキストボックスが空の場合はFALSEを返してフォーム送信しない */
      alert("テキストボックスが空の場合は送信しません");
      return false;
    } else {
      frm.action = "test.php";
      frm.method = "post";
      frm.encoding = "application/x-www-form-urlencoded";
      return true;
    }
  }
}