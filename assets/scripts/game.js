// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//设立一个基准难度系数 随时间增长 障碍物的速度、动画播放速度、分数增长均受基准难度系数控制 有阈值
cc.Class({
    extends: cc.Component,

    properties: {
        dinosaur: {
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
        plantPrefab: {
            default: null,
            type: cc.Prefab,
        },
        //陨石降落时间阈值
        stoneMaxDuration: 0,
        stoneMinDuration: 0,
        //植物出场时间阈值
        plantMaxDuration: 0,
        plantMinDuration: 0,
        //陨石X坐标阈值
        stoneMinX: 0,
        stoneMaxX: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
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
        //初始化normal植物对象池
        this.plantPool = new cc.NodePool;
        let plantCount = 3;
        for(let i=0; i<plantCount; i++){
            let newPlant = cc.instantiate(this.plantPrefab);
            this.plantPool.put(newPlant);
        }
        this.plantDuration = Math.random();
        //初始化分数
        this.score = 0;
        //控制动画播放速度
        var anim = this.getComponent(cc.Animation);
        var animState = anim.play('bk_roll');
        animState.speed = 3;
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

    start () {

    },

    update: function(dt){
        //生成陨石
        this.stoneTime += dt;
        if(this.stoneTime > this.stoneDuration){
            this.spawnNewStone();
        }
        //生成植物
        this.plantTime += dt;
        if(this.plantTime > this.plantDuration){
            this.spawnNewPlant();
        }
        this.score += 10*dt;
        this.scoreLabel.string = "score:" + Math.round(this.score / 1);
    },
});
