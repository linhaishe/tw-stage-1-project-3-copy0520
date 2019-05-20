window.onload = function () {

    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');

    let lastHole;//上一个洞口
    let timeUp = false;//游戏时间超时
    let score = 0;//游戏总分数
    let gameTime = 10000;//游戏时间


    startBtn.addEventListener('click', function () {
        showBtnAnimation();
        startGame();
    }, false);

    function showBtnAnimation() {
        event.preventDefault();

        startBtn.classList.add('animate');
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 700);
    }


    function startGame() {
        resetScoreAndTime();//游戏初始化设置
        peep();//老鼠出洞
        //箭头函数
        //setTimeout(JavaScript 函数, 等待的毫秒数)
        score = 0;
        timeUp = false;
        setTimeout(function(){
            timeUp = true;
            titleH1.innerText = 'TIME UP!';
            startBtn.innerText = 'Replay!';
            startBtn.style.display = 'inline-block';
        },10000);    
    }

    /**
     * 初始化设置.
     */
    function resetScoreAndTime() {
        // TODO: 写游戏的初始化设置
        //对每个洞初始化
        titleH1.innerHTML = 'WHACK-A-MOLE!';
        scoreBoard.textContent = 0;        
        setTimeout(() => timeUp = true,10000);
    }

    /**
     * 出洞.
     */
    function peep() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        comeOutAndStop(hole, time);
    }

    /**
     * 随机生成地鼠出洞的停留时间. 该时间其实是[min, max]间的随机数.
     *
     * @param min 随机数的下界.
     * @param max 随机数的上界.
     * @returns {number}
     */
    function randomTime(min, max) {
        // TODO: 写生成随机数的逻辑，
        return Math.floor(Math.random()*(max-min))+min;
        //return 0;
    }

    /**
     * 随机选择地鼠钻出的地洞，如果与上一个是相同地洞，则重新选择一个地洞.
     *
     * @param holes
     * @returns {*}
     */
    function randomHole(holes) {
        // TODO: 写地鼠随机选择钻出地洞的逻辑，如果与上一个是相同地洞，则重新选择一个地洞.
        //return null;
        const current = Math.floor(Math.random() * holes.length); 
        const hole = holes[current];
        if (hole === lastHole) {
            return randomHole(holes);
        }
        lastHole = hole;
        return hole; 
    }

    /**
     * 地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
     *
     * @param hole 地鼠所出地洞.
     * @param time 地鼠停留时间.
     */
    function comeOutAndStop(hole, time) {
        // TODO: 写地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
        hole.classList.add('up');
        setTimeout(() => {
          hole.classList.remove('up');
          if(!timeUp) peep();
        }, time);
    }

    /**
     * 打地鼠。为每个moles添加点击事件，点击后分数显示+1，地鼠入洞。
     */
    moles.forEach(mole => mole.addEventListener('click', function (e) {
        //JavaScript forEach() 方法
        // TODO: 在这里写用户点击地鼠发生的事.
        //if(timeUp==false){
            //alert("Please Start Game !");
           // return;
        //}
       // else{
            //if(document.getElementsByClassName("hole["+current+"]").innerHtml !=""){
                //score += 1;
                //scoreBoard.textContent = score;
                //document.getElementsByClassName("hole["+current+"]")//.innerHtml = '<img src="whack-a-mole\mole.svg">';
           // }

        //}
        if(!e.isTrusted) return; // cheater
        score ++;
        this.classList.remove('up');
        scoreBoard.textContent = score;
    }));
};