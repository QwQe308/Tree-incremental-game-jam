function getMaxEnergy(){
    var limit = n(60)
    limit = limit.add(getBar().battery.effect())
    return limit
}
function costSth(item,cost){
    player.g[item] -= cost
}
function energyGain(){
	var gain = layers.g.bars.crank.effect()
    return gain.sub(0.05)
}
function shownEnergyGain(){
    var text = energyGain()
    if(r().researchID) text = text.sub(getResearchSpd())
    return text
}
function getBar(){return layers.g.bars}
function g(){return player.g}
var colorList = ['black','red','lightblue','green','pink','blue','purple','yellow','lime']
function color(num){
    num = num.toNumber()%colorList.length
    return colorList[num]
}

addLayer("g", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "game", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
		
        crank:n(0),
        crankRoll:n(0),
        
        metalToCraft:0,
        metal:n(0),
        metalProgress:n(0),
        metalUnl:false,
        metalStarted:false,

        batteryToCraft:n(0),
        battery:n(0),
        batteryProgress:n(0),
        batteryUnl:false,

        botToCraft:n(0),
        bot:n(0),
        botProgress:n(0),
        botUnl:false,
        botDecay:n(3),
    }},
    color: "white",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    tabFormat: {
        工业区: {
            buttonStyle() {return  {'color': 'white'}},
            content:[
                ['blank','40px'],
                ["row",
                    [["clickable","crank"],
                    ["column",[
                        ["bar","crank"],
                        ["bar","crankRoll"],
                    ]]
                ]],
                ["row",[
                    ["clickable","metal"],
                    ["column",[
                        ["bar","metal"],
                        ["slider",["metalToCraft",0,100]]
                    ]],
                ]],
                ["row",
                    [["clickable","battery"],
                    ["column",[
                        ["bar","battery"],
                    ]]
                ]],
                ["row",
                    [["clickable","bot"],
                    ["column",[
                        ["bar","bot"],
                    ]]
                ]],
            ]
        },
        研究室: {
            buttonStyle() {return  {'color': 'white'}},
            content:[
                ['blank','40px'],
                ["layer-proxy",['r',[
                    ["bar","research"],
                    ["row",[
                        ["clickable",'null'],
                        ["clickable",'upgrade'],
                    ]],
                    ["row",[
                        ["clickable",'crank'],
                        ["clickable",'metal'],
                        ["clickable",'battery'],
                        ["clickable",'bot'],
                        ["clickable",'research'],
                    ]],
                    ["clickable",'system'],
                ]]]
            ]
        },
	},
    update(diff){
        player.points = player.points.add(energyGain().mul(diff)).min(getMaxEnergy()).max(0)

        var falseDecay = player.g.crank.sub(player.g.crank.div(n(1.06).pow(diff)).sub(0.25*diff))
        player.g.crank = player.g.crank.sub(falseDecay.div(getResEff("crank",3))).max(0)
        player.g.crank = player.g.crank.add(player.g.crankRoll.max(0).mul(diff)).min(getBar().crank.max())
        player.g.crankRoll = player.g.crankRoll.div(n(1.2).pow(diff)).sub(0.1*diff).max(0)

        player.g.botDecay = g().botDecay.sub(getBar().bot.effect().mul(diff))
        if(g().botDecay.lte(0)){
            player.g.crankRoll = player.g.crankRoll.sub(g().botDecay.sub(3).div(15)).max(getBar().crankRoll.max())
            player.g.botDecay = n(3)
        }
        
        var crafted = 0
        var toCraft = n(0)

        toCraft = getResEff("metal",1).mul(player.g.metalToCraft).div(100)
        if(player.points.gte(10)) g().metalUnl = true
        if(toCraft.gte(1) && player.points.gte(10) && !g().metalStarted && g().metal.lt(getBar().metal.max()) && g().metalUnl){
            player.points = player.points.sub(10)
            g().metalStarted = true
        }
        if(player.points.gt(0) && g().metalStarted){
            g().metalProgress = g().metalProgress.add(diff/getBar().metal.time())
        }
        if(g().metalProgress.gte(1)){
            var craftedMetal = toCraft.min(g().metalProgress.floor())
            toCraft = toCraft.sub(craftedMetal)
            player.points = player.points.sub(craftedMetal.sub(1).mul(10).max(0)).max(0)
            if(toCraft.gte(1)) g().metalProgress = g().metalProgress.sub(craftedMetal)
            else{
                g().metalProgress = zero
            }
            g().metal = g().metal.add(craftedMetal).min(getBar().metal.max())
            player.g.metalToCraft = toCraft.div(getResEff("metal",1)).mul(100).floor()
            g().metalStarted = false
        }

        if(getSystemLevel().gte(1)) g().batteryUnl = true
        if(player.g.batteryToCraft.gte(1) && player.points.gt(0)){
            g().batteryProgress = g().batteryProgress.add(diff/getBar().battery.time())
        }
        if(g().batteryProgress.gte(1)){
            crafted = g().batteryToCraft.min(g().batteryProgress.floor())
            g().batteryToCraft = g().batteryToCraft.sub(crafted)
            if(g().batteryToCraft.gte(1)) g().batteryProgress = g().batteryProgress.sub(crafted)
            else{
                g().batteryProgress = zero
            }
            g().battery = g().battery.add(crafted).min(getBar().metal.max())
        }

        if(getSystemLevel().gte(2)) g().botUnl = true
        if(player.g.botToCraft.gte(1) && player.points.gt(0)){
            g().botProgress = g().botProgress.add(diff/getBar().bot.time())
        }
        if(g().botProgress.gte(1)){
            crafted = g().botToCraft.min(g().botProgress.floor())
            g().botToCraft = g().botToCraft.sub(crafted)
            if(g().botToCraft.gte(1)) g().botProgress = g().botProgress.sub(crafted)
            else{
                g().botProgress = zero
            }
            g().bot = g().bot.add(crafted).min(getBar().metal.max())
        }
    },
    bars:{
        crank:{
            display(){return `当前能量产量: ${format(this.effect())} `},
            effect(){
                var eff = player.g.crank.div(5).root(1.2).div(1.66)
                return eff
            },
            max(x = r().crank){
                var max = n(5).mul(getResEff('crank',1,x).pow(1.33))
                return max
            },
            colorLayer(){
                var layer = g().crank.div(5).root(1.33)
                return layer.floor()
            },
            layerReq(x = this.colorLayer()){
                var max = n(5).mul(x.pow(1.33))
                return max
            },
            progress(){
                var req = this.layerReq()
                return g().crank.sub(req).div(this.layerReq(this.colorLayer().add(1)).sub(req))
            },
            fillStyle(){
                return {"background-color": color(layers.g.bars.crank.colorLayer().add(1))}
            },
            baseStyle(){
                return {"background-color": color(layers.g.bars.crank.colorLayer())}
            },
            unlocked:true,
            width:600,
            height:80,
            direction:RIGHT,
            tooltip(){return `摇杆旋转速度增加能量产量.产量会自我衰减.`},
        },
        crankRoll:{
            display(){return `摇杆旋转速度`},
            max(){
                var max = n(1)
                max = max.mul(getResEff('crank',2))
                return max
            },
            progress(){return player.g.crankRoll},
            fillStyle(){return {"background-color": "blue"}},
            unlocked:true,
            width:600,
            height:25,
            direction:RIGHT,
            tooltip(){return `旋转摇杆增加摇杆旋转速度.速度会因为摩擦力逐渐减小.`},
        },
        metal:{
            display(){return `10能量 -> 1金属.(${formatTime(g().metalProgress.mul(this.time()))}/${formatTime(this.time())}) 预制造:${format(getResEff("metal",1).mul(player.g.metalToCraft).div(100).floor())}`},
            max(){
                var max = n(10)
                max = max.add(getResEff("metal",3))
                return max
            },
            time(){
                var t = n(10)
                t = t.div(getResEff("metal",2))
                return t
            },
            progress(){return player.g.metalProgress},
            fillStyle(){return {"background-color": "grey"}},
            unlocked(){
                return g().metalUnl
            },
            width:600,
            height:80,
            direction:RIGHT,
            //tooltip(){return `.`},
        },
        battery:{
            display(){return `20能量 + 3金属 -> 1电池.(${formatTime(g().batteryProgress.mul(this.time()))}/${formatTime(this.time())})`},
            max(){
                var max = n(10)
                max = max.add(getResEff('battery',3))
                return max
            },
            time(){
                var t = n(30)
                t = t.div(getResEff('battery',2))
                return t
            },
            effect(){
                var eff = g().battery.mul(getResEff('battery',1))
                return eff
            },
            progress(){return player.g.batteryProgress},
            fillStyle(){return {"background-color": "red"}},
            unlocked(){
                return g().batteryUnl
            },
            width:600,
            height:80,
            direction:RIGHT,
            //tooltip(){return `.`},
        },
        bot:{
            display(){return `5金属 + 2电池 -> 1摇杆机器人.(${formatTime(g().botProgress.mul(this.time()))}/${formatTime(this.time())})`},
            max(){
                var max = n(6)
                max = max.add(getResEff('bot',3))
                return max
            },
            time(){
                var t = n(60)
                t = t.div(getResEff('bot',2))
                return t
            },
            effect(){
                var eff = g().bot.mul(getResEff('bot',1)).root(1.5)
                return eff
            },
            progress(){return player.g.botProgress},
            fillStyle(){return {"background-color": "red"}},
            unlocked(){
                return g().botUnl
            },
            width:600,
            height:80,
            direction:RIGHT,
            //tooltip(){return `.`},
        },
    },
    clickables:{
        crank:{
            title:`旋转摇杆(长按)`,
            onHold(){
                player.g.crankRoll = player.g.crankRoll.add(getResEff('crank',4).mul(diff*0.3)).min(getBar().crankRoll.max())
            },
            unlocked:true,
            canClick:true,
        },
        metal:{
            title:`制造金属`,
            onClick(){
                g().metalToCraft = n(100).div(getResEff("metal",1))
            },
            unlocked(){return g().metalUnl},
            canClick(){return player.points.gte(10) && g().metal.lt(getBar().metal.max()) && !g().metalStarted},
        },
        battery:{
            title:`制造电池`,
            onClick(){
                player.points = player.points.sub(20)
                player.g.metal = player.g.metal.sub(3)
                player.g.batteryToCraft = n(1)
            },
            unlocked(){return g().batteryUnl},
            canClick(){return player.points.gte(20) && player.g.metal.gte(3) && g().battery.lt(getBar().battery.max()) && g().batteryToCraft.lt(1)},
        },
        bot:{
            title:`制造摇杆机器人`,
            onClick(){
                player.points = player.points.sub(20)
                player.g.metal = player.g.metal.sub(5)
                player.g.battery = player.g.battery.sub(2)
                player.g.botToCraft = n(1)
            },
            unlocked(){return g().botUnl},
            canClick(){return player.g.metal.gte(5) && player.g.battery.gte(2) && g().bot.lt(getBar().bot.max()) && g().botToCraft.lt(1)},
        },
    },
})

