"use strict";

function appendInfo(info) {

  //自作のelementがなければ作成
  let resultBox1 = document.querySelector("#top_header .myInfo");
  if (resultBox1 == null) {
    let div = document.createElement("pre");
    div.className = "myInfo";
    document.querySelector("#top_header").appendChild(div);
  }

  let resultBox = document.querySelector("#top_header .myInfo");
  resultBox.textContent = toString(info);
}

//Map to String
function toString(iterable) {
  var result = "";
  for (const [key, value] of iterable) {
    result += key + ":" + value + "\n";
  }
  return result;
}

function qs(selector) {
  return document.querySelector(selector);
}

function main() {

  //想定外urlでは何もしない
  if (window.location.href.indexOf("/kyushoku.hellowork.mhlw.go.jp/") === -1) {
    return;
  }

  //横着してタイトルで目的ページか判断
  if (qs(".page_title").textContent !== "求人情報") {
    return;
  }

  //事業所名
  const jgshMei = qs("#ID_jgshMei").textContent;

  //従業員全体を取得
  const employeeNum = qs("#ID_jgisKigyoZentai").textContent;

  //基本給
  const salary1 = qs("#ID_khky").textContent;

  //基本給＋手当など　a+b+c
  const salary2 = qs("#ID_chgn").textContent;

  //ホームページurl
  let webUrl = qs("#ID_hp").textContent;
  if (webUrl) {
    webUrl = webUrl.trim();
  }

  const currentUrl = window.location.href;

  let result = new Map([
    ["事業所名", jgshMei],
    ["従業員数", employeeNum],
    ["基本給", salary1],
    ["基本給＋手当など", salary2],
    ["ホームページ", webUrl],
    ["求人詳細ページ", currentUrl],
  ]);

  appendInfo(result);
}

main();
