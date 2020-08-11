// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        //初始化碰撞
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;  //是否显示碰撞边框
    },
    onCollisionEnter: function (other, self){
        if(other.tag == 4){  //和stone碰撞
            this.game.onPlantKilled(this.node);
        } else if(other.tag == 2){   //和plantB碰撞
            console.log('plant碰撞plantB');
            this.game.onPlantKilled(this.node);
        }
    },

    start () {

    },

    update: function(dt){
        this.node.x -= this.speed * dt;
        if(this.node.x < -600){
            this.game.onPlantKilled(this.node);
        }
    },
});