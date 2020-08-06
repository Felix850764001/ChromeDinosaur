// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        dinosaur: {
            default: null,
            type: cc.Node,
        },
        stonePrefab: {
            default: null,
            type: cc.Prefab,
        },
        stoneMaxDuration: 0,
        stoneMinDuration: 0,
        stoneMinX: 0,
        stoneMaxX: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        //console.log("进入onload");
        this.stoneTime = 0;
        //初始化陨石对象池
        this.stonePool = new cc.NodePool;
        let stoneCount = 3;
        for(let i=0; i<stoneCount; i++){
            let newStone = cc.instantiate(this.stonePrefab);
            this.stonePool.put(newStone);
        }
        this.spawnNewStone();
    },

    //陨石生成函数
    spawnNewStone: function(){
        console.log("生成陨石");
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
        let randY = 290;
        return cc.v2(randX, randY);
    },

    start () {

    },

    update: function(dt){
        //生成陨石
        this.stoneTime += dt;
        if(this.stoneTime > this.stoneDuration){
            console.log("生成陨石时间");
            this.spawnNewStone();
        }
    },
});
