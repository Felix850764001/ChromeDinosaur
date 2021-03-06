// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speedX: 0,
        speedY: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        //初始化碰撞
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;  //是否显示碰撞边框
    },

    start () {

    },

    update: function(dt){
        this.node.x -= dt * this.speedX;
        this.node.y -= dt * this.speedY;
        if(this.node.x < -600 || this.node.y < -167){
            this.game.onStoneKilled(this.node);
        }
    },
});