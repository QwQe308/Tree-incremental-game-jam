let modInfo = {
	name: "Tigj参赛树3号",
	id: "ATigj-3",
	//author: "???",
	pointsName: "能量",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 0.1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return false
}

// Calculate points/sec!
function getPointGen() {
	return n(0)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){return `能量上限: ${format(getMaxEnergy())} - 当前产量: ${format(shownEnergyGain())}/s(含维持用电-0.05/s)`},
	function(){
	  if(player.g.metalUnl)return `金属: ${format(player.g.metal)} / ${getBar().metal.max()}`
	  return ``
	},
	function(){
		if(player.g.batteryUnl)return `电池: ${format(player.g.battery)} / ${getBar().battery.max()} 使得能量上限+${getBar().battery.effect()}`
		return ``
	},
	function(){
		if(player.g.batteryUnl)return `摇杆机器人: ${format(player.g.bot)} / ${getBar().bot.max()} 使得摇杆以一定速度自动旋转.`
		return ``
	},
	function(){return player.points.gt(0)?'':"<red style='color:red'>断电状态!大部分设施停工!</red>"},
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(360) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}