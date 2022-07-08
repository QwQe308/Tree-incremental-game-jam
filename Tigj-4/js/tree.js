var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
	bars:{
		endbar:{
			display() {return format(player.data.unlock_level.add(player.data.explore_level).add(2),0)+` / 10 残局`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return true},
			progress(){return (player.data.unlock_level.add(player.data.explore_level).add(2).div(10)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#585858"},
			textStyle: {"color": "#000000"}
		},
		unlockbar:{
			display() {return format(player.data.unlock_total,0)+" / "+format(player.data.unlock_cost,0)+` 解锁(${format(player.data.unlock_level,0)})`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return true},
			progress(){return (player.data.unlock_total.div(player.data.unlock_cost)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#c3c3c3"},
			textStyle: {"color": "#000000"}
		},
		hpbar:{
			display() {return `${format(player.data.hp,0)}(${format(player.data.hpgain,2)}/sec)`+" / "+`${format(player.data.hpmax,0)}(${format(player.data.hpmaxgain,2)}/sec)`+` 生命`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.unlock_level.gte(1)},
			progress(){return (player.data.hp.div(player.data.hpmax)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#ec1c24"},
			textStyle: {"color": "#000000"}
		},
		restorationbar:{
			display() {return `${format(player.data.restoration,0)}(${format(player.data.restorationgain,2)}/sec)`+" / "+`${format(player.data.restorationmax,0)}(${format(player.data.restorationmaxgain,2)}/sec)`+` 恢复`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.unlock_level.gte(2)},
			progress(){return (player.data.restoration.div(player.data.restorationmax)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#00ff48"},
			textStyle: {"color": "#000000"}
		},
		atkbar:{
			display() {return `${format(player.data.atk,0)}(${format(player.data.atkgain,2)}/sec)`+" / "+`${format(player.data.atkmax,0)}(${format(player.data.atkmaxgain,2)}/sec)`+` 攻击`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.unlock_level.gte(3)},
			progress(){return (player.data.atk.div(player.data.atkmax)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#fff200"},
			textStyle: {"color": "#000000"}
		},
		explorebar:{
			display() {return format(player.data.explore,0)+" / "+format(player.data.explore_cost,0)+` 探索(${format(player.data.explore_level,0)})`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.unlock_level.gte(4)},
			progress(){return (player.data.explore.div(player.data.explore_cost)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#79FF79"},
			textStyle: {"color": "#000000"}
		},
		moneybar:{
			display() {return `${format(player.data.money,0)}(${format(player.data.moneygain,2)}/sec)`+" / "+`${format(player.data.moneymax,0)}(${format(player.data.moneymaxgain,2)}/sec)`+` 金币`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.explore_level.gte(1)},
			progress(){return (player.data.money.div(player.data.moneymax)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#ffcf2d"},
			textStyle: {"color": "#000000"}
		},
		lockbar:{
			display() {return `${format(player.data.lock,0)}(${format(player.data.lockgain,2)}/sec)`+" / "+`${format(player.data.lockmax,0)}(${format(player.data.lockmaxgain,2)}/sec)`+` 锁`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.explore_level.gte(2)},
			progress(){return (player.data.lock.div(player.data.lockmax)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#b5d4ec"},
			textStyle: {"color": "#000000"}
		},
		intimidatebar:{
			display() {return `${format(player.data.intimidate,0)}(${format(player.data.intimidategain,2)}/sec)`+" / "+`${format(player.data.intimidatemax,0)}(${format(player.data.intimidatemaxgain,2)}/sec)`+` 恐吓`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.unlock_level.gte(5)},
			progress(){return (player.data.intimidate.div(player.data.intimidatemax)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#414187"},
			textStyle: {"color": "#000000"}
		},
		prestigebar:{
			display() {return format(player.data.prestige,0)+" / "+format(player.data.prestige_cost,0)+` 声望(${format(player.data.prestige_level,0)})`},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return player.data.explore_level.gte(3)},
			progress(){return (player.data.prestige.div(player.data.prestige_cost)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#31aeb0"},
			textStyle: {"color": "#000000"}
		},
		
		dehpbar:{
			display() {
				let dis1 = `${format(player.data.dehp,0)}(${format(player.data.dehpgain,2)}/sec)`+" / "+`${format(player.data.dehpmax,0)}(${format(player.data.dehpmaxgain,2)}/sec)`+` 生命`
				return dis1
			},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return !player.data.fight.eq(0)},
			progress(){return (player.data.dehp.div(player.data.dehpmax)).toNumber()},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#ec1c24"},
			textStyle: {"color": "#000000"}
		},
		deatkbar:{
			display() {
				let dis1 = "敌方攻击 "+format(player.data.deatk)
				return dis1
			},	
			direction: RIGHT,
			width: 600,
			height: 25,
			unlocked(){return !player.data.fight.eq(0)},
			progress(){return true},
			baseStyle: {"background-color": "#FFFFFF"},
			fillStyle: {"background-color": "#fff200"},
			textStyle: {"color": "#000000"}
		},
	},
	upgrades:{
		11:{
			title: "小家",
			description: "非战斗时恢复进度条的恢复量*2",
			cost: new Decimal(20),
			currencyDisplayName:"金币",
			currencyInternalName: "money",
			currencyLayer: "data",
			style() {return {'height': "200px",'width': '200px' }},
		},
		12:{
			title: "家",
			description: "非战斗时恢复进度条的恢复量*2",
			cost: new Decimal(200),
			currencyDisplayName:"金币",
			currencyInternalName: "money",
			currencyLayer: "data",
			style() {return {'height': "200px",'width': '200px' }},
		},
		13:{
			title: "大家",
			description: "非战斗时恢复进度条的恢复量*2",
			cost: new Decimal(2000),
			currencyDisplayName:"金币",
			currencyInternalName: "money",
			currencyLayer: "data",
			style() {return {'height': "200px",'width': '200px' }},
		},
		21:{
			title: "凳子",
			description: "在行动休息中恢复进度条的恢复量*3",
			cost: new Decimal(35),
			currencyDisplayName:"金币",
			currencyInternalName: "money",
			currencyLayer: "data",
			style() {return {'height': "200px",'width': '200px' }},
		},
		22:{
			title: "椅子",
			description: "在行动休息中恢复进度条的恢复量*3",
			cost: new Decimal(350),
			currencyDisplayName:"金币",
			currencyInternalName: "money",
			currencyLayer: "data",
			style() {return {'height': "200px",'width': '200px' }},
		},
		23:{
			title: "桌子",
			description: "在行动休息中恢复进度条的恢复量*3",
			cost: new Decimal(3500),
			currencyDisplayName:"金币",
			currencyInternalName: "money",
			currencyLayer: "data",
			style() {return {'height': "200px",'width': '200px' }},
		},
	},
	clickables:{
		1:{
			title: "休息",
			display() {
				return `+1.5生命/sec<br><br>${player.data.action.eq(1) ? '正在休息' : ''}`
			},
			canClick(){return true},
			unlocked(){return true},
			onClick(){
				if(player.data.action.eq(1)){
					player.data.action = new Decimal(0)
				}else{
					player.data.action = new Decimal(1)
				}
			},
			style() {return {'height': "145px",'width': '250px' }},
		},
		2:{
			title: "锻炼",
			display() {
				return `-5生命/sec<br>+15生命上限/sec<br><br>${player.data.action.eq(2) ? '正在锻炼' : ''}`
			},
			canClick(){return true},
			unlocked(){return true},
			onClick(){
				if(player.data.action.eq(2)){
					player.data.action = new Decimal(0)
				}else{
					player.data.action = new Decimal(2)
				}
			},
			style() {return {'height': "145px",'width': '250px' }},
		},
		3:{
			title: "抽取生命",
			display() {
				return `-25生命/sec<br>+1恢复/sec<br><br>${player.data.action.eq(3) ? '正在抽取生命' : ''}`
			},
			canClick(){return true},
			unlocked(){return player.data.unlock_level.gte(2)},
			onClick(){
				if(player.data.action.eq(3)){
					player.data.action = new Decimal(0)
				}else{
					player.data.action = new Decimal(3)
				}
			},
			style() {return {'height': "145px",'width': '250px' }},
		},
		4:{
			title: "训练",
			display() {
				return `-750生命/sec<br>+2攻击/sec<br><br>${player.data.action.eq(4) ? '正在训练' : ''}`
			},
			canClick(){return true},
			unlocked(){return player.data.unlock_level.gte(3)},
			onClick(){
				if(player.data.action.eq(4)){
					player.data.action = new Decimal(0)
				}else{
					player.data.action = new Decimal(4)
				}
			},
			style() {return {'height': "145px",'width': '250px' }},
		},
		5:{
			title: "锻炼+",
			display() {
				return `-75生命/sec<br>+75生命上限/sec<br><br>${player.data.action.eq(5) ? '正在锻炼+' : ''}`
			},
			canClick(){return true},
			unlocked(){return player.data.unlock_level.gte(3)},
			onClick(){
				if(player.data.action.eq(5)){
					player.data.action = new Decimal(0)
				}else{
					player.data.action = new Decimal(5)
				}
			},
			style() {return {'height': "145px",'width': '250px' }},
		},
		6:{
			title: "浓缩生命",
			display() {
				return `-500生命/sec<br>+1恢复上限/sec<br><br>${player.data.action.eq(6) ? '正在浓缩生命' : ''}`
			},
			canClick(){return true},
			unlocked(){return player.data.unlock_level.gte(4)},
			onClick(){
				if(player.data.action.eq(6)){
					player.data.action = new Decimal(0)
				}else{
					player.data.action = new Decimal(6)
				}
			},
			style() {return {'height': "145px",'width': '250px' }},
		},
		1001:{
			title() {return `平原(探索0)${player.data.fight.eq(1) ? '探索中' : ''}`},
			display() {return `敌人:100生命 50攻击<br>奖励:30探索`},
			canClick(){return true},
			style() {return {'height': "200px",'width': '200px' }},
			onClick(){
				player.data.dehpmax = new Decimal(100)
				player.data.dehp = new Decimal(100)
				player.data.deatk = new Decimal(50)
				player.data.action = new Decimal(0)
				if(player.data.fight.eq(1)){
					player.data.fight = new Decimal(0)
				}else{
					player.data.fight = new Decimal(1)
				}
			},
			unlocked(){return player.data.explore_level.gte(0)},
		},
		1002:{
			title() {return `大平原(探索1)${player.data.fight.eq(2) ? '探索中' : ''}`},
			display() {return `敌人:350生命 75攻击<br>奖励:80探索,20金币`},
			canClick(){return true},
			style() {return {'height': "200px",'width': '200px' }},
			onClick(){
				player.data.dehpmax = new Decimal(350)
				player.data.dehp = new Decimal(350)
				player.data.deatk = new Decimal(75)
				player.data.action = new Decimal(0)
				if(player.data.fight.eq(2)){
					player.data.fight = new Decimal(0)
				}else{
					player.data.fight = new Decimal(2)
				}
			},
			unlocked(){return player.data.explore_level.gte(1)},
		},
		1003:{
			title() {return `树林(探索2)${player.data.fight.eq(3) ? '探索中' : ''}`},
			display() {return `敌人:3000生命 500攻击<br>奖励:320探索,40金币,25锁`},
			canClick(){return true},
			style() {return {'height': "200px",'width': '200px' }},
			onClick(){
				player.data.dehpmax = new Decimal(3000)
				player.data.dehp = new Decimal(3000)
				player.data.deatk = new Decimal(500)
				player.data.action = new Decimal(0)
				if(player.data.fight.eq(3)){
					player.data.fight = new Decimal(0)
				}else{
					player.data.fight = new Decimal(3)
				}
			},
			unlocked(){return player.data.explore_level.gte(2)},
		},
	},
	microtabs:{
        "介绍-子":{
			"进度条":{
				content:[
					["microtabs","进度条-子",{'border-width':'0px'}],
				]
			},
			"公式":{
				unlocked(){return player.data.explore_level.gte(2)},
				content:[
					["microtabs","公式-子",{'border-width':'0px'}],
				]
			},
			"佣人":{
				unlocked(){return player.data.explore_level.gte(3)},
				content:[
					["microtabs","佣人-子",{'border-width':'0px'}],
				]
			},
			/*
			"捐助":{
				content:[
					["display-text", function() {return `<a class="link" href="https://afdian.net/@Mysterious124" target="_blank">点我跳转到捐助页面 Jump directly to the donation page</a>`}],
					["display-text", function() {return `<br><br><big>↑↑↑我唯一的收入来源 my only source of income↑↑↑`}],
					["display-text", function() {return `<big>如果你觉得我的游戏很有趣,可以给我捐些钱,我会很开心的 if you think this game is interesting, you can donald some money to me, i will be very happy`}],
					["display-text", function() {return `<big>感谢游玩的游戏 think you playing`}],
					["display-text", function() {return `<big>邮箱(e-mail) 67265011@qq.com`}],
				]
			},
			*/
		},
		"进度条-子":{
			"残局":{
				content:[
					["display-text", function() {return '残局:所有包括残局在内的解锁的进度条的数量为残局的进度,进度满时游戏残局,残局不会参与任何非残局的运算'}],
				]
			},
			"解锁":{
				content:[
					["display-text", function() {return '解锁:当解锁进度条满后自身价格提升并解锁一个新的进度条和一些动作,解锁进度条的增长是除了解锁进度条外的所有已解锁的进度条上限之和'}],
					["display-text", function() {return player.data.unlock_level.gte(1) ? '生命(解锁1):没什么特殊的,值得一提的是在战斗中生命为0时并不会死亡,而是直接退出战斗' : ''}],
					["display-text", function() {return player.data.unlock_level.gte(2) ? '恢复(解锁2):每1恢复都会使生命每秒恢复1' : ''}],
					["display-text", function() {return player.data.unlock_level.gte(3) ? '攻击(解锁3):战斗的重要数值' : ''}],
					["display-text", function() {return player.data.unlock_level.gte(4) ? '探索(解锁4):当解锁进度条满后自身价格提升并解锁一个新的进度条和战斗地点,解锁探索时同时也会出现战斗页面' : ''}],
					["display-text", function() {return player.data.unlock_level.gte(5) ? '恐吓(解锁5):每1恐吓都会使地方攻击每秒-1,最低为敌方攻击上限的10%' : ''}],
				]
			},
			"探索":{
				unlocked(){return player.data.unlock_level.gte(3)},
				content:[
					["display-text", function() {return '探索(解锁4):当探索进度条满后自身价格提升并解锁一个新的进度条和战斗地点,解锁探索时同时也会出现战斗页面'}],
					["display-text", function() {return player.data.explore_level.gte(1) ? '金币(探索1):当解锁金币时同时解锁商店' : ''}],
					["display-text", function() {return player.data.explore_level.gte(2) ? '锁(探索2):一种物质,可以有效缓解解锁的价格增长' : ''}],
					["display-text", function() {return player.data.explore_level.gte(3) ? '声望(探索3):当声望进度条满后自身价格提升并解锁一个新的进度条和一些商店购买物以及一位新的人,解锁声望时同时会解锁佣人页面' : ''}],
				]
			},
			"声望":{
				unlocked(){return player.data.explore_level.gte(3)},
				content:[
					["display-text", function() {return '声望(探索3):当声望进度条满后自身价格提升并解锁一个新的进度条和一些商店购买物已经一位新的人,解锁声望时同时会解锁佣人页面'}],
				]
			},
		},
		"公式-子":{
			"解锁":{
				content:[
					["display-text", function() {return '解锁基础公式:10<sup>解锁等级'}],
					["display-text", function() {return `锁公式加成:基础/(1.0002<sup>锁数量</sup>):10 -> ${format(Decimal.add(10).div(Decimal.add(1.0002).pow(player.data.lock)),3)}`}],
				]
			},
			"探索":{
				content:[
					["display-text", function() {return '解锁探索公式:!(5+探索等级)'}],
				]
			},
			"声望":{
				unlocked(){return player.data.explore_level.gte(3)},
				content:[
					["display-text", function() {return '解锁探索公式:10x声望等级<sup>2'}],
				]
			},
		},
		"佣人-子":{
		},
	},
	tabFormat: {
		"进度条":{
			content:[
				['bar','endbar'],
				['bar','unlockbar'],
				['bar','hpbar'],
				['bar','restorationbar'],
				['bar','atkbar'],
				['bar','intimidatebar'],
				['bar','explorebar'],
				['bar','moneybar'],
				['bar','lockbar'],
				['bar','prestigebar'],
				["display-text", function() {return '<br><br>'}],
				['bar','dehpbar'],
				['bar','deatkbar'],
			],
		},
		"行动":{
			unlocked(){return player.data.fight.eq(0)},
			content:[
				["column", [
					["display-text", function() {return '阶段1<hr><br>'}],
					["display-text", function() {return '<br>解锁(1)<hr><br>'}],
					["row", [['clickable',1],['clickable',2]]],
					["display-text", function() {return player.data.unlock_level.gte(2) ? '<br>解锁(2)<hr><br>' : ''}],
					["row", [['clickable',3]]],
					["display-text", function() {return player.data.unlock_level.gte(3) ? '<br>解锁(3)<hr><br>' : ''}],
					["row", [['clickable',4],['clickable',5]]],
					["display-text", function() {return player.data.unlock_level.gte(4) ? '<br>解锁(4)<hr><br>' : ''}],
					["row", [['clickable',6]]],
					["display-text", function() {return player.data.unlock_level.gte(5) ? '<br>解锁(5)<hr><br>' : ''}],
				]],
			],
		},
		"战斗":{
			unlocked(){return player.data.unlock_level.gte(3)},
			content:[
				["display-text", function() {return '战斗中无法进行任何行动,你可以随时退出战斗<br><br>'}],
				["row", [['clickable',1001],['clickable',1002],['clickable',1003]]],
				["display-text", function() {return '<br><br>'}],
				['bar','hpbar'],
				['bar','restorationbar'],
				['bar','atkbar'],
				["display-text", function() {return '<br><br>'}],
				['bar','dehpbar'],
				['bar','deatkbar'],
			],
		},
		"商店":{
			unlocked(){return player.data.explore_level.gte(1)},
			content:[
				["display-text", function() {return '升级<hr><br>'}],
				["row", [['upgrade',11],['upgrade',12],['upgrade',13]]],
				["row", [['upgrade',21],['upgrade',22],['upgrade',23]]],
			],
		},
		"佣人":{
			unlocked(){return player.data.explore_level.gte(3)},
			content:[
			],
		},
		"介绍":{
			content:[
				["microtabs","介绍-子",{'border-width':'0px'}],
			],
		},
	},
})