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

    newStonePosition: function(){
        let randX = 160 + Math.random() * 400;
        let randY = 290;
        return cc.v2(randX, randY);
    },

    start () {

    },

    update: function(dt){
        //生成陨石
        this.stoneTime += dt;
        if(this.stoneTime > this.stoneDuration){
            console.log("生成陨石");
            this.spawnNewStone();
        }
    },
});
