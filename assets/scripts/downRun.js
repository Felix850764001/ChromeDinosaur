// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        downDead: {
            default: null,
            type: cc.Node,
        },
        dinosaur: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        //初始化碰撞
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;  //是否显示碰撞边框
    },
    onCollisionEnter: function (other, self){
        this.node.opacity = 0;
        this.downDead.opacity = 255;
        this.dinosaur.opacity = 0;
        cc.director.pause();
    },

    start () {

    },

    // update (dt) {},
});