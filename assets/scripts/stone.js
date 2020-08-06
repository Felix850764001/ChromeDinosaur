// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        maxSpeed: 0,
        minSpeed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        this.speedX = this.minSpeed*2 + Math.random() * (this.maxSpeed - this.minSpeed);
        this.speedY = this.minSpeed/2 + Math.random() * (this.maxSpeed - this.minSpeed);
    },

    start () {

    },

    update: function(dt){
        this.node.x -= dt * this.speedX;
        this.node.y -= dt * this.speedY;
        if(this.node.x < -600 || this.node.y < -162){
            this.game.onStoneKilled(this.node);
        }
    },
});
