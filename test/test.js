if (typeof QUnit === "undefined") {
  QUnit = require("qunit-cli");
}

if (typeof exports === "object" && typeof module !== "undefined") {
  jpPrefecture = require("../");
}


var jp = jpPrefecture;


QUnit.module("#getAll()");

QUnit.test("地域オブジェクトが入った8の配列を返すこと", function(assert){
  assert.strictEqual( jp.getAll("region").length, 8 );
  assert.strictEqual( jp.getAll("region", "id").length, 8 );
  assert.strictEqual( jp.getAll("region", ["id", "name"]).length, 8 );
});

QUnit.test("都道府県オブジェクトが入った47の配列を返すこと", function(assert){
  assert.strictEqual( jp.getAll("pref").length, 47 );
  assert.strictEqual( jp.getAll("pref", "id").length, 47 );
  assert.strictEqual( jp.getAll("pref", ["id", "name"]).length, 47 );
});

QUnit.test("存在しないタイプの指定で`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.getAll("test"), undefined );
  assert.strictEqual( jp.getAll("test", "id"), undefined );
  assert.strictEqual( jp.getAll("test", ["id", "en"]), undefined );
});




QUnit.module("#find()");

QUnit.test("指定したタイプの単一のオブジェクトを返すこと", function(assert){
  assert.strictEqual( jp.find("region", "関東").name, "関東" );
  assert.strictEqual( jp.find("region", "kanto", "id"), 3 );
  assert.strictEqual( jp.find("region", 6, "name"), "中国" );
  assert.strictEqual( jp.find("pref", 6, "short"), "山形" );
});

QUnit.test("条件に当てはまらない場合は`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.find("testtype", "関東"), undefined );
  assert.strictEqual( jp.find(null, null), undefined );
  assert.strictEqual( jp.find(false, false) );
  assert.strictEqual( jp.find([], 10) );
});

QUnit.test("条件に当てはまらない場合は`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.find("testtype", "関東"), undefined );
  assert.strictEqual( jp.find(null, null), undefined );
  assert.strictEqual( jp.find(false, false) );
  assert.strictEqual( jp.find([], 10) );
});




QUnit.module("#findBy()");

QUnit.test("指定したタイプの単一のオブジェクトを返すこと", function(assert){
  assert.strictEqual( jp.findBy("region", "name", "九州").name, "九州" );
  assert.strictEqual( jp.findBy("pref", "name", "山梨県").name, "山梨県" );
  assert.strictEqual( jp.findBy("pref", "en", "kagawa").name, "香川県" );
});

QUnit.test("4つ目の引数に文字列を指定したら、単一の値を返すこと", function(assert){
  assert.strictEqual( jp.findBy("region", "name", "九州", "en"), "kyusyu" );
  assert.strictEqual( jp.findBy("region", "en", "shikoku", "id"), 7 );
});

QUnit.test("4つ目の引数に配列を指定したら、オブジェクトを返すこと", function(assert){
  assert.strictEqual( jp.findBy("region", "name", "九州", ["en", "id"]).en, "kyusyu" );
  assert.strictEqual( jp.findBy("region", "en", "shikoku", ["name", "id"]).id, 7 );
});

QUnit.test("条件に当てはまらない場合は`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.findBy("region", "name", "ヨーロッパ"), undefined );
  assert.strictEqual( jp.findBy("testtype", null, false), undefined );
  assert.strictEqual( jp.findBy(false), undefined );
});




QUnit.module("#regionFindByPref()");

QUnit.test("指定した都道府県に対応する地域オブジェクトを返すこと", function(assert){
  assert.strictEqual( jp.regionFindByPref("東京").name, "関東" );
  assert.strictEqual( jp.regionFindByPref("千葉県").name, "関東" );
  assert.strictEqual( jp.regionFindByPref("oita").en, "kyusyu" );
});

QUnit.test("2つ目の引数に文字列を指定したら、単一の値を返すこと", function(assert){
  assert.strictEqual( jp.regionFindByPref("oita", "name"), "九州" );
  assert.strictEqual( jp.regionFindByPref("カナガワ", "name"), "関東" );
  assert.strictEqual( jp.regionFindByPref("gifu", "id"), 4 );
  assert.strictEqual( jp.regionFindByPref("宮城", "en"), "tohoku" );
});

QUnit.test("2つ目の引数に配列を指定したら、オブジェクトを返すこと", function(assert){
  assert.strictEqual( jp.regionFindByPref("oita", ["id", "name"]).name, "九州" );
  assert.strictEqual( jp.regionFindByPref("島根県", ["id", "name"]).name, "中国" );
  assert.strictEqual( jp.regionFindByPref("akita", ["id", "en"]).en, "tohoku" );
});

QUnit.test("条件に当てはまらない場合は`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.regionFindByPref("pref"), undefined );
  assert.strictEqual( jp.regionFindByPref("test", "name"), undefined );
  assert.strictEqual( jp.regionFindByPref(), undefined );
  assert.strictEqual( jp.regionFindByPref(false, null), undefined );
  assert.strictEqual( jp.regionFindByPref({id:"test"}), undefined );
});




QUnit.module("#prefFindByRegion()");

QUnit.test("指定した地域に対応する都道府県の入った配列を返すこと", function(assert){
  assert.strictEqual( jp.prefFindByRegion("関東").length, 7 );
  assert.strictEqual( jp.prefFindByRegion("四国")[0].name, "徳島県" );
  assert.strictEqual( jp.prefFindByRegion(4)[1].short, "富山" );
  assert.strictEqual( jp.prefFindByRegion("tohoku")[2].kana, "ミヤギ" );
  assert.strictEqual( jp.prefFindByRegion("kanto", "name")[0], "茨城県" );
  assert.strictEqual( jp.prefFindByRegion("kyusyu", "id")[1], 41 );
  assert.strictEqual( jp.prefFindByRegion("kyusyu", ["id", "name"])[1].id, 41 );
});

