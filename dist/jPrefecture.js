/*!
 * jPrefecture.js
 * Utility library dealing with prefectures and regions in Japan.
 * @version 1.0.0
 * @license MIT
 * @author tsuyoshiwada
 * @url https://github.com/tsuyoshiwada/jPrefecture
 */;(function(){

  var undefined,
      VERSION = "1.0.0",
      root = this,
      jp,
      previousJprefecture = root.jPrefecture,
      Type = {
        REGION: "region",
        PREFECTURE: "prefecture"
      },
      regions = [
        {id:1, name:"北海道", kana:"ホッカイドウ", en:"hokkaido", neighbor:[2]},
        {id:2, name:"東北",   kana:"トウホク",     en:"tohoku",   neighbor:[1]},
        {id:3, name:"関東",   kana:"カントウ",     en:"kanto",    neighbor:[2, 4]},
        {id:4, name:"中部",   kana:"チュウブ",     en:"chubu",    neighbor:[2, 3, 5]},
        {id:5, name:"近畿",   kana:"キンキ",       en:"kinki",    neighbor:[4, 6, 7]},
        {id:6, name:"中国",   kana:"チュウゴク",   en:"chugoku",  neighbor:[5, 7, 8]},
        {id:7, name:"四国",   kana:"シコク",       en:"shikoku",  neighbor:[5, 6, 8]},
        {id:8, name:"九州",   kana:"キュウシュウ", en:"kyusyu",   neighbor:[6, 7]}
      ],
      prefectures = [
        {id:1,  region:1, name:"北海道",   short:"北海道", kana:"ホッカイドウ", en:"hokkaido",  neighbor:[2]},
        {id:2,  region:2, name:"青森県",   short:"青森",   kana:"アオモリ",     en:"aomori",    neighbor:[1, 3, 5]},
        {id:3,  region:2, name:"岩手県",   short:"岩手",   kana:"イワテ",       en:"iwate",     neighbor:[2, 4, 5]},
        {id:4,  region:2, name:"宮城県",   short:"宮城",   kana:"ミヤギ",       en:"miyagi",    neighbor:[3, 5, 6, 7]},
        {id:5,  region:2, name:"秋田県",   short:"秋田",   kana:"アキタ",       en:"akita",     neighbor:[2, 3, 4, 6]},
        {id:6,  region:2, name:"山形県",   short:"山形",   kana:"ヤマガタ",     en:"yamagata",  neighbor:[4, 5, 7, 15]},
        {id:7,  region:2, name:"福島県",   short:"福島",   kana:"フクシマ",     en:"fukushima", neighbor:[4, 6, 8, 9, 15]},
        {id:8,  region:3, name:"茨城県",   short:"茨城",   kana:"イバラキ",     en:"ibaraki",   neighbor:[7, 9, 11, 12]},
        {id:9,  region:3, name:"栃木県",   short:"栃木",   kana:"トチギ",       en:"tochigi",   neighbor:[7, 8, 10, 11]},
        {id:10, region:3, name:"群馬県",   short:"群馬",   kana:"グンマ",       en:"gunma",     neighbor:[]},
        {id:11, region:3, name:"埼玉県",   short:"埼玉",   kana:"サイタマ",     en:"saitama",   neighbor:[]},
        {id:12, region:3, name:"千葉県",   short:"千葉",   kana:"チバ",         en:"chiba",     neighbor:[]},
        {id:13, region:3, name:"東京都",   short:"東京",   kana:"トウキョウ",   en:"tokyo",     neighbor:[]},
        {id:14, region:3, name:"神奈川県", short:"神奈川", kana:"カナガワ",     en:"kanagawa",  neighbor:[]},
        {id:15, region:4, name:"新潟県",   short:"新潟",   kana:"ニイガタ",     en:"niigata",   neighbor:[]},
        {id:16, region:4, name:"富山県",   short:"富山",   kana:"トヤマ",       en:"toyama",    neighbor:[]},
        {id:17, region:4, name:"石川県",   short:"石川",   kana:"イシカワ",     en:"ishikawa",  neighbor:[]},
        {id:18, region:4, name:"福井県",   short:"福井",   kana:"フクイ",       en:"fukui",     neighbor:[]},
        {id:19, region:4, name:"山梨県",   short:"山梨",   kana:"ヤマナシ",     en:"yamanashi", neighbor:[]},
        {id:20, region:4, name:"長野県",   short:"長野",   kana:"ナガノ",       en:"nagano",    neighbor:[]},
        {id:21, region:4, name:"岐阜県",   short:"岐阜",   kana:"ギフ",         en:"gifu",      neighbor:[]},
        {id:22, region:4, name:"静岡県",   short:"静岡",   kana:"シズオカ",     en:"shizuoka",  neighbor:[]},
        {id:23, region:4, name:"愛知県",   short:"愛知",   kana:"アイチ",       en:"aichi",     neighbor:[]},
        {id:24, region:5, name:"三重県",   short:"三重",   kana:"ミエ",         en:"mie",       neighbor:[]},
        {id:25, region:5, name:"滋賀県",   short:"滋賀",   kana:"シガ",         en:"shiga",     neighbor:[]},
        {id:26, region:5, name:"京都府",   short:"京都",   kana:"キョウト",     en:"kyoto",     neighbor:[]},
        {id:27, region:5, name:"大阪府",   short:"大阪",   kana:"オオサカ",     en:"osaka",     neighbor:[]},
        {id:28, region:5, name:"兵庫県",   short:"兵庫",   kana:"ヒョウゴ",     en:"hyogo",     neighbor:[]},
        {id:29, region:5, name:"奈良県",   short:"奈良",   kana:"ナラ",         en:"nara",      neighbor:[]},
        {id:30, region:5, name:"和歌山県", short:"和歌山", kana:"ワカヤマ",     en:"wakayama",  neighbor:[]},
        {id:31, region:6, name:"鳥取県",   short:"鳥取",   kana:"トットリ",     en:"tottori",   neighbor:[]},
        {id:32, region:6, name:"島根県",   short:"島根",   kana:"シマネ",       en:"shimane",   neighbor:[]},
        {id:33, region:6, name:"岡山県",   short:"岡山",   kana:"オカヤマ",     en:"okayama",   neighbor:[]},
        {id:34, region:6, name:"広島県",   short:"広島",   kana:"ヒロシマ",     en:"hiroshima", neighbor:[]},
        {id:35, region:6, name:"山口県",   short:"山口",   kana:"ヤマグチ",     en:"yamaguchi", neighbor:[]},
        {id:36, region:7, name:"徳島県",   short:"徳島",   kana:"トクシマ",     en:"tokushima", neighbor:[]},
        {id:37, region:7, name:"香川県",   short:"香川",   kana:"カガワ",       en:"kagawa",    neighbor:[]},
        {id:38, region:7, name:"愛媛県",   short:"愛媛",   kana:"エヒメ",       en:"ehime",     neighbor:[]},
        {id:39, region:7, name:"高知県",   short:"高知",   kana:"コウチ",       en:"kochi",     neighbor:[]},
        {id:40, region:8, name:"福岡県",   short:"福岡",   kana:"フクオカ",     en:"fukuoka",   neighbor:[]},
        {id:41, region:8, name:"佐賀県",   short:"佐賀",   kana:"サガ",         en:"saga",      neighbor:[]},
        {id:42, region:8, name:"長崎県",   short:"長崎",   kana:"ナガサキ",     en:"nagasaki",  neighbor:[]},
        {id:43, region:8, name:"熊本県",   short:"熊本",   kana:"クマモト",     en:"kumamoto",  neighbor:[]},
        {id:44, region:8, name:"大分県",   short:"大分",   kana:"オオイタ",     en:"oita",      neighbor:[]},
        {id:45, region:8, name:"宮崎県",   short:"宮城",   kana:"ミヤザキ",     en:"miyazaki",  neighbor:[]},
        {id:46, region:8, name:"鹿児島県", short:"鹿児島", kana:"カゴシマ",     en:"kagoshima", neighbor:[]},
        {id:47, region:8, name:"沖縄県",   short:"沖縄",   kana:"オキナワ",     en:"okinawa",   neighbor:[]}
      ];


  // jPrefecture base object.
  function jPrefecture(){
    return this;
  }

  // Alias
  jp = jPrefecture;

  // Current Version
  jp.VERSION = VERSION;

  // client or node.js
  if( typeof module !== "undefined" && module.exports ){
    module.exports = jp;
  }else{
    root.jPrefecture = jp;
  }


  /**
   * 指定したタイプから配列を返す
   * @param string
   * @return array
   */
  function getList(type){
    var list;
    if( type === Type.REGION ) list = regions;
    else if( type === Type.PREFECTURE ) list = prefectures;
    return list;
  }

  
  /**
   * 同じ名前のライブラリとの衝突を避ける
   * @return jPrefecture
   */
  jp.noConflict = function(){
    root.jPrefecture = previousJprefecture;
    return this;
  };


  /**
   * 全ての地域、または都道府県を取得
   * @param string
   * @param string
   * @return array
   */
  jp.getAll = function(type, select){
    if( select === undefined ) return regions;
    return pluck(getList(type), select);
  };


  /**
   * 全ての地域を取得
   * @param string
   * @return array
   */
  jp.getAllRegions = function(select){
    return jp.getAll(Type.REGION, select);
  };


  /**
   * 全ての都道府県を取得
   * @param string
   * @return array
   */
  jp.getAllPrefectures = function(select){
    return jp.getAll(Type.PREFECTURE, select);
  };
  // console.log(jPrefecture.getAllPrefectures());
  // console.log(jPrefecture.getAllPrefectures("name"));
  // console.log(jPrefecture.getAllPrefectures(["id", "name", "region"]));


  /**
   * 地域または都道府県を、指定したキーと値から取得
   * `type`には下記が使用可能
   * - region
   * - prefecture
   * @param string
   * @param string | integer
   * @return object
   */
  jp.findBy = function(type, key, value){
    return find(getList(type), function(d){
      return d[key] === value;
    });
  };
  // console.log(jPrefecture.findBy("region", "name", "北海道")); //北海道
  // console.log(jPrefecture.findBy("region", "en", "tohoku")); //東北地方
  // console.log(jPrefecture.findBy("prefecture", "id", 42)); //長崎県


  /**
   * 地域または都道府県をIDから取得
   * @param string
   * @param integer
   * @return object
   */
  jp.regionFindBy = function(key, value){
    return jp.findBy(Type.REGION, key, value);
  };
  // console.log(jPrefecture.regionFindBy("name", "東北")); //東北地方
  // console.log(jPrefecture.regionFindBy("id", 1)); //北海道


  /**
   * 地域または都道府県をIDから取得
   * @param string
   * @param integer
   * @return object
   */
  jp.prefectureFindBy = function(key, value){
    return jp.findBy(Type.PREFECTURE, key, value);
  };
  // console.log(jPrefecture.prefectureFindBy("name", "鹿児島県")); //鹿児島県
  // console.log(jPrefecture.prefectureFindBy("id", 20)); //長野県

  




  /**
   * -------------------------------------------------------------
   * Decision Helpers
   * -------------------------------------------------------------
   */
  function isArray(val){
    return Object.prototype.toString.call(val) === "[object Array]";
  }

  function isObject(obj){
    var type = typeof obj;
    return type === "function" || type === "object" && !!obj && !isArray(obj);
  }

  function is(type, obj){
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }

  /**
   * -------------------------------------------------------------
   * Collection Helpers
   * -------------------------------------------------------------
   */
  function each(obj, iterate, context){
    if( obj === null ) return obj;
    context = context || obj;
    if( isObject(obj) ){
      for( key in obj ){
        if( iterate.call(context, obj[key], key) === false ) break;
      }
    }else if( isArray(obj) ){
      var i, length = obj.length;
      for( i = 0; i < length; i++ ){
        if( iterate.call(context, obj[i], i) === false ) break;
      }
    }
    return obj;
  }

  function map(obj, iterate, context){
    if( obj === null ) return [];
    var results = [], val;
    each(obj, function(d, i){
      val = iterate.call(context, d, i);
      if( val !== null ){
        results[i] = val;
      }
    });
    return results;
  }

  function find(obj, predicate){
    var result;
    each(obj, function(d, i){
      if( predicate(d, i) ){
        result = d;
        return false;
      }
    });
    return result;
  }

  function filter(obj, predicate){
    var results = [];
    if( obj === null ) return results;
    each(obj, function(d, i){
      if( predicate(d, i) ) results.push(d);
    });
    return results;
  }

  function pluck(obj, key){
    var results = [], o;
    if( obj === null ) return results;
    if( is("String", key) ){
      results = map(obj, function(d){
        return d[key];
      });
    }else if( isArray(key) ){
      results = map(obj, function(d){
        o = {};
        each(key, function(k){
          o[k] = d[k];
        });
        return o;
      });
    }
    return results;
  }

  function keys(obj){
    var keys = [];
    if( isObject(obj) || isArray(obj) ){
      each(obj, function(d, i){
        keys.push(i);
      });
    }
    return keys;
  }

  var testArray = [1, 3, 5, 7];
  var testObj = {
    key1: "value1",
    key2: "value2",
    key3: "value3"
  };
  var testArray2 = [
    {id: 1, name:"list1", en:"english1"},
    {id: 2, name:"list2", en:"english2"},
    {id: 3, name:"list3", en:"english3"}
  ];
  // console.log(map(testArray, function(d,i){ return d + 1; }));
  // console.log(map(testObj, function(d,i){ return d + "だよ"; }));
  // console.log(pluck(testArray2, "id"));
  // console.log(pluck(testArray2, "name"));
  // console.log(pluck(testArray2, ["id", "en"]));

}.call(this));
