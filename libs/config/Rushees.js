include("GrushStuff.js");

function LoadConfig() {

	/////////////////////////////////
	// Rushee Profile Leech Settings
	/////////////////////////////////
	switch (me.diff) {
		case 0: // Normal
			Config.Leader = this.Grush.NormalRusher[1]; // Expansion Leader - Normal
			Config.QuitList = [this.Grush.NormalRusher[0]]; // Expansion Rusher - Normal
			break;
		case 1: // Nightmare
			Config.Leader = this.Grush.NightmareRusher[1]; // Expansion Leader - Nightmare
			Config.QuitList = [this.Grush.NightmareRusher[0]]; // Expansion Rusher - Nightmare
			break;
		case 2: // Hell
			Config.Leader = this.Grush.HellRusher[1]; // Expansion Leader - Hell
			Config.QuitList = [this.Grush.HellRusher[0]]; // Expansion Rusher - Hell
			break;
	}

	///////////////////
	// End Of Settings
	///////////////////
	Config.QuitListMode = 1; // 0 = use character names; 1 = use profile names (all profiles must run on the same computer).
	Scripts.Rushee = true; // Automatic rushee, works with Rusher. Set Rusher's character name as Config.Leader

	Config.HealHP = 50; // Go to a healer if under designated percent of life.
	Config.HealMP = 0; // Go to a healer if under designated percent of mana.
	Config.HealStatus = false; // Go to a healer if poisoned or cursed	
	Config.UseMerc = true; // Use merc. This is ignored and always false in d2classic.
	Config.MercWatch = false; // Instant merc revive during battle.
	Config.UseHP = 75; // Drink a healing potion if life is under designated percent.
	Config.UseRejuvHP = 40; // Drink a rejuvenation potion if life is under designated percent.
	Config.UseMP = 30; // Drink a mana potion if mana is under designated percent.
	Config.UseRejuvMP = 0; // Drink a rejuvenation potion if mana is under designated percent.
	Config.UseMercHP = 75; // Give a healing potion to your merc if his/her life is under designated percent.
	Config.UseMercRejuv = 0; // Give a rejuvenation potion to your merc if his/her life is under designated percent.
	Config.HPBuffer = 0; // Number of healing potions to keep in inventory.
	Config.MPBuffer = 0; // Number of mana potions to keep in inventory.
	Config.RejuvBuffer = 0; // Number of rejuvenation potions to keep in inventory.
	Config.LifeChicken = 0; // Exit game if life is less or equal to designated percent.
	Config.ManaChicken = 0; // Exit game if mana is less or equal to designated percent.
	Config.MercChicken = 0; // Exit game if merc's life is less or equal to designated percent.
	Config.TownHP = 0; // Go to town if life is under designated percent.
	Config.TownMP = 0; // Go to town if mana is under designated percent.
	Config.Inventory[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	Config.Inventory[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	Config.Inventory[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	Config.Inventory[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	Config.StashGold = 100000; // Minimum amount of gold to stash.
	Config.BeltColumn[0] = "hp";
	Config.BeltColumn[1] = "hp";
	Config.BeltColumn[2] = "hp";
	Config.BeltColumn[3] = "hp";
	Config.MinColumn[0] = 1;
	Config.MinColumn[1] = 1;
	Config.MinColumn[2] = 1;
	Config.MinColumn[3] = 1;
	//Config.PickitFiles.push("Sithy/Quest.nip");
	Config.PickRange = 40; // Pick radius
	Config.FastPick = false; // Check and pick items between attacks
	Config.ItemInfo = false; // Log stashed, skipped (due to no space) or sold items.
	Config.ItemInfoQuality = []; // The quality of sold items to log. See NTItemAlias.dbl for values. Example: Config.ItemInfoQuality = [6, 7, 8];
	Config.CainID.Enable = false; // Identify items at Cain
	Config.CainID.MinGold = 2500000; // Minimum gold (stash + character) to have in order to use Cain.
	Config.CainID.MinUnids = 3; // Minimum number of unid items in order to use Cain.
	Config.FieldID = false; // Identify items in the field instead of going to town.
	Config.DroppedItemsAnnounce.Enable = false; // Announce Dropped Items to in-game newbs
	Config.DroppedItemsAnnounce.Quality = []; // Quality of item to announce. See NTItemAlias.dbl for values. Example: Config.DroppedItemsAnnounce.Quality = [6, 7, 8];
	Config.CubeRepair = false; // Repair weapons with Ort and armor with Ral rune. Don't use it if you don't understand the risk of losing items.
	Config.RepairPercent = 40; // Durability percent of any equipped item that will trigger repairs.
	Config.Gamble = false;
	Config.GambleGoldStart = 1000000;
	Config.GambleGoldStop = 500000;
	Config.Cubing = false; // Set to true to enable cubing.
	Config.MakeRunewords = false; // Set to true to enable runeword making/rerolling
	Config.PublicMode = 2; // 1 = invite and accept, 2 = accept only, 3 = invite only, 0 = disable
	Config.Greetings = []; // Example: ["Hello, $name (level $level $class)"]
	Config.DeathMessages = []; // Example: ["Watch out for that $killer, $name!"]
	Config.Congratulations = []; // Example: ["Congrats on level $level, $name!"]
	Config.ShitList = false; // Blacklist hostile players so they don't get invited to party.
	Config.UnpartyShitlisted = false; // Leave party if someone invited a blacklisted player.
	Config.AutoMap = true; // Set to true to open automap at the beginning of the game.
	Config.LastMessage = "Next game: $nextgame//" + me.gamepassword; // Message or array of messages to say at the end of the run. Use $nextgame to say next game - "Next game: $nextgame" (works with lead entry point)
	Config.MinGameTime = 60; // Min game time in seconds. Bot will TP to town and stay in game if the run is completed before.
	Config.MaxGameTime = 0; // Maximum game time in seconds. Quit game when limit is reached.
	Config.TeleSwitch = false; // Switch to slot II when teleporting more than 1 node.
	Config.OpenChests = false; // Open chests. Controls key buying.
	Config.MiniShopBot = true; // Scan items in NPC shops.
	Config.PacketShopping = false; // Use packets to shop. Improves shopping speed.
	Config.TownCheck = false; // Go to town if out of potions
	Config.LogExperience = false; // Print experience statistics in the manager.
	Config.PingQuit = [{
		Ping: 0,
		Duration: 0
	}]; // Quit if ping is over the given value for over the given time period in seconds.
	Config.ScanShrines = [];
	Config.MFSwitchPercent = 0; // Boss life % to switch weapons at. Set to 0 to disable.
	Config.MFSwitch = 0; // MF weapon slot: 0 = slot I, 1 = slot II
	Config.FCR = 0; // 0 - disable, 1 to 255 - set value of faster cast rate 
	Config.FHR = 0; // 0 - disable, 1 to 255 - set value of faster hit recovery 
	Config.FBR = 0; // 0 - disable, 1 to 255 - set value of faster block recovery 
	Config.IAS = 0; // 0 - disable, 1 to 255 - set value of increased attack speed 
	Config.PacketCasting = 0; // 0 = disable, 1 = packet teleport, 2 = full packet casting.
	Config.WaypointMenu = false; // Set to true for Single and private realms
	Config.AntiHostile = false; // Enable anti-hostile
	Config.HostileAction = 0; // 0 - quit immediately, 1 - quit when hostile player is sighted, 2 - attack hostile
	Config.TownOnHostile = false; // Go to town instead of quitting when HostileAction is 0 or 1
	Config.RandomPrecast = false; // Anti-PK measure, only supported in Baal and BaalHelper and BaalAssisstant at the moment.
	Config.ViperCheck = false; // Quit if revived Tomb Vipers are sighted
	Config.StopOnDClone = false; // Go to town and idle as soon as Diablo walks the Earth
	Config.SoJWaitTime = 5; // Time in minutes to wait for another SoJ sale before leaving game. 0 = disabled
	Config.KillDclone = false; // Go to Palace Cellar 3 and try to kill Diablo Clone. Pointless if you already have Annihilus.
	Config.DCloneQuit = false; // 1 = quit when Diablo walks, 2 = quit on soj sales, 0 = disabled
	Config.SkipEnchant = [];
	Config.SkipAura = [];
	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = 0; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = 0; // Primary skill to others.
	Config.AttackSkill[4] = -1; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = -1; // Secondary untimed skill if monster is immune to primary untimed.
	Config.LowManaSkill[0] = -1; // Timed low mana skill.
	Config.LowManaSkill[1] = -1; // Untimed low mana skill.
	Config.CustomAttack = {
		//"Monster Name": [-1, -1]
	};
	Config.Dodge = false; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.
	Config.DodgeHP = 100; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
	Config.BossPriority = false; // Set to true to attack Unique/SuperUnique monsters first when clearing
	Config.ClearType = 0xF; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
	Config.TeleStomp = false; // Use merc to attack bosses if they're immune to attacks, but not to physical damage
	Config.Wereform = false; // 0 / false - don't shapeshift, 1 / "Werewolf" - change to werewolf, 2 / "Werebear" - change to werebear
	Config.LightningFuryDelay = 10; // Lightning fury interval in seconds. LF is treated as timed skill.
	Config.SummonValkyrie = false; // Summon Valkyrie
	Config.AutoBuild.Enabled = false; //	This will enable or disable the AutoBuild system
	Config.AutoBuild.Template = false; //	The name of the build associated with an existing 
	Config.AutoBuild.Verbose = true; //	Allows script to print messages in console
	Config.AutoBuild.DebugMode = true; //	Debug mode prints a little more information to console and 
}