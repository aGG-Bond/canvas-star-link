/*
    *   画布和浏览器等高等宽
    *   画布中一共有自定义个点
    *       每个小圆点基础信息
    *           水平位置x，竖直位置y
    *           运动速度speedx，speedy
    *           半径 r
    *
    *   当两个点之间的距离小于某个值，则连线
    * */
function myCanvas(num) {
    this.canvas = document.getElementById('canvas');
    this.cxt = this.canvas.getContext('2d');
    // 画布宽高
    this.handleSize();
    // 小圆点数量
    this.num = num;
    // 存放小圆点的数组
    this.data = [];
    this.init();
}
myCanvas.prototype = {
    init() {
        this.saveData();
        this.move();
        // 鼠标移动
        document.addEventListener('mousemove',this.handleMove.bind(this));
        window.addEventListener('resize',this.handleSize.bind(this));
    },
    handleMove(e) {
        let x1 = e.clientX;
        let y1 = e.clientY;
        for(let i=0;i<this.num;i++) {
            let x2 = this.data[i].x;
            let y2 = this.data[i].y;
            if( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) <= 100*100) {
                this.line(x1,y1,x2,y2,null,'red');
            }
        }
    },
    handleSize() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    },
    saveData() {
        for(let i=0;i<this.num;i++) {
            this.data.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 2 + 1,
                speedX: Math.random() - 0.5,
                speedY: Math.random() - 0.5
            })
        }
    },
    circle(x,y,r) {
        this.cxt.beginPath();
        this.cxt.fillStyle = 'blue';
        this.cxt.arc(x, y, r, 0, Math.PI * 2);
        this.cxt.fill();
        this.cxt.closePath();
    },
    draw() {
        this.cxt.clearRect(0,0,window.innerWidth,innerHeight);
        for(let i=0;i<this.num;i++) {
            let x1 = this.data[i].x;
            let y1 = this.data[i].y;
            let r1 = this.data[i].r;
            this.circle(x1,y1,r1);
            for(let j= i+1;j<this.num;j++) {
                let x2 = this.data[j].x;
                let y2 = this.data[j].y;
                let r2 = this.data[j].r;
                if( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) <= 60*60) {
                    this.line(x1,y1,x2,y2);
                }
            }
            // 更新小圆点坐标
            this.data[i].x += this.data[i].speedX;
            this.data[i].y += this.data[i].speedY;
            // 边界检测
            if(this.data[i].x <0 || this.data[i].x > innerWidth) {
                this.data[i].speedX = -this.data[i].speedX;
            }
            if(this.data[i].y <0 || this.data[i].y > innerHeight) {
                this.data[i].speedY = -this.data[i].speedY;
            }
        }
    },
    line(x1,y1,x2,y2,colorStart,colorEnd) {
        colorStart = colorStart?colorStart:'#333';
        colorEnd = colorEnd?colorEnd:'blue';
        this.cxt.beginPath();
        let color = this.cxt.createLinearGradient(x1,y1,x2,y2);
        color.addColorStop(0,colorStart);
        color.addColorStop(1,colorEnd);
        this.cxt.strokeStyle = color;
        this.cxt.lineWidth = 2;
        this.cxt.moveTo(x1,y1);
        this.cxt.lineTo(x2,y2);
        this.cxt.stroke();
        this.cxt.closePath();
    },
    move() {
        setInterval(this.draw.bind(this),20)
    }
};
let x = new myCanvas(200);