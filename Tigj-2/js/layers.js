addLayer("p", {
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        barmax:new ExpantaNum(10),
        bar2p:new ExpantaNum(0),
        bar2max:new ExpantaNum(20),
        uppoints:new ExpantaNum(0),
    }},
    color: "hhh",
    resource: "进度点",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"点数",
    gainMult() {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1,
    layerShown(){return true},

update(diff){
    let a = player.points
    let b = player.p.barmax
    if(hasUpgrade("p",11))a = a.mul(1.5)
    if(hasUpgrade("p",12))b = b.add(10)
    player.points = player.points.min(b)
    let c = player.p.bar2p
    let d = player.p.bar2max
    player.p.bar2p = player.p.bar2p.min(player.p.bar2max)
    if(hasUpgrade("up",11) && this.clickables[11].canClick() ) this.clickables[11].onClick()
    if(hasUpgrade("up",13))d = d.sub(8)
    if(hasUpgrade("b",12)) d = d.sub(6)
    if(hasUpgrade("up",23) && this.clickables[12].canClick() ) this.clickables[12].onClick()
    player.points = player.points.min(b)
    player.p.bar2p = player.p.bar2p.min(d)
},

bars: {
    Bar1: {
        display() {
        let a = player.points
        let b = player.p.barmax
        if(hasUpgrade("p",11))a = a.mul(1.5)
        if(hasUpgrade("p",13))b = b.sub(4)
        return "当前进度" + format(a.min(b),2) + "/" + format(b,2) + "<br>该进度条的增长基于点数的获取"
            },
        direction: RIGHT,
        width: 375,
        height: 50,
        progress() {  
            let a = player.points
        let b = player.p.barmax
        if(hasUpgrade("p",11))a = a.mul(1.5)
        if(hasUpgrade("p",13))b = b.sub(4)
        return a.min(b)/b 
    },
        baseStyle: {"background-color": "#70DB93"},
        fillStyle: {"background-color": "cyan"},
        textStyle: {"color": "#000000"}
        },
    Bar2: {
        display() {
        let a = player.p.bar2p
        let b = player.p.bar2max
        if(hasUpgrade("up",13)) b = b.sub(8)
        if(hasUpgrade("b",12)) b = b.sub(6)
        return "当前进度" + format(a.min(b),2) + "/" + format(b,2) + "<br>该进度条的增长基于上一个进度条"
            },
        direction: RIGHT,
        unlocked(){return hasUpgrade("p",14)},
        width: 375,
        height: 50,
        progress() {  
        let a = player.p.bar2p
        let b = player.p.bar2max
        if(hasUpgrade("up",13))b = b.sub(8)
        if(hasUpgrade("b",12)) b = b.sub(6)
        return a.min(b)/b 
    },
        baseStyle: {"background-color": "#70DB93"},
        fillStyle: {"background-color": "cyan"},
        textStyle: {"color": "#000000"}
        },
},

clickables:{
    11:{
    title(){return "<h4>点击重置进度条并获得 " + format(this.gain(),2) + " 点数" },
    canClick(){return this.gain().gte(1)},
    gain(){
        let gain = new ExpantaNum(0)
        let a = player.points
        let b = player.p.barmax
        if(hasUpgrade("p",11))a = a.mul(1.5)
        if(hasUpgrade("p",13))b = b.sub(4)
        if(a.div(b).gte(1)){
        (hasUpgrade("p",12))?((hasUpgrade("p",13))?gain=gain.add(a.div(6).floor()):gain=gain.add(a.div(10).floor())):gain=gain.add(a.div(b).floor())
        }
        return gain
      },
    style() {return {'height':'115px','width':'115px'}},
    onClick(){
        player.p.points = player.p.points.add( this.gain() ) 
        if(hasUpgrade("p",14)){
        (!hasUpgrade("up",21))?player.p.bar2p = player.p.bar2p.add(this.gain().mul(0.5)):player.p.bar2p = player.p.bar2p.add(this.gain())
        }
        player.points = n(0)
        },
    },
    12:{
        title(){return "<h4>点击重置进度条并获得 " + format(this.gain(),2) + " 升级点" },
        canClick(){return this.gain().gte(1)},
        gain(){
            let gain = new ExpantaNum(0)
            let a = player.p.bar2p
            let b = player.p.bar2max
            if(hasUpgrade("up",13))b = b.sub(8)
            if(hasUpgrade("b",12)) b = b.sub(6)
            if(a.div(b).gte(1)){
                gain = gain.add(a.div(b))
            }
            return gain
          },
        style() {return {'height':'115px','width':'115px'}},
        unlocked(){return hasUpgrade("p",14)},
        onClick(){
            player.up.points = player.up.points.add( this.gain() )
            player.up.total = player.up.total.add( this.gain() )
            player.p.bar2p = n(0)
            },
        },
},

upgrades :{
    11 : {
        title:'',
        description:'<h2>加快进度条增长的速度',
        unlocked(){return player.p.points.gte(3)||hasUpgrade("p",11)||hasUpgrade("p",12)||hasUpgrade("p",13)},
        style() {return {'height':'120px','width':'120px'}},
        effect() {
            let eff = new ExpantaNum(1.5)
            return eff
        },
        effectDisplay() { return format(this.effect())+"x" },
        cost:new ExpantaNum(3)
    },
    12 : {
        title:'',
        description:'<h2>将点数上限提升到20',
        unlocked(){return player.p.points.gte(3)||hasUpgrade("p",11)||hasUpgrade("p",12)||hasUpgrade("p",13)},
        style() {return {'height':'120px','width':'120px'}},
        cost:new ExpantaNum(6)
    },
    13 : {
        title:'',
        description:'<h2>缩短进度条长度为6',
        unlocked(){return player.p.points.gte(3)||hasUpgrade("p",11)||hasUpgrade("p",12)||hasUpgrade("p",13)},
        style() {return {'height':'120px','width':'120px'}},
        cost:new ExpantaNum(10)
    },
    14 : {
        title:'',
        description:'<h1>开启新的进度条',
        unlocked(){return player.p.points.gte(20)&&!hasUpgrade("p",14)},
        style() {return {'height':'120px','width':'360px'}},
        cost:new ExpantaNum(25)
    },
},

tabFormat: [
    "main-display",//你有xxx该重置点
    //"prestige-button",//获取重置点按钮
    //"resource-display",//你有xxx什么
    //["display-text",function() {return "进度条的增长基于点数的获取"}],
    "milestones",//里程碑
    "blank",//空
    "challenges",//挑战
    "buyables",//重复购买项
    ["row", [["bar", "Bar1"],"blank",["clickable", 11]]],
    ["row", [["upgrade",11],["upgrade",12],["upgrade",13]]],
    ["upgrade",14],
    "blank","blank",
    ["row", [["bar", "Bar2"],"blank",["clickable", 12]]],
    //["row", [["upgrade",21],["upgrade",22],["upgrade",23]]],
    
    
    ],


})