function r(){return player.r}
function getResearch(){return layers.r.clickables}
function getResearchSpd(){
    var spd = n(0.75)
    spd = spd.add(getResearch().upgrade.effect())
    spd = spd.mul(getResEff("research",1))
    return spd
}
function getResEff(id,data = '',input = null){
    if(input) return layers.r.clickables[id]['effect'+data](input)
    return layers.r.clickables[id]['effect'+data]()
}
function getSystemLevel(){return player.r.system}

addLayer("r", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "research", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
		researchID: null,
		
		level:n(0),
		
		crank:n(0),
		crankProgress:n(0),
        
		metal:n(0),
		metalProgress:n(0),

        battery:n(0),
		batteryProgress:n(0),

        bot:n(0),
		botProgress:n(0),

        system:n(0),
		systemProgress:n(0),

        research:n(0),
		researchProgress:n(0),
    }},
    color: "lightblue",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    update(diff){
        if(!r().researchID) return
        var resThisTick = getResearchSpd().mul(diff).min(player.points)
        player.points = player.points.sub(resThisTick.div(getResEff("research",2)))
        r()[r().researchID+'Progress'] = r()[r().researchID+'Progress'].add(resThisTick)
        
        if(r()[r().researchID+'Progress'].gte(getResearch()[r().researchID].requires())){
            r()[r().researchID+'Progress'] = r()[r().researchID+'Progress'].sub(getResearch()[r().researchID].requires())
            r()[r().researchID]= r()[r().researchID].add(1)
            r().researchID = null
        }
    },
    bars:{
        research:{
            display(){
                if(r().researchID) return `研究进度: ${format(r()[r().researchID+'Progress'])}/${format(getResearch()[r().researchID].requires())} 研究速度:${format(getResearchSpd())}/s (每秒消耗等量电能)`
                return `请选择一个项目以开始研究!`
            },
            progress(){
                if(!player.r.researchID) return zero
                return r()[r().researchID+'Progress'].div(getResearch()[r().researchID].requires())
            },
            fillStyle(){return {"background-color": "lightblue"}},
            unlocked:true,
            width:800,
            height:50,
            direction:RIGHT,
            tooltip(){return `摇杆旋转速度增加能量产量.产量会自我衰减.`},
        },
    },
    clickables:{
        null:{
            title:`停止研究`,
            onClick(){player.r.researchID = null},
            requires(x){
                return n(1e308)
            },
            unlocked:true,
            canClick(){return r().researchID},
        },
        upgrade:{
            title:`修复研究系统`,
            display(){
                return `下一级需要 ${format(this.requires())} 金属,基础研究速度+${format(this.effect())})(下一级:${format(this.effect(r().level.add(1)))})`
            },
            onClick(){
                player.g.metal = player.g.metal.sub(this.requires())
                r().level = r().level.add(1)
            },
            requires(x = r().level.add(1)){
                return x.mul(2).add(2)
            },
            effect(x = r().level){
                var eff = x.mul(0.25)
                return eff
            },
            unlocked:true,
            canClick(){
                return player.g.metal.gte(this.requires())
            },
        },
        crank:{
            title(){return `摇杆<br>等级:${format(r()[this.id])}`},
            onClick(){player.r.researchID = this.id},
            requires(x = player.r[this.id].add(1)){
                return x.pow(1.33).mul(15).add(15)
            },
            unlocked:true,
            canClick:true,
            effect1(x = r()[this.id]){
                x = x.add(3).div(4).floor()
                return x.add(1)
            },
            effect2(x = r()[this.id]){
                x = x.add(2).div(4).floor().mul(0.2)
                return x.add(1)
            },
            effect3(x = r()[this.id]){
                x = x.add(1).div(4).floor().mul(0.25)
                return x.add(1)
            },
            effect4(x = r()[this.id]){
                x = x.div(4).floor().mul(0.2)
                return x.add(1)
            },
            tooltip(){
                return `
                研究进度:${format(r()[this.id])}/${format(this.requires())}
                效果列表:<br>
                ${getResTooltip(this.id,["摇杆能量条上限层数为","摇杆速度上限*","能量条衰减速度/","摇杆加速度*"])}
                `
            },
        },
        metal:{
            title(){return `金属<br>等级:${format(r()[this.id])}`},
            onClick(){player.r.researchID = this.id},
            requires(x = player.r[this.id].add(1)){
                return x.pow(1.33).mul(25).add(25)
            },
            unlocked:true,
            canClick:true,
            effect1(x = r()[this.id]){
                x = x.add(2).div(3).floor().mul(5)
                return x.max(1)
            },
            effect2(x = r()[this.id]){
                x = x.add(1).div(3).floor().mul(0.2)
                return x.add(1)
            },
            effect3(x = r()[this.id]){
                x = x.div(3).floor().mul(5)
                return x
            },
            tooltip(){
                return `
                研究进度:${format(r()[this.id])}/${format(this.requires())}<br>
                效果列表:<br>
                ${getResTooltip(this.id,["预制造条增加","制造速度*","储存上限+"])}
                `
            },
        },
        battery:{
            title(){return `电池<br>等级:${format(r()[this.id])}`},
            onClick(){player.r.researchID = this.id},
            requires(x = player.r[this.id].add(1)){
                return x.pow(1.33).mul(45).add(45)
            },
            unlocked(){return g().batteryUnl},
            canClick:true,
            effect1(x = r()[this.id]){
                x = x.add(2).div(3).floor().mul(5)
                return x.add(10)
            },
            effect2(x = r()[this.id]){
                x = x.add(1).div(3).floor().mul(0.2)
                return x.add(1)
            },
            effect3(x = r()[this.id]){
                x = x.div(3).floor().mul(5)
                return x
            },
            tooltip(){
                return `
                研究进度:${format(r()[this.id])}/${format(this.requires())}<br>
                效果列表:<br>
                ${getResTooltip(this.id,["电池效果为上限+","制造速度*","储存上限+"])}
                `
            },
        },
        bot:{
            title(){return `摇杆机器人<br>等级:${format(r()[this.id])}`},
            onClick(){player.r.researchID = this.id},
            requires(x = player.r[this.id].add(1)){
                return x.pow(1.33).mul(75).add(75)
            },
            unlocked(){return g().botUnl},
            canClick:true,
            effect1(x = r()[this.id]){
                x = x.add(2).div(3).floor().mul(0.2)
                return x.add(1)
            },
            effect2(x = r()[this.id]){
                x = x.add(1).div(3).floor().mul(0.2)
                return x.add(1)
            },
            effect3(x = r()[this.id]){
                x = x.div(3).floor().mul(3)
                return x
            },
            tooltip(){
                return `
                研究进度:${format(r()[this.id])}/${format(this.requires())}<br>
                效果列表:<br>
                ${getResTooltip(this.id,["机器人效率*","制造速度*","储存上限+"])}
                `
            },
        },
        research:{
            title(){return `研究<br>等级:${format(r()[this.id])}`},
            onClick(){player.r.researchID = this.id},
            requires(x = player.r[this.id].add(1)){
                return x.pow(1.5).mul(60).add(90)
            },
            unlocked(){return getSystemLevel().gte(3)},
            canClick:true,
            effect1(x = r()[this.id]){
                x = x.add(1).div(2).floor().mul(0.2)
                return x.add(1)
            },
            effect2(x = r()[this.id]){
                x = x.add(0).div(2).floor().mul(0.1)
                return x.add(1)
            },
            tooltip(){
                return `
                研究进度:${format(r()[this.id])}/${format(this.requires())}<br>
                效果列表:<br>
                ${getResTooltip(this.id,["研究速度*","研究消耗/"])}
                `
            },
        },
        system:{
            title(){return `系统<br>等级:${format(r()[this.id])}`},
            onClick(){player.r.researchID = this.id},
            requires(x = player.r[this.id].add(1)){
                return x.pow(1.75).mul(30).add(60)
            },
            unlocked:true,
            canClick(){return player.r[this.id].add(1).lt(3)},
            tooltip(){
                return `
                研究进度:${format(r()[this.id])}/${format(this.requires())}<br>
                解锁新的功能/物品.
                `
            },
        },
    },
})

function getResTooltip(res,despArray){
    var str = ""
    for(i in despArray){
        i = Number(i)
        str += `${getResearch()[res]["effect"+(i+1)](r()[res].add(1)).eq(1)||getResearch()[res]["effect"+(i+1)](r()[res].add(1)).eq(0)?"":despArray[i]+format(getResearch()[res]["effect"+(i+1)]())} ${(getResearch()[res]["effect"+(i+1)]().eq(getResearch()[res]["effect"+(i+1)](r()[res].add(1))))?'':('(下一级: '+format(getResearch()[res]["effect"+(i+1)](r()[res].add(1)))+')')}<br>`
    }
    return str
}