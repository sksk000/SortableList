var dragitem;
var dragStartIndex;
var dragEndIndex;
var parent = document.getElementById("listparent");
var listitems = document.querySelectorAll("#dragitem");
var orderbutton = document.getElementById("orderbutton");

listitems.forEach((e) => {
  //ドラック開始
  e.addEventListener("dragstart", () => {
    dragitem = e.target;

    //何番目の要素をドラックしているか
    dragStartIndex = [].slice.call(listitems).indexOf(e);
  });

  //ドラック中
  e.addEventListener("drag", function () {});

  //ドロップ可能エリアに侵入したとき
  e.addEventListener("dragenter", (e) => {
    e.target.style.background = "#a9a9a9";
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
    e.target.style.background = "#ffffff";
  });

  //ドロップしたとき
  e.addEventListener("drop", (e) => {
    e.target.style.background = "#ffffff";

    dragEndIndex = [].slice.call(listitems).indexOf(e.target);

    console.log("StartIndex:" + dragStartIndex);
    console.log("EndIndex:" + dragEndIndex);

    if (dragStartIndex == 0) {
      //StartIndexの要素をEndIndexの要素の前に挿入する
      parent.insertBefore(listitems[dragStartIndex], listitems[dragEndIndex]);

      //EndIndexの要素をList要素の一番最初に挿入する
      parent.prepend(listitems[dragEndIndex]);
    } else if (dragStartIndex == listitems.length - 1) {
      //StartIndexの要素をEndIndexの要素の前に挿入する
      parent.insertBefore(listitems[dragStartIndex], listitems[dragEndIndex]);

      //EndIndexの要素をList要素の一番うしろに挿入する
      parent.appendChild(listitems[dragEndIndex]);
    } else if (dragEndIndex == listitems.length - 1 && dragStartIndex > 0) {
      //EndIndexの要素をStartIndex要素の前に挿入する
      parent.insertBefore(listitems[dragEndIndex], listitems[dragStartIndex]);

      //StartIndex要素をList要素の一番うしろに挿入する
      parent.appendChild(listitems[dragStartIndex]);
    } else {
      //StartとEndどちらかが端っこ以外の場合
      if (dragStartIndex > dragEndIndex) {
        //StartIndexの要素をEndIndexの前に挿入
        parent.insertBefore(listitems[dragStartIndex], listitems[dragEndIndex]);

        //EndIndexの要素をStartIndex+1の要素前に挿入
        parent.insertBefore(
          listitems[dragEndIndex],
          listitems[dragStartIndex + 1]
        );
      } else {
        //StartIndexの要素をEndIndex+1要素前に挿入
        parent.insertBefore(
          listitems[dragStartIndex],
          listitems[dragEndIndex + 1]
        );
        //EndIndexの要素をStartIndex+1要素前に挿入
        parent.insertBefore(
          listitems[dragEndIndex],
          listitems[dragStartIndex + 1]
        );
      }
    }

    //要素の順番が変更されているので取り直す必要がある
    listitems = document.querySelectorAll("#dragitem");
    // 格納している変数を初期化
    dragitem = null;
  });
});

//正解データがあるCSVを読み込む
//CSVのデータを読む

//データをCSVから取得
var csvdata = document.getElementById("answerdata").textContent.trim();
var splitdata = csvdata.split(",");
var answerdata = new Array();

//CSVデータを配列に格納
for (var j = 0; j < csvdata.length; ++j) {
  if (splitdata[j]) {
    answerdata.push(splitdata[j]);
  }
}

orderbutton.addEventListener("click", function () {
  for (var i = 0; i < listitems.length; ++i) {
    var data = listitems[i].textContent;
    if (data.trim() == answerdata[i]) {
      listitems[i].style.color = "#008000";
    } else {
      listitems[i].style.color = "#FF0000";
    }
  }
});
