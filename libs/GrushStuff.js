// GrushStuff common config
// place in libs/PowerRush.js
// requires libs/bots/Rushee.js and libs/bots/RusherGlitchPub.js and tools/rushthread.js

var Grush = {
  /////////////////////
  // Config Settings //
  /////////////////////

  // include @JSP name in waiting for players (needs a space at the end of string if using jsp name)
  JSP: ["Sithy@Jsp "],

  // Rushee Profiles, do NOT add profiles that do not exist in the manager
  RusheeProfiles: ["Rushee1 East"],

  NormalRusher: ["Rusher1 East", "Sithy"], // ["ProfileName", "CharacterName"]
  NightmareRusher: ["Rusher1 East", "Sithy"], // ["ProfileName", "CharacterName"]
  HellRusher: ["Rusher2 East", "SithyBB"], // ["ProfileName", "CharacterName"]

  RushSettings: {
    RealBumper: false,
    WaitPlayerCount: 2,
    Radament: false,
    LamEsen: false,
    Izual: false,
    Shenk: false,
    Anya: false,
    Ancients: false,
    LastRun: "" // End rush after this run. List of runs: http://pastebin.com/Uez3nZ6g
  },

  // After a full grush has been complete bot will try to start
  // profile (Grush.GrushRemaker.Profile) and remake the character
  // Entry script needs to be D2BotGrushRemaker.dbj
  GrushRemaker: {
    Enabled: false,
    Profile: "GrushRemaker",
    Realm: "useast",
    Account: "",
    Password: "",
    Character: "",
    Ladder: true,
    Hardcore: false,
    Expansion: true,
    CharType: "barbarian"
  },

  //////////////////////
  // In Game Settings //
  //////////////////////

  Info: ["-----------------------------------------------------------------------------------------",
         "Sithys Automated Rusher & Rushee Bot",
         "Rules:",
         "1) Bots will do the quests for you",
         "2) Anything starting with [BOT] is for the BOT only!",
         "3) !~DO NOT~! follow into portals unless changing Acts",
         "   If you enter a portal you WILL slow down the grush",
         "4) If the bots leave for an unkown reason please go to the next game",
         "   NG Example: SJ-10 -> SJ-11",
         "To repeat this message say \"info\"",
         "-----------------------------------------------------------------------------------------"],

  Phrases: {
    // ACT 1 //
    AndarielStart: "",
    AndarielEnter: "[BOT] Come for Andy",
    AndarielExit: "[BOT] Andys Dead",

    // ACT 2 //
    Act2: "Everyone to Act 2 please",

    RadamentStart: "",
    RadamentEnter: "[BOT] Come for Radament",
    RadamentLeave: "[BOT] Radaments dead, go back to town i will portal ontop of him",
    RadamentBookEnter: "Get the Book of Skill if you want it",

    CubeStart: "",
    CubeEnter: "[BOT] Get the Cube",

    AmuletStart: "",
    AmuletEnter: "[BOT] Get the Amulet",

    StaffStart: "",
    StaffEnter: "[BOT] Get the Staff",

    SummonerStart: "",
    SummonerEnter: "[BOT] Come for Summoner",
    SummonerLeave: "[BOT] Summoners dead",

    DurielStart: "",
    DurielEnter: "[BOT] Place staff in the Orifice and go back to town",
    DurielDead: "[BOT] Come talk to Tyrael",

    JerhynPortal: "Making Harem TP to talk to Jerhyn and go to act 3",

    // ACT 3 //
    Act3: "Everyone to Act 3 please",

    LamesenStart: "",
    LamesenEnter: "[BOT] Get the tome",

    TravincalStart: "",
    TravincalEnter: "[BOT] Come for Travincal council. if you die stay dead",
    TravincalLeave: "[BOT] Go back to town and talk to Cain",

    MephistoStart: "",
    MephistoEnter: "[BOT] Come for Mephisto",
    MephistoLeave: "[BOT] Go to town, I will tp next to the red portal",

    // ACT 4 //
    Act4: "Everyone to Act 4 Please",

    IzualStart: "",
    IzualEnter: "[BOT] Come for Izual",
    IzualLeave: "[BOT] Izuals dead, go talk to Tyrael",

    DiabloStart: "",
    DiabloEnter: "[BOT] Come for Diablo",
    DiabloLeave: "[BOT] Diablos dead",

    // ACT 5 //
    Act5: "Everyone to Act 5 please",

    ShenkStart: "",
    ShenkEnter: "[BOT] Come for Shenk",
    ShenkLeave: "[BOT] Shenks dead",

    AnyaStart: "",
    AnyaEnter: "[BOT] Get the potion from Malah and come free Anya",
    AnyaLeave: "[BOT] Free Anya and go back to town to get your scroll",

    AncientsStart: "",
    AncientsEnter: ["Bumper please come in",
                    "If you die stay dead",
                    "Or the quest will fail"],
    AncientsLeave: "Ancients dead go back to town",
    AncientsBumperless: "Level 1 Bumper will wait at ancients ready to walk free",
    AncientsBumperlessClear: ["Be patient while I clear the way so the level 1 bumper doesnt die",
                              "This is usually pretty fast"],

    BaalStart: "",
    BaalWaveTP: "Portal up if you want xp",
    BaalEnter: ["Bumper please come in",
                "If you die stay dead",
                "Or the quest will fail"],
    BaalDead: "[BOT] Baals dead",
    BaalBumperless: "Run my little bot man!",

    End: "~~ Rush complete ~~",
    SequenceError: "Sequence Error"
  },

};
