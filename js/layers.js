addLayer("tree-tab", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		total: new Decimal(0)
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	tabFormat:{
		主页面:{
			content:[['raw-html', '欢迎来游玩TIGJ作品.可以在Git群里为其中喜欢的树投票!']]
		},
		TIGJ_1:{
			content:[['raw-html', '生草现场.jpg <a href="./Tigj-1/index.html">点击游玩</a>']]
		},
		TIGJ_2:{
			content:[['raw-html', '这里边最正常的树(确信) <a href="./Tigj-2/index.html">点击游玩</a>']]
		},
		TIGJ_3:{
			content:[['raw-html', '别问开局为什么有个滑条,问就是bug,不用管这玩意() 感觉做了但是没有做完() <a href="./Tigj-3/index.html">点击游玩</a>']]
		},
		TIGJ_4:{
			content:[['raw-html', '进度条RPG() <a href="./Tigj-4/index.html">点击游玩</a>']]
		},
		重置点:{
			content:['main-display', 'prestige-button', 'upgrades'],
			unlocked:()=>{return player["tree-tab"].total.gt(0)}
		}
	},
	upgrades: {
		11: {
			title: "name points 'udiiwyth' for something?",
			description: "does anyone check the demo?",
			cost: new Decimal(10000),
			
		}
	},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: 重置以获得重置点...?", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
