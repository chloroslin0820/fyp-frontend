const getFruitPids = (menuItem: string | undefined): string[] => {
    switch (menuItem) {
        case '蜜柑':
            return ['1', '7', '12', '13', '15', '19', '20', '35', '47', '50', '52', '57', '70', '125'];
        case '夏柑':
            return ['4', '17', '29', '46', '48', '53', '128'];
        case 'オレンジ':
            return ['5', '8'];
        case '文旦':
            return ['14', '34'];
        case 'デコポン':
            return ['3', '18', '55', '126'];
        case 'ゆず':
            return ['1'];
        case 'レモン':
            return ['30', '31', '33', '81'];
        case '仏手柑':
            return ['32'];
        case 'サンふじ':
            return ['56'];
        case '名月':
            return ['68'];
        case 'トキ':
            return ['69'];
        case '秋映':
            return ['73'];
        case 'シナノスイート':
            return ['74'];
        case 'シナノゴールド':
            return ['9', '75'];
        case 'ピンクレディー':
            return ['24'];
        case 'りんご詰合せ':
            return ['60'];
        case 'あまりん':
            return ['25'];
        case 'みおしずく':
            return ['2'];
        case '紅ほっぺ':
            return ['23'];
        case 'きらぴ香':
            return ['28'];
        case 'もういっこ':
            return ['42'];
        case '淡雪':
            return ['40'];
        case 'とちひめ':
            return ['21'];
        case 'やよいひめ':
            return ['26'];
        case 'かなみひめ':
            return ['49'];
        case '煌稀':
            return ['51'];
        case '桃薫':
            return ['27'];
        case '紅白セット':
            return ['39'];
        case '岡山白桃':
            return ['97', '109'];
        case 'あら川の桃':
            return ['117'];
        case '福島の桃':
            return ['107'];
        case '三つ星':
            return ['110'];
        case 'シャインマスカット':
            return ['66', '71', '77', '79', '106'];
        case '巨峰':
            return ['101'];
        case 'ピオーネ':
            return ['104', '111', '127'];
        case 'ナガノパープル':
            return ['76', '84'];
        case 'オーロラブラック':
            return ['99'];
        case 'クイーンニーナ':
            return ['105'];
        case 'クイーンルージュ':
            return ['83'];
        case 'ぶどう詰合せ':
            return ['78'];
        case 'ラ．フランス':
            return ['36', '58', '62'];
        case 'ル レクチェ':
            return ['65'];
        case '二十世紀梨':
            return ['90'];
        case '幸水':
            return ['86'];
        case '豊水':
            return ['87'];
        case '日迎':
            return ['64'];
        case '王秋':
            return ['72'];
        case 'かおり':
            return ['80'];
        case 'あきあかり':
            return ['102'];
        case 'にっこり':
            return ['103'];
        case 'グラン．べべ':
            return ['37'];
        case '万葉':
            return ['88', '116'];
        case '日原':
            return ['112'];
        case '赤青メロンセット':
            return ['100'];
        case '篤壌スイカ':
            return ['11', '38'];
        case 'アンテナスイカ':
            return ['16', '115'];
        case '羅皇':
            return ['95'];
        case '太陽の子':
            return ['120'];
        case 'アップルマンゴー':
            return ['108', '114'];
        case 'りぐっちょキーツマンゴー':
            return ['98'];
        case 'かき':
            return ['61', '67', '96'];
        case 'くり':
            return ['63', '89', '91', '92'];
        case 'すもも':
            return ['94', '129', '85'];
        case 'うめ':
            return ['119'];
        case 'さくらんぼ':
            return ['45', '124'];
        case 'ライチ':
            return ['122', '123'];
        case 'パイン':
            return ['6', '113'];
        case 'びわ':
            return ['10'];
        case 'いちじく':
            return ['82', '93'];
        case 'パッションフルーツ':
            return ['22'];
        case 'アテモヤ':
            return ['41'];
        case 'バナナ':
            return ['43'];
        case 'キウィフルーツ':
            return ['54', '59'];
        case 'ブラックベリー':
            return ['44'];
        case 'ブルーベリー':
            return ['118'];

        default:
            return [];
    }
};

export default getFruitPids;