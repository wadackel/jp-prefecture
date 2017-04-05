jp-prefecture
=============

[![Travis](https://img.shields.io/travis/tsuyoshiwada/jp-prefecture.svg?style=flat-square)](https://travis-ci.org/tsuyoshiwada/jp-prefecture)
[![npm](https://img.shields.io/npm/v/jp-prefecture.svg?style=flat-square)](https://www.npmjs.com/package/jp-prefecture)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/tsuyoshiwada/jp-prefecture/master/LICENSE)

Utility library dealing with prefectures and regions in Japan.


## Install

### via NPM

```bash
$ npm install jp-prefecture --save
```

#### use

```javascript
var jpPrefecture = require("jp-prefecture");

jpPrefecture.__METHOD__();
```


### via Manual

1. Download the [jp-prefecture.min.js](https://raw.githubusercontent.com/tsuyoshiwada/jp-prefecture/master/jp-prefecture.min.js)
2. Load it in the `script` tag.

```html
<script type="text/javascript" src="jp-prefecture.min.js"></script>
```

#### use

```javascript
jpPrefecture.__METHOD__();
```


### via Bower (deprecated)

Bower is no maintenance.

```bash
$ bower install jp-prefecture --save
```


## Methods

### getAll

#### jpPrefecture.getAll(type, [select])

**type: {String}**  
**select: {String | Array}**  
**return: {Array}**

Get all regions or prefectures.

```javascript
var results = jpPrefecture.getAll("region");
console.log(results); // [Object, Object, Object ...]

results = jpPrefecture.getAll("pref", "name");
console.log(results); // ["北海道", "青森県", "岩手県", ...]

results = jpPrefecture.getAll("pref", ["id", "name"]);
console.log(results); // [{id:1, name:"北海道"}, {id:2, name:"青森県"}, ...]
```


### getAllRegion

#### jpPrefecture.getAllRegion([select])

**select: {String | Array}**  
**return: {Array}**

Alias for `getAll("region")`.

```javascript
var results = jpPrefecture.getAllRegion();
console.log(results); // [Object, Object, Object ...]

results = jpPrefecture.getAllRegion("name");
console.log(results); // ["北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州"]
```


### getAllPref

#### jpPrefecture.getAllPref([select])

**select: {String | Array}**  
**return: {Array}**

Alias for `getAll("pref")`.

```javascript
var results = jpPrefecture.getAllPref();
console.log(results); // [Object, Object, Object ...]

results = jpPrefecture.getAllPref("name");
console.log(results); // ["北海道", "青森県", "岩手県", "宮城県", ...]
```


### find

#### jpPrefecture.find(type, value, [select])

**type: {String}**  
**value: {Any}**  
**select: {String | Array}**  
**return: {Object}**

Get the single object of regional or prefectures.

```javascript
var result = jpPrefecture.find("region", "北海道");
console.log(result); // {id:1, name:"北海道", kana:"ホッカイドウ", en:"hokkaido", neighbor:[2]}

result = jpPrefecture.find("region", "北海道", "kana");
console.log(result); // "ホッカイドウ"

result = jpPrefecture.find("region", "北海道", ["id", "kana"]);
console.log(result); // {id:1, kana:"ホッカイドウ"}

result = jpPrefecture.find("pref", "東京都");
console.log(result); // {id:13, region:3, name:"東京都", short:"東京", kana:"トウキョウ", en:"tokyo", neighbor:[11, 12, 14, 19]}

result = jpPrefecture.find("hogefuga", false);
console.log( result ); // undefined
```


### regionFind

#### jpPrefecture.regionFind(value, [select])

**type: {String}**  
**value: {Any}**  
**select: {String | Array}**  
**return: {Object}**

Get the single object of regional. Alias for `find("region")`.

```javascript
var result = jpPrefecture.regionFind("北海道");
console.log(result); // {id:1, name:"北海道", kana:"ホッカイドウ", en:"hokkaido", neighbor:[2]}
```


### prefFind

#### jpPrefecture.prefFind(value, [select])

**type: {String}**  
**value: {Any}**  
**select: {String | Array}**  
**return: {Object}**

Get the single object of prefectures. Alias for `find("pref")`.

```javascript
var result = jpPrefecture.prefFind("東京都");
console.log(result); // {id:13, region:3, name:"東京都", short:"東京", kana:"トウキョウ", en:"tokyo", neighbor:[11, 12, 14, 19]}
```


### findBy

#### jpPrefecture.findBy(type, key, value, [select])

**type: {String}**  
**key: {String}**  
**value: {Any}**  
**select: {String | Array}**  
**return: {Object}**

By specifying the key and value, to get a single object of regional.

```javascript
var result = jpPrefecture.findBy("region", "id", 8);
console.log(result); // {id:8, name:"九州",   kana:"キュウシュウ", en:"kyusyu",   neighbor:[6, 7]}

result = jpPrefecture.findBy("region", "id", 8, "name");
console.log(result); // "九州"

result = jpPrefecture.findBy("region", "en", "chugoku", ["id", "name"]);
console.log(result); // {id:6, name:"中国"}

result = jpPrefecture.findBy("pref", "short", "宮城");
console.log(result); // {id:4, region:2, name:"宮城県", short:"宮城", kana:"ミヤギ", en:"miyagi", neighbor:[3, 5, 6, 7]}

result = jpPrefecture.findBy("hoge", "fuga");
console.log(result); // undefined
```


### regionFindBy

#### jpPrefecture.regionFindBy(key, value, [select])

**key: {String}**  
**value: {Any}**  
**select: {String | Array}**  
**return: {Object}**

Alias for `findBy("region")`.

```javascript
var result = jpPrefecture.regionFindBy("id", 8);
console.log(result); // {id:8, name:"九州", kana:"キュウシュウ", en:"kyusyu", neighbor:[6, 7]}
```


### prefFindBy

#### jpPrefecture.prefFindBy(key, value, [select])

**key: {String}**  
**value: {Any}**  
**select: {String | Array}**  
**return: {Object}**

Alias for `findBy("pref")`.

```javascript
var result = jpPrefecture.prefFindBy("id", 8);
console.log(result); // {id:8, region:3, name:"茨城県", short:"茨城", kana:"イバラキ", en:"ibaraki", neighbor:[7, 9, 11, 12]}
```


### regionFindByPref

#### jpPrefecture.regionFindByPref(value, [select])

**value: {Any}**  
**select: {String | Array}**  
**return: {Object}**

Get the region corresponding from prefectures.

```javascript
var result = jpPrefecture.regionFindByPref("東京");
console.log(result); // {id: 3, name: "関東", kana: "カントウ", en: "kanto", neighbor: Array[2]}

result = jpPrefecture.regionFindByPref("fukuoka", "name");
console.log(result); // "九州"

result = jpPrefecture.regionFindByPref("hoge");
console.log(result); // undefined
```


### prefFindByRegion

#### jpPrefecture.prefFindByRegion(value, [select])

**value: {Any}**  
**select: {String | Array}**  
**return: {Array}**

Get the prefectures corresponding from region.

```javascript
var results = jpPrefecture.prefFindByRegion("関東");
console.log(results); // [Object, Object, Object ...]

results = jpPrefecture.prefFindByRegion("関東", "name");
console.log(results); //  ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"]

results = jpPrefecture.prefFindByRegion("hoge", "fuga");
console.log(results); // undefined
```


### where

#### jpPrefecture.where(type, attrs, [select])

**type: {String}**  
**attrs: {Object}**  
**select: {String | Array}**  
**return: {Array}**

Get the regional or province apply to the given conditions.  
The return value is returned always an array.

```javascript
var results = jpPrefecture.where("region", {id:1});
console.log(results); // [{id:1, name:"北海道", kana:"ホッカイドウ", en:"hokkaido", neighbor:[2]}]

results = jpPrefecture.where("region", {id:1}, "name");
console.log(results); // ["北海道"]

results = jpPrefecture.where("pref", {region:3}, "name");
console.log(results); // ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"]

results = jpPrefecture.where("hoge", null);
console.log(results); // []
```


### regionWhere

#### jpPrefecture.regionWhere(attrs, [select])

**attrs: {Object}**  
**select: {String | Array}**  
**return: {Array}**

Alias for `where("region")`.

```javascript
var results = jpPrefecture.regionWhere({id:1});
console.log(results); // [{id:1, name:"北海道", kana:"ホッカイドウ", en:"hokkaido", neighbor:[2]}]
```


### prefWhere

#### jpPrefecture.prefWhere(attrs, [select])

**attrs: {Object}**  
**select: {String | Array}**  
**return: {Array}**

Alias for `where("pref")`.

```javascript
var results = jpPrefecture.prefWhere({region:3});
console.log(results); // ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"]
```


### convert

#### jpPrefecture.convert(type, value, key)

**type: {String}**  
**value: {Any}**  
**key: {String}**  
**return: {Any}**

Conversion from the specified value of the region or province to another key.

```javascript
var result = jpPrefecture.convert("region", "関東", "en");
console.log(result); // "kanto"

result = jpPrefecture.convert("region", "中国", "kana");
console.log(result); // "チュウゴク"

result = jpPrefecture.convert("pref", "ヒョウゴ", "name");
console.log(result); // "兵庫県"

result = jpPrefecture.convert("hoge", "fuga");
console.log(result); // undefined
```


### regionConvert

#### jpPrefecture.regionConvert(value, key)
**value: {Any}**  
**key: {String}**  
**return: {Any}**

Alias for `convert("region")`.

```javascript
var result = jpPrefecture.regionConvert("関東", "en");
console.log(result); // "kanto"

result = jpPrefecture.regionConvert("中国", "kana");
console.log(result); // "チュウゴク"
```


### prefConvert

#### jpPrefecture.prefConvert(value, key)

**value: {Any}**  
**key: {String}**  
**return: {Any}**

Alias for `convert("pref")`.

```javascript
var result = jpPrefecture.prefConvert("ヒョウゴ", "name");
console.log(result); // "兵庫県"

result = jpPrefecture.prefConvert("鳥取県", "en");
console.log(result); // "tottori"

result = jpPrefecture.prefConvert("大分県", "id");
console.log(result); // 44
```


### getNeighbors

#### jpPrefecture.getNeighbors(type, value, [select])

**type: {String}**  
**value: {Any}**  
**select: {String | Array}**  
**return: {Array}**

Get the ones that are adjacent to a given region or province.

```javascript
var results = jpPrefecture.getNeighbors("region", "関東");
console.log(results); // [Object, Object]

results = jpPrefecture.getNeighbors("region", "関東", "name");
console.log(results); // ["東北", "中部"]

results = jpPrefecture.getNeighbors("pref", "東京都", "en");
console.log(results); // ["saitama", "chiba", "kanagawa", "yamanashi"]

results = jpPrefecture.getNeighbors("pref", "hoge", "fuga");
console.log(results); // undefined
```


### getRegionNeighbors

#### jpPrefecture.getRegionNeighbors(value, [select])

**value: {Any}**  
**select: {String | Array}**  
**return: {Array}**

Alias for `getNeighbors("region")`.

```javascript
var results = jpPrefecture.getRegionNeighbors("関東");
console.log(results); // [Object, Object]

results = jpPrefecture.getRegionNeighbors("関東", "name");
console.log(results); // ["東北", "中部"]
```


### getPrefNeighbors

#### jpPrefecture.getPrefNeighbors(value, [select])

**value: {Any}**  
**select: {String | Array}**  
**return: {Array}**

Alias for `getNeighbors("pref")`.

```javascript
var results = jpPrefecture.getPrefNeighbors("東京都", "en");
console.log(results); // ["saitama", "chiba", "kanagawa", "yamanashi"]

results = jpPrefecture.getPrefNeighbors("hoge", "fuga");
console.log(results); // undefined
```


### isNeighbor

#### jpPrefecture.isNeighbor(type, val1, val2)

**type: {String}**  
**val1: {Any}**  
**val2: {Any}**  
**return: {Boolean}**

Determine if the specified two regions or prefectures were are adjacent.

```javascript
var result = jpPrefecture.isNeighbor("region", "関東", "東北");
console.log(result); // true

result = jpPrefecture.isNeighbor("region", "関東", "中国");
console.log(result); // false

result = jpPrefecture.isNeighbor("pref", "山形", "fukushima");
console.log(result); // true

result = jpPrefecture.isNeighbor("pref", "神奈川県", "hokkaido");
console.log(result); // false
```


### isRegionNeighbor

#### jpPrefecture.isRegionNeighbor(val1, val2)

**val1: {Any}**  
**val2: {Any}**  
**return: {Boolean}**

Alias for `isNeighbor("region")`.

```javascript
var result = jpPrefecture.isRegionNeighbor("関東", "東北");
console.log(result); // true

result = jpPrefecture.isRegionNeighbor("関東", "中国");
console.log(result); // false
```


### isPrefNeighbor

#### jpPrefecture.isPrefNeighbor(val1, val2)

**val1: {Any}**  
**val2: {Any}**  
**return: {Boolean}**

Alias for `isNeighbor("pref")`.

```javascript
var result = jpPrefecture.isPrefNeighbor("山形", "fukushima");
console.log(result); // true

result = jpPrefecture.isPrefNeighbor("神奈川県", "hokkaido");
console.log(result); // false
```


### neighborSize

#### jpPrefecture.neighborSize(type, value)

**type: {String}**  
**value: {Any}**  
**return: {Integer}**

Get the number of adjacent of the specified region.

```javascript
var result = jpPrefecture.neighborSize("region", "九州");
console.log(result); // 2

result = jpPrefecture.neighborSize("region", "tohoku");
console.log(result); // 1

result = jpPrefecture.neighborSize("region", "hoge");
console.log(result); // 0

result = jpPrefecture.neighborSize("pref", "tokyo");
console.log(result); // 4
```


### regionNeighborSize

#### jpPrefecture.regionNeighborSize(value)

**value: {Any}**  
**return: {Integer}**

Alias for `neighborSize("region")`.

```javascript
var result = jpPrefecture.regionNeighborSize("九州");
console.log(result); // 2

result = jpPrefecture.regionNeighborSize("tohoku");
console.log(result); // 1
```


### prefNeighborSize

#### jpPrefecture.prefNeighborSize(value)

**value: {Any}**  
**return: {Integer}**

Alias for `neighborSize("pref")`.

```javascript
var result = jpPrefecture.prefNeighborSize("北海道");
console.log(result); // 1

result = jpPrefecture.prefNeighborSize("ワカヤマ");
console.log(result); // 5
```


### getAllRegionInPref

#### jpPrefecture.getAllRegionInPref()

**return: {Array}**

Get a list of state that contains the prefectures corresponding to the region in the multidimensional array.  
This is useful when the loop of the list was based on the regional.

```javascript
console.log( jpPrefecture.getAllRegionInPref() );
/*
[
  0: {
    region: {id:1, name:"北海道", kana:"ホッカイドウ", en:"hokkaido", neighbor:[2]},
    prefectures: [
      {id:1,  region:1, name:"北海道",   short:"北海道", kana:"ホッカイドウ", en:"hokkaido",  neighbor:[2]},
    ]
  },
  1: {
    region: {id:2, name:"東北",   kana:"トウホク",     en:"tohoku",   neighbor:[1]},
    prefectures: [
      {id:2, region:2, name:"青森県", short:"青森", kana:"アオモリ", en:"aomori",    neighbor:[1, 3, 5]},
      {id:3, region:2, name:"岩手県", short:"岩手", kana:"イワテ",   en:"iwate",     neighbor:[2, 4, 5]},
      {id:4, region:2, name:"宮城県", short:"宮城", kana:"ミヤギ",   en:"miyagi",    neighbor:[3, 5, 6, 7]},
      {id:5, region:2, name:"秋田県", short:"秋田", kana:"アキタ",   en:"akita",     neighbor:[2, 3, 4, 6]},
      {id:6, region:2, name:"山形県", short:"山形", kana:"ヤマガタ", en:"yamagata",  neighbor:[4, 5, 7, 15]},
      {id:7, region:2, name:"福島県", short:"福島", kana:"フクシマ", en:"fukushima", neighbor:[4, 6, 8, 9, 10, 15]},
    ]
  },

  ...

]
*/
```



## Use DataList

Data regions and prefectures uses the following.  
Id prefectures correspond to those integer the region code of ISO.

> [全国地方公共団体コード](http://ja.wikipedia.org/wiki/%E5%85%A8%E5%9B%BD%E5%9C%B0%E6%96%B9%E5%85%AC%E5%85%B1%E5%9B%A3%E4%BD%93%E3%82%B3%E3%83%BC%E3%83%89#.E9.83.BD.E9.81.93.E5.BA.9C.E7.9C.8C.E3.82.B3.E3.83.BC.E3.83.89)

**Regions:**

```javascript
[
  {id:1, name:"北海道", kana:"ホッカイドウ", en:"hokkaido", neighbor:[2]},
  {id:2, name:"東北",   kana:"トウホク",     en:"tohoku",   neighbor:[1]},
  {id:3, name:"関東",   kana:"カントウ",     en:"kanto",    neighbor:[2, 4]},
  {id:4, name:"中部",   kana:"チュウブ",     en:"chubu",    neighbor:[2, 3, 5]},
  {id:5, name:"近畿",   kana:"キンキ",       en:"kinki",    neighbor:[4, 6, 7]},
  {id:6, name:"中国",   kana:"チュウゴク",   en:"chugoku",  neighbor:[5, 7, 8]},
  {id:7, name:"四国",   kana:"シコク",       en:"shikoku",  neighbor:[5, 6, 8]},
  {id:8, name:"九州",   kana:"キュウシュウ", en:"kyusyu",   neighbor:[6, 7]}
]
```

**Prefectures:**

```javascript
[
  {id:1,  region:1, name:"北海道",   short:"北海道", kana:"ホッカイドウ", en:"hokkaido",  neighbor:[2]},
  {id:2,  region:2, name:"青森県",   short:"青森",   kana:"アオモリ",     en:"aomori",    neighbor:[1, 3, 5]},
  {id:3,  region:2, name:"岩手県",   short:"岩手",   kana:"イワテ",       en:"iwate",     neighbor:[2, 4, 5]},
  {id:4,  region:2, name:"宮城県",   short:"宮城",   kana:"ミヤギ",       en:"miyagi",    neighbor:[3, 5, 6, 7]},
  {id:5,  region:2, name:"秋田県",   short:"秋田",   kana:"アキタ",       en:"akita",     neighbor:[2, 3, 4, 6]},
  {id:6,  region:2, name:"山形県",   short:"山形",   kana:"ヤマガタ",     en:"yamagata",  neighbor:[4, 5, 7, 15]},
  {id:7,  region:2, name:"福島県",   short:"福島",   kana:"フクシマ",     en:"fukushima", neighbor:[4, 6, 8, 9, 10, 15]},
  {id:8,  region:3, name:"茨城県",   short:"茨城",   kana:"イバラキ",     en:"ibaraki",   neighbor:[7, 9, 11, 12]},
  {id:9,  region:3, name:"栃木県",   short:"栃木",   kana:"トチギ",       en:"tochigi",   neighbor:[8, 7, 10, 11]},
  {id:10, region:3, name:"群馬県",   short:"群馬",   kana:"グンマ",       en:"gunma",     neighbor:[7, 9, 11, 15, 20]},
  {id:11, region:3, name:"埼玉県",   short:"埼玉",   kana:"サイタマ",     en:"saitama",   neighbor:[8, 9, 10, 12, 13, 19, 20]},
  {id:12, region:3, name:"千葉県",   short:"千葉",   kana:"チバ",         en:"chiba",     neighbor:[8, 11, 13, 14]},
  {id:13, region:3, name:"東京都",   short:"東京",   kana:"トウキョウ",   en:"tokyo",     neighbor:[11, 12, 14, 19]},
  {id:14, region:3, name:"神奈川県", short:"神奈川", kana:"カナガワ",     en:"kanagawa",  neighbor:[12, 13, 19, 22]},
  {id:15, region:4, name:"新潟県",   short:"新潟",   kana:"ニイガタ",     en:"niigata",   neighbor:[6, 7, 10, 16, 20]},
  {id:16, region:4, name:"富山県",   short:"富山",   kana:"トヤマ",       en:"toyama",    neighbor:[15, 17, 20, 21]},
  {id:17, region:4, name:"石川県",   short:"石川",   kana:"イシカワ",     en:"ishikawa",  neighbor:[16, 18, 21]},
  {id:18, region:4, name:"福井県",   short:"福井",   kana:"フクイ",       en:"fukui",     neighbor:[17, 21, 25, 26]},
  {id:19, region:4, name:"山梨県",   short:"山梨",   kana:"ヤマナシ",     en:"yamanashi", neighbor:[11, 13, 14, 20, 22]},
  {id:20, region:4, name:"長野県",   short:"長野",   kana:"ナガノ",       en:"nagano",    neighbor:[10, 11, 15, 16, 19, 21, 22, 23]},
  {id:21, region:4, name:"岐阜県",   short:"岐阜",   kana:"ギフ",         en:"gifu",      neighbor:[16, 17, 18, 20, 23, 24, 25]},
  {id:22, region:4, name:"静岡県",   short:"静岡",   kana:"シズオカ",     en:"shizuoka",  neighbor:[14, 19, 20, 23]},
  {id:23, region:4, name:"愛知県",   short:"愛知",   kana:"アイチ",       en:"aichi",     neighbor:[20, 21, 22, 24]},
  {id:24, region:5, name:"三重県",   short:"三重",   kana:"ミエ",         en:"mie",       neighbor:[21, 23, 25, 26, 29, 30]},
  {id:25, region:5, name:"滋賀県",   short:"滋賀",   kana:"シガ",         en:"shiga",     neighbor:[18, 21, 24, 26]},
  {id:26, region:5, name:"京都府",   short:"京都",   kana:"キョウト",     en:"kyoto",     neighbor:[18, 24, 25, 27, 28, 29]},
  {id:27, region:5, name:"大阪府",   short:"大阪",   kana:"オオサカ",     en:"osaka",     neighbor:[26, 28, 29, 30]},
  {id:28, region:5, name:"兵庫県",   short:"兵庫",   kana:"ヒョウゴ",     en:"hyogo",     neighbor:[26, 27, 30, 31, 33, 36, 37]},
  {id:29, region:5, name:"奈良県",   short:"奈良",   kana:"ナラ",         en:"nara",      neighbor:[24, 26, 27, 30]},
  {id:30, region:5, name:"和歌山県", short:"和歌山", kana:"ワカヤマ",     en:"wakayama",  neighbor:[24, 27, 28, 29, 36]},
  {id:31, region:6, name:"鳥取県",   short:"鳥取",   kana:"トットリ",     en:"tottori",   neighbor:[28, 32, 33, 34]},
  {id:32, region:6, name:"島根県",   short:"島根",   kana:"シマネ",       en:"shimane",   neighbor:[31, 34, 35]},
  {id:33, region:6, name:"岡山県",   short:"岡山",   kana:"オカヤマ",     en:"okayama",   neighbor:[28, 31, 34, 37]},
  {id:34, region:6, name:"広島県",   short:"広島",   kana:"ヒロシマ",     en:"hiroshima", neighbor:[31, 32, 33, 35, 37, 38]},
  {id:35, region:6, name:"山口県",   short:"山口",   kana:"ヤマグチ",     en:"yamaguchi", neighbor:[32, 34, 38, 40, 44]},
  {id:36, region:7, name:"徳島県",   short:"徳島",   kana:"トクシマ",     en:"tokushima", neighbor:[28, 30, 37, 38, 39]},
  {id:37, region:7, name:"香川県",   short:"香川",   kana:"カガワ",       en:"kagawa",    neighbor:[28, 33, 34, 36, 38]},
  {id:38, region:7, name:"愛媛県",   short:"愛媛",   kana:"エヒメ",       en:"ehime",     neighbor:[33, 34, 35, 36, 37, 39, 44]},
  {id:39, region:7, name:"高知県",   short:"高知",   kana:"コウチ",       en:"kochi",     neighbor:[36, 38]},
  {id:40, region:8, name:"福岡県",   short:"福岡",   kana:"フクオカ",     en:"fukuoka",   neighbor:[35, 41, 42, 43, 44]},
  {id:41, region:8, name:"佐賀県",   short:"佐賀",   kana:"サガ",         en:"saga",      neighbor:[40, 42]},
  {id:42, region:8, name:"長崎県",   short:"長崎",   kana:"ナガサキ",     en:"nagasaki",  neighbor:[41, 43]},
  {id:43, region:8, name:"熊本県",   short:"熊本",   kana:"クマモト",     en:"kumamoto",  neighbor:[40, 41, 42, 44, 45, 46]},
  {id:44, region:8, name:"大分県",   short:"大分",   kana:"オオイタ",     en:"oita",      neighbor:[35, 38, 40, 43, 45]},
  {id:45, region:8, name:"宮崎県",   short:"宮崎",   kana:"ミヤザキ",     en:"miyazaki",  neighbor:[43, 44, 46]},
  {id:46, region:8, name:"鹿児島県", short:"鹿児島", kana:"カゴシマ",     en:"kagoshima", neighbor:[43, 45, 47]},
  {id:47, region:8, name:"沖縄県",   short:"沖縄",   kana:"オキナワ",     en:"okinawa",   neighbor:[46]}
]
```


## Browser Support

* IE6 +
* Chrome
* Firefox
* Safari


## Author

[tsuyoshi wada](https://github.com/tsuyoshiwada/)



-------------



Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/tsuyoshiwada/jp-prefecture/issues)
