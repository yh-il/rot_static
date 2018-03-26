<template>
    <div class="rot">
        <h1>{{ msg }}</h1>

        <a href="https://www.mizuhobank.co.jp/retail/takarakuji/loto/loto6/index.html" target="_blank" class="beforeNum">before num</a>

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
            <li v-on:click="toggleActive">38</li>
            <li v-on:click="toggleActive">39</li>
            <li v-on:click="toggleActive">40</li>
            <li v-on:click="toggleActive">41</li>
            <li v-on:click="toggleActive">42</li>
            <li v-on:click="toggleActive">43</li>
        </ul>
        <button v-on:click="done" class="done">DONE</button>
    </div>
</template>

<script>
    export default {
        name: 'Rot',
        data() {
            return {
                msg: 'This is Rot Application'
            }
        },
        methods: {
            toggleActive: function (e) {
                // クリックしたボタンをアクティブにする
                if (e.currentTarget.className === 'active') {
                    e.currentTarget.className = '';
                } else {
                    e.currentTarget.className = 'active';
                }
            },
            done: function () {
                // 選択されている数字を取得
                let selectNumsDom = document.querySelectorAll('.numList li.active');
                let selectNums = [];
                for (let i = 0; i < selectNumsDom.length; i++) {
                    selectNums.push(Number(selectNumsDom[i].textContent));
                }
                let allNums = this.exclusion(selectNums);
                allNums = this.shuffle(allNums);
                let pickNums = this.pick(allNums, 6);
                alert(pickNums);
            },
            exclusion: function(selectNums) {
                // 前回の当選番号を除外
                let allNums = [];
                for (let i = 1; i < 44; i++) {
                    allNums.push(i);
                }
                for (let i = 0; i < selectNums.length; i++) {
                    let index = allNums.indexOf(selectNums[i]);
                    allNums.splice(index, 1);
                }
                return allNums;
            },
            shuffle: function(allNums) {
                // 並び替え
                for (let i = allNums.length - 1; i > 0; i--) {
                    let r = Math.floor(Math.random() * (i + 1));
                    let tmp = allNums[i];
                    allNums[i] = allNums[r];
                    allNums[r] = tmp;
                }
                return allNums;
            },
            pick: function(allNums, range) {
                // 指定した桁だけ頭から数字を抜き出す
                let randomNums = allNums.slice(0, range);
                randomNums.sort();
                return randomNums;
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
        margin-bottom: 30px;
        font-size: 14px;
        color: #555;
        border: 1px solid #fdd;
        background: #fee;
    }

</style>


