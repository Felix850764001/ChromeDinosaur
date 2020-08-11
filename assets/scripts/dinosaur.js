// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jumpDuration: 0,
        jumpHeight: 0,
        dead: {
            default: null,
            type: cc.Node,
        },
    },

    setJumpAction: function(){
        //  向上跳
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.sequence(jumpUp, jumpDown);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //初始化键盘输入监听    (type, callback, target)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        //初始化碰撞
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;  //是否显示碰撞边框
    },
    onCollisionEnter: function (other, self){
        this.node.opacity = 0;
        this.dead.opacity = 255;
        //暂停游戏
        cc.director.pause();
    },

    onKeyDown(event){
        //console.log("keydown");     经测验可以进入keyDown
        switch(event.keyCode){
            case cc.macro.KEY.w:
                //console.log("w");    经验证可以判断出按下了W
                if(this.node.y < -166){       //限制无限跳       //无法进入判断
                    //console.log("jump");
                    this.jumpAction = this.setJumpAction();  //赋值setJumpAction方法
                    this.node.runAction(this.jumpAction);
                }
                break;
            case cc.macro.KEY.s:
                if(this.node.y > -167){
                    this.node.stopAction(this.jumpAction);
                    var moveDown = cc.moveTo(0.1, this.node.x,-167);
                    this.node.runAction(moveDown);
                }
                break;
        }
    },


    start () {

    },

    update: function(dt){
        this.dead.x = this.node.x;
        this.dead.y = this.node.y;
    },
});