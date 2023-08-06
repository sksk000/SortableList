var dragStartIndex;
var dragEndIndex;
var listitems = document.querySelectorAll("#dragitem");
var orderbutton = document.getElementById("orderbutton");

listitems.forEach((e) => {
  //ドラック開始
  e.addEventListener("dragstart", () => {
    //何番目の要素をドラックしているか
    dragStartIndex = [].slice.call(listitems).indexOf(e);
  });

  //ドロップ可能エリアに侵入したとき
  e.addEventListener("dragenter", (e) => {
    if (e.target.id != "dragitem") {
      e.target.parentNode.parentNode.style.background = "#a9a9a9";
      //e.target.parentNode
    } else {
      e.target.parentNode.style.background = "#a9a9a9";
    }
  });

  //ドロップ可能エリア内
  e.addEventListener(
    "dragover",
    (e) => {
      //反応させないようにする
      e.preventDefault();
    },
    false
  );
  //ドロップ可能エリアから離れる
  e.addEventListener("dragleave", (e) => {
    if (e.target.id != "dragitem") {
      e.target.parentNode.parentNode.style.background = "#ffffff";
    } else {
      e.target.parentNode.style.background = "#ffffff";
    }
  });

  //ドロップしたとき
  e.addEventListener("drop", (e) => {
    if (e.target.id != "dragitem") {
      e.target.parentNode.parentNode.style.background = "#ffffff";
    } else {
      e.target.parentNode.style.background = "#ffffff";
    }

    var targetitem;
    //持っている要素がdragitemかどうか確認(dragitemの子要素もあるので確認している)
    if (e.target.id != "dragitem") {
      targetitem = e.target.parentNode;
    } else {
      targetitem = e.target;
    }

    dragEndIndex = [].slice.call(listitems).indexOf(targetitem);

    console.log("StartIndex:" + dragStartIndex);
    console.log("EndIndex:" + dragEndIndex);

    //開始場所と終了場所の親を保存
    var endparent = listitems[dragEndIndex].parentNode;
    var startparent = listitems[dragStartIndex].parentNode;

    //最初のものは最後に、最後のものは最初に入れる
    endparent.insertBefore(listitems[dragStartIndex], null);
    startparent.insertBefore(listitems[dragEndIndex], null);

    listitems = document.querySelectorAll("#dragitem");
  });
});

//正解データがあるCSVを読み込む
//CSVのデータを読む

//データをCSVから取得
var csvdata = document.getElementById("answerdata").textContent.trim();
var splitdata = csvdata.split(",");
var answerdata = new Array();
var parsonnames = document.querySelectorAll("#personname");

//CSVデータを配列に格納
for (var j = 0; j < csvdata.length; ++j) {
  if (splitdata[j]) {
    answerdata.push(splitdata[j]);
  }
}

orderbutton.addEventListener("click", function () {
  //最新の情報を取得する(位置が変わっている為)
  parsonnames = document.querySelectorAll("#personname");

  //CSVの情報を照合して合っていれば文字の色を変更する
  for (var i = 0; i < parsonnames.length; ++i) {
    var data = parsonnames[i].textContent;
    if (data == answerdata[i]) {
      parsonnames[i].parentNode.parentNode.style.color = "#008000";
    } else {
      parsonnames[i].parentNode.parentNode.style.color = "#FF0000";
    }
  }
});
