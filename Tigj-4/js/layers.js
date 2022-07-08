function action_gain(id,id2,id3){
	if(player.data.action.eq(id2)){player.data[id+'gain'] = player.data[id+'gain'].add(id3)}
}

addLayer("data", {
    name: "data",
    symbol: " ",
    position: 11,
    startData() { return {
        unlocked: true,
		
		dehp:new Decimal(0),
		dehpmax:new Decimal(0),
		dehpgain:new Decimal(0),
		dehpmaxgain:new Decimal(0),
		deatk:new Decimal(0),
		
		fight:new Decimal(0),
		action:new Decimal(0),
		
		unlock_cost:new Decimal(10),
		unlock_level:new Decimal(1),
		unlock_total:new Decimal(0),
		
		explore_cost:new Decimal(0),
		explore_level:new Decimal(0),
		explore:new Decimal(0.1),
		
		prestige_cost:new Decimal(0),
		prestige_level:new Decimal(0),
		prestige:new Decimal(0),
		
		hp:new Decimal(0),
		hpmax:new Decimal(20),
		hpgain:new Decimal(0),
		hpmaxgain:new Decimal(0),
		
		restoration:new Decimal(0),
		restorationmax:new Decimal(20),
		restorationgain:new Decimal(0),
		restorationmaxgain:new Decimal(0),
		
		atk:new Decimal(0),
		atkmax:new Decimal(10000),
		atkgain:new Decimal(0),
		atkmaxgain:new Decimal(0),
		
		money:new Decimal(0),
		moneymax:new Decimal(1000),
		moneygain:new Decimal(0),
		moneymaxgain:new Decimal(0),
		
		lock:new Decimal(0),
		lockmax:new Decimal(500),
		lockgain:new Decimal(0),
		lockmaxgain:new Decimal(0),
		
		intimidate:new Decimal(0),
		intimidatemax:new Decimal(100),
		intimidategain:new Decimal(0),
		intimidatemaxgain:new Decimal(0),
    }},
	update(diff) {
		if(!player.data.fight.eq(0)){
			if(player.data.dehp.lte(0)){
				player.data.dehp = new Decimal(player.data.dehpmax)
				if(player.data.fight.eq(1)){
					player.data.explore = player.data.explore.add(30)
				}
				if(player.data.fight.eq(2)){
					player.data.explore = player.data.explore.add(80)
					player.data.money = player.data.money.add(20).min(player.data.moneymax)
				}
				if(player.data.fight.eq(3)){
					player.data.explore = player.data.explore.add(320)
					player.data.money = player.data.money.add(40).min(player.data.moneymax)
					player.data.lock = player.data.lock.add(25).min(player.data.moneymax)
				}
			}
			if(player.data.hp.lte(0)){
				player.data.fight = new Decimal(0)
			}
		}
		
		player.data.dehpgain = new Decimal(0)
		if(!player.data.fight.eq(0)){player.data.dehpgain = player.data.dehpgain.sub(player.data.atk)}
		player.data.dehp = player.data.dehp.add(Decimal.add(player.data.dehpgain).mul(diff)).min(player.data.dehpmax).max(0)
		
		player.data.unlock_total = new Decimal(0)
		if(player.data.unlock_level.gte(1)){player.data.unlock_total = player.data.unlock_total.add(player.data.hpmax)}
		if(player.data.unlock_level.gte(2)){player.data.unlock_total = player.data.unlock_total.add(player.data.restorationmax)}
		if(player.data.unlock_level.gte(3)){player.data.unlock_total = player.data.unlock_total.add(player.data.atkmax)}
		if(player.data.unlock_level.gte(4)){player.data.unlock_total = player.data.unlock_total.add(player.data.explore_cost)}
		if(player.data.unlock_level.gte(5)){player.data.unlock_total = player.data.unlock_total.add(player.data.intimidatemax)}
		if(player.data.explore_level.gte(1)){player.data.unlock_total = player.data.unlock_total.add(player.data.moneymax)}
		if(player.data.explore_level.gte(2)){player.data.unlock_total = player.data.unlock_total.add(player.data.lockmax)}
		if(player.data.explore_level.gte(2)){player.data.unlock_total = player.data.unlock_total.add(player.data.prestige_cost)}
		
		player.data.unlock_cost = new Decimal(10).div(Decimal.add(1.0002).pow(player.data.lock)).pow(player.data.unlock_level.add(1))
		if(player.data.unlock_total.gte(player.data.unlock_cost)){player.data.unlock_level = player.data.unlock_level.add(1)}
		
		player.data.explore_cost = new Decimal(5).add(player.data.explore_level).factorial()
		if(player.data.explore.gte(player.data.explore_cost)){player.data.explore_level = player.data.explore_level.add(1)}
		
		player.data.prestige_cost = new Decimal(10).mul(player.data.prestige_level.pow(2))
		if(player.data.prestige.gte(player.data.prestige_cost)){player.data.prestige_level = player.data.prestige_level.add(1)}
		
		player.data.hpgain = new Decimal(0)
		action_gain('hp',1,1.5)
		action_gain('hp',2,-5)
		action_gain('hp',3,-25)
		action_gain('hp',4,-750)
		action_gain('hp',5,-75)
		action_gain('hp',6,-500)
		if(player.data.action.eq(1) && hasUpgrade('tree-tab',23)){player.data.hpgain = player.data.hpgain.add(player.data.restoration.mul(3))}
		if(player.data.action.eq(1) && hasUpgrade('tree-tab',22)){player.data.hpgain = player.data.hpgain.add(player.data.restoration.mul(3))}
		if(player.data.action.eq(1) && hasUpgrade('tree-tab',21)){player.data.hpgain = player.data.hpgain.add(player.data.restoration.mul(3))}
		if(player.data.fight.eq(0) && hasUpgrade('tree-tab',13)){player.data.hpgain = player.data.hpgain.add(player.data.restoration.mul(2))}
		if(player.data.fight.eq(0) && hasUpgrade('tree-tab',12)){player.data.hpgain = player.data.hpgain.add(player.data.restoration.mul(2))}
		if(player.data.fight.eq(0) && hasUpgrade('tree-tab',11)){player.data.hpgain = player.data.hpgain.add(player.data.restoration.mul(2))}else{player.data.hpgain = player.data.hpgain.add(player.data.restoration)}
		if(!player.data.fight.eq(0)){player.data.hpgain = player.data.hpgain.sub(player.data.deatk)}
		player.data.hp = player.data.hp.add(Decimal.add(player.data.hpgain).mul(diff)).min(player.data.hpmax).max(0)
		
		player.data.hpmaxgain = new Decimal(0)
		if(player.data.hp.gt(0)){action_gain('hpmax',2,15)}
		if(player.data.hp.gt(0)){action_gain('hpmax',5,75)}
		player.data.hpmax = player.data.hpmax.add(Decimal.add(player.data.hpmaxgain).mul(diff))
		
		player.data.restorationgain = new Decimal(0)
		if(player.data.hp.gt(0)){action_gain('restoration',3,1)}
		player.data.restoration = player.data.restoration.add(Decimal.add(player.data.restorationgain).mul(diff)).min(player.data.restorationmax).max(0)
		
		player.data.restorationmaxgain = new Decimal(0)
		if(player.data.hp.gt(0)){action_gain('restorationmax',6,1)}
		player.data.restorationmax = player.data.restorationmax.add(Decimal.add(player.data.restorationmaxgain).mul(diff))
		
		player.data.atkgain = new Decimal(0)
		if(player.data.hp.gt(0)){action_gain('atk',4,2)}
		player.data.atk = player.data.atk.add(Decimal.add(player.data.atkgain).mul(diff)).min(player.data.atkmax).max(0)
	},
    color: "#FFFFFF",
    type: "none",
    row: "side",
    layerShown(){return false},
})