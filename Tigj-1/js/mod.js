let modInfo = {
	name: "Tigj参赛树1号",
	id: "Tigj-1",
		pointsName: "%",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "",
}

let changelog = `<h2>神秘为了锻炼,把更新日志放到了杠铃上,以此增加重量`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	let x=one
	x=x.add(player.x.points)
	x=softcap(x,n(100),0.01)
	let xx=zero
	if(hasMilestone("x",0))xx=xx.add(1)
	if(hasUpgrade("x",21))xx=xx.add(1)
	xx=xx.add(buyableEffect("x",22))
	x=x.pow(xx)
	gain=gain.mul(x)
	if(hasMilestone("c",0))gain=gain.mul(player.c.points.add(1))
	let y=two,z=zero
	if(inChallenge("c",11))
	{
		y=new ExpantaNum(1.1)
	}
	z=z.add(player.points)
	z=z.div(100)
	z=z.floor()
	y=y.pow(z)
	if(player.points.gt(100))gain=gain.root(y)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}
// Display extra things at the top of the page
var displayThings = [
	function(){
	var str = ''
	for(i in player.c.upgrades){
	i = player.c.upgrades[i]
	if(layers.c.upgrades[i].title) str+=layers.c.upgrades[i].title
	}
	return `<br><h2>神秘有${format(player.x.points)}块${str}腹肌<br><br>`
	},
	function(){return `前期可能有点慢,请耐心等待`},
	function(){return `本游戏设计的初衷是让你可以对我发一个艹`},
	function(){return `减益1:%有几个100时,%获取开几次平方根`},
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}