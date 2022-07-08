addLayer("x", { 
    symbol: "X",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "brown",
    resource: "肌肉",
    type: "normal",
    requires:new ExpantaNum(100),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"%",
    update(diff){
        if(inChallenge("c",11)){return}
        let cap = new ExpantaNum(100)
        cap=cap.add(buyableEffect("x",11))
        player.points = player.points.min(cap)
    },
    // achievements: {
    //     rows: 1,
    //     cols: 1,
    //     11: {
    //         name: "全词缀!!!",
    //         unlocked(){
    //             let x=zero
    //             x=x.add(player.c.upgrades.length)
    //             return x.gte(25)}
    //     },
    // },
    gainMult() {
        mult = new ExpantaNum(1)
        let x=zero
        x=x.add(player.c.upgrades.length)
        mult=mult.mul(two.pow(x))
        if(inChallenge("c",11))
        {
            let y=one
            y=y.add(player.x.points)
            if(hasUpgrade("x",21))mult=mult.mul(y)
            mult=mult.mul(buyableEffect("x",21))
            return mult
        }
        if(player.points.gte(100))
        {
            let x=player.points
            x=x.sub(100)
            let y=new ExpantaNum(0.01)
            if(hasUpgrade("x",12)){y=y.mul(upgradeEffect("x",12))}
            if(hasUpgrade("x",13)){y=y.add(0.01)}
            y=softcap(y,n(0.03),0.5)
            y=y.add(1);
            mult=mult.mul(y.pow(x))
        }
        x=x.add(1)
        x=x.root(2)
        mult=mult.mul(x)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        if(inChallenge("c",11)){exp=new ExpantaNum(0.5)}
        return exp
    },
    upgrades:{
        11:{
            title:"刻苦<br>",
            description:"神秘:我要锻炼,我要锻炼!!!<br>效果:进度大于100%时,每多1%,肌肉获取*1.01(软上限*1.03)",
            unlocked(){return hasMilestone("x",1) && !inChallenge("c",11)},
            cost:five,
        },
        12:{
            title:"超越<br>",
            description:"神秘:我要超越,我要超越!!!<br>肌肉让<刻苦>有更好的效果(指1之后的部分)",
            effect() {
                let x = player.x.points.add(3).logBase(3).add(3).logBase(3)
                return x
            },
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            unlocked(){return hasMilestone("x",2) && !inChallenge("c",11) && hasUpgrade("x",11)},
            cost:new ExpantaNum(20),
        },
        13:{
            title:"强化<br>",
            description:"神秘:我要强化,我要强化!!!<br>刻苦指数+0.005",
            unlocked(){return hasMilestone("x",3) && !inChallenge("c",11) && hasUpgrade("x",12)},
            cost:new ExpantaNum(500),
        },
        21:{
            title:"武力<br>",
            description:"神秘:我好强!!!<br>效果:肌肉再次乘以你的%获取",
            unlocked(){return hasMilestone("x",1) && inChallenge("c",11)},
            cost:new ExpantaNum(20),
        },
        22:{
            title:"征服<br>",
            description:"神秘:我是王者!!<br>领土效果+3",
            unlocked(){return hasMilestone("x",2) && inChallenge("c",11) && hasUpgrade("x",21)},
            cost:new ExpantaNum(50),
        },
        23:{
            title:"飞升<br>",
            description:"神秘:我是神仙!!<br>无限锻体决次数+0.2",
            unlocked(){return hasMilestone("x",3) && inChallenge("c",11) && hasUpgrade("x",22)},
            cost:new ExpantaNum(500),
        },
    },
    buyables:{
        11: {
            cost(x) {
                let xx=new ExpantaNum(1)
                let x2=new ExpantaNum(2)
                xx=xx.mul(x2.pow(getBuyableAmount(this.layer,this.id)))
                return xx 
            },
            display() {
                return `突破<br><br>%上限+${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br /><br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}肌肉<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(x=getBuyableAmount(this.layer,this.id)) {
                let xx=new ExpantaNum(10)
                xx=xx.mul(x)
                xx=xx.mul(buyableEffect("x",12))
                return xx
            },
            unlocked(){return hasMilestone("x",1) && !inChallenge("c",11) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,this.id, getBuyableAmount(this.layer,this.id).add(1))
            },
        },
        12: {
            cost(x) {
                let xx=new ExpantaNum(5)
                let x2=new ExpantaNum(2)
                x2=x2.pow(getBuyableAmount(this.layer,this.id))
                xx=xx.pow(x2)
                return xx 
            },
            display() {
                return `突破^2<br><br>突破效果x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br /><br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}肌肉<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(x=getBuyableAmount(this.layer,this.id)) {
                let xx=new ExpantaNum(1.1)
                xx=xx.pow(x)
                return xx
            },
            unlocked(){return hasMilestone("x",3) && !inChallenge("c",11) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,this.id, getBuyableAmount(this.layer,this.id).add(1))
            },
        },
        21: {
            cost(x) {
                let xx=new ExpantaNum(20)
                let z=new ExpantaNum(1.1)
                xx=xx.mul(z.pow(getBuyableAmount(this.layer,this.id)))
                xx=xx.pow(getBuyableAmount(this.layer,this.id))
                return xx 
            },
            display() {
                return `领土<br><br>肌肉获取x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br /><br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}肌肉<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(x=getBuyableAmount(this.layer,this.id)) {
                let xx=new ExpantaNum(5)
                if(hasUpgrade("x",22)){xx=xx.add(3)}
                xx=xx.pow(x)
                return xx
            },
            unlocked(){return hasMilestone("x",1) && inChallenge("c",11) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,this.id, getBuyableAmount(this.layer,this.id).add(1))
            },
        },
        22: {
            cost(x) {
                let xx=new ExpantaNum(100)
                xx=xx.pow(two.pow(getBuyableAmount(this.layer,this.id).add(1)))
                return xx 
            },
            display() {
                return `无限锻体决<br><br>肌肉再+${format(buyableEffect(this.layer,this.id),2)}次%获取.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br /><br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}肌肉<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(x=getBuyableAmount(this.layer,this.id)) {
                let xx=one
                if(hasUpgrade("x",23))xx=xx.add(0.2)
                xx=xx.mul(x)
                return xx
            },
            unlocked(){return hasMilestone("x",3) && inChallenge("c",11) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,this.id, getBuyableAmount(this.layer,this.id).add(1))
            },
        },
    },
    milestones: { 
        0: {
        requirementDescription: "1肌肉",
        effectDescription: function(){return "神秘有肌肉了(好强壮!)肌肉乘以你的%获取(软上限 : 100)"},
        done() {return player.x.points.gte(1)},
        },
        1: {
        requirementDescription: "8肌肉",
        effectDescription: function(){return "神秘有8块腹肌了(现在他是一个猛男!)<br>解锁一个肌肉升级和一个肌肉可购买"},
        unlock(){return hasMilestone("x",0)},
        done() {return player.x.points.gte(8)},
        },
        2: {
        requirementDescription: "18肌肉",
        effectDescription: function(){return "神秘有18……?(现在他是一个排骨?)<br>解锁一个肌肉升级"},
        unlock(){return hasMilestone("x",1)},
        done() {return player.x.points.gte(18)},
        },
        3: {
        requirementDescription: "500肌肉",
        effectDescription: function(){return "今年的肌肉王是————神秘<br>解锁一个肌肉升级和一个肌肉可购买"},
        unlock(){let x=zero
            x=x.add(player.c.upgrades.length)
            return x.gte(1) && hasMilestone("x",2)},
        done() {return player.x.points.gte(500)},
        },
    },
    tabFormat: {
    主界面: {
        content:["main-display","prestige-button","resource-display","milestones",
        ["row", [ ["upgrade", 11],["upgrade",12],["upgrade",13]] ],["row", [ ["upgrade", 21],["upgrade",22],["upgrade",23]] ],"blank","buyables",],
        },
    },
    row: 1,
    branches:["c"],
    layerShown(){return true},
})
addLayer("c", { 
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "white",
    resource: "词缀",
    type: "normal",
    requires:new ExpantaNum(150),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"%",
    gainMult() {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        if(inChallenge("c",11))exp=new ExpantaNum(0.15)
        return exp
    },
    upgrades:{
        11:{
            title:"红色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        12:{
            title:"蓝色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        13:{
            title:"绿色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        14:{
            title:"黄色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        15:{
            title:"橙色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        21:{
            title:"粉色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        22:{
            title:"紫色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        23:{
            title:"金色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        24:{
            title:"银色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        25:{
            title:"彩色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        31:{
            title:"黑色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        32:{
            title:"白色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        33:{
            title:"灰色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        34:{
            title:"透明的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        35:{
            title:"青色的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        41:{
            title:"塑料的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        42:{
            title:"青铜的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        43:{
            title:"黑铁的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        44:{
            title:"白银的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        45:{
            title:"黄金的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        51:{
            title:"微小的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        52:{
            title:"较小的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        53:{
            title:"小的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        54:{
            title:"大的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
        55:{
            title:"超大的",
            description:"换个皮肤<br>效果:肌肉获取x2",
            
            cost(){
                let x=player.c.upgrades.length
                let y=two
                y=y.pow(x)
                return y
            },
        },
    },
    buyables:{
    },
    milestones: {
        0: {
            requirementDescription: "1词缀",
            effectDescription:"神秘:听我说谢谢你<br>词缀乘以%获取(上限 : x10)",
            done() {return player.c.points.gte(1)},
        },
        1: {
            requirementDescription: "2词缀",
            effectDescription:"你拥有的词缀升级总数增幅你的肌肉",
            unlocked(){return hasMilestone("c",0)},
            done() {return player.c.points.gte(2)},
        },
        2: {
            requirementDescription: "3词缀升级",
            effectDescription:"解锁挑战",
            unlocked(){return hasMilestone("c",1)},
            done() {
                let x=zero
                x=x.add(player.c.upgrades.length)
                return x.gte(3)},
        },
    },
    challenges: {
        11: {
            name: "支线-改头换面(进行第三层重置时不可使用此模式)",
            challengeDescription: `<h5>禁用升级X-11,X-12,X-13<br>禁用可购买X-11,X-12<br>废除%硬上限<br>减益1中平方根变为1.1次根<br>获得新升级X-21,X-22,X-23<br>获得新可购买X-21,X-22<br>肌肉获取^0.5<br>词缀获取^0.15`,
            goalDescription:`本模式下,你可以获得尽可能多的词缀`,
            rewardDescription:"无",
            completionLimit:1,
            unlocked(){return hasMilestone("c",2)},
            canComplete: function() {
                return true
            },
        },
    },
    // tabFormat: {
    // 主界面: {
    //     content:["main-display","prestige-button","resource-display","milestones",
    //     ["row", [ ["upgrade", 11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]] ],
    //     ["row", [ ["upgrade", 21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25]] ],
    //     ["row", [ ["upgrade", 31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]] ],
    //     ["row", [ ["upgrade", 41],["upgrade",42],["upgrade",43],["upgrade",44],["upgrade",45]] ],
    //     ["row", [ ["upgrade", 51],["upgrade",52],["upgrade",53],["upgrade",54],["upgrade",55]] ],],
    //     },
    // },
    row: 2,
    layerShown(){return true},
})
