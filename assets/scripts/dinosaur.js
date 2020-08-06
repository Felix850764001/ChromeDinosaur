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
    },

    setJumpAction: function(){       //让主角跳起来
        //  向上跳
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 不断重复
        return cc.sequence(jumpUp, jumpDown);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
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
            case cc.macro.KEY.w:
                if(this.node.y < -162){       //限制无限跳
                    console.log("进入循环");
                    this.jumpAction = this.setJumpAction();  //赋值setJumpAction方法
                    this.node.runAction(this.jumpAction);
                }
                break;
        }
    },


    start () {

    },

    // update (dt) {},
});
