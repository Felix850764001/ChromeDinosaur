// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//设立一个基准难度系数 随时间增长 障碍物的速度、动画播放速度、分数增长均受基准难度系数控制 有阈值
//碰撞、小植物、碰撞动画、恐龙死亡所有动画暂停
cc.Class({
    extends: cc.Component,

    properties: {
        dinosaur: {
            default: null,
            type: cc.Node,
        },
        downRun: {
            default: null,
            type: cc.Node,
        },
        scoreLabel: {
            default: null,
            type: cc.Label,
        },
        stonePrefab: {
            default: null,
            type: cc.Prefab,
        },
        birdPrefab: {
            default: null,
            type: cc.Prefab,
        },
        plantPrefab: {
            default: null,
            type: cc.Prefab,
        },
        plantBPrefab: {
            default: null,
            type: cc.Prefab,
        },
        //陨石降落时间阈值
        stoneMaxDuration: 0,
        stoneMinDuration: 0,
        //植物出场时间阈值
        plantMaxDuration: 0,
        plantMinDuration: 0,
        //植物2出场时间阈值
        plantBMaxDuration: 0,
        plantBMinDuration: 0,
        //陨石X坐标阈值
        stoneMinX: 0,
        stoneMaxX: 0,
        //bird出场时间阈值
        birdMaxTime: 0,
        birdMinTime: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        //初始化downRun动画不可见
        this.downRun.active = false;
        this.stoneTime = 0;
        //初始化陨石对象池
        this.stonePool = new cc.NodePool;
        let stoneCount = 3;
        for(let i=0; i<stoneCount; i++){
            let newStone = cc.instantiate(this.stonePrefab);
            this.stonePool.put(newStone);
        }
        this.stoneDuration = Math.random();

        this.plantTime = 0;
        //初始化normal plant对象池
        this.plantPool = new cc.NodePool;
        let plantCount = 3;
        for(let i=0; i<plantCount; i++){
            let newPlant = cc.instantiate(this.plantPrefab);
            this.plantPool.put(newPlant);
        }
        this.plantDuration = Math.random();

        this.plantBTime = 0;
        //初始化plantB对象池
        this.plantBPool = new cc.NodePool;
        let plantBCount = 3;
        for(let i=0; i<plantBCount; i++){
            let newPlantB = cc.instantiate(this.plantBPrefab);
            this.plantBPool.put(newPlantB);
        }
        this.plantBDuration = Math.random();

        this.birdTime = 0;
        //初始化bird对象池
        this.birdPool = new cc.NodePool;
        let birdCount = 3;
        for(let i=0; i<birdCount; i++){
            let newBird = cc.instantiate(this.birdPrefab);
            this.birdPool.put(newBird);
        }
        this.birdDuration = Math.random();

        //初始化分数
        this.score = 0;

        //初始化键盘输入监听    (type, callback, target)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

     //取消键盘输入监听
     onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.s:
                if(this.dinosaur.y <= -162){
                    this.dinosaur.active = false;
                    this.downRun.active = true;
                }
        }
    },

    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.s:
                this.dinosaur.active = true;
                this.downRun.active = false;
        }
    },

    //陨石生成函数
    spawnNewStone: function(){
        if(this.stonePool.size() > 0){
            var newStone = this.stonePool.get();
        } else{
            var newStone = cc.instantiate(this.stonePrefab);
        }
        //添加到子节点
        this.node.addChild(newStone);
        //赋值陨石一个随机初始位置
        newStone.setPosition(this.newStonePosition());
        newStone.getComponent('stone').game = this;
        //重置计时器，陨石生成时间
        this.stoneTime = 0;
        this.stoneDuration = this.stoneMinDuration + Math.random()*(this.stoneMaxDuration - this.stoneMinDuration);
    },
    //陨石销毁
    onStoneKilled: function(newStone){
        this.stonePool.put(newStone);
    },
    //生成陨石位置
    newStonePosition: function(){
        let randX = this.stoneMinX + Math.random() * (this.stoneMaxX - this.stoneMinX);
        let randY = 280;
        return cc.v2(randX, randY);
    },

    //normal plant生成函数
    spawnNewPlant: function(){
        if(this.plantPool.size() > 0){
            var newPlant = this.plantPool.get();
        } else{
            var newPlant = cc.instantiate(this.plantPrefab);
        }
        this.node.addChild(newPlant);
        newPlant.setPosition(650,-156.5);
        newPlant.getComponent('plant').game = this;
        this.plantTime = 0;
        this.plantDuration = this.plantMinDuration + Math.random() * (this.plantMaxDuration - this.plantMinDuration);
    },
    //normal plant销毁
    onPlantKilled: function(newPlant){
        this.plantPool.put(newPlant);
    },
    
    //plantB生成函数
    spawnNewPlantB: function(){
        if(this.plantBPool.size() > 0){
            var newPlantB = this.plantBPool.get();
        } else{
            var newPlantB = cc.instantiate(this.plantBPrefab);
        }
        this.node.addChild(newPlantB);
        newPlantB.setPosition(650,-167);
        newPlantB.getComponent('plantB').game = this;
        this.plantBTime = 0;
        this.plantBDuration = this.plantBMinDuration + Math.random() * (this.plantBMaxDuration - this.plantBMinDuration);
    },
    //plantB销毁
    onPlantBKilled: function(newPlant){
        this.plantBPool.put(newPlant);
    },

    //bird生成函数
    spawnNewBird: function(){
        if(this.birdPool.size() > 0){
            var newBird = this.birdPool.get();
        } else{
            var newBird = cc.instantiate(this.birdPrefab);
        }
        this.node.addChild(newBird);
        newBird.setPosition(650, -90+Math.random()*(180));
        newBird.getComponent('bird').game = this;
        this.birdTime = 0;
        this.birdDuration = this.birdMinTime + Math.random() * (this.birdMaxTime - this.birdMinTime);
    },
    //bird销毁
    onBirdKilled: function(newBird){
        this.birdPool.get(newBird);
    },

    start () {

    },

    update: function(dt){
        //生成陨石,300分开始
        this.stoneTime += dt;
        if(this.stoneTime > this.stoneDuration && this.score > 300){
            this.spawnNewStone();
        }
        //生成normal plant
        this.plantTime += dt;
        if(this.plantTime > this.plantDuration){
            this.spawnNewPlant();
        }
        //生成plantB
        this.plantBTime += dt;
        if(this.plantBTime > this.plantBDuration){
            this.spawnNewPlantB();
        }
        //生成飞鸟,200分开始
        this.birdTime += dt;
        if(this.birdTime > this.birdDuration && this.score > 200){
            this.spawnNewBird();
        }
        this.score += 10*dt;
        this.scoreLabel.string = "score:" + Math.round(this.score / 1);
    },
});
