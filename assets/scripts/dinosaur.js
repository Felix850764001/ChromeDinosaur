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

    setJumpAction: function(){
        var jumpUp = cc.jumpBy(this.jumpDuration, cc.v2(this.node.x, 0), this.jumpHeight, 1);
        return jumpUp;
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
                var jumpUp = cc.jumpBy(this.jumpDuration, cc.v2(this.node.x, 0), this.jumpHeight, 1);
                this.node.runAction(jumpUp);
                break;
        }
    },

    start () {

    },

    // update (dt) {},
});