addLayer("up", {
    symbol: "U",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "hhh",
    resource: "升级点",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"点数",
    gainMult() {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1,
    layerShown(){return player.up.total.gte(1)},

    update(diff) {
        
    },

    upgrades :{
        11 : {
            title:'',
            description:'<h2>自动点击获取进度点按钮',
            style() {return {'height':'120px','width':'120px'}},
            cost:new ExpantaNum(3)
        },
        12 : {
            title:'',
            description:'<h2>加速点数获取',
            style() {return {'height':'120px','width':'120px'}},
            effect() {
                let eff = new ExpantaNum(1.5)
                return eff
            },
            effectDisplay() { return format(this.effect())+"x" },
            cost:new ExpantaNum(3)
        },
        13 : {
            title:'',
            description:'<h2>缩短获取升级点进度条至12',
            style() {return {'height':'120px','width':'120px'}},
            cost:new ExpantaNum(6)
        },
        21 : {
            title:'',
            description:'<h2>增加升级点数进度条填充速度',
            style() {return {'height':'120px','width':'120px'}},
            effect() {
                let eff = new ExpantaNum(2)
                return eff
            },
            effectDisplay() { return format(this.effect())+"x" },
            cost:new ExpantaNum(6)
        },
        22 : {
            title:'',
            description:'<h2>增加0.5/sec点数获取',
            style() {return {'height':'120px','width':'120px'}},
            cost:new ExpantaNum(9)
        },
        23 : {
            title:'',
            description:'<h2>自动点击获取升级点按钮',
            style() {return {'height':'120px','width':'120px'}},
            cost:new ExpantaNum(9)
        },
        31: {
            title:'',
            description:'<h2>开启新的元素',
            style() {return {'height':'120px','width':'360px'}},
            unlocked(){
            let hu = hasUpgrade
            return hu("up",11)&&hu("up",12)&&hu("up",13)&&hu("up",21)&&hu("up",22)&&hu("up",23)
            },
            cost:new ExpantaNum(9)
        },
    },


    tabFormat: [
        "main-display",//你有xxx该重置点
        //"prestige-button",//获取重置点按钮
        //"resource-display",//你有xxx什么
        //["display-text",function() {return "进度条的增长基于点数的获取"}],
        "milestones",//里程碑
        "blank",//空
        "challenges",//挑战
        "buyables",//重复购买项
        ["row", [["upgrade",11],["upgrade",12],["upgrade",13]]],
        ["row", [["upgrade",21],["upgrade",22],["upgrade",23]]],
        ["upgrade",31],
        
        
        ],
})
addLayer("b", {
    symbol: "B",
    position: 2,
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        barmax:new ExpantaNum(30),
    }},
    color: "hhh",
    resource: "细菌",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"点数",
    gainMult() {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1,
    layerShown(){return hasUpgrade("up",31)},

    update(diff) {
        if(player.s.realisticgem.gte(1)&&this.clickables[11].canClick())this.clickables[11].onClick()
    },

    bars: {
        Bar1: {
            display() {
            let a = player.p.points
            let b = player.up.points
            let c = player.b.barmax
            return "当前进度" + format((a.mul(0.2).add(b.mul(0.8))).min(c),2) + "/" + format(c,2) + "<br>该进度条的增长取决于前两个点数"
                },
            direction: RIGHT,
            width: 375,
            height: 50,
            progress() {  
            let a = player.p.points
            let b = player.up.points
            let c = player.b.barmax
            return (a.mul(0.2).add(b.mul(0.8))).min(c)/c
        },
            baseStyle: {"background-color": "#70DB93"},
            fillStyle: {"background-color": "cyan"},
            textStyle: {"color": "#000000"}
            },
        },
    
clickables:{
    11:{
    title(){return "<h4>点击重置进度条并获得 " + format(this.gain(),2) + " 细菌" },
    canClick(){return this.gain().gte(1)},
    gain(){
        let gain = new ExpantaNum(0)
        let a = player.p.points
        let b = player.up.points
        let c = player.b.barmax
        if(a.mul(0.2).add(b.mul(0.8)).div(c).gte(1))gain = gain.add(a.mul(0.2).add(b.mul(0.8)).div(c).floor())
        return gain.min(1)
      },
    style() {return {'height':'115px','width':'115px'}},
    onClick(){
        player.b.points = player.b.points.add( this.gain() ) 
        player.points = new ExpantaNum(0)
        player.p.points = new ExpantaNum(0)
        player.up.points = new ExpantaNum(0)
        },
    },
},
upgrades :{
    11 : {
        title:'',
        description:'<h2>点数获取翻倍',
        style() {return {'height':'120px','width':'120px'}},
        cost:new ExpantaNum(1)
    },
    12 : {
        title:'',
        description:'<h2>缩短获取升级点的进度条至6',
        style() {return {'height':'120px','width':'120px'}},
        cost:new ExpantaNum(2)
    },
    13 : {
        title:'',
        description:'<h2>基于病毒点数增加点数获取',
        style() {return {'height':'120px','width':'120px'}},
        effect() {
            let eff = player.b.points
            return eff.pow(0.1).max(1)
        },
        effectDisplay() { return format(this.effect())+"x" },
        cost:new ExpantaNum(3)
    },
    21 : {
        title:'',
        description:'<h2>开启新的元素',
        style() {return {'height':'120px','width':'360px'}},
        unlocked(){
            let hu = hasUpgrade
            return hu("b",11)&&hu("b",12)&&hu("b",13)
            },
        cost:new ExpantaNum(5)
    },
},
    tabFormat: [
        "main-display",//你有xxx该重置点
        //"prestige-button",//获取重置点按钮
        //"resource-display",//你有xxx什么
        //["display-text",function() {return "进度条的增长基于点数的获取"}],
        "milestones",//里程碑
        "blank",//空
        "challenges",//挑战
        "buyables",//重复购买项
        ["row", [["bar", "Bar1"],"blank",["clickable", 11]]],
        ["row", [["upgrade",11],["upgrade",12],["upgrade",13]]],
        ["row", [["upgrade",21],["upgrade",22],["upgrade",23]]],
        ["upgrade",31],
        
        
        ],
})
addLayer("g", {
    symbol: "G",
    name:"gem",
    position: 3,
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        barmax:new ExpantaNum(100),
        gem:new ExpantaNum(0),
        gemzi:new ExpantaNum(0),
        gemzizi:new ExpantaNum(0),
        gembarmax:new ExpantaNum(1000),
        redgem:new ExpantaNum(0),
        bluegem:new ExpantaNum(0),
        yellowgem:new ExpantaNum(0),
        greengem:new ExpantaNum(0),
        whitegem:new ExpantaNum(0),

    }},
    color: "hhh",
    resource: "宝石",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"点数",
    gainMult() {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1,
    layerShown(){return hasUpgrade("b",21)},

    update(diff) {
        if(player.s.spacegem.gte(1)&&this.clickables[11].canClick())this.clickables[11].onClick()
        if(hasUpgrade("b",21)&&player.b.points.gte(1)){
            player.g.gemzi = player.g.gemzi.add(player.b.points.mul(0.3).pow(0.5).mul(1.1).mul(diff))
        }
    //let a = Math.floor(Math.random() * 10)
        if(player.g.gem.gte(1)){
            let a = Math.floor(Math.random() * 10)
            a = n(a)
            let ared = (a.eq(0)||a.eq(1))
            let red = function(){player.g.gem = player.g.gem.sub(1);player.g.redgem = player.g.redgem.add(1)}
            let ablue = (a.eq(2)||a.eq(3))
            let blue = function(){player.g.gem = player.g.gem.sub(1);player.g.bluegem = player.g.bluegem.add(1)}
            let ayellow = (a.eq(4)||a.eq(5))
            let yellow = function(){player.g.gem = player.g.gem.sub(1);player.g.yellowgem = player.g.yellowgem.add(1)}
            let agreen = (a.eq(6)||a.eq(7)||a.eq(8))
            let green = function(){player.g.gem = player.g.gem.sub(1);player.g.greengem = player.g.greengem.add(1)}
            let awhite = (a.eq(9))
            let white = function(){player.g.gem = player.g.gem.sub(1);player.g.whitegem = player.g.whitegem.add(1)}
           ared?red():(ablue?blue():(ayellow?yellow():(agreen?green():(white()))))
        }
        if(player.g.redgem.gte(1)&&player.g.bluegem.gte(1)&&player.g.yellowgem.gte(1)&&player.g.greengem.gte(1)&&player.g.whitegem.gte(1)){
        let a = player.g.greengem.pow(0.1)
        let b = n(1).sub(n(1).div(player.g.yellowgem))
        let c = player.g.redgem.sub(player.g.bluegem).abs().pow(0.5)
        let d = player.g.points.sub(player.g.whitegem).div(5).pow(0.2)
        let gemzizi = c.pow(d.add(1).log10().add(1).mul(a.add(1).log10().add(1)).mul(b.pow(25)))
        if(player.s.soulgem.gte(1)) genzizi = gemzizi.mul(1.2)
        player.g.gemzizi = player.g.gemzizi.add(gemzizi.mul(diff))
        }
    },

    bars: {
        Bar1: {
            display() {
            let a = player.g.gemzi
            let b = player.g.barmax
            return "当前进度" + format(a.min(b),2) + "/" + format(b,2) + "<br>该进度条的增长基于细菌子"
                },
            direction: RIGHT,
            width: 375,
            height: 50,
            progress() {  
                let a = player.g.gemzi
                let b = player.g.barmax
            return a.min(b)/b
        },
            baseStyle: {"background-color": "#70DB93"},
            fillStyle: {"background-color": "cyan"},
            textStyle: {"color": "#000000"}
            },
        Bar2: {
            display() {
            let a = player.g.gemzizi
            let b = player.g.gembarmax
            return "当前进度" + format(a.min(b),2) + "/" + format(b,2) + "<br>该进度条的增长基于宝石子"
                },
            direction: RIGHT,
            width: 375,
            height: 50,
            progress() {  
                let a = player.g.gemzizi
            let b = player.g.gembarmax
            return a.min(b)/b
        },
            baseStyle: {"background-color": "#70DB93"},
            fillStyle: {"background-color": "cyan"},
            textStyle: {"color": "#000000"}
            },
        },
    
    clickables:{
    11:{
    title(){return "<h4>点击重置进度条并获得 " + format(this.gain(),2) + " 个随机宝石" },
    canClick(){return this.gain().gte(1)},
    gain(){
        let gain = new ExpantaNum(0)
        let a = player.g.gemzi
        let b = player.g.barmax
        if(a.div(b).gte(1))gain = gain.add(a.div(b).floor())
        return gain.min(1)
      },
    style() {return {'height':'115px','width':'115px'}},
    onClick(){
        player.g.points = player.g.points.add( this.gain() ) 
        player.g.gem = player.g.gem.add( this.gain() ) 
        player.g.gemzi = n(0)
        },
    },
    12:{
    title(){return "<h4>点击重置进度条并获得 " + format(this.gain(),2) + " 点精华<br><h6>但是你的各种宝石会损失10%" },
    canClick(){return this.gain().gte(1)},
    gain(){
        let gain = new ExpantaNum(0)
        let a = player.g.gemzizi
        let b = player.g.gembarmax
        if(a.div(b).gte(1))gain = gain.add(a.div(b).floor())
        return gain.min(1)
      },
    style() {return {'height':'115px','width':'115px'}},
    onClick(){
        player.s.points = player.s.points.add( this.gain() ) 
        player.s.best = player.s.best.add( this.gain() )
        player.s.gemessence = player.s.gemessence.add( this.gain() )
        player.g.redgem = player.g.redgem.mul(0.9)
        player.g.bluegem = player.g.bluegem.mul(0.9)
        player.g.yellowgem = player.g.yellowgem.mul(0.9)
        player.g.greengem = player.g.greengem.mul(0.9)
        player.g.whitegem = player.g.whitegem.mul(0.9)
        player.g.gemzizi = n(0)
        },
    },
},

    tabFormat: [
        "main-display",//你有xxx该重置点
        //"prestige-button",//获取重置点按钮
        //"resource-display",//你有xxx什么
        ["display-text",function() {return "您总共有 " + player.g.points + " 个宝石,这加成你点数获取×" + format(player.g.points.pow(0.1),5) + "<br>" + "你有 " +
        "<span style='color: " + tmp[this.layer].color + " ; font-size: 25px;'>" + 
        format(player.b.points,2) + "</span>" + " 细菌<br>"+ "每秒生成 " + 
        format(player.b.points.mul(0.3).pow(0.5).mul(1.1)) + " 个细菌子<br>你有 " + format(player.g.gemzi,2) + 
        " 细菌子"}],
        "milestones",//里程碑
        "blank",//空
        "challenges",//挑战
        "buyables",//重复购买项
        ["row", [["bar", "Bar1"],"blank",["clickable", 11]]],
        ["upgrade",31],
        ["display-text",function() {if(player.g.redgem.gte(1))return"您有 <span style='color:red;font-size:20px;'>" + 
        format(player.g.redgem,2) + "</span> 红色宝石" }],
        ["display-text",function() {if(player.g.bluegem.gte(1))return"您有 <span style='color:blue;font-size:20px;'>" + 
        format(player.g.bluegem,2) + "</span> 蓝色宝石" }],
        ["display-text",function() {if(player.g.yellowgem.gte(1))return"您有 <span style='color:yellow;font-size:20px;'>" + 
        format(player.g.yellowgem,2) + "</span> 黄色宝石" }],
        ["display-text",function() {if(player.g.greengem.gte(1))return"您有 <span style='color:green;font-size:20px;'>" + 
        format(player.g.greengem,2) + "</span> 绿色宝石" }],
        ["display-text",function() {if(player.g.whitegem.gte(1))return"您有 <span style='color:white;font-size:20px;'>" + 
        format(player.g.whitegem,2) + "</span> 白色宝石" }],
        ["display-text",function() {if(player.g.redgem.gte(1)&&player.g.bluegem.gte(1)&&player.g.yellowgem.gte(1)&&player.g.greengem.gte(1)&&player.g.whitegem.gte(1)){
            let a = player.g.greengem.pow(0.1)
            let b = n(1).sub(n(1).div(player.g.yellowgem))
            let c = player.g.redgem.sub(player.g.bluegem).abs().pow(0.5)
            let d = player.g.points.sub(player.g.whitegem).div(5).pow(0.2)
            let e = c.pow(d.add(1).log10().add(1).mul(a.add(1).log10().add(1)).mul(b.pow(25)))
            if(player.s.soulgem.gte(1)) e = e.mul(1.2)
            return" a = 绿色宝石<sup>0.1</sup> = " + format(player.g.greengem.pow(0.1),5) + "<br>" + 
            "b = 1-(1÷黄色宝石) = " + format(n(1).sub(n(1).div(player.g.yellowgem)),5) + "<br>" +
            "c = |红色宝石-蓝色宝石|<sup>0.5</sup> = " + format(player.g.redgem.sub(player.g.bluegem).abs().pow(0.5),5) + "<br>" +
            "d = ((总宝石数-白色宝石)÷5)<sup>0.2</sup> = " + format(player.g.points.sub(player.g.whitegem).div(5).pow(0.2),5) + "<br>" +
            "公式 = c<sup>((log<sub><sub>10</sub></sub>(10d+10)×log<sub><sub>10</sub></sub>(10a+10))×b<sup>25</sup>)</sup> = " + format(c.pow(d.add(1).log10().add(1).mul(a.add(1).log10().add(1)).mul(b.pow(25))),5) + "<br>" + 
            "所以你每秒生成 " +  format(e,5) + " 点宝石子" + "<br>您有 " + format(player.g.gemzizi,5) + " 宝石子"
        }}],
        ["row", [["bar", "Bar2"],"blank",["clickable", 12]]],
        ],
})
addLayer("s", {
    symbol: "S",
    name:"supgem",
    position: 0,
    branches: ["p","up","b","g"],
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        gemessence:new ExpantaNum(0),
        barmax:new ExpantaNum(10),
        supgem:new ExpantaNum(0),
        supgemmax:new ExpantaNum(1),
        powergem:new ExpantaNum(0),//力量宝石
        timegem:new ExpantaNum(0),//时间宝石
        spacegem:new ExpantaNum(0),//空间宝石
        soulgem:new ExpantaNum(0),//灵魂宝石
        realisticgem:new ExpantaNum(0),//现实宝石
        mindgem:new ExpantaNum(0),//心灵宝石

    }},
    color: "hhh",
    resource: "精华",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"点数",
    gainMult() {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 2,
    layerShown(){return player.s.best.gte(1)},

    update(diff) {
        player.s.powergem = player.s.powergem.min(player.s.supgemmax)
        //if(player.s.powergem.gte(1)) 点数获取^1.5
        player.s.timegem = player.s.timegem.min(player.s.supgemmax)
        if(player.s.timegem.gte(1)) player.devSpeed = 2
        player.s.spacegem = player.s.spacegem.min(player.s.supgemmax)
        player.s.soulgem = player.s.soulgem.min(player.s.supgemmax)
        player.s.realisticgem = player.s.realisticgem.min(player.s.supgemmax)
        player.s.mindgem = player.s.mindgem.min(player.s.supgemmax)
        if(player.s.supgem.gte(1)){
            let a = Math.floor(Math.random() * 6)
            a = n(a)
            let apowergem = (a.eq(0)&&player.s.powergem.eq(0))
            let powergem = function(){player.s.supgem = player.s.supgem.sub(1);player.s.powergem = player.s.powergem.add(1)}
            let atimegem = (a.eq(1)&&player.s.timegem.eq(0))
            let timegem = function(){player.s.supgem = player.s.supgem.sub(1);player.s.timegem = player.s.timegem.add(1)}
            let aspacegem = (a.eq(2)&&player.s.spacegem.eq(0))
            let spacegem = function(){player.s.supgem = player.s.supgem.sub(1);player.s.spacegem = player.s.spacegem.add(1)}
            let asoulgem = (a.eq(3)&&player.s.soulgem.eq(0))
            let soulgem = function(){player.s.supgem = player.s.supgem.sub(1);player.s.soulgem = player.s.soulgem.add(1)}
            let arealisticgem = (a.eq(4)&&player.s.realisticgem.eq(0))
            let realisticgem = function(){player.s.supgem = player.s.supgem.sub(1);player.s.realisticgem = player.s.realisticgem.add(1)}
            let amindgem = (a.eq(5)&&player.s.mindgem.eq(0))
            let mindgem = function(){player.s.supgem = player.s.supgem.sub(1);player.s.mindgem = player.s.mindgem.add(1)}
           apowergem?powergem():(atimegem?timegem():(aspacegem?spacegem():(asoulgem?soulgem():(arealisticgem?(realisticgem()):amindgem?mindgem():a = Math.floor(Math.random() * 6)))))
        }
    },

    bars: {
        Bar1: {
            display() {
            let a = player.s.points
            let b = player.s.barmax
            if(player.s.mindgem.gte(1)) b = b.sub(4)
            return "当前进度" + format(a.min(b),2) + "/" + format(b,2) + "<br>该进度条的增长取决于精华"
                },
            direction: RIGHT,
            width: 375,
            height: 50,
            progress() {  
            let a = player.s.points
            let b = player.s.barmax
            if(player.s.mindgem.gte(1)) b = b.sub(4)
            return a.min(b)/b
        },
            baseStyle: {"background-color": "#70DB93"},
            fillStyle: {"background-color": "cyan"},
            textStyle: {"color": "#000000"}
            },
        },
    
    clickables:{
    11:{
    title(){return "<h4>点击重置进度条并获得 " + format(this.gain(),2) + " 个高级宝石" },
    canClick(){return this.gain().gte(1)},
    gain(){
        let gain = new ExpantaNum(0)
        let a = player.s.points
        let b = player.s.barmax
        if(player.s.mindgem.gte(1)) b = b.sub(4)
        if(a.div(b).gte(1))gain = gain.add(a.div(b).floor())
        return gain.min(1)
      },
    style() {return {'height':'115px','width':'115px'}},
    onClick(){
        player.s.supgem = player.s.supgem.add( this.gain() ) 
        player.s.points = n(0)
        },
    },
},
    tabFormat: [
        "main-display",//你有xxx该重置点
        //"prestige-button",//获取重置点按钮
        //"resource-display",//你有xxx什么
        "milestones",//里程碑
        "blank",//空
        "challenges",//挑战
        "buyables",//重复购买项
        ["row", [["bar", "Bar1"],"blank",["clickable", 11]]],

        ["display-text",function() {if(player.s.powergem.gte(1))return"您拥有了力量宝石,点数获取^1.5" }],
        ["display-text",function() {if(player.s.timegem.gte(1))return"您拥有了时间宝石,获得devSpeed=2(雾" }],
        ["display-text",function() {if(player.s.spacegem.gte(1))return"您拥有了空间宝石,自动按获取宝石的按钮" }],
        ["display-text",function() {if(player.s.soulgem.gte(1))return"您拥有了灵魂宝石,宝石子获取×1.2" }],
        ["display-text",function() {if(player.s.realisticgem.gte(1))return"您拥有了现实宝石,自动按获取细菌的按钮" }],
        ["display-text",function() {if(player.s.mindgem.gte(1))return"您拥有了心灵宝石,减少获取高级宝石所需的精华" }],
        "blank",
        ["display-text",function() {if(player.s.powergem.gte(1)&&player.s.timegem.gte(1)&&player.s.spacegem.gte(1)&&player.s.soulgem.gte(1)&&player.s.realisticgem.gte(1)&&player.s.mindgem.gte(1)){
            return"<h1>您拥有了所有宝石(结束了?(雾" }}],

        ],
})