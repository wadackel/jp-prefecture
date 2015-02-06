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
        {id:1, name:"北海道", kana:"", kana_short:"", kana_short:"", en:"hokkaido", neighbor:[]},
        {id:2, name:"東北",   kana:"", kana_short:"", kana_short:"", en:"tohoku", neighbor:[]},
        {id:3, name:"関東",   kana:"", kana_short:"", kana_short:"", en:"kanto", neighbor:[]},
        {id:4, name:"中部",   kana:"", kana_short:"", kana_short:"", en:"chubu", neighbor:[]},
        {id:5, name:"近畿",   kana:"", kana_short:"", kana_short:"", en:"kinki", neighbor:[]},
        {id:6, name:"中国",   kana:"", kana_short:"", kana_short:"", en:"chugoku", neighbor:[]},
        {id:7, name:"四国",   kana:"", kana_short:"", kana_short:"", en:"shikoku", neighbor:[]},
        {id:8, name:"九州",   kana:"", kana_short:"", kana_short:"", en:"kyusyu", neighbor:[]}
      ],
      prefectures = [
        {id:1,  region:1, name:"北海道",   short:"", kana:"", kana_short:"", en:"hokkaido", neighbor:[]},
        {id:2,  region:2, name:"青森県",   short:"", kana:"", kana_short:"", en:"aomori", neighbor:[]},
        {id:3,  region:2, name:"岩手県",   short:"", kana:"", kana_short:"", en:"iwate", neighbor:[]},
        {id:4,  region:2, name:"宮城県",   short:"", kana:"", kana_short:"", en:"miyagi", neighbor:[]},
        {id:5,  region:2, name:"秋田県",   short:"", kana:"", kana_short:"", en:"akita", neighbor:[]},
        {id:6,  region:2, name:"山形県",   short:"", kana:"", kana_short:"", en:"yamagata", neighbor:[]},
        {id:7,  region:2, name:"福島県",   short:"", kana:"", kana_short:"", en:"fukushima", neighbor:[]},
        {id:8,  region:3, name:"茨城県",   short:"", kana:"", kana_short:"", en:"ibaraki", neighbor:[]},
        {id:9,  region:3, name:"栃木県",   short:"", kana:"", kana_short:"", en:"tochigi", neighbor:[]},
        {id:10, region:3, name:"群馬県",   short:"", kana:"", kana_short:"", en:"gunma", neighbor:[]},
        {id:11, region:3, name:"埼玉県",   short:"", kana:"", kana_short:"", en:"saitama", neighbor:[]},
        {id:12, region:3, name:"千葉県",   short:"", kana:"", kana_short:"", en:"chiba", neighbor:[]},
        {id:13, region:3, name:"東京都",   short:"", kana:"", kana_short:"", en:"tokyo", neighbor:[]},
        {id:14, region:3, name:"神奈川県", short:"", kana:"", kana_short:"", en:"kanagawa", neighbor:[]},
        {id:15, region:4, name:"新潟県",   short:"", kana:"", kana_short:"", en:"niigata", neighbor:[]},
        {id:16, region:4, name:"富山県",   short:"", kana:"", kana_short:"", en:"toyama", neighbor:[]},
        {id:17, region:4, name:"石川県",   short:"", kana:"", kana_short:"", en:"ishikawa", neighbor:[]},
        {id:18, region:4, name:"福井県",   short:"", kana:"", kana_short:"", en:"fukui", neighbor:[]},
        {id:19, region:4, name:"山梨県",   short:"", kana:"", kana_short:"", en:"yamanashi", neighbor:[]},
        {id:20, region:4, name:"長野県",   short:"", kana:"", kana_short:"", en:"nagano", neighbor:[]},
        {id:21, region:4, name:"岐阜県",   short:"", kana:"", kana_short:"", en:"gifu", neighbor:[]},
        {id:22, region:4, name:"静岡県",   short:"", kana:"", kana_short:"", en:"shizuoka", neighbor:[]},
        {id:23, region:4, name:"愛知県",   short:"", kana:"", kana_short:"", en:"aichi", neighbor:[]},
        {id:24, region:5, name:"三重県",   short:"", kana:"", kana_short:"", en:"mie", neighbor:[]},
        {id:25, region:5, name:"滋賀県",   short:"", kana:"", kana_short:"", en:"shiga", neighbor:[]},
        {id:26, region:5, name:"京都府",   short:"", kana:"", kana_short:"", en:"kyoto", neighbor:[]},
        {id:27, region:5, name:"大阪府",   short:"", kana:"", kana_short:"", en:"osaka", neighbor:[]},
        {id:28, region:5, name:"兵庫県",   short:"", kana:"", kana_short:"", en:"hyogo", neighbor:[]},
        {id:29, region:5, name:"奈良県",   short:"", kana:"", kana_short:"", en:"nara", neighbor:[]},
        {id:30, region:5, name:"和歌山県", short:"", kana:"", kana_short:"", en:"wakayama", neighbor:[]},
        {id:31, region:6, name:"鳥取県",   short:"", kana:"", kana_short:"", en:"tottori", neighbor:[]},
        {id:32, region:6, name:"島根県",   short:"", kana:"", kana_short:"", en:"shimane", neighbor:[]},
        {id:33, region:6, name:"岡山県",   short:"", kana:"", kana_short:"", en:"okayama", neighbor:[]},
        {id:34, region:6, name:"広島県",   short:"", kana:"", kana_short:"", en:"hiroshima", neighbor:[]},
        {id:35, region:6, name:"山口県",   short:"", kana:"", kana_short:"", en:"yamaguchi", neighbor:[]},
        {id:36, region:7, name:"徳島県",   short:"", kana:"", kana_short:"", en:"tokushima", neighbor:[]},
        {id:37, region:7, name:"香川県",   short:"", kana:"", kana_short:"", en:"kagawa", neighbor:[]},
        {id:38, region:7, name:"愛媛県",   short:"", kana:"", kana_short:"", en:"ehime", neighbor:[]},
        {id:39, region:7, name:"高知県",   short:"", kana:"", kana_short:"", en:"kochi", neighbor:[]},
        {id:40, region:8, name:"福岡県",   short:"", kana:"", kana_short:"", en:"fukuoka", neighbor:[]},
        {id:41, region:8, name:"佐賀県",   short:"", kana:"", kana_short:"", en:"saga", neighbor:[]},
        {id:42, region:8, name:"長崎県",   short:"", kana:"", kana_short:"", en:"nagasaki", neighbor:[]},
        {id:43, region:8, name:"熊本県",   short:"", kana:"", kana_short:"", en:"kumamoto", neighbor:[]},
        {id:44, region:8, name:"大分県",   short:"", kana:"", kana_short:"", en:"oita", neighbor:[]},
        {id:45, region:8, name:"宮崎県",   short:"", kana:"", kana_short:"", en:"miyazaki", neighbor:[]},
        {id:46, region:8, name:"鹿児島県", short:"", kana:"", kana_short:"", en:"kagoshima", neighbor:[]},
        {id:47, region:8, name:"沖縄県",   short:"", kana:"", kana_short:"", en:"okinawa", neighbor:[]}
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
