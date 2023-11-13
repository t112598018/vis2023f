function _1(md){return(
md`# HW02 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _array(){return(
[  "牡羊座",  "金牛座",  "雙子座",  "巨蟹座",  "獅子座",  "處女座",  "天秤座",  "天蠍座",  "射手座",  "摩羯座",  "水瓶座",  "雙魚座 "]
)}

function _yCounts(){return(
[]
)}

function _5(yCounts,data)
{
  yCounts.length = 0;
  for (var y=0; y< 12; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({Constellation:y, gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({Constellation:y, gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _6(Plot,yCounts,array){return(
Plot.plot({
  width: 1000,
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count", tip: true , fill:"gender" ,title: (d) => `Constellation: ${array[d.Constellation]}
        \ngender: ${d.gender} (${d.count})`}),
    Plot.axisX({tickFormat: d => {return array[d];},}),
  ]
})
)}

function _7(Plot,data,array){return(
Plot.plot({
  width: 1000,
  x: {
    label: "Constellation",
    grid: true,
  },
  y: { grid: true, label: "count" },
  marks: [
    Plot.rectY(data, Plot.binX({ y: "count" }, { x: "Constellation", interval: 1, fill: "Gender",tip: true,
       title: (d) => `Constellation: ${array[d.Constellation]}
        \ngender: ${d.Gender}`},)),
    Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 }),
    Plot.axisX({tickFormat: d => {return array[d];},}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("array")).define("array", _array);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer()).define(["yCounts","data"], _5);
  main.variable(observer()).define(["Plot","yCounts","array"], _6);
  main.variable(observer()).define(["Plot","data","array"], _7);
  return main;
}