QUnit.test("条件に当てはまらない場合は`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.prefFindByRegion("region"), undefined );
  assert.strictEqual( jp.prefFindByRegion(100), undefined );
  assert.strictEqual( jp.prefFindByRegion([], null), undefined );
  assert.strictEqual( jp.prefFindByRegion({}, null), undefined );
  assert.strictEqual( jp.prefFindByRegion(false, null), undefined );
});




QUnit.module("#where()");

QUnit.test("条件が一致する場合は、結果を配列で返すこと", function(assert){
  assert.strictEqual( jp.where("region", {id:1})[0].name, "北海道" );
  assert.strictEqual( jp.where("pref", {id:39})[0].en, "kochi" );
  assert.strictEqual( jp.where("pref", {short:"栃木"})[0].name, "栃木県" );
  assert.strictEqual( jp.where("region", {id:2}, "name")[0], "東北" );
  assert.strictEqual( jp.where("pref", {region:3, id:10}, "short")[0], "群馬" );
});

QUnit.test("条件に当てはまらない場合は空の配列を返すこと", function(assert){
  assert.deepEqual( jp.where("", {id:"name"}), [] );
  assert.strictEqual( jp.where("", {id:"name"}).length, 0 );
  assert.strictEqual( jp.where("testtype", null).length, 0 );
  assert.strictEqual( jp.where("prefectures", null).length, 0 );
  assert.strictEqual( jp.where("pref", {id:50}).length, 0 );
  assert.strictEqual( jp.where("region", {short:"東京都"}).length, 0 );
});




QUnit.module("#convert()");

QUnit.test("引数に応じた単一の値を返すこと", function(assert){
  assert.strictEqual( jp.convert("region", "kyusyu", "name"), "九州" );
  assert.strictEqual( jp.convert("region", "北海道", "en"), "hokkaido" );
  assert.strictEqual( jp.convert("region", "中部", "id"), 4 );
  assert.strictEqual( jp.convert("region", "shikoku", "kana"), "シコク" );
  assert.strictEqual( jp.convert("region", "shikoku", "kana"), "シコク" );
  assert.strictEqual( jp.convert("pref", "埼玉県", "short"), "埼玉" );
});

QUnit.test("条件に当てはまらない場合は`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.convert("pref", "都道府県"), undefined );
  assert.strictEqual( jp.convert([], {}), undefined );
  assert.strictEqual( jp.convert(null), undefined );
  assert.strictEqual( jp.convert(false, false), undefined );
});




QUnit.module("#getNeighbors()");

QUnit.test("指定した引数に応じて配列を返すこと", function(assert){
  assert.strictEqual( jp.getNeighbors("region", "関東")[0].name, "東北" );
  assert.strictEqual( jp.getNeighbors("pref", "新潟県", "en")[0], "yamagata" );
  assert.strictEqual( jp.getNeighbors("pref", "okinawa", "name")[0], "鹿児島県" );
});

QUnit.test("条件に当てはまらない場合は`undefined`を返すこと", function(assert){
  assert.strictEqual( jp.getNeighbors("testtype", "関東"), undefined );
  assert.strictEqual( jp.getNeighbors("pref", "関東"), undefined );
  assert.strictEqual( jp.getNeighbors(10, "name"), undefined );
  assert.strictEqual( jp.getNeighbors(false), undefined );
  assert.strictEqual( jp.getNeighbors([], null), undefined );
  assert.strictEqual( jp.getNeighbors(null, null), undefined );
});




QUnit.module("#isNeighbor()");

QUnit.test("指定した値が隣接していれば`true`を返すこと", function(assert){
  assert.strictEqual( jp.isNeighbor("region", "関東", "中部"), true );
  assert.strictEqual( jp.isNeighbor("region", "キンキ", "四国"), true );
  assert.strictEqual( jp.isNeighbor("pref", "鹿児島県", "沖縄"), true );
  assert.strictEqual( jp.isNeighbor("pref", "オオサカ", "和歌山県"), true );
});

QUnit.test("隣接していないか引数が無効な場合は`false`を返すこと", function(assert){
  assert.strictEqual( jp.isNeighbor(), false );
  assert.strictEqual( jp.isNeighbor("region", "東京都", "中部"), false );
  assert.strictEqual( jp.isNeighbor("testtype", null, false), false );
  assert.strictEqual( jp.isNeighbor("pref", "沖縄県", "北海道"), false );
});




QUnit.module("#neighborSize()");

QUnit.test("指定した値の隣接数を整数で返すこと", function(assert){
  assert.strictEqual( jp.neighborSize("region", "関東"), 2 );
  assert.strictEqual( jp.neighborSize("region", "シコク"), 3 );
  assert.strictEqual( jp.neighborSize("pref", "gunma"), 5 );
  assert.strictEqual( jp.neighborSize("pref", 35), 5 );
  assert.strictEqual( jp.neighborSize("pref", "鹿児島県"), 3 );
});

QUnit.test("隣接していないか引数が無効な場合は0を返すこと", function(assert){
  assert.strictEqual( jp.neighborSize(), 0 );
  assert.strictEqual( jp.neighborSize("testtype", "テスト"), 0 );
  assert.strictEqual( jp.neighborSize("pref", "関東"), 0 );
  assert.strictEqual( jp.neighborSize({}), 0 );
  assert.strictEqual( jp.neighborSize(null), 0 );
  assert.strictEqual( jp.neighborSize(false), 0 );
});
