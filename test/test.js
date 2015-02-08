// for `node.js`
if( typeof require === "function" ){
  var chai = require("./lib/chai.js");
  var jpPrefecture = require("../jp-prefecture");
}


var a = chai.assert;
var jp = jpPrefecture;
chai.Should();


describe("jpPrefecture", function(){


  describe("getAll()", function(){
    it("地域オブジェクトが入った8の配列を返すこと", function(){
      a.equal( jp.getAll("region").length, 8 );
      a.equal( jp.getAll("region", "id").length, 8 );
      a.equal( jp.getAll("region", ["id", "name"]).length, 8 );
    });
    it("都道府県オブジェクトが入った47の配列を返すこと", function(){
      a.equal( jp.getAll("pref").length, 47 );
      a.equal( jp.getAll("pref", "id").length, 47 );
      a.equal( jp.getAll("pref", ["id", "name"]).length, 47 );
    });
    it("存在しないタイプの指定で`undefined`を返すこと", function(){
      a.isUndefined( jp.getAll("test") );
      a.isUndefined( jp.getAll("test", "id") );
      a.isUndefined( jp.getAll("test", ["id", "en"]) );
    });
  });


  describe("find()", function(){
    it("指定したタイプの単一のオブジェクトを返すこと", function(){
      a.isObject( jp.find("region", "関東") );
      a.equal( jp.find("region", "kanto", "id"), 3 );
      a.equal( jp.find("region", 6, "name"), "中国" );
      a.equal( jp.find("pref", 6, "short"), "山形" );
    });
    it("条件に当てはまらない場合は`undefined`を返すこと", function(){
      a.isUndefined( jp.find("testtype", "関東") );
      a.isUndefined( jp.find(null, null) );
      a.isUndefined( jp.find(false, false) );
      a.isUndefined( jp.find([], 10) );
    });
  });


  describe("findBy()", function(){
    it("指定したタイプの単一のオブジェクトを返すこと", function(){
      a.equal( jp.findBy("region", "name", "九州").name, "九州" );
      a.equal( jp.findBy("pref", "name", "山梨県").name, "山梨県" );
      a.equal( jp.findBy("pref", "en", "kagawa").name, "香川県" );
    });
    it("4つ目の引数に文字列を指定したら、単一の値を返すこと", function(){
      a.equal( jp.findBy("region", "name", "九州", "en"), "kyusyu" );
      a.equal( jp.findBy("region", "en", "shikoku", "id"), 7 );
    });
    it("4つ目の引数に配列を指定したら、オブジェクトを返すこと", function(){
      a.equal( jp.findBy("region", "name", "九州", ["en", "id"]).en, "kyusyu" );
      a.equal( jp.findBy("region", "en", "shikoku", ["name", "id"]).id, 7 );
    });
    it("条件に当てはまらない場合は`undefined`を返すこと", function(){
      a.isUndefined( jp.findBy("region", "name", "ヨーロッパ") );
      a.isUndefined( jp.findBy("testtype", null, false) );
      a.isUndefined( jp.findBy(false) );
    });
  });


  describe("regionFindByPref()", function(){
    it("指定した都道府県に対応する地域オブジェクトを返すこと", function(){
      a.isObject( jp.regionFindByPref("東京") );
      a.equal( jp.regionFindByPref("千葉県").name, "関東" );
      a.equal( jp.regionFindByPref("oita").en, "kyusyu" );
    });
    it("2つ目の引数に文字列を指定したら、単一の値を返すこと", function(){
      a.isString( jp.regionFindByPref("oita", "name") );
      a.equal( jp.regionFindByPref("カナガワ", "name"), "関東" );
      a.equal( jp.regionFindByPref("gifu", "id"), 4 );
      a.equal( jp.regionFindByPref("宮城", "en"), "tohoku" );
    });
    it("2つ目の引数に配列を指定したら、オブジェクトを返すこと", function(){
      a.isObject( jp.regionFindByPref("oita", ["id", "name"]) );
      a.equal( jp.regionFindByPref("島根県", ["id", "name"]).name, "中国" );
      a.equal( jp.regionFindByPref("akita", ["id", "en"]).en, "tohoku" );
    });
    it("条件に当てはまらない場合は`undefined`を返すこと", function(){
      a.isUndefined( jp.regionFindByPref("pref") );
      a.isUndefined( jp.regionFindByPref("test", "name") );
      a.isUndefined( jp.regionFindByPref() );
      a.isUndefined( jp.regionFindByPref(false, null) );
      a.isUndefined( jp.regionFindByPref({id:"test"}) );
    });
  });


  describe("prefFindByRegion()", function(){
    it("指定した地域に対応する都道府県の入った配列を返すこと", function(){
      a.isArray( jp.prefFindByRegion("関東") );
      a.equal( jp.prefFindByRegion("四国")[0].name, "徳島県" );
      a.equal( jp.prefFindByRegion(4)[1].short, "富山" );
      a.equal( jp.prefFindByRegion("tohoku")[2].kana, "ミヤギ" );
      a.equal( jp.prefFindByRegion("kanto", "name")[0], "茨城県" );
      a.equal( jp.prefFindByRegion("kyusyu", "id")[1], 41 );
      a.equal( jp.prefFindByRegion("kyusyu", ["id", "name"])[1].id, 41 );
    });
    it("条件に当てはまらない場合は`undefined`を返すこと", function(){
      a.isUndefined( jp.prefFindByRegion("region") );
      a.isUndefined( jp.prefFindByRegion(100) );
      a.isUndefined( jp.prefFindByRegion([], null) );
      a.isUndefined( jp.prefFindByRegion({}, null) );
      a.isUndefined( jp.prefFindByRegion(false, null) );
    });
  });


  describe("where()", function(){
    it("条件が一致する場合は、結果を配列で返すこと", function(){
      a.isArray( jp.where("region", {id:1}) );
      a.isArray( jp.where("pref", {id:39}) );
      a.isArray( jp.where("pref", {short:"栃木"}) );
      a.equal( jp.where("region", {id:2}, "name")[0], "東北" );
      a.equal( jp.where("pref", {region:3, id:10}, "short")[0], "群馬" );
    });
    it("条件に当てはまらない場合は空の配列を返すこと", function(){
      a.isArray( jp.where("", {id:"name"}) );
      a.equal( jp.where("", {id:"name"}).length, 0 );
      a.equal( jp.where("testtype", null).length, 0 );
      a.equal( jp.where("prefectures", null).length, 0 );
      a.equal( jp.where("pref", {id:50}).length, 0 );
      a.equal( jp.where("region", {short:"東京都"}).length, 0 );
    });
  });


  describe("convert()", function(){
    it("引数に応じた単一の値を返すこと", function(){
      a.equal( jp.convert("region", "kyusyu", "name"), "九州" );
      a.equal( jp.convert("region", "北海道", "en"), "hokkaido" );
      a.equal( jp.convert("region", "中部", "id"), 4 );
      a.equal( jp.convert("region", "shikoku", "kana"), "シコク" );
      a.equal( jp.convert("pref", "埼玉県", "short"), "埼玉" );
    });
    it("条件に当てはまらない場合は`undefined`を返すこと", function(){
      a.isUndefined( jp.convert("pref", "都道府県") );
      a.isUndefined( jp.convert("testtype") );
      a.isUndefined( jp.convert([], {}) );
      a.isUndefined( jp.convert(null) );
      a.isUndefined( jp.convert(false, false) );
    });
  });


  describe("getNeighbors()", function(){
    it("指定した引数に応じて配列を返すこと", function(){
      a.isArray( jp.getNeighbors("region", "関東") );
      a.equal( jp.getNeighbors("region", "関東")[0].name, "東北" );
      a.equal( jp.getNeighbors("pref", "新潟県", "en")[0], "yamagata" );
      a.equal( jp.getNeighbors("pref", "okinawa", "name")[0], "鹿児島県" );
    });
    it("条件に当てはまらない場合は`undefined`を返すこと", function(){
      a.isUndefined( jp.getNeighbors("testtype", "関東") );
      a.isUndefined( jp.getNeighbors("pref", "関東") );
      a.isUndefined( jp.getNeighbors(10, "name") );
      a.isUndefined( jp.getNeighbors(false) );
      a.isUndefined( jp.getNeighbors([], null) );
      a.isUndefined( jp.getNeighbors(null, null) );
    });
  });


  describe("isNeighbor()", function(){
    it("指定した値が隣接していれば`true`を返すこと", function(){
      a.isTrue( jp.isNeighbor("region", "関東", "中部") );
      a.isTrue( jp.isNeighbor("region", "キンキ", "四国") );
      a.isTrue( jp.isNeighbor("pref", "鹿児島県", "沖縄") );
      a.isTrue( jp.isNeighbor("pref", "オオサカ", "和歌山県") );
    });
    it("隣接していないか引数が無効な場合は`false`を返すこと", function(){
      a.isFalse( jp.isNeighbor() );
      a.isFalse( jp.isNeighbor("region", "東京都", "中部") );
      a.isFalse( jp.isNeighbor("testtype", null, false) );
      a.isFalse( jp.isNeighbor("pref", "沖縄県", "北海道") );
    });
  });


  describe("neighborSize()", function(){
    it("指定した値が隣接していれば`true`を返すこと", function(){
      a.equal( jp.neighborSize("region", "関東"), 2 );
      a.equal( jp.neighborSize("region", "シコク"), 3 );
      a.equal( jp.neighborSize("pref", "gunma"), 5 );
      a.equal( jp.neighborSize("pref", 35), 5 );
      a.equal( jp.neighborSize("pref", "鹿児島県"), 3 );
    });
    it("隣接していないか引数が無効な場合は0を返すこと", function(){
      a.equal( jp.neighborSize(), 0 );
      a.equal( jp.neighborSize("testtype", "テスト"), 0 );
      a.equal( jp.neighborSize("pref", "関東"), 0 );
      a.equal( jp.neighborSize({}), 0 );
      a.equal( jp.neighborSize(null), 0 );
      a.equal( jp.neighborSize(false), 0 );
    });
  });


});