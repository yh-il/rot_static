<template>
    <div class="rot">
        <h1>{{ msg }}</h1>

        <a href="https://www.mizuhobank.co.jp/retail/takarakuji/loto/loto7/index.html" target="_blank" class="beforeNum">before num</a>

        <ul class="numList">
            <li v-on:click="toggleActive">1</li>
            <li v-on:click="toggleActive">2</li>
            <li v-on:click="toggleActive">3</li>
            <li v-on:click="toggleActive">4</li>
            <li v-on:click="toggleActive">5</li>
            <li v-on:click="toggleActive">6</li>
            <li v-on:click="toggleActive">7</li>
            <li v-on:click="toggleActive">8</li>
            <li v-on:click="toggleActive">9</li>
            <li v-on:click="toggleActive">10</li>
            <li v-on:click="toggleActive">11</li>
            <li v-on:click="toggleActive">12</li>
            <li v-on:click="toggleActive">13</li>
            <li v-on:click="toggleActive">14</li>
            <li v-on:click="toggleActive">15</li>
            <li v-on:click="toggleActive">16</li>
            <li v-on:click="toggleActive">17</li>
            <li v-on:click="toggleActive">18</li>
            <li v-on:click="toggleActive">19</li>
            <li v-on:click="toggleActive">20</li>
            <li v-on:click="toggleActive">21</li>
            <li v-on:click="toggleActive">22</li>
            <li v-on:click="toggleActive">23</li>
            <li v-on:click="toggleActive">24</li>
            <li v-on:click="toggleActive">25</li>
            <li v-on:click="toggleActive">26</li>
            <li v-on:click="toggleActive">27</li>
            <li v-on:click="toggleActive">28</li>
            <li v-on:click="toggleActive">29</li>
            <li v-on:click="toggleActive">30</li>
            <li v-on:click="toggleActive">31</li>
            <li v-on:click="toggleActive">32</li>
            <li v-on:click="toggleActive">33</li>
            <li v-on:click="toggleActive">34</li>
            <li v-on:click="toggleActive">35</li>
            <li v-on:click="toggleActive">36</li>
            <li v-on:click="toggleActive">37</li>
        </ul>

        <small>単純に選択されている数字を除外</small>
        <button v-on:click="staticDone" class="done">STATIC DONE</button><br><br>

        <small>選択されている数字を除外<br>実行する度に出た結果を除外<br>その中から毎回6桁を抽出<br>いずれ選択肢がなくなる</small>
        <button v-on:click="exclusionDone" class="done">EXCLUSION DONE</button><br><br>

        <small>選択されている数字を除外<br>5回分の結果を集計し<br>その中から6桁を抽出<br>最初に集計した結果を繰り返し利用する。</small>
        <button v-on:click="exclisionChoiseDone" class="done">EXCLUSION CHOISE DONE</button><br><br>

        <button v-on:click="clear" class="clear">CLEAR</button>
        <!-- <p v-html="resultNum" class="resultNum"></p> -->
        <table v-html="resultNum" class="resultNum"></table>
    </div>
</template>

<script>
    export default {
        name: 'Rot7',
        data() {
            return {
                msg: 'This is Rot7 Application',
                selectNums: [],
                allNums: [],
                resultNum: '',
                aggregateNums: [],
                exclusionNums: []
            }
        },
        /**
         * ページ読み込み時に実行
         */
        created: function () {
        },
        methods: {
            /**
             * クリックしたボタンをアクティブにする
             */
            toggleActive: function (e) {
                if (e.currentTarget.className === 'active') {
                    e.currentTarget.className = '';
                } else {
                    e.currentTarget.className = 'active';
                }
            },
            /**
             * 選択されている数字を設定
             */
            setSelectNum: function () {
                let selectNumsDom = document.querySelectorAll('.numList li.active');
                let selectNums = [];
                for (let i = 0; i < selectNumsDom.length; i++) {
                    selectNums.push(Number(selectNumsDom[i].textContent));
                }
                this.selectNums = selectNums;
            },
            /**
             * 単純に選択されている数字のみを除外
             */
            staticDone: function () {
                this.setSelectNum();
                this.setAllNums();

                // 除外→並び替え→選定
                let exNums = this.exclusion(this.allNums, this.selectNums);
                exNums = this.shuffle(exNums);
                let pickNums = this.pick(exNums, 7);

                // 結果表示
                this.display(pickNums);
            },
            /**
             * まず選択されている数字を除外、
             * 実行する度に出た結果を除外、
             * その中から毎回6桁を抽出、
             * いずれ選択肢がなくなる
             */
            exclusionDone: function () {
                this.setSelectNum();
                this.setAllNums();

                // 初回だけ全ての数字を入れる
                if (this.exclusionNums.length === 0) {
                    this.exclusionNums = this.allNums;
                }

                // 選択した数字を除外
                let exNums = [];
                exNums = this.exclusion(this.exclusionNums, this.selectNums);

                // 並び替え
                this.exclusionNums = this.shuffle(exNums);

                // 7桁抽出
                let pickNums = this.pick(this.exclusionNums, 7);

                // 結果表示
                this.display(pickNums);
                console.log(this.exclusionNums);


                // 今回の結果を除外
                this.exclusionNums = this.exclusion(this.exclusionNums, pickNums);
            },
            /**
             * 選択されている数字を除外、
             * 5回分の結果を集計し、その中から6桁を抽出。
             * 最初に集計した結果を繰り返し利用する。
             */
            exclisionChoiseDone: function () {
                this.setSelectNum();
                this.setAllNums();

                // 選択してる数字を除外
                let exNums = [];
                exNums = this.exclusion(this.allNums, this.selectNums);

                // 7桁抽出してresultNumsに合体させていく(5回分)
                let pickNums = [];
                let resultNums = [];
                for (let i = 0; i < 7; i++) {
                    exNums = this.shuffle(exNums);
                    pickNums = this.pick(exNums, 7);
                    resultNums = resultNums.concat(pickNums)
                }

                // 配列内の重複した数字を削除
                resultNums = this.arrayUnique(resultNums);

                // 初回だけ抽出結果を格納
                if (this.aggregateNums.length === 0) {
                    this.aggregateNums = resultNums;
                }

                // 並び替え
                let res = this.shuffle(this.aggregateNums);

                // 6桁抽出
                res = this.pick(res, 7);

                // ソート
                res = res.sort();

                // 結果表示
                this.display(res);
            },
            /**
             * 全ての選択肢の数字を設定
             */
            setAllNums: function () {
                let allNums = [];
                for (let i = 1; i < 38; i++) {
                    allNums.push(i);
                }
                this.allNums = allNums;
            },
            /**
             * 結果をクリア
             */
            clear: function () {
                this.resultNum = '';
                this.allNums = [];
                this.selectNums = [];
                this.aggregateNums = [];
                this.exclusionNums = [];
            },
            /**
             * 結果表示
             */
            display: function (result) {
                this.resultNum = this.resultNum + '<tr><td>' + result[0] + '</td>' + '<td>' +result[1] + '</td>' + '<td>' +result[2] + '</td>' + '<td>' +result[3] + '</td>' + '<td>' +result[4] + '</td>' + '<td>' +result[5] + '</td>' + '<td>' +result[6] + '</td></tr>';
                // this.resultNum = result;
            },
            /**
             * 第一引数の数字から、第二引数の数字を削除
             */
            exclusion: function(allNums, selectNums) {
                for (let i = 0; i < selectNums.length; i++) {
                    let index = allNums.indexOf(selectNums[i]);
                    allNums.splice(index, 1);
                }
                return allNums;
            },
            /**
             * 並び替え
             */
            shuffle: function(allNums) {
                for (let i = allNums.length - 1; i > 0; i--) {
                    let r = Math.floor(Math.random() * (i + 1));
                    let tmp = allNums[i];
                    allNums[i] = allNums[r];
                    allNums[r] = tmp;
                }
                return allNums;
            },
            /**
             * 指定した桁だけ頭から数字を抜き出す
             */
            pick: function(allNums, range) {
                let randomNums = allNums.slice(0, range);
                randomNums.sort();
                return randomNums;
            },
            /**
             * 配列の中から重複している要素を削除
             */
            arrayUnique: function (array) {
                return array.filter( function( value, index ) {
                    return index === array.indexOf( value ) ;
                } ) ;
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        font-weight: normal;
        font-size: 20px;
    }

    .beforeNum {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #555;
        background: aliceblue;
        border: 1px solid #eef;
        font-size: 18px;
        text-decoration: none;
    }

    ul {
        width: 96vw;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0;
    }

    li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 68px;
        height: 68px;
        margin-bottom: 8px;
        background: #eee;
        border: 1px solid #aaa;
        color: #555;
    }

    li.active {
        background: #ee0;
    }

    .done {
        width: 100%;
        height: 50px;
        margin-bottom: 8px;
        font-size: 14px;
        color: #555;
        border: none;
        background: #fee;
    }

    .clear {
        width: 100%;
        height: 50px;
        margin: 8px 0 16px;
        font-size: 14px;
        color: #555;
        border: none;
        background: #efe;
    }

    .resultNum {
        width: 100%;
        height: auto;
        min-height: 50px;
        background: #eee;
        margin: 0;
        font-size: 18px;
    }

</style>


