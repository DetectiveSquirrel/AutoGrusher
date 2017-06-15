/**
 *	@filename	Rushee.js
 *	@author		kolton
 *	@desc		Rushee script that works with Rusher
 */


include("GrushStuff.js");

function Rushee() {
	var act, leader, target,
		actions = [];

	this.findLeader = function(name) {
		var party = getParty(name);

		if (party) {
			return party;
		}

		return false;
	};

	// Get leader's act from Party Unit
	this.checkLeaderAct = function(unit) {
		if (unit.area <= 39) {
			return 1;
		}

		if (unit.area >= 40 && unit.area <= 74) {
			return 2;
		}

		if (unit.area >= 75 && unit.area <= 102) {
			return 3;
		}

		if (unit.area >= 103 && unit.area <= 108) {
			return 4;
		}

		return 5;
	};

	this.revive = function() {
		while (me.mode === 0) {
			delay(40);
		}

		if (me.mode === 17) {
			me.revive();

			me.automap = Config.AutoMap;

			while (!me.inTown) {
				delay(40);
			}
		}
	};

	this.checkQuest = function(id, state) {
		sendPacket(1, 0x40);
		delay(500);

		return me.getQuest(id, state);
	};

	this.getQuestItem = function(classid, chestid) {
		var chest, item,
			tick = getTickCount();

		if (me.getItem(classid)) {
			return true;
		}

		if (me.inTown) {
			return false;
		}

		chest = getUnit(2, chestid);

		if (!chest) {
			return false;
		}

		Misc.openChest(chest);

		item = getUnit(4, classid);

		if (!item) {
			if (getTickCount() - tick < 500) {
				delay(500);
			}

			return false;
		}

		return Pickit.pickItem(item);
	};

	this.checkQuestMonster = function(classid) {
		var monster = getUnit(1, classid);

		if (monster) {
			while (monster.mode !== 12 && monster.mode !== 0) {
				delay(500);
			}

			return true;
		}

		return false;
	};

	this.tyraelTalk = function() {
		var i,
			npc = getUnit(1, "tyrael");

		if (!npc) {
			return false;
		}

		for (i = 0; i < 3; i += 1) {
			if (getDistance(me, npc) > 3) {
				Pather.moveToUnit(npc);
			}

			npc.interact();
			delay(1000 + me.ping);
			me.cancel();

			if (Pather.getPortal(null)) {
				me.cancel();

				break;
			}
		}

		return Pather.usePortal(null) || Pather.usePortal(null, Config.Leader);
	};

	this.cubeStaff = function() {
		var staff = me.getItem("vip"),
			amulet = me.getItem("msf");

		if (!staff || !amulet) {
			return false;
		}

		Storage.Cube.MoveTo(amulet);
		Storage.Cube.MoveTo(staff);
		Cubing.openCube();
		print("making staff");
		transmute();
		delay(750 + me.ping);
		Cubing.emptyCube();
		me.cancel();

		return true;
	};

	this.placeStaff = function() {
		var staff, item,
			tick = getTickCount(),
			orifice = getUnit(2, 152);

		if (!orifice) {
			return false;
		}

		Misc.openChest(orifice);

		staff = me.getItem(91);

		if (!staff) {
			if (getTickCount() - tick < 500) {
				delay(500);
			}

			return false;
		}

		staff.toCursor();
		submitItem();
		delay(750 + me.ping);

		return true;
	};

	this.unbugCursor = function() {
		// unbug cursor
		
        if (me.itemoncursor) {
          Cubing.openCube();
          delay(500);
          me.cancel();
        }

		return true;
	};

	this.changeAct = function(act) {
		var npc,
			preArea = me.area;

		if (me.mode === 17) {
			me.revive();

			me.automap = Config.AutoMap;

			while (!me.inTown) {
				delay(500);
			}
		}

		if (me.act === act) {
			return true;
		}

		try {
			switch (act) {
				case 2:
					if (me.act >= 2) {
						break;
					}

					Town.move("warriv");

					npc = getUnit(1, "warriv");

					if (!npc || !npc.openMenu()) {
						return false;
					}

					Misc.useMenu(0x0D36);

					break;
				case 3:
					if (me.act >= 3) {
						break;
					}

					Town.move("portalspot");

					switch (me.profile) {
						case this.Grush.RusheeProfiles[0]:
							break;
						case this.Grush.RusheeProfiles[1]:
							delay(2500);
							break;
						case this.Grush.RusheeProfiles[2]:
							delay(5000);
							break;
						case this.Grush.RusheeProfiles[3]:
							delay(7500);
							break;
						case this.Grush.RusheeProfiles[4]:
							delay(10000);
							break;
						case this.Grush.RusheeProfiles[5]:
							delay(12500);
							break;
						case this.Grush.RusheeProfiles[6]:
							delay(15000);
							break;
					}

					Pather.usePortal(50, Config.Leader);

					delay(1500);

					Pather.moveToExit(40, true);

					npc = getUnit(1, "jerhyn");

					if (!npc || !npc.openMenu()) {
						D2Bot.printToConsole("Jerhyn is not here", 9);
						if (Config.LastMessage) {
							switch (typeof Config.LastMessage) {
								case "string":
									say("Jerhyn is not here");
									say(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"));
									D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);

									break;
								case "object":
									for (i = 0; i < Config.LastMessage.length; i += 1) {
										say("Jerhyn is not here");
										say(Config.LastMessage[i].replace("$nextgame", DataFile.getStats().nextGame, "i"));
										D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);
									}

									break;
							}
						}
					}

					me.cancel();
					Town.move("meshif");

					npc = getUnit(1, "meshif");

					if (!npc || !npc.openMenu()) {
						return false;
					}

					Misc.useMenu(0x0D38);

					break;
				case 4:
					if (me.act >= 4) {
						break;
					}

					if (me.inTown) {
						Town.move("cain");

						npc = getUnit(1, "deckard cain");

						if (!npc || !npc.openMenu()) {
							return false;
						}

						me.cancel();
						Pather.usePortal(102, Config.Leader);
					} else {
						delay(1500);
					}

					Pather.moveTo(17591, 8070);
					Pather.usePortal(null);

					break;
				case 5:
					if (me.act >= 5) {
						break;
					}

					Town.move("tyrael");

					npc = getUnit(1, "tyrael");

					if (!npc || !npc.openMenu()) {
						return false;
					}

					delay(me.ping + 1);

					if (getUnit(2, 566)) {
						me.cancel();
						Pather.useUnit(2, 566, 109);
					} else {
						Misc.useMenu(0x58D2);
					}

					break;
			}

			delay(1000 + me.ping * 2);

			while (!me.area) {
				delay(500);
			}

			if (me.area === preArea) {
				me.cancel();
				Town.move("portalspot");
				print("Act change failed.");

				return false;
			}

			print("Act change done.");
		} catch (e) {
			return false;
		}

		return true;
	};

	if (!this.Grush.RushSettings.InGameChat) {
		addEventListener('copydata', 		
			function ReceiveCopyData(mode, msg) {
			var obj;

			switch (mode) {
			case 4587: // Game info
				print(msg);

				actions.push(msg);

				break;
			}
		});


	} else {
		addEventListener("chatmsg",
			function(who, msg) {
				if (who === Config.Leader) {
					actions.push(msg);
				}
			});
	}

	// START
	if (me.inTown) {
		Town.move("portalspot");
	}

	while (!leader) {
		leader = this.findLeader(Config.Leader);

		delay(500);
	}

	print("Leader found.");

	while (true) {
		try {
			if (actions.length > 0) {
				switch (actions[0]) {
					case this.Grush.Phrases.RadamentBookEnter:
						switch (leader.area) {
							case 49: // Pick Book of Skill, use Book of Skill
								Town.move("portalspot");
								Pather.usePortal(49, Config.Leader);
								delay(500);

								while (true) {
									target = getUnit(4, 552);

									if (!target) {
										break;
									}

									Pickit.pickItem(target);
									delay(250);

									if (me.getItem(552)) {
										print("Using book of skill");
										clickItem(1, me.getItem(552));

										break;
									}
								}

								Pather.usePortal(40, Config.Leader);
								actions.shift();

								break;
						}

						actions.shift();

						break;
					case this.Grush.Phrases.BaalDead: // Bumper
						if (this.Grush.RusheeProfiles[0] != me.profile) {
							actions.shift();

							break;
						}

						if (Config.LastMessage) {
							switch (typeof Config.LastMessage) {
								case "string":
									say(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"));
									D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);

									break;
								case "object":
									for (i = 0; i < Config.LastMessage.length; i += 1) {
										say(Config.LastMessage[i].replace("$nextgame", DataFile.getStats().nextGame, "i"));
										D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);
									}

									break;
							}
						}	

						finishedRestart();

						actions.shift(); // this doesnt even happen but will keep here just because

						break;
					case this.Grush.Phrases.AndarielEnter:
					case this.Grush.Phrases.RadamentEnter:
					case this.Grush.Phrases.CubeEnter:
					case this.Grush.Phrases.AmuletEnter:
					case this.Grush.Phrases.StaffEnter:
					case this.Grush.Phrases.SummonerEnter:
					case this.Grush.Phrases.DurielDead:
					case this.Grush.Phrases.DurielEnter:
					case this.Grush.Phrases.LamesenEnter:
					case this.Grush.Phrases.TravincalEnter:
					case this.Grush.Phrases.MephistoEnter:
					case this.Grush.Phrases.IzualEnter:
					case this.Grush.Phrases.DiabloEnter:
					case this.Grush.Phrases.ShenkEnter:
					case this.Grush.Phrases.AnyaEnter:
						while (!leader.area) {
							delay(500);
						}

						//print(leader.area);

						if (this.Grush.RusheeProfiles[0] != me.profile) {
							//print("not a quester");
							actions.shift();

							break;
						}

						act = this.checkLeaderAct(leader);

						if (me.act !== act) {
							Town.goToTown(act);
							Town.move("portalspot");
						}

						switch (leader.area) {
							case 37: // Catacombs level 4
								if (!Pather.usePortal(37, Config.Leader)) {
									break;
								}

								target = Pather.getPortal(null, Config.Leader);

								if (target) {
									Pather.walkTo(target.x, target.y);
								}

								actions.shift();

								break;
							case 49:
								Town.move("portalspot");

								if (Pather.usePortal(49, Config.Leader)) {
									actions.shift();
								}

								break;
							case 60: // Halls of the Dead level 3
								Pather.usePortal(60, Config.Leader);
								this.getQuestItem(549, 354);
								Pather.usePortal(40, Config.Leader);

								actions.shift();

								break;
							case 61: // Claw Viper Temple level 2
								Pather.usePortal(61, Config.Leader);
								this.getQuestItem(521, 149);
								Pather.usePortal(40, Config.Leader);
								Town.move("drognan");

								target = getUnit(1, "drognan");

								if (target && target.openMenu()) {
									actions.shift();
									me.cancel();
									print("drognan done");
								}

								Town.move("portalspot");

								break;
							case 64: // Maggot Lair level 3
								Pather.usePortal(64, Config.Leader);
								this.getQuestItem(92, 356);
								delay(500);
								Pather.usePortal(40, Config.Leader);
								this.cubeStaff();

								actions.shift();

								break;
							case 74: // Arcane Sanctuary
								if (!Pather.usePortal(74, Config.Leader)) {
									break;
								}

								actions.shift();

								break;
							case 66: // Tal Rasha's Tombs
							case 67:
							case 68:
							case 69:
							case 70:
							case 71:
							case 72:
								Pather.usePortal(null, Config.Leader);
								this.placeStaff();
								Pather.usePortal(40, Config.Leader);
								this.unbugCursor();
								actions.shift();

								break;
							case 73: // Duriel's Lair
								Pather.usePortal(73, Config.Leader);
								this.tyraelTalk();
								delay(me.ping);
								this.tyraelTalk();

								actions.shift();

								break;
							case 83: // Travincal
								if (!Pather.usePortal(83, Config.Leader)) {
									me.cancel();

									break;
								}

								actions.shift();

								break;
							case 94: // Ruined Temple
								if (!Pather.usePortal(94, Config.Leader)) {
									me.cancel();

									break;
								}

								target = getUnit(2, 193);

								Misc.openChest(target);
								delay(300);

								target = getUnit(4, 548);

								Pickit.pickItem(target);
								Pather.usePortal(75, Config.Leader);
								Town.move("alkor");

								target = getUnit(1, "alkor");

								if (target && target.openMenu()) {
									me.cancel();
								}

								Town.move("portalspot");
								actions.shift();

								break;
							case 102: // Durance of Hate level 3
								if (!Pather.usePortal(102, Config.Leader)) {
									me.cancel();

									break;
								}

								actions.shift();

								break;
							case 104: // sometimes the portal can be in city of the damned...
							case 105:
								if (Pather.usePortal(null, Config.Leader)) {
									actions.shift();
								}

								break;
							case 108: // Chaos Sanctuary
								Pather.usePortal(108, Config.Leader);
								Pather.moveTo(7762, 5268);
								Packet.flash(me.gid);
								delay(500);
								Pather.walkTo(7763, 5267, 2);

								while (!getUnit(1, 243)) {
									delay(500);
								}

								Pather.moveTo(7763, 5267);
								actions.shift();

								break;
							case 110: // Bloody Foothils
								Pather.usePortal(110, Config.Leader);
								actions.shift();

								break;
							case 114: // Frozen River
								Town.move("malah");

								target = getUnit(1, "malah");

								if (target && target.openMenu()) {
									me.cancel();
								}

								Pather.usePortal(114, Config.Leader);
								delay(500);

								target = getUnit(2, 558);

								if (target) {
									Pather.moveToUnit(target);
									sendPacket(1, 0x13, 4, 0x2, 4, target.gid);
									delay(1000);
									me.cancel();
								}

								actions.shift();

								break;
							default: // unsupported area
								actions.shift();

								break;
						}

						break;
					case this.Grush.Phrases.AndarielExit: // Go back to town and check quest
					case this.Grush.Phrases.RadamentLeave: // Go back to town and check quest
					case this.Grush.Phrases.SummonerLeave: // Go back to town and check quest
					case this.Grush.Phrases.TravincalLeave: // Go back to town and check quest
					case this.Grush.Phrases.MephistoLeave: // Go back to town and check quest
					case this.Grush.Phrases.IzualLeave: // Go back to town and check quest
					case this.Grush.Phrases.DiabloLeave: // Go back to town and check quest
					case this.Grush.Phrases.ShenkLeave: // Go back to town and check quest
					case this.Grush.Phrases.AnyaLeave: // Go back to town and check quest
					case this.Grush.Phrases.SequenceError: // Go back to town and check quest
						if (this.Grush.RusheeProfiles[0] != me.profile) {
							switch (leader.area) {
								case 74:
									Town.move("cain");

									target = getUnit(1, NPC.Cain);

									if (target && target.openMenu()) {
										me.cancel();
									} else {
										break;
									}

									Town.move("portalspot");

									break;
									// Non-questers can piggyback off quester out messages
								case 110: // Shenk
									if (me.act === 5) {
										Town.move("larzuk");

										target = getUnit(1, "larzuk");

										if (target && target.openMenu()) {
											me.cancel();
										}
									}

									break;
								case 114: // Anya
									if (me.act === 5) {
										Town.move("malah");

										target = getUnit(1, "malah");

										if (target && target.openMenu()) {
											me.cancel();
										}

										if (me.getItem(646)) {
											print("Using scroll of resistance");
											clickItem(1, me.getItem(646));
										}
									}

									break;
								case 104:
								case 105:
									if (me.act === 4 && this.checkQuest(25, 1)) {
										Town.move(NPC.Tyrael);

										target = getUnit(1, "tyrael");

										if (target && target.openMenu()) {
											me.cancel();
										}
									}

									break;
							}

							actions.shift();

							break;
						}

						switch (me.area) {
							case 37: // Catacombs level 4
								this.revive();

								me.automap = Config.AutoMap;

								// Go to town if not there, break if procedure fails
								if (!me.inTown && !Pather.usePortal(1, Config.Leader)) {
									break;
								}

								actions.shift();

								break;
							case 49: // Sewers 3
								this.revive();

								me.automap = Config.AutoMap;

								if (!me.inTown && !Pather.usePortal(40, Config.Leader)) {
									break;
								}

								actions.shift();

								break;
							case 74: // Arcane Sanctuary
								this.revive();

								me.automap = Config.AutoMap;

								if (!me.inTown && !Pather.usePortal(40, Config.Leader)) {

									break;
								}

								Town.move("atma");

								target = getUnit(1, 176); // Atma

								if (target && target.openMenu()) {
									me.cancel();
								} else {
									break;
								}

								Town.move("cain");

								target = getUnit(1, NPC.Cain);

								if (target && target.openMenu()) {
									me.cancel();
								} else {
									break;
								}

								if (!this.checkQuest(13, 0)) {
									D2Bot.printToConsole("Summoner quest failed", 9);
									if (Config.LastMessage) {
										switch (typeof Config.LastMessage) {
											case "string":
												say("Bot thinks Quest Failed");
												say(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"));
												D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);

												break;
											case "object":
												for (i = 0; i < Config.LastMessage.length; i += 1) {
													say("bot thinks Quest Failed");
													say(Config.LastMessage[i].replace("$nextgame", DataFile.getStats().nextGame, "i"));
												D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);
												}

												break;
										}
									}
									quit();
								}

								Town.move("portalspot");
								actions.shift();

								break;
							case 83: // Travincal
								this.revive();

								me.automap = Config.AutoMap;

								if (!me.inTown && !Pather.usePortal(75, Config.Leader)) {
									break;
								}

								Town.move("cain");

								target = getUnit(1, NPC.Cain);

								if (target && target.openMenu()) {
									me.cancel();
								} else {
									break;
								}

								if (!this.checkQuest(21, 0)) {
									D2Bot.printToConsole("Travincal quest failed", 9);
									if (Config.LastMessage) {
										switch (typeof Config.LastMessage) {
											case "string":
												say("Bot thinks Quest Failed");
												say(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"));
												D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);

												break;
											case "object":
												for (i = 0; i < Config.LastMessage.length; i += 1) {
													say("Bot thinks Quest Failed");
													say(Config.LastMessage[i].replace("$nextgame", DataFile.getStats().nextGame, "i"));
													D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);
												}

												break;
										}
									}
									delay(1000);
									quit();
								}

								Town.move("portalspot");
								actions.shift();

								break;
							case 102: // Durance 3
								this.revive();

								me.automap = Config.AutoMap;

								if (!Pather.usePortal(75, Config.Leader)) {
									break;
								}

								actions.shift();

								break;
							case 104:
							case 105:
								this.revive();

								me.automap = Config.AutoMap;

								if (!me.inTown && !Pather.usePortal(103, Config.Leader)) {
									break;
								}

								if (this.checkQuest(25, 1)) {
									Town.move(NPC.Tyrael);

									target = getUnit(1, "tyrael");

									if (target && target.openMenu()) {
										me.cancel();
									}

									Town.move("portalspot");
								}

								actions.shift();

								break;
							case 108: // Chaos Sanctuary
								this.revive();

								me.automap = Config.AutoMap;

								if (me.gametype === 0) {	
									finishedRestart();
								}

								if (!me.inTown && !Pather.usePortal(103, Config.Leader)) {
									break;
								}

								actions.shift();

								break;
							case 110: // Bloody Foothils
								this.revive();

								me.automap = Config.AutoMap;

								if (!me.inTown && !Pather.usePortal(109, Config.Leader)) {
									break;
								}

								Town.move("larzuk");

								target = getUnit(1, "larzuk");

								if (target && target.openMenu()) {
									me.cancel();
								}

								Town.move("portalspot");
								actions.shift();

								break;
							case 114: // Frozen River
								this.revive();

								me.automap = Config.AutoMap;

								if (!me.inTown && !Pather.usePortal(109, Config.Leader)) {
									break;
								}

								Town.move("malah");

								target = getUnit(1, "malah");

								if (target && target.openMenu()) {
									me.cancel();
								}

								if (me.getItem(646)) {
									print("Using Scroll of Resistance");
									clickItem(1, me.getItem(646));
								}

								Town.move("portalspot");
								actions.shift();

								break;
							default:
								Town.move("portalspot");
								actions.shift();

								break;
						}

						break;
					case this.Grush.Phrases.AncientsBumperless: // Bumper
					case this.Grush.Phrases.BaalBumperless: // Bumper
						if (this.Grush.RusheeProfiles[0] != me.profile) {
							actions.shift();

							break;
						}

						while (!leader.area) {
							delay(500);
						}

						act = this.checkLeaderAct(leader);

						if (me.act !== act) {
							Town.goToTown(act);
							Town.move("portalspot");
						}

						switch (leader.area) {
							case 120: // Arreat Summit
								if (!Pather.usePortal(120, Config.Leader)) {
									break;
								}

								actions.shift();

								break;
							case 131: // Throne Of Destruction

								if (!Pather.moveToExit([128,129,130,131], true)) {
									say("Bot failed to clear the way to throne");
									if (Config.LastMessage) {
										switch (typeof Config.LastMessage) {
											case "string":
												say(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"));
												D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);

												break;
											case "object":
												for (i = 0; i < Config.LastMessage.length; i += 1) {
													say(Config.LastMessage[i].replace("$nextgame", DataFile.getStats().nextGame, "i"));
													D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);
												}

												break;
										}
									}

									quit();
								}

								Pather.moveTo(15121, 5240);
								Pather.moveTo(15118, 5214);
								Pather.moveTo(15112, 5184);
								Pather.moveTo(15108, 5156);
								Pather.moveTo(15106, 5129);
								Pather.moveTo(15101, 5103);
								Pather.moveTo(15096, 5077);
								Pather.moveTo(15092, 5011);

								while (getUnit(1, 543)) {
									delay(500);
								}

								var portal = getUnit(2, 563);

								if (portal) {
									Pather.usePortal(null, null, portal);
								} else {
									throw new Error("Couldn't find portal.");
								}

								var baal = getUnit(1, 544)

								while (baal) {
									delay(500);
									if (baal.hp === 0) {
										break;
									}
								}

								if (Config.LastMessage) {
									switch (typeof Config.LastMessage) {
										case "string":
											say(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"));
											D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);

											break;
										case "object":
											for (i = 0; i < Config.LastMessage.length; i += 1) {
												say(Config.LastMessage[i].replace("$nextgame", DataFile.getStats().nextGame, "i"));
												D2Bot.printToConsole(Config.LastMessage.replace("$nextgame", DataFile.getStats().nextGame, "i"), 9);
											}

											break;
									}
								}

								finishedRestart();

								actions.shift();

								break;
						}

						break;
					case this.Grush.Phrases.Act2:
						if (!this.changeAct(2)) {
							break;
						}

						me.automap = Config.AutoMap; 


						/* I have never actually talked to him when entering anyway?
						
						target = getUnit(1, "jerhyn");

						if (target) {
							target.openMenu();
						}

						me.cancel();*/

						Town.move("portalspot");
						actions.shift();

						break;
					case this.Grush.Phrases.Act3:
						if (!this.changeAct(3)) {
							break;
						}

						me.automap = Config.AutoMap; 

						Town.move("portalspot");
						actions.shift();

						break;
					case this.Grush.Phrases.Act4:
						if (!this.changeAct(4)) {
							break;
						}

						me.automap = Config.AutoMap; 

						Town.move("portalspot");
						actions.shift();

						break;
					case this.Grush.Phrases.Act5:
						if (!this.changeAct(5)) {
							break;
						}

						me.automap = Config.AutoMap; 

						Town.move("portalspot");
						actions.shift();

						break;
					default: // Invalid command
						actions.shift();

						break;
				}
			}
		} catch (e) {
			if (me.mode === 17) {
				me.revive();

				me.automap = Config.AutoMap;

				while (!me.inTown) {
					delay(500);
				}
			}
		}

		if (getUIFlag(0x17)) {
			me.cancel();
		}

		delay(500);
	}

	return true;
}

function finishedRestart() {
	Config.QuitList = [];	

	for (i = 1; i < this.Grush.RusheeProfiles.length; i++) {
		D2Bot.stop(this.Grush.RusheeProfiles[i].toString());
		delay(1000);
		D2Bot.start(this.Grush.RusheeProfiles[i].toString());
	}


	switch (me.diff) {
		case 0: 
			if (this.Grush.NormalRusher[0] !== this.Grush.NightmareRusher[0]) {
				D2Bot.start(this.Grush.NightmareRusher[0]);
				delay(750);
				D2Bot.stop(this.Grush.NormalRusher[0], true);
			}
			break;
		case 1: 
			if (this.Grush.NightmareRusher[0] !== this.Grush.HellRusher[0]) {
				D2Bot.start(this.Grush.HellRusher[0]);
				delay(750);
				D2Bot.stop(this.Grush.NightmareRusher[0], true);
			}
			break;
	}

	delay(750);


	D2Bot.restart();

}
