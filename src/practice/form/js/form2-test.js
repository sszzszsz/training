/* ----------------------------------------
fileUp
--------------------------------------- */
// Check for the various File API support.
$(function() {
   // $(".fileUpBtn01").parent().css('background', 'lightblue');
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
  
  function handleFileSelect(evt) {
    var eventBtn = evt.target.parentElement;
    var list = eventBtn.nextElementSibling.nextElementSibling;
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li>', escape(f.name), '</li>');
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);
      
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    // list.innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  var fileUpBtn = $(".fileUpBtn");
  var btnIdArry = [];
  fileUpBtn.each(function() {
    btnIdArry.push($(this).attr('id'));;
  });
  $.each(btnIdArry, function(i, val) {
    var btnId = "#" + val;
    document.getElementById(val).addEventListener('change', handleFileSelect, false);
  });
});


/* ----------------------------------------
GET
--------------------------------------- */
/* パラメータを渡す側 */
function send2() {
  var textRequired = "";
  var textNonRequired = "";
  var favorite = "";
  
  /* 名前(コード変換) */
  if (document.form2.textRequired.value != "") {
    textRequired = escape(document.form2.textRequired.value);
  }
  
  if (document.form2.textNonRequired.value != "") {
    textNonRequired = escape(document.form2.textNonRequired.value);
  }
  
  
  /* 好きな果物 */
  for (i = 1; i <= 3; i++) {
    if (document.form2.elements["favorite" + i].checked) {
      favorite += document.form2.elements["favorite" + i].value + " ";
    }
  }
  favorite = escape(favorite);
  
  /* 取得した値をパラメータにセット(アンパサンド'&'で連結) */
  var pram = "textRequired=" + textRequired + "&textNonRequired=" + textNonRequired + "&favorite=" + favorite;
  
  /* アドレスにパラメータを付加 */
  location.href = "/practice/form2-test.html?" + pram;
  return false;
}

/* パラメータを受取る側 */
function pramWrite() {
  /* アドレスの「?」以降の引数(パラメータ)を取得 */
  var pram = location.search;
  /* 引数がない時は処理しない */
  if (!pram) return false;
  /* 先頭の?をカット */
  pram = pram.substring(1);
  /* 「&」で引数を分割して配列に */
  var pair = pram.split("&");
  var i = temp = "";
  var key = new Array();
  for (i = 0; i < pair.length; i++) {
    /* 配列の値を「=」で分割 */
    temp = pair[i].split("=");
    keyName = temp[0];
    keyValue = temp[1];
    /* キーと値の連想配列を生成 */
    key[keyName] = keyValue;
  }
  var textRequired = textNonRequired = favorite = "";
  
  /* 名前 */
  if (!key["textRequired"] || key["textRequired"] == "") {
    textRequired = "未記入";
  } else {
    /* コード変換 */
    textRequired = unescape(key["textRequired"]);
  }
  
  if (!key["textNonRequired"] || key["textNonRequired"] == "") {
    textRequired = "未記入";
  } else {
    /* コード変換 */
    textNonRequired = unescape(key["textNonRequired"]);
  }
  
  /* 興味 */
  if (key["favorite"]) {
    favorite = key["favorite"];
  } else {
    favorite += "特になし";
  }
  document.form2.pram.value = "type='text'(required属性有)：" + textRequired + "\n" + "type='text'(required属性無)：" + textNonRequired + "\n" + "好きな果物：" + unescape(favorite) + "\n";
}