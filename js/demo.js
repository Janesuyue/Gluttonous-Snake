
//思路：
//点击开始游戏   startpage消失   游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右    改变方向运动
//判断吃到食物   食物消失，蛇加一
//判读游戏结束，弹出框

var content = document.getElementById('content')
var startPage = document.getElementById('startPage')
var scoreBox = document.getElementById('score')
var lose = document.getElementById('lose')
var loserScore = document.getElementById('loserScore')
var close = document.getElementById('close')
var startP = document.getElementById('startP')
var startBtn = document.getElementById("startBtn")
var snakeMove;
var speed = 200;
var startGameBool = true;
var startPaushBool = true;
init();

/**
 * 存放初始化的参数
 */
function init() {
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    //食物的坐标
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    //蛇的坐标
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    // this.snakeBody = [[4, 3, 'head'], [3,3, 'body'], [3, 2, 'body']];
    
    //游戏属性  上下左右
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    bindEvent();
}

function startGame() {
    startPage.style.display = 'none'
    startP.style.display = 'block'
    food();
    snake();
}

/**
 * 随机生成食物
 */
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food')
}

/**
 * 出现一条蛇
 */
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        //判断蛇头自身的方向
        switch (this.direct) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)'
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)'
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)'
                break;
            default:
                break;
        }
    }
}


/**
 * 默认运动轨迹
 */
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    // 假设已经运动，存放方向
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        //吃到食物后自身加一
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }
        //吃到食物
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }

    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        // console.log(1)
        relodGame();
    }

    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        // console.log(1)
        relodGame();
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            // console.log(111)
            relodGame();
        }
    }
}

/**
 * 游戏结束，初始化游戏
 */
function relodGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);//清除定时器
    //默认坐标
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    lose.style.display = 'block';//弹出框
    loserScore.innerHTML = this.score;//弹出框内容更改
    this.score = 0;
    scoreBox.innerHTMl = this.score;//顶部分数
    //重新开始游戏
    startGameBool = true;
    startPaushBool = true;
    startP.innerHTML = '开始'
}


/**
 * 删除具有className 的元素
 * @param {*} className 
 */
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

/**
 * 判断上下左右方向
 * @param {*} code 
 */
function setDerict(code) {
    //判断游戏中，上下左右方向
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

/**
 * 监听页面
 */
function bindEvent() {
    //弹出框关闭按钮u
    close.onclick = function () {
        lose.style.display = 'none'
    }
    //开始游戏按钮
    startBtn.onclick = function () {
        startAddPaush();
    }
    //暂停，开始按钮
    startP.onclick = function () {
        startAddPaush();
    }
}

/**
 * 执行游戏
 */
function startAddPaush() {
    if (startPaushBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startP.innerHTML = '暂停';
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDerict(code);
        }
        snakeMove = setInterval(function () {
            move()
        }, speed)
        startPaushBool = false;
    } else {
        startP.innerHTML = '开始';
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        startPaushBool = true;
    }
}






