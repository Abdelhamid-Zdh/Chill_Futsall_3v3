// setup.js
/* VARIABLES */
// Stats: "Auth" : '["0-Games", "1-Wins", "2-Goals", "3-Assists", "4-GK", "5-CS", "6-Elo", "7-Role", "8-Celebration", "9-Msg", "10-Emoji", "11-NickName"]'
/* ROOM */

// GLOBAL VARIABLES //
const roomName = "🟧 Chill | Futsal | 3v3 | Elo 🟧 Testing";
const maxPlayers = 30;
const roomPublic = false;
const token = "thr1.AAAAAGnNpL8rv4n8IYyPtw.QMyBlbwnZ4E";
const password = "Chillpass2020";

/* Room Log Links */
const privateRoomWebHook = "https://discord.com/api/webhooks/1469679245906149400/7CBHjNyx7IQKJOZnDq3lSanF1qIGeIGQrRrkH8taYCXdAEBRnIDh2KKshKuf4_m9T57q"

// GEOLOCALIZATION //
const geo = [
    { code: "EN", lat: 52.42, lon: -1.91 }, // Birmingham, UK
];

// Admin password //
var adminPassword = "chilladmin123";

const room = HBInit({
    roomName: roomName,
    maxPlayers: maxPlayers,
    public: roomPublic,
    noPlayer: true,
    geo: geo[0],
    token: token,
    password: password,
});

// GAME SETTINGS //
const scoreLimit = 3;
const timeLimit = 3;

room.setTeamsLock(true);

var player_size = 15;

// maps.js
/* STADIUM */

const playerRadius = 15;
const ballRadius = 6.25;
const triggerDistance = playerRadius + ballRadius + 0.01;
const m_solo = `
{
	"name" : "Chill Solo Training Map (By Hamidox)",
	"width" : 400,
	"height" : 200,
	"spawnDistance" : 170,
	"bg" : { "type" : "", "color" : "1A2F4A", "width" : 400, "height" : 200, "kickOffRadius" : 0, "cornerRadius" : 0 },
	"vertexes" : [
		{ "bCoef" : 1, "cMask" : ["ball"], "trait" : "goalNet", "x" : 200, "y" : 100, "curve" : 0, "vis" : false, "color" : "ffffff" },
		{ "bCoef" : 1, "cMask" : ["ball"], "trait" : "goalNet", "x" : -200, "y" : 100, "curve" : 0, "vis" : false, "color" : "ffffff" },
		{ "bCoef" : 1, "cMask" : ["ball"], "trait" : "goalNet", "x" : -200, "y" : -100, "color" : "ffffff" },
		{ "bCoef" : 1, "cMask" : ["ball"], "trait" : "goalNet", "x" : 200, "y" : -100, "color" : "ffffff" }
	],
	"segments" : [
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball"], "trait" : "goalNet", "v0" : 1, "v1" : 0 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball"], "trait" : "goalNet", "v0" : 2, "v1" : 3 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "bCoef" : 1, "trait" : "goalPost", "v0" : 3, "v1" : 0, "cMask" : ["ball"] },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "v0" : 2, "v1" : 1, "cMask" : ["ball"], "bCoef" : 1 }
	],
	"goals" : [],
	"discs" : [],
	"planes" : [
		{ "bCoef" : 1, "cMask" : ["ball"], "dist" : -100, "normal" : [0,-1] },
		{ "bCoef" : 1, "cMask" : ["ball"], "dist" : -100, "normal" : [0,1] },
		{ "bCoef" : 1, "cMask" : ["ball"], "dist" : -200, "normal" : [-1,0] },
		{ "bCoef" : 1, "cMask" : ["ball"], "dist" : -200, "normal" : [1,0] }
	],
	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball"] },
		"goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 0.5 },
		"goalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball"] },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 1, "cGroup" : ["redKO","blueKO"], "cMask" : ["red","blue"] }
	},
	"playerPhysics" : {
		"radius" : 15.5, "bCoef" : 0.35, "invMass" : 0.5, "damping" : 0.96,
		"cGroup" : ["red","blue"], "acceleration" : 0.118, "gravity" : [0,0],
		"kickingAcceleration" : 0.083, "kickingDamping" : 0.96, "kickStrength" : 4.7, "kickback" : 0
	},
	"ballPhysics" : {
		"radius" : 6.4, "bCoef" : 0.465, "cMask" : ["all"], "damping" : 0.99,
		"invMass" : 1.4, "gravity" : [0,0], "color" : "BDFF80", "cGroup" : ["ball"], "canBeStored" : true
	}
}
`;
const m_2v2 = `
{
	"name" : "Chill Futsal 1v1 2v2 (By Hamidox)",
	"width" : 430, "height" : 200,
	"bg" : { "type" : "", "color" : "1A2F4A", "width" : 0, "height" : 0 },
	"vertexes" : [
		{ "x" : 0, "y" : 200, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a8b4bd" },
		{ "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a8b4bd" },
		{ "x" : 0, "y" : -200, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "x" : -368, "y" : -65, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2, "color" : "d0d5e1" },
		{ "x" : -400, "y" : -65, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : -400, "y" : 65, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : -368, "y" : 65, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2, "color" : "d0d5e1" },
		{ "x" : 368, "y" : -60, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2, "color" : "d0d5e1" },
		{ "x" : 400, "y" : -60, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 400, "y" : 60, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 368, "y" : 60, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2, "color" : "d0d5e1" },
		{ "x" : -368, "y" : 65, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : 32 },
		{ "x" : -368, "y" : 171.5, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : 32 },
		{ "x" : -368, "y" : -65, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -32 },
		{ "x" : -368, "y" : -171.5, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -32 },
		{ "x" : -368, "y" : 170, "bCoef" : 1.3, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 368, "y" : 170, "bCoef" : 1.3, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 368, "y" : 60, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -32 },
		{ "x" : 368, "y" : 171.5, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -32 },
		{ "x" : 368, "y" : -171.5, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -32 },
		{ "x" : 368, "y" : -60, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -32 },
		{ "x" : -368, "y" : -170, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 368, "y" : -170, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 0, "y" : -169, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a8b4bd" },
		{ "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a8b4bd", "curve" : 0 },
		{ "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a3acc2" },
		{ "x" : 0, "y" : 170, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a3acc2" },
		{ "x" : -366.5, "y" : 122, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : -366.5, "y" : -122, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : 366.5, "y" : 122, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : 366.5, "y" : -122, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : -368, "y" : 65, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1", "curve" : 0 },
		{ "x" : -368, "y" : -65, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1", "curve" : 0 },
		{ "x" : 368, "y" : 60, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1", "curve" : 0 },
		{ "x" : 368, "y" : -60, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1", "curve" : 0 },
		{ "x" : -400, "y" : -66.5, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : -400, "y" : 66.5, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : 400, "y" : -60, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 400, "y" : 60, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 0, "y" : 78, "cGroup" : ["c1"], "color" : "d0d5e1", "curve" : 180 },
		{ "x" : 0, "y" : -78, "cGroup" : ["c1"], "color" : "d0d5e1", "curve" : 180 },
		{ "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a3acc2" },
		{ "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "a3acc2" },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 122, "y" : 160 }, { "bCoef" : 1.1, "cMask" : [], "x" : 122, "y" : 180 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 244, "y" : 160 }, { "bCoef" : 1.1, "cMask" : [], "x" : 244, "y" : 180 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -122, "y" : 160 }, { "bCoef" : 1.1, "cMask" : [], "x" : -122, "y" : 180 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -244, "y" : 160 }, { "bCoef" : 1.1, "cMask" : [], "x" : -244, "y" : 180 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : 244, "y" : -160 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : 244, "y" : -180 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : 122, "y" : -160 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : 122, "y" : -180 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : -122, "y" : -160 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : -122, "y" : -180 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : -244, "y" : -160 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : -244, "y" : -180 },
		{ "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "x" : 0, "y" : -170 }
	],
	"segments" : [
		{ "v0" : 4, "v1" : 5, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2 },
		{ "v0" : 6, "v1" : 7, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2 },
		{ "v0" : 8, "v1" : 9, "color" : "e8e3e3", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2 },
		{ "v0" : 10, "v1" : 11, "color" : "e8e3e3", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2 },
		{ "v0" : 0, "v1" : 1, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "v0" : 2, "v1" : 3, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "v0" : 12, "v1" : 13, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : 32 },
		{ "v0" : 14, "v1" : 15, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : -32 },
		{ "v0" : 16, "v1" : 17, "color" : "d0d5e1", "cMask" : ["ball"] },
		{ "v0" : 18, "v1" : 19, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : -32 },
		{ "v0" : 20, "v1" : 21, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : -32 },
		{ "v0" : 22, "v1" : 23, "color" : "d0d5e1", "bCoef" : 2, "cMask" : ["ball"] },
		{ "v0" : 24, "v1" : 25, "color" : "a8b4bd", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "v0" : 26, "v1" : 27, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "v0" : 29, "v1" : 28, "curve" : 180, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 30, "v1" : 31, "curve" : 180, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 33, "v1" : 32, "curve" : 0, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 35, "v1" : 34, "curve" : 0, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 36, "v1" : 37, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0 },
		{ "v0" : 38, "v1" : 39, "color" : "e8e3e3", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0 },
		{ "v0" : 40, "v1" : 41, "curve" : 180, "vis" : true, "color" : "d0d5e1", "cGroup" : ["c1"] },
		{ "v0" : 41, "v1" : 40, "curve" : 180, "vis" : true, "color" : "d0d5e1", "cGroup" : ["c1"] },
		{ "v0" : 42, "v1" : 43, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["blueKO"] },
		{ "v0" : 43, "v1" : 42, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO"] },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "v0" : 44, "v1" : 45 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "v0" : 46, "v1" : 47 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "v0" : 48, "v1" : 49 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "v0" : 50, "v1" : 51 },
		{ "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "v0" : 52, "v1" : 53 },
		{ "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "v0" : 54, "v1" : 55 },
		{ "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "v0" : 56, "v1" : 57 },
		{ "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "v0" : 58, "v1" : 59 }
	],
	"planes" : [
		{ "normal" : [0,1], "dist" : -170, "bCoef" : 1.1, "cMask" : ["ball"] },
		{ "normal" : [0,-1], "dist" : -170, "bCoef" : 1.1, "cMask" : ["ball"] },
		{ "normal" : [0,1], "dist" : -200, "bCoef" : 0.1 },
		{ "normal" : [0,-1], "dist" : -200, "bCoef" : 0.1 },
		{ "normal" : [1,0], "dist" : -430, "bCoef" : 0.1 },
		{ "normal" : [-1,0], "dist" : -430, "bCoef" : 0.1 },
		{ "normal" : [1,0], "dist" : -400, "bCoef" : 0.1, "cMask" : ["ball"] },
		{ "normal" : [-1,0], "dist" : -400, "bCoef" : 0.1, "cMask" : ["ball"] }
	],
	"goals" : [
		{ "p0" : [368,65], "p1" : [368,-65], "team" : "blue", "color" : "d0d5e1" },
		{ "p0" : [-368,-65], "p1" : [-368,65], "team" : "red", "color" : "d0d5e1" }
	],
	"discs" : [
		{ "radius" : 4.5, "invMass" : 0, "pos" : [-368,65], "color" : "d0d5e1" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [-368,-65], "color" : "d0d5e1" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [368,60], "color" : "d0d5e1" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [368,-60], "color" : "d0d5e1" }
	],
	"playerPhysics" : { "bCoef" : 0.35, "acceleration" : 0.11, "kickingAcceleration" : 0.083, "kickStrength" : 4.65 },
	"ballPhysics" : { "radius" : 6.5, "bCoef" : 0.465, "invMass" : 1.4, "color" : "FFD700" },
	"spawnDistance" : 180,
	"traits" : [], "joints" : [], "redSpawnPoints" : [], "blueSpawnPoints" : [], "canBeStored" : false
}
`;
const m_3v3 = `
{
	"name" : "Chill 3v3 Futsall (By Hamidox)",
	"width" : 620, "height" : 270,
	"bg" : { "type" : "", "color" : "353C4A", "width" : 0, "height" : 0 },
	"vertexes" : [
		{ "x" : 550, "y" : -240, "cMask" : ["ball"] },
		{ "x" : 0, "y" : 270, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "999999" },
		{ "x" : -550, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2, "color" : "ffffff" },
		{ "x" : -590, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : -590, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : -550, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2, "color" : "ffffff" },
		{ "x" : 550, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2, "color" : "999999" },
		{ "x" : 590, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 590, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 550, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2, "color" : "999999" },
		{ "x" : -550, "y" : 80, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : 40 },
		{ "x" : -550, "y" : 240, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : 40 },
		{ "x" : -550, "y" : -80, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -40 },
		{ "x" : -550, "y" : -240, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -40 },
		{ "x" : -551.5, "y" : 240, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 551.5, "y" : 240, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 550, "y" : 80, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -40 },
		{ "x" : 550, "y" : 240, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -40 },
		{ "x" : 550, "y" : -240, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -40 },
		{ "x" : 550, "y" : -80, "bCoef" : 1.1, "cMask" : ["ball"], "color" : "d0d5e1", "bias" : -40 },
		{ "x" : 550, "y" : -240, "bCoef" : 0, "cMask" : ["ball"] },
		{ "x" : 550, "y" : -240, "bCoef" : 0, "cMask" : ["ball"] },
		{ "x" : -551.5, "y" : -240, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 551.5, "y" : -240, "cMask" : ["ball"], "color" : "d0d5e1" },
		{ "x" : 0, "y" : -240, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1" },
		{ "x" : 0, "y" : -81.4, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1" },
		{ "x" : 0, "y" : 81.4, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1" },
		{ "x" : 0, "y" : 240, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1" },
		{ "x" : 550, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball"], "color" : "999999" },
		{ "x" : 550, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball"], "color" : "999999" },
		{ "x" : -550, "y" : -80, "bCoef" : 0.1, "cMask" : [], "color" : "ffffff" },
		{ "x" : -550, "y" : 80, "bCoef" : 0.1, "cMask" : [], "color" : "ffffff" },
		{ "x" : 550, "y" : -80, "bCoef" : 0.1, "cMask" : [], "color" : "9c9c9c" },
		{ "x" : 550, "y" : 80, "bCoef" : 0.1, "cMask" : [], "color" : "9c9c9c" },
		{ "x" : -548.5, "y" : 160, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : -548.5, "y" : -160, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : 548.5, "y" : 160, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : 548.5, "y" : -160, "bCoef" : 0.1, "cMask" : [], "color" : "d0d5e1" },
		{ "x" : -590, "y" : -81.5, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : -590, "y" : 81.5, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "ffffff" },
		{ "x" : 590, "y" : -81.5, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 590, "y" : 81.5, "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0, "color" : "e8e3e3" },
		{ "x" : 0, "y" : 78, "cGroup" : ["c1"], "color" : "d0d5e1", "curve" : 180 },
		{ "x" : 0, "y" : -78, "cGroup" : ["c1"], "color" : "d0d5e1", "curve" : 180 },
		{ "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "9c9c9c", "curve" : 180 },
		{ "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "9c9c9c", "curve" : 180 },
		{ "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1", "curve" : 0 },
		{ "x" : 0, "y" : -270, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1", "curve" : 0 },
		{ "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1", "curve" : 0 },
		{ "x" : 0, "y" : 270, "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"], "color" : "d0d5e1", "curve" : 0 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 110, "y" : 230, "color" : "d0d5e1" }, { "bCoef" : 1.1, "cMask" : [], "x" : 110, "y" : 250, "color" : "d0d5e1" },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 220, "y" : 230, "color" : "d0d5e1" }, { "bCoef" : 1.1, "cMask" : [], "x" : 220, "y" : 250, "color" : "d0d5e1" },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 330, "y" : 230, "color" : "d0d5e1" }, { "bCoef" : 1.1, "cMask" : [], "x" : 330, "y" : 250, "color" : "d0d5e1" },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 440, "y" : 230, "color" : "d0d5e1" }, { "bCoef" : 1.1, "cMask" : [], "x" : 440, "y" : 250, "color" : "d0d5e1" },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -110, "y" : 230 }, { "bCoef" : 1.1, "cMask" : [], "x" : -110, "y" : 250 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -220, "y" : 230 }, { "bCoef" : 1.1, "cMask" : [], "x" : -220, "y" : 250 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -330, "y" : 230 }, { "bCoef" : 1.1, "cMask" : [], "x" : -330, "y" : 250 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -440, "y" : 230 }, { "bCoef" : 1.1, "cMask" : [], "x" : -440, "y" : 250 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -440, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : -440, "y" : -230 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -330, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : -330, "y" : -230 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -220, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : -220, "y" : -230 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : -110, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : -110, "y" : -230 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 110, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : 110, "y" : -230 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 220, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : 220, "y" : -230 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 330, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : 330, "y" : -230 },
		{ "bCoef" : 1.1, "cMask" : [], "x" : 440, "y" : -250 }, { "bCoef" : 1.1, "cMask" : [], "x" : 440, "y" : -230 }
	],
	"segments" : [
		{ "v0" : 2, "v1" : 3, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2 },
		{ "v0" : 4, "v1" : 5, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 2 },
		{ "v0" : 6, "v1" : 7, "color" : "e8e3e3", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2 },
		{ "v0" : 8, "v1" : 9, "color" : "e8e3e3", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : -2 },
		{ "v0" : 10, "v1" : 11, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : 40 },
		{ "v0" : 12, "v1" : 13, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : -40 },
		{ "v0" : 14, "v1" : 15, "color" : "d0d5e1", "cMask" : ["ball"] },
		{ "v0" : 16, "v1" : 17, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : -40 },
		{ "v0" : 18, "v1" : 19, "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : ["ball"], "bias" : -40 },
		{ "v0" : 20, "v1" : 21, "color" : "F8F8F8", "bCoef" : 0, "cMask" : ["ball"] },
		{ "v0" : 22, "v1" : 23, "color" : "d0d5e1", "cMask" : ["ball"] },
		{ "v0" : 24, "v1" : 25, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "v0" : 26, "v1" : 27, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "v0" : 30, "v1" : 31, "color" : "9c9c9c", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 32, "v1" : 33, "color" : "9c9c9c", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 35, "v1" : 34, "curve" : 180, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 36, "v1" : 37, "curve" : 180, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : [] },
		{ "v0" : 38, "v1" : 39, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0 },
		{ "v0" : 40, "v1" : 41, "color" : "e8e3e3", "bCoef" : 0.1, "cMask" : ["ball"], "bias" : 0 },
		{ "v0" : 42, "v1" : 43, "curve" : 180, "vis" : true, "color" : "d0d5e1", "cGroup" : ["c1"] },
		{ "v0" : 43, "v1" : 42, "curve" : 180, "vis" : true, "color" : "d0d5e1", "cGroup" : ["c1"] },
		{ "v0" : 44, "v1" : 45, "curve" : 180, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["blueKO"] },
		{ "v0" : 45, "v1" : 44, "curve" : 180, "color" : "9c9c9c", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO"] },
		{ "v0" : 46, "v1" : 47, "curve" : 0, "vis" : false, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "v0" : 48, "v1" : 49, "curve" : 0, "vis" : false, "color" : "d0d5e1", "bCoef" : 0.1, "cMask" : ["red","blue"], "cGroup" : ["redKO","blueKO"] },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 50, "v1" : 51 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 52, "v1" : 53 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 54, "v1" : 55 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 56, "v1" : 57 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 58, "v1" : 59 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 60, "v1" : 61 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 62, "v1" : 63 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 64, "v1" : 65 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 66, "v1" : 67 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 68, "v1" : 69 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 70, "v1" : 71 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 72, "v1" : 73 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 74, "v1" : 75 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 76, "v1" : 77 },
		{ "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 78, "v1" : 79 }, { "color" : "d0d5e1", "bCoef" : 1.1, "cMask" : [], "v0" : 80, "v1" : 81 }
	],
	"planes" : [
		{ "normal" : [0,1], "dist" : -240, "bCoef" : 1.1, "cMask" : ["ball"] },
		{ "normal" : [0,-1], "dist" : -240, "bCoef" : 1.1, "cMask" : ["ball"] },
		{ "normal" : [0,1], "dist" : -270, "bCoef" : 0.1 }, { "normal" : [0,-1], "dist" : -270, "bCoef" : 0.1 },
		{ "normal" : [1,0], "dist" : -620, "bCoef" : 0.1 }, { "normal" : [-1,0], "dist" : -620, "bCoef" : 0.1 },
		{ "normal" : [1,0], "dist" : -590, "bCoef" : 0.1, "cMask" : ["ball"] },
		{ "normal" : [-1,0], "dist" : -590, "bCoef" : 0.1, "cMask" : ["ball"] }
	],
	"goals" : [
		{ "p0" : [550,80], "p1" : [550,-80], "team" : "blue", "color" : "999999" },
		{ "p0" : [-550,-80], "p1" : [-550,81], "team" : "red", "color" : "999999" }
	],
	"discs" : [
		{ "radius" : 4.5, "invMass" : 0, "pos" : [-550,80], "color" : "ffffff" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [-550,-80], "color" : "ffffff" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [550,80], "color" : "ffffff" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [550,-80], "color" : "ffffff" }
	],
	"playerPhysics" : {
		"bCoef" : 0.35, "acceleration" : 0.11, "kickingAcceleration" : 0.083, "kickStrength" : 4.6,
		"radius" : 15, "invMass" : 0.5, "damping" : 0.96, "cGroup" : ["red","blue"],
		"gravity" : [0,0], "kickingDamping" : 0.96, "kickback" : 0
	},
	"ballPhysics" : {
		"radius" : 6.5, "bCoef" : 0.465, "invMass" : 1.4, "color" : "ffffff",
		"cMask" : ["all"], "damping" : 0.99, "gravity" : [0,0], "cGroup" : ["ball"]
	},
	"spawnDistance" : 268,
	"traits" : [], "joints" : [], "redSpawnPoints" : [], "blueSpawnPoints" : [],
	"canBeStored" : true, "cameraWidth" : 0, "cameraHeight" : 0, "maxViewWidth" : 0,
	"cameraFollow" : "ball", "kickOffReset" : "partial"
}
`;

// variables.js
const afkLimit = 12;
const drawTimeLimit = 5;
const maxTeamSize = 3;
const maxAFKDuration = 15;
const muteDuration = 5;
let slowMode = 0;

const Team = { SPECTATORS: 0, RED: 1, BLUE: 2 };
const extendedP = [];
const eP = { ID: 0, AUTH: 1, CONN: 2, AFK: 3, ACT: 4, GK: 5, MUTE: 6 };
// Stats layout: [GA, WI, GL, AS, GK, CS, ELO, RL, CL, MSG, EMJ, NK]
// index:         0   1   2   3   4   5   6    7   8   9    10   11
const Ss = { GA: 0, WI: 1, GL: 2, AS: 3, GK: 4, CS: 5, ELO: 6, RL: 7, CL: 8, MSG: 9, EMJ: 10, NK: 11 };

const Role = { BAN: -1, PLAYER: 0, VIP: 1, STAFF: 2, MOD: 3 };

let players;
let teamR;
let teamB;
let teamS;

let lastTeamTouched;
let lastPlayersTouched;
let countAFK = false;
let activePlay = false;
let goldenGoal = false;
const SMSet = new Set();
let banList = [];

let game;
let GKList = ["", ""];
let Rposs = 0;
let Bposs = 0;
const point = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
let ballSpeed;
let lastWinner = Team.SPECTATORS;
let streak = 0;
let allBlues = [];
let allReds = [];
let startTimeout;

var welcomeColor = 0xc4ff65;
var announcementColor = 0xffefd6;
var infoColor = 0xbebebe;
var privateMessageColor = 0xffc933;
var redColor = 0xff4c4c;
var blueColor = 0x62cbff;
var warningColor = 0xffa135;
var errorColor = 0xa40000;
var successColor = 0x75ff75;
var defaultColor = null;

let inChooseMode = false;
let redCaptainChoice = "";
let blueCaptainChoice = "";
const chooseTime = 20;
let timeOutCap;

let checkTimeVariable = false;
let statNumber = 0;
let endGameVariable = false;
let resettingTeams = false;
let capLeft = false;
const statInterval = 6;

loadMap(m_solo, 0, 0);

// objects.js
function Goal(time, team, striker, assist) {
    this.time = time; this.team = team; this.striker = striker; this.assist = assist;
}
function Game(date, scores, goals) {
    this.date = date; this.scores = scores; this.goals = goals;
}

// DB BRIDGE FUNCTIONS
// These are async because dbGetPlayer/dbSetPlayer/dbGetAllPlayers are exposed Node functions.
// All callers that need stats must be async and use await.

/**
 * Returns parsed stats array for a given auth, or default stats if not found.
 * Stats: [GA, WI, GL, AS, GK, CS, ELO, RL, CL, MSG, EMJ, NK]
 */
async function getPlayerStats(auth) {
    if (!auth) return null;
    const raw = await dbGetPlayer(auth);
    if (raw) {
        return JSON.parse(raw);
    }
    return [0, 0, 0, 0, 0, 0, 0, Role.PLAYER, 0, "", 0, ""];
}

/**
 * Validates and writes stats array to DB.
 * Fixed: index 7 (Role) is number, index 8 (Celebration) is number,
 *        index 9 (Msg) is string, index 10 (Emoji) is number, index 11 (Nickname) is string.
 */
function checkStatsFormat(stats) {
    if (!stats || stats.length !== 12) return false;
    if (typeof stats[0] !== "number") return false; // GA
    if (typeof stats[1] !== "number") return false; // WI
    if (typeof stats[2] !== "number") return false; // GL
    if (typeof stats[3] !== "number") return false; // AS
    if (typeof stats[4] !== "number") return false; // GK
    if (typeof stats[5] !== "number") return false; // CS
    if (typeof stats[6] !== "number") return false; // ELO
    if (typeof stats[7] !== "number") return false; // RL (Role is a number: -1,0,1,2,3)
    if (typeof stats[8] !== "number") return false; // CL (Celebration ID is a number)
    if (typeof stats[9] !== "string") return false; // MSG
    if (typeof stats[10] !== "number" && typeof stats[10] !== "string") return false; // EMJ (can be emoji string or 0)
    if (typeof stats[11] !== "string") return false; // NK
    return true;
}

async function setPlayerStats(auth, stats) {
    if (!auth || !stats) return;
    if (!checkStatsFormat(stats)) {
        console.log("setPlayerStats: invalid stats format for auth " + auth);
        return;
    }
    await dbSetPlayer(auth, JSON.stringify(stats));
}

/**
 * Returns array of all player stats rows: [{ auth, stats: parsedArray }, ...]
 * Skips rows that fail JSON parse.
 */
async function getAllStats() {
    const raw = await dbGetAllPlayers();
    const rows = JSON.parse(raw);
    const result = [];
    for (const row of rows) {
        try {
            result.push({ auth: row.auth, stats: JSON.parse(row.stats) });
        } catch (e) { /* skip corrupt rows */ }
    }
    return result;
}

// auxiliary_functions.js
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getTime(scores) {
    return (
        "[" +
        Math.floor(Math.floor(scores.time / 60) / 10).toString() +
        Math.floor(Math.floor(scores.time / 60) % 10).toString() +
        ":" +
        Math.floor(Math.floor(scores.time - Math.floor(scores.time / 60) * 60) / 10).toString() +
        Math.floor(Math.floor(scores.time - Math.floor(scores.time / 60) * 60) % 10).toString() +
        "]"
    );
}

function pointDistance(p1, p2) {
    var d1 = p1.x - p2.x;
    var d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}

// BUTTONS
function topBtn() {
    if (teamS.length == 0) return;
    if (teamR.length == teamB.length) {
        if (teamS.length > 1) {
            room.setPlayerTeam(teamS[0].id, Team.RED);
            room.setPlayerTeam(teamS[1].id, Team.BLUE);
        }
        return;
    } else if (teamR.length < teamB.length) {
        room.setPlayerTeam(teamS[0].id, Team.RED);
    } else {
        room.setPlayerTeam(teamS[0].id, Team.BLUE);
    }
}

function randomBtn() {
    if (teamS.length == 0) return;
    if (teamR.length == teamB.length) {
        if (teamS.length > 1) {
            var r = getRandomInt(teamS.length);
            room.setPlayerTeam(teamS[r].id, Team.RED);
            teamS = teamS.filter((spec) => spec.id != teamS[r].id);
            room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
        }
        return;
    } else if (teamR.length < teamB.length) {
        room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED);
    } else {
        room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
    }
}

function blueToSpecBtn() {
    resettingTeams = true;
    setTimeout(() => { resettingTeams = false; }, 100);
    for (var i = 0; i < teamB.length; i++) room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
}

function swapBtn() {
    resettingTeams = true;
    setTimeout(() => { resettingTeams = false; }, 100);
    for (var i = 0; i < teamR.length; i++) room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.BLUE);
    for (var i = 0; i < teamB.length; i++) room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.RED);
}

function redToSpecBtn() {
    resettingTeams = true;
    setTimeout(() => { resettingTeams = false; }, 100);
    for (var i = 0; i < teamR.length; i++) room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
}

function resetBtn() {
    resettingTeams = true;
    setTimeout(() => { resettingTeams = false; }, 100);
    if (teamR.length <= teamB.length) {
        for (var i = 0; i < teamR.length; i++) {
            room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
            room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
        }
        for (var i = teamR.length; i < teamB.length; i++) room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
    } else {
        for (var i = 0; i < teamB.length; i++) {
            room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
            room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
        }
        for (var i = teamB.length; i < teamR.length; i++) room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
    }
}

function blueToRedBtn() {
    resettingTeams = true;
    setTimeout(() => { resettingTeams = false; }, 100);
    for (var i = 0; i < teamB.length; i++) room.setPlayerTeam(teamB[i].id, Team.RED);
}

room.setTeamColors(Team.BLUE, 60, 0xffffff, [0x0080ff, 0x0080ff, 0x0080ff]);
room.setTeamColors(Team.RED, 60, 0xffffff, [0xff4d40, 0xff4d40, 0xff4d40]);

// time.js
function checkTime() {
    const scores = room.getScores();
    game.scores = scores;
    if (Math.abs(scores.time - scores.timeLimit) <= 0.01 && scores.timeLimit != 0) {
        if (scores.red != scores.blue) {
            if (checkTimeVariable == false) {
                checkTimeVariable = true;
                setTimeout(() => { checkTimeVariable = false; }, 3000);
                scores.red > scores.blue ? endGame(Team.RED) : endGame(Team.BLUE);
                setTimeout(() => { room.stopGame(); }, 2000);
            }
            return;
        }
        goldenGoal = true;
        room.sendAnnouncement("Golden goal!", null, announcementColor, "bold", 1);
    }
    if (Math.abs(drawTimeLimit * 60 - scores.time - 60) <= 0.01 && players.length > 2) {
        if (checkTimeVariable == false) {
            checkTimeVariable = true;
            setTimeout(() => { checkTimeVariable = false; }, 10);
            room.sendAnnouncement("⌛ 60 seconds left until the match ends!", null, announcementColor, "bold", 1);
        }
    }
    if (Math.abs(scores.time - drawTimeLimit * 60) <= 0.01 && players.length > 2) {
        if (checkTimeVariable == false) {
            checkTimeVariable = true;
            setTimeout(() => { checkTimeVariable = false; }, 10);
            endGame(Team.SPECTATORS);
            room.stopGame();
            goldenGoal = false;
        }
    }
}

function getDate() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
}

function sendWebhook(event, data) {
    if (privateRoomWebHook === "") return;

    let content = "";
    const time = getDate();
    const count = `(${players.length}/${maxPlayers})`;

    switch (event) {
        case "join":
            content = `[${time}] ➡️ JOIN ${count}\n**${data.player.name}** [${getAuth(data.player)}]`;
            break;
        case "leave":
            content = `[${time}] ⬅️ LEAVE ${count}\n**${data.player.name}**`;
            break;
        case "kick":
            content = `[${time}] 🦵 KICK\n**${data.player.name}** was kicked by **${data.by ?? "system"}** — reason: *${data.reason ?? "none"}*${data.ban ? " **(BANNED)**" : ""}`;
            break;
        case "chat":
            content = `[${time}] 💬 **${data.player.name}**: ${data.message}`;
            break;
        case "endgame":
            const winner = data.winner == Team.RED ? "🔴 Red" : data.winner == Team.BLUE ? "🔵 Blue" : "🤝 Draw";
            content = `[${time}] 🏁 GAME END\n${winner} | Score: **${data.scores.red} - ${data.scores.blue}**`;
            break;
        default:
            content = `[${time}] ❓ UNKNOWN EVENT`;
    }

    fetch(privateRoomWebHook, {
        method: "POST",
        body: JSON.stringify({ content, username: roomName }),
        headers: { "Content-Type": "application/json" },
    });
}

// start_game.js
function endGame(winner) {
    players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null;
    const scores = room.getScores();
    game.scores = scores;
    Rposs = Rposs / (Rposs + Bposs);
    Bposs = 1 - Rposs;
    lastWinner = winner;
    endGameVariable = true;
    if (winner == Team.RED) {
        streak++;
        room.sendAnnouncement("🔴 Red Team won " + scores.red + "-" + scores.blue + " ! Winning streak: " + streak + " 🏆", null, redColor, "bold", 2);
    } else if (winner == Team.BLUE) {
        streak = 1;
        room.sendAnnouncement("🔵 Blue Team won " + scores.blue + "-" + scores.red + " ! Winning streak: " + streak + " 🏆", null, blueColor, "bold", 2);
    } else {
        streak = 0;
        room.sendAnnouncement("💤 Draw limit reached, finished! 💤", null, announcementColor, "bold", 2);
    }
    room.sendAnnouncement("⭐ Ball possession: 🔴 " + (Rposs * 100).toPrecision(3).toString() + "% : " + (Bposs * 100).toPrecision(3).toString() + "% 🔵", null, announcementColor, "bold", 2);
    scores.red == 0
        ? scores.blue == 0
            ? room.sendAnnouncement("🏆 " + GKList[0].name + " and " + GKList[1].name + " kept a clean sheet! ")
            : room.sendAnnouncement("🏆 " + GKList[1].name + " kept a clean sheet! ", null, announcementColor, "bold", 2)
        : scores.blue == 0
            ? room.sendAnnouncement("🏆 " + GKList[0].name + " kept a clean sheet! ", null, announcementColor, "bold", 2)
            : null;
    updateStats();
	sendWebhook("endgame", { winner, scores: room.getScores() });
}

function quickRestart() {
    room.stopGame();
    setTimeout(() => { room.startGame(); }, 2000);
}

function resumeGame() {
    setTimeout(() => { room.startGame(); }, 2000);
    setTimeout(() => { room.pauseGame(false); }, 1000);
}

// game_setup.js
function activateChooseMode() {
    inChooseMode = true;
    slowMode = 2;
}

function deactivateChooseMode() {
    inChooseMode = false;
    clearTimeout(timeOutCap);
    if (slowMode != 0) slowMode = 0;
    redCaptainChoice = "";
    blueCaptainChoice = "";
}

function loadMap(map, scoreLim, timeLim) {
    if (map == m_solo) room.setCustomStadium(m_solo);
    else if (map == m_2v2) m_2v2 != "" ? room.setCustomStadium(m_2v2) : room.setDefaultStadium("Classic");
    else if (map == m_3v3) m_3v3 != "" ? room.setCustomStadium(m_3v3) : room.setDefaultStadium("Big");
    else room.setCustomStadium(map);
    room.setScoreLimit(scoreLim);
    room.setTimeLimit(timeLim);
}

function updateTeams() {
    players = room.getPlayerList().filter((player) => player.id != 0 && !getAFK(player));
    teamR = players.filter((p) => p.team === Team.RED);
    teamB = players.filter((p) => p.team === Team.BLUE);
    teamS = players.filter((p) => p.team === Team.SPECTATORS);
}

function handleInactivity() {
    if (countAFK && teamR.length + teamB.length > 1) {
        for (var i = 0; i < teamR.length; i++) setActivity(teamR[i], getActivity(teamR[i]) + 1);
        for (var i = 0; i < teamB.length; i++) setActivity(teamB[i], getActivity(teamB[i]) + 1);
    }
    for (var i = 0; i < extendedP.length; i++) {
        if (extendedP[i][eP.ACT] == 60 * ((2 / 3) * afkLimit)) {
            room.sendAnnouncement("⛔ @" + room.getPlayer(extendedP[i][eP.ID]).name + ", if you don't move or send a message within the next " + Math.floor(afkLimit / 3) + " seconds, you will be kicked!", extendedP[i][eP.ID], warningColor, "bold", 2);
        }
        if (extendedP[i][eP.ACT] >= 60 * afkLimit) {
            extendedP[i][eP.ACT] = 0;
            if (room.getScores().time <= afkLimit - 0.5) {
                setTimeout(() => { !inChooseMode ? quickRestart() : room.stopGame(); }, 10);
            }
            room.kickPlayer(extendedP[i][eP.ID], "AFK", false);
        }
    }
}

// getAuth.js
function getAuth(player) {
    if (!player || !player.id) return null;
    const found = extendedP.filter((a) => a[0] == player.id);
    return found.length > 0 ? found[0][eP.AUTH] : null;
}

// player_control.js
function getAFK(player) {
    const found = extendedP.filter((a) => a[0] == player.id);
    return found.length > 0 ? found[0][eP.AFK] : null;
}
function setAFK(player, value) {
    extendedP.filter((a) => a[0] == player.id).forEach((p) => (p[eP.AFK] = value));
}
function getActivity(player) {
    const found = extendedP.filter((a) => a[0] == player.id);
    return found.length > 0 ? found[0][eP.ACT] : null;
}
function setActivity(player, value) {
    extendedP.filter((a) => a[0] == player.id).forEach((p) => (p[eP.ACT] = value));
}
function getGK(player) {
    const found = extendedP.filter((a) => a[0] == player.id);
    return found.length > 0 ? found[0][eP.GK] : null;
}
function setGK(player, value) {
    extendedP.filter((a) => a[0] == player.id).forEach((p) => (p[eP.GK] = value));
}
function getMute(player) {
    const found = extendedP.filter((a) => a[0] == player.id);
    return found.length > 0 ? found[0][eP.MUTE] : null;
}
function setMute(player, value) {
    extendedP.filter((a) => a[0] == player.id).forEach((p) => (p[eP.MUTE] = value));
}

// balance_choose.js
function updateRoleOnPlayerIn() {
    updateTeams();
    if (inChooseMode) {
        if (players.length == 6) loadMap(m_3v3, scoreLimit, timeLimit);
        getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
    }
    balanceTeams();
}

function updateRoleOnPlayerOut() {
    updateTeams();
    if (room.getScores() != null) {
        var scores = room.getScores();
        if (players.length >= 2 * maxTeamSize && scores.time >= (3 / 5) * game.scores.timeLimit && teamR.length != teamB.length) {
            if (teamR.length < teamB.length) {
                if (scores.blue - scores.red == 2) {
                    endGame(Team.BLUE);
                    room.sendAnnouncement("Rage Quit, Game ended.", null, announcementColor, "bold", 2);
                    setTimeout(() => { room.stopGame(); }, 100);
                    return;
                }
            } else {
                if (scores.red - scores.blue == 2) {
                    endGame(Team.RED);
                    room.sendAnnouncement("Rage Quit, Game ended.", null, announcementColor, "bold", 2);
                    setTimeout(() => { room.stopGame(); }, 100);
                    return;
                }
            }
        }
    }
    if (inChooseMode) {
        if (players.length == 5) loadMap(m_2v2, scoreLimit, timeLimit);
        if (teamR.length == 0 || teamB.length == 0) {
            teamR.length == 0 ? room.setPlayerTeam(teamS[0].id, Team.RED) : room.setPlayerTeam(teamS[0].id, Team.BLUE);
            return;
        }
        if (Math.abs(teamR.length - teamB.length) == teamS.length) {
            deactivateChooseMode();
            resumeGame();
            var b = teamS.length;
            if (teamR.length > teamB.length) {
                for (var i = 0; i < b; i++) setTimeout(() => { room.setPlayerTeam(teamS[0].id, Team.BLUE); }, 5 * i);
            } else {
                for (var i = 0; i < b; i++) setTimeout(() => { room.setPlayerTeam(teamS[0].id, Team.RED); }, 5 * i);
            }
            return;
        }
        if (streak == 0 && room.getScores() == null) {
            if (Math.abs(teamR.length - teamB.length) == 2) {
                room.sendAnnouncement("Team Balancing ...", null, defaultColor, "bold", 1);
                teamR.length > teamB.length
                    ? room.setPlayerTeam(teamR[teamR.length - 1].id, Team.SPECTATORS)
                    : room.setPlayerTeam(teamB[teamB.length - 1].id, Team.SPECTATORS);
            }
        }
        if (teamR.length == teamB.length && teamS.length < 2) {
            deactivateChooseMode();
            resumeGame();
            return;
        }
        capLeft ? choosePlayer() : getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
    }
    balanceTeams();
}

function balanceTeams() {
    if (!inChooseMode) {
        if (players.length == 1 && teamR.length == 0) {
            quickRestart();
            loadMap(m_solo, 0, 0);
            room.setPlayerTeam(players[0].id, Team.RED);
        } else if (Math.abs(teamR.length - teamB.length) == teamS.length && teamS.length > 0) {
            const n = Math.abs(teamR.length - teamB.length);
            if (players.length == 2) { quickRestart(); loadMap(m_2v2, scoreLimit, timeLimit); }
            if (teamR.length > teamB.length) {
                for (var i = 0; i < n; i++) room.setPlayerTeam(teamS[i].id, Team.BLUE);
            } else {
                for (var i = 0; i < n; i++) room.setPlayerTeam(teamS[i].id, Team.RED);
            }
        } else if (Math.abs(teamR.length - teamB.length) > teamS.length) {
            const n = Math.abs(teamR.length - teamB.length);
            if (players.length == 1) {
                quickRestart(); loadMap(m_solo, 0, 0); room.setPlayerTeam(players[0].id, Team.RED); return;
            } else if (players.length == 5) { quickRestart(); loadMap(m_2v2, scoreLimit, timeLimit); }
            if (players.length == maxTeamSize * 2 - 1) { allReds = []; allBlues = []; }
            if (teamR.length > teamB.length) {
                for (var i = 0; i < n; i++) room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
            } else {
                for (var i = 0; i < n; i++) room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
            }
        } else if (Math.abs(teamR.length - teamB.length) < teamS.length && teamR.length != teamB.length) {
            room.pauseGame(true);
            activateChooseMode();
            choosePlayer();
        } else if (teamS.length >= 2 && teamR.length == teamB.length && teamR.length < maxTeamSize) {
            if (teamR.length == 2) { quickRestart(); loadMap(m_3v3, scoreLimit, timeLimit); }
            topBtn();
        }
    }
}

function choosePlayer() {
    clearTimeout(timeOutCap);
    if (teamR.length <= teamB.length && teamR.length != 0) {
        room.sendAnnouncement("To choose a player, enter their number from the given list or use 'top', 'random' or 'bottom'.", teamR[0].id, announcementColor, "bold", 2);
        timeOutCap = setTimeout(function (player) {
            room.sendAnnouncement("⛔" + player.name + ", remain only " + Number.parseInt(chooseTime / 2) + " seconds to choose !", player.id);
            timeOutCap = setTimeout(function (player) {
                room.kickPlayer(player.id, "Didn't choose in time!", false);
            }, chooseTime * 500, teamR[0]);
        }, chooseTime * 1000, teamR[0], "bold", 1);
    } else if (teamB.length < teamR.length && teamB.length != 0) {
        room.sendAnnouncement("To choose a player, enter their number from the given list or use 'top', 'random' or 'bottom'.", teamB[0].id, 0x4ffaff, "bold", 2);
        timeOutCap = setTimeout(function (player) {
            room.sendAnnouncement("⛔" + player.name + ", remain only " + Number.parseInt(chooseTime / 2) + " seconds to choose !", player.id, warningColor, "bold", 2);
            timeOutCap = setTimeout(function (player) {
                room.kickPlayer(player.id, "Didn't choose in time!", false);
            }, chooseTime * 500, teamB[0]);
        }, chooseTime * 1000, teamB[0]);
    }
    if (teamR.length != 0 && teamB.length != 0)
        getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
}

function getSpecList(player) {
    var msg = "Players : ";
    for (var i = 0; i < teamS.length; i++) {
        if (140 - msg.length < (teamS[i].name + "[" + (i + 1) + "], ").length) {
            room.sendAnnouncement(msg, player.id, defaultColor, "bold", 2);
            msg = "... ";
        }
        msg += teamS[i].name + "[" + (i + 1) + "], ";
    }
    msg = msg.substring(0, msg.length - 2) + ".";
    room.sendAnnouncement(msg, player.id, defaultColor, "bold", 2);
}

// stats.js
function getLastTouchOfTheBall() {
    const ballPosition = room.getBallPosition();
    updateTeams();
    for (var i = 0; i < players.length; i++) {
        if (players[i].position != null) {
            var distanceToBall = pointDistance(players[i].position, ballPosition);
            if (distanceToBall < triggerDistance) {
                !activePlay ? (activePlay = true) : null;
                if (lastTeamTouched == players[i].team && lastPlayersTouched[0] != null && lastPlayersTouched[0].id != players[i].id) {
                    lastPlayersTouched[1] = lastPlayersTouched[0];
                    lastPlayersTouched[0] = players[i];
                }
                lastTeamTouched = players[i].team;
            }
        }
    }
}

function getStats() {
    if (activePlay) {
        updateTeams();
        lastTeamTouched == Team.RED ? Rposs++ : Bposs++;
        var ballPosition = room.getBallPosition();
        point[1] = point[0];
        point[0] = ballPosition;
        ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
        var k = [-1, Infinity];
        for (var i = 0; i < teamR.length; i++) {
            if (teamR[i].position.x < k[1]) { k[0] = teamR[i]; k[1] = teamR[i].position.x; }
        }
        k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
        k = [-1, -Infinity];
        for (var i = 0; i < teamB.length; i++) {
            if (teamB[i].position.x > k[1]) { k[0] = teamB[i]; k[1] = teamB[i].position.x; }
        }
        k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
        findGK();
    }
}

async function updateStats() {
    if (
        players.length >= 2 * maxTeamSize &&
        (game.scores.time >= (3 / 5) * game.scores.timeLimit ||
            game.scores.red == game.scores.scoreLimit ||
            game.scores.blue == game.scores.scoreLimit) &&
        allReds.length >= maxTeamSize &&
        allBlues.length >= maxTeamSize
    ) {
        var stats;

        // RED players
        for (var i = 0; i < allReds.length; i++) {
            stats = await getPlayerStats(getAuth(allReds[i]));
            if (!stats[Ss.NK] || stats[Ss.NK] === "") stats[Ss.NK] = allReds[i].name;
            stats[Ss.GA]++;
            if (lastWinner == Team.RED) stats[Ss.WI]++;
            await setPlayerStats(getAuth(allReds[i]), stats);
        }

        // BLUE players
        for (var i = 0; i < allBlues.length; i++) {
            stats = await getPlayerStats(getAuth(allBlues[i]));
            if (!stats[Ss.NK] || stats[Ss.NK] === "") stats[Ss.NK] = allBlues[i].name;
            stats[Ss.GA]++;
            if (lastWinner == Team.BLUE) stats[Ss.WI]++;
            await setPlayerStats(getAuth(allBlues[i]), stats);
        }

        // Goals
        for (var i = 0; i < game.goals.length; i++) {
            if (game.goals[i].striker != null) {
                if (allBlues.concat(allReds).findIndex((p) => p.id == game.goals[i].striker.id) != -1) {
                    stats = await getPlayerStats(getAuth(game.goals[i].striker));
                    stats[Ss.GL]++;
                    await setPlayerStats(getAuth(game.goals[i].striker), stats);
                }
            }
            if (game.goals[i].assist != null) {
                if (allBlues.concat(allReds).findIndex((p) => p.name == game.goals[i].assist.name) != -1) {
                    stats = await getPlayerStats(getAuth(game.goals[i].assist));
                    stats[Ss.AS]++;
                    await setPlayerStats(getAuth(game.goals[i].assist), stats);
                }
            }
        }

        // GK
        if (GKList[0] && allReds.findIndex((p) => p.id == GKList[0].id) != -1) {
            stats = await getPlayerStats(getAuth(GKList[0]));
            stats[Ss.GK]++;
            if (game.scores.blue == 0) stats[Ss.CS]++;
            await setPlayerStats(getAuth(GKList[0]), stats);
        }
        if (GKList[1] && allBlues.findIndex((p) => p.id == GKList[1].id) != -1) {
            stats = await getPlayerStats(getAuth(GKList[1]));
            stats[Ss.GK]++;
            if (game.scores.red == 0) stats[Ss.CS]++;
            await setPlayerStats(getAuth(GKList[1]), stats);
        }

        // Elo RED
        for (var i = 0; i < allReds.length; i++) {
            stats = await getPlayerStats(getAuth(allReds[i]));
            let old = stats[Ss.ELO];
            stats[Ss.ELO] = stats[Ss.WI] * 5 + (stats[Ss.GA] - stats[Ss.WI]) * -15 + stats[Ss.GL] * 15 + stats[Ss.AS] * 15 + stats[Ss.CS] * 20;
            await setPlayerStats(getAuth(allReds[i]), stats);
            room.sendAnnouncement(`${stats[Ss.NK]}: ${old} -> ${stats[Ss.ELO]} (${stats[Ss.ELO] - old >= 0 ? "+" : ""}${stats[Ss.ELO] - old})`, allReds[i].id, redColor, "normal", 2);
        }

        // Elo BLUE
        for (var i = 0; i < allBlues.length; i++) {
            stats = await getPlayerStats(getAuth(allBlues[i]));
            let old = stats[Ss.ELO];
            stats[Ss.ELO] = stats[Ss.WI] * 5 + (stats[Ss.GA] - stats[Ss.WI]) * -15 + stats[Ss.GL] * 15 + stats[Ss.AS] * 15 + stats[Ss.CS] * 20;
            await setPlayerStats(getAuth(allBlues[i]), stats);
            room.sendAnnouncement(`${stats[Ss.NK]}: ${old} -> ${stats[Ss.ELO]} (${stats[Ss.ELO] - old >= 0 ? "+" : ""}${stats[Ss.ELO] - old})`, allBlues[i].id, blueColor, "normal", 2);
        }
    }
}

function findGK() {
    var tab = [[-1, ""], [-1, ""]];
    for (var i = 0; i < extendedP.length; i++) {
        if (room.getPlayer(extendedP[i][eP.ID]) != null && room.getPlayer(extendedP[i][eP.ID]).team == Team.RED) {
            if (tab[0][0] < extendedP[i][eP.GK]) { tab[0][0] = extendedP[i][eP.GK]; tab[0][1] = room.getPlayer(extendedP[i][eP.ID]); }
        } else if (room.getPlayer(extendedP[i][eP.ID]) != null && room.getPlayer(extendedP[i][eP.ID]).team == Team.BLUE) {
            if (tab[1][0] < extendedP[i][eP.GK]) { tab[1][0] = extendedP[i][eP.GK]; tab[1][1] = room.getPlayer(extendedP[i][eP.ID]); }
        }
    }
    GKList = [tab[0][1], tab[1][1]];
}

// Leaderboard interval — now async
setInterval(async () => {
    const allRows = await getAllStats();
    // Filter out Haxball internal keys if any slipped in
    const filtered = allRows.filter(r => r.stats && r.stats.length === 12);
    if (filtered.length < 5) return;

    const statKeys = [
        { key: Ss.GA, label: "Matches Played" },
        { key: Ss.WI, label: "Wins" },
        { key: Ss.GL, label: "Goals" },
        { key: Ss.AS, label: "Assists" },
        { key: Ss.CS, label: "Cleansheets" },
    ];

    const idx = statNumber % 5;
    const { key, label } = statKeys[idx];

    const sorted = [...filtered].sort((a, b) => b.stats[key] - a.stats[key]);
    const top5 = sorted.slice(0, 5);

    room.sendAnnouncement(
        label + "> " + top5.map((r, i) => `#${i + 1} ${r.stats[Ss.NK] || "?"}: ${r.stats[key]}`).join(" "),
        null, 0x4ffaff, "bold", 2
    );
    statNumber++;
}, statInterval * 60 * 1000);

// ROLES & COMMANDS

async function getRole(player) {
    const stats = await getPlayerStats(getAuth(player));
    return stats ? stats[Ss.RL] : Role.PLAYER;
}

async function getRanking(auth) {
    const allRows = await getAllStats();
    const filtered = allRows.filter(r => r.stats && r.stats.length === 12);
    filtered.sort((a, b) => b.stats[Ss.ELO] - a.stats[Ss.ELO]);
    const playerStats = await getPlayerStats(auth);
    if (!playerStats) return 0;
    const idx = filtered.findIndex(r => r.stats[Ss.ELO] === playerStats[Ss.ELO]);
    return idx + 1;
}

// onPlayerJoin
room.onPlayerJoin = async function (player) {
    console.log(player.name + " : " + player.auth);
    extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
    updateRoleOnPlayerIn();

    sendWebhook("join", { player });

    let stats = await getPlayerStats(player.auth);
    // First time player — set nickname to their Haxball name
    if (stats[Ss.NK] === "") stats[Ss.NK] = player.name;
    await setPlayerStats(player.auth, stats);

    // Re-read to get freshly saved stats
    stats = await getPlayerStats(player.auth);

    if (stats[Ss.RL] >= Role.STAFF) {
        room.setPlayerAdmin(player.id, true);
    }

    if (stats[Ss.RL] >= Role.STAFF) {
        if (stats[Ss.RL] == Role.MOD) {
            if (stats[Ss.MSG] === "") stats[Ss.MSG] = "A Staff member has joined: " + player.name;
            if (stats[Ss.EMJ] === 0) stats[Ss.EMJ] = "👮";
            await setPlayerStats(player.auth, stats);
        } else {
            if (stats[Ss.MSG] === "") stats[Ss.MSG] = "A Master joined: " + player.name;
            if (stats[Ss.EMJ] === 0) stats[Ss.EMJ] = "🤴";
        }
        room.sendAnnouncement(stats[Ss.EMJ] + " " + stats[Ss.MSG], null, announcementColor, "bold", 2);
    } else {
        room.sendAnnouncement("👋 Welcome " + player.name + " to Chill 3v3 Room ! Type '!help' to see the commands.", null, welcomeColor, "bold", 1);
        room.sendAnnouncement("!rules to see the rules of the room, !stats to see your stats and !top to see the top players of the server !", player.id, welcomeColor, "bold", 1);
    }

    let elo = stats[Ss.ELO];
    let icon = (stats[Ss.EMJ] === 0 || stats[Ss.EMJ] === "") ? getIcon(elo) : stats[Ss.EMJ];
    room.setPlayerAvatar(player.id, icon);
};

room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
    if (changedPlayer.id == 0) { room.setPlayerTeam(0, Team.SPECTATORS); return; }
    if (getAFK(changedPlayer) && changedPlayer.team != Team.SPECTATORS) {
        room.setPlayerTeam(changedPlayer.id, Team.SPECTATORS);
        room.sendAnnouncement(changedPlayer.name + " is AFK!", null, infoColor, "bold", 1);
        return;
    }
    updateTeams();
    if (room.getScores() != null) {
        var scores = room.getScores();
        if (changedPlayer.team != Team.SPECTATORS && scores.time <= (3 / 4) * scores.timeLimit && Math.abs(scores.blue - scores.red) < 2) {
            changedPlayer.team == Team.RED ? allReds.push(changedPlayer) : allBlues.push(changedPlayer);
        }
    }
    if (changedPlayer.team == Team.SPECTATORS) setActivity(changedPlayer, 0);
    if (inChooseMode && resettingTeams == false && byPlayer.id == 0) {
        if (Math.abs(teamR.length - teamB.length) == teamS.length) {
            deactivateChooseMode(); resumeGame();
            var b = teamS.length;
            if (teamR.length > teamB.length) {
                for (var i = 0; i < b; i++) setTimeout(() => { room.setPlayerTeam(teamS[0].id, Team.BLUE); }, 200 * i);
            } else {
                for (var i = 0; i < b; i++) setTimeout(() => { room.setPlayerTeam(teamS[0].id, Team.RED); }, 200 * i);
            }
            return;
        } else if ((teamR.length == maxTeamSize && teamB.length == maxTeamSize) || (teamR.length == teamB.length && teamS.length < 2)) {
            deactivateChooseMode(); resumeGame();
        } else if (teamR.length <= teamB.length && redCaptainChoice != "") {
            redCaptainChoice == "top" ? room.setPlayerTeam(teamS[0].id, Team.RED)
                : redCaptainChoice == "random" ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED)
                    : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
            return;
        } else if (teamB.length < teamR.length && blueCaptainChoice != "") {
            blueCaptainChoice == "top" ? room.setPlayerTeam(teamS[0].id, Team.BLUE)
                : blueCaptainChoice == "random" ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE)
                    : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
            return;
        } else {
            choosePlayer();
        }
    }
};

room.onPlayerLeave = function (player) {
    if (teamR.findIndex((red) => red.id == player.id) == 0 && inChooseMode && teamR.length <= teamB.length) {
        choosePlayer(); capLeft = true; setTimeout(() => { capLeft = false; }, 10);
    }
    if (teamB.findIndex((blue) => blue.id == player.id) == 0 && inChooseMode && teamB.length < teamR.length) {
        choosePlayer(); capLeft = true; setTimeout(() => { capLeft = false; }, 10);
    }
    setActivity(player, 0);
    updateRoleOnPlayerOut();

    sendWebhook("leave", { player });
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
    ban == true ? banList.push([kickedPlayer.name, kickedPlayer.id]) : null;
    sendWebhook("kick", { player: kickedPlayer, reason, ban, by: byPlayer?.name });
};

// COMMANDS
var commands = {
    help: { aliases: ["commands"], roles: Role.PLAYER, desc: `Shows available commands. Example: '!help bb'`, function: helpCommand },
    claim: { aliases: [], roles: Role.PLAYER, desc: `Claim items (VIP, etc). Usage: !claim <code>`, function: claimsCommand },
    afk: { aliases: [], roles: Role.PLAYER, desc: `Go AFK. Max ${maxAFKDuration} minutes.`, function: afkCommand },
    afks: { aliases: ["afklist"], roles: Role.PLAYER, desc: `Show AFK players.`, function: afkListCommand },
    bb: { aliases: ["bye", "gn", "cya"], roles: Role.PLAYER, desc: `Leave the room.`, function: leaveCommand },
    me: { aliases: ["stat", "stats"], roles: Role.PLAYER, desc: `Show your stats.`, function: globalStatsCommand },
    rename: { aliases: [], roles: Role.PLAYER, desc: `Rename yourself on the leaderboard. Usage: !rename NewName`, function: renameCommand },
    rr: { aliases: [], roles: Role.STAFF, desc: `Restart the game.`, function: restartCommand },
    rrs: { aliases: [], roles: Role.STAFF, desc: `Swap teams and restart.`, function: restartSwapCommand },
    swap: { aliases: ["s"], roles: Role.STAFF, desc: `Swap teams (game must be stopped).`, function: swapCommand },
    mute: { aliases: ["m"], roles: Role.STAFF, desc: `Mute a player. Usage: !mute #<id> [duration]`, function: muteCommand },
    unmute: { aliases: ["um"], roles: Role.STAFF, desc: `Unmute a player. Usage: !unmute #<id>`, function: unmuteCommand },
    mutes: { aliases: [], roles: Role.STAFF, desc: `List muted players.`, function: muteListCommand },
    ban: { aliases: [], roles: Role.MOD, desc: `Ban a player. Usage: !ban #<id>`, function: banCommand },
    clearbans: { aliases: [], roles: Role.MOD, desc: `Clear all bans.`, function: clearbansCommand },
    bans: { aliases: ["banlist"], roles: Role.MOD, desc: `List banned players.`, function: banListCommand },
    setadmin: { aliases: ["admin"], roles: Role.MOD, desc: `Promote player to staff. Usage: !setadmin #<id>`, function: setAdminCommand },
    rules: { aliases: [], roles: Role.PLAYER, desc: `Show room rules.`, function: rulesCommand },
    cel: { aliases: ["celebration", "c"], roles: Role.PLAYER, desc: `Set your goal celebration. Usage: !cel <id>`, function: celebrationCommand },
    showcel: { aliases: ["showcelebration", "sc"], roles: Role.PLAYER, desc: `Show available celebrations.`, function: showCelebrationCommand },
    testCel: { aliases: ["tc"], roles: Role.MOD, desc: `Test a celebration. Usage: !tc <id>`, function: testCelebrationCommand },
};

function getCommand(commandStr) {
    if (commands.hasOwnProperty(commandStr)) return commandStr;
    for (const [key, value] of Object.entries(commands)) {
        for (let alias of value.aliases) {
            if (alias == commandStr) return key;
        }
    }
    return false;
}

const vipCode = "ChillVIP2026";
const modCode = "ChillMOD2026";
const staffCode = "ChillSTAFF2026";

async function claimsCommand(player, message) {
    var msgArray = message.split(/ +/).slice(1);
    if (msgArray.length == 0) {
        room.sendAnnouncement(`To claim an item, type '!claim <item code>'.`); return;
    }
    const role = await getRole(player);
    let stats = await getPlayerStats(getAuth(player));
    if (msgArray[0] == vipCode) {
        if (role < Role.VIP) {
            stats[Ss.RL] = Role.VIP;
            await setPlayerStats(getAuth(player), stats);
            room.sendAnnouncement("Congratulations! You are now a VIP!", player.id, successColor, "bold", 2);
        } else {
            room.sendAnnouncement("You already have the VIP role!", player.id, errorColor, "bold", 1);
        }
    } else if (msgArray[0] == modCode) {
        if (role < Role.MOD) {
            stats[Ss.RL] = Role.MOD;
            await setPlayerStats(getAuth(player), stats);
            room.sendAnnouncement("Congratulations! You are now a MOD!", player.id, successColor, "bold", 2);
        } else {
            room.sendAnnouncement("You already have the MOD role!", player.id, errorColor, "bold", 1);
        }
    } else if (msgArray[0] == staffCode) {
        if (role < Role.STAFF) {
            stats[Ss.RL] = Role.STAFF;
            await setPlayerStats(getAuth(player), stats);
            room.sendAnnouncement("Congratulations! You are now a STAFF!", player.id, successColor, "bold", 2);
        } else {
            room.sendAnnouncement("You already have the STAFF role!", player.id, errorColor, "bold", 1);
        }
    } else {
        room.sendAnnouncement("Invalid code.", player.id, errorColor, "bold", 1);
    }
}

async function helpCommand(player, message) {
    var msgArray = message.split(/ +/).slice(1);
    const role = await getRole(player);
    if (msgArray.length == 0) {
        var commandString = "Player commands :";
        for (const [key, value] of Object.entries(commands)) {
            if (value.desc && value.roles == Role.PLAYER) commandString += ` !${key},`;
        }
        commandString = commandString.substring(0, commandString.length - 1) + ".\n";
        if (role >= Role.VIP) {
            commandString += `VIP commands :`;
            for (const [key, value] of Object.entries(commands)) {
                if (value.desc && value.roles == Role.VIP) commandString += ` !${key},`;
            }
            if (commandString.slice(-1) == ":") commandString += ` None,`;
            commandString = commandString.substring(0, commandString.length - 1) + ".\n";
        }
        if (role >= Role.STAFF) {
            commandString += `Staff commands :`;
            for (const [key, value] of Object.entries(commands)) {
                if (value.desc && value.roles == Role.STAFF) commandString += ` !${key},`;
            }
            if (commandString.slice(-1) == ":") commandString += ` None,`;
            commandString = commandString.substring(0, commandString.length - 1) + ".\n";
        }
        if (role >= Role.MOD) {
            commandString += `MOD commands :`;
            for (const [key, value] of Object.entries(commands)) {
                if (value.desc && value.roles == Role.MOD) commandString += ` !${key},`;
            }
            if (commandString.slice(-1) == ":") commandString += ` None,`;
            commandString = commandString.substring(0, commandString.length - 1) + ".\n";
        }
        commandString += "\nFor info on a command: !help <command>";
        room.sendAnnouncement(commandString, player.id, infoColor, "bold", 1);
    } else {
        var commandName = getCommand(msgArray[0].toLowerCase());
        if (commandName != false && commands[commandName].desc)
            room.sendAnnouncement(`'${commandName}' command :\n${commands[commandName].desc}`, player.id, infoColor, "bold", 1);
        else
            room.sendAnnouncement(`Command not found. Type '!help' for all commands.`, player.id, errorColor, "bold", 1);
    }
}

function afkCommand(player, message) {
    if (players.length != 1 && player.team != Team.SPECTATORS) {
        if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
            room.setPlayerTeam(player.id, Team.SPECTATORS);
        } else {
            room.sendAnnouncement("Can't go AFK while in a team !", player.id, errorColor, "bold", 1);
            return false;
        }
    } else if (players.length == 1 && !getAFK(player)) {
        room.setPlayerTeam(player.id, Team.SPECTATORS);
    }
    setAFK(player, !getAFK(player));
    room.sendAnnouncement((getAFK(player) ? "😴" : "🌅") + player.name + (getAFK(player) ? " is now AFK." : " returned."), null, announcementColor, "bold", 1);
    getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
}

function afkListCommand(player, message) {
    var msg = "AFK List: ";
    for (var i = 0; i < extendedP.length; i++) {
        if (room.getPlayer(extendedP[i][eP.ID]) != null && getAFK(room.getPlayer(extendedP[i][eP.ID]))) {
            if (140 - msg.length < (room.getPlayer(extendedP[i][eP.ID]).name + ", ").length) {
                room.sendAnnouncement(msg, player.id, announcementColor, "bold", 1);
                msg = "... ";
            }
            msg += room.getPlayer(extendedP[i][eP.ID]).name + ", ";
        }
    }
    if (msg == "AFK List: ") {
        room.sendAnnouncement("No players are AFK.", player.id, announcementColor, "bold", 1); return false;
    }
    msg = msg.substring(0, msg.length - 2) + ".";
    room.sendAnnouncement(msg, player.id, announcementColor, "bold", 1);
}

function leaveCommand(player, message) {
    room.kickPlayer(player.id, "See you later!", false);
}

async function globalStatsCommand(player, message) {
    const stats = await getPlayerStats(getAuth(player));
    if (stats) {
        let winrate = stats[Ss.GA] != 0 ? stats[Ss.WI] / stats[Ss.GA] : 0;
        let gpm = stats[Ss.GA] != 0 ? stats[Ss.GL] / stats[Ss.GA] : 0;
        let apm = stats[Ss.GA] != 0 ? stats[Ss.AS] / stats[Ss.GA] : 0;
        let csPercent = stats[Ss.GK] != 0 ? stats[Ss.CS] / stats[Ss.GK] : 0;
        room.sendAnnouncement(
            `Your stats : Elo rating: ${stats[Ss.ELO]}\nGames played: ${stats[Ss.GA]} ( Wins: ${stats[Ss.WI]}, Losses: ${stats[Ss.GA] - stats[Ss.WI]}) | Winrate: ${(winrate * 100).toFixed(2)}%\nGoals: ${stats[Ss.GL]} (GpM: ${gpm.toFixed(2)}) | Assists: ${stats[Ss.AS]} (ApM: ${apm.toFixed(2)})\nGK Appearance: ${stats[Ss.GK]} | Cleansheets: ${stats[Ss.CS]} (CS%: ${(csPercent * 100).toFixed(2)}%)`,
            player.id, successColor, "normal", 1
        );
    }
}

async function renameCommand(player, message) {
    var msgArray = message.split(/ +/).slice(1);
    if (msgArray.length == 0) {
        room.sendAnnouncement("Usage: !rename NewNickname", player.id, errorColor, "bold", 1); return false;
    }
    var newNickname = msgArray[0];
    if (newNickname.length > 20) {
        room.sendAnnouncement("Nickname too long (max 20 chars).", player.id, errorColor, "bold", 1); return false;
    }
    let oldNickname = player.name;
    let stats = await getPlayerStats(getAuth(player));
    stats[Ss.NK] = newNickname;
    await setPlayerStats(getAuth(player), stats);
    room.setPlayerName(player.id, newNickname);
    room.sendAnnouncement(`${oldNickname} is now known as ${newNickname}.`, null, announcementColor, "bold", 1);
}

function restartCommand(player, message) {
    room.stopGame();
    startTimeout = setTimeout(() => { room.startGame(); }, 10);
}

function restartSwapCommand(player, message) {
    room.stopGame(); swapBtn();
    startTimeout = setTimeout(() => { room.startGame(); }, 10);
}

function swapCommand(player, message) {
    if (room.getScores() == null) {
        swapBtn();
        room.sendAnnouncement("✔️ Teams swapped !", null, announcementColor, "bold", null);
    } else {
        room.sendAnnouncement(`Please stop the game before swapping.`, player.id, errorColor, "bold", 1);
    }
}

async function muteCommand(player, message) {
    var msgArray = Array.isArray(message) ? message : message.split(/ +/).slice(1);
    const role = await getRole(player);
    if (role >= Role.STAFF) {
        updateTeams();
        var timeOut;
        if (!Number.isNaN(Number.parseInt(msgArray[0])) && msgArray.length > 0) {
            timeOut = Number.parseInt(msgArray[0]) > 0 ? Number.parseInt(msgArray[0]) * 60 * 1000 : muteDuration * 60 * 1000;
            if (msgArray[1] && msgArray[1].length > 1 && msgArray[1][0] == "#") {
                msgArray[1] = msgArray[1].substring(1);
                if (!Number.isNaN(Number.parseInt(msgArray[1])) && room.getPlayer(Number.parseInt(msgArray[1])) != null) {
                    if (room.getPlayer(Number.parseInt(msgArray[1])).admin || getMute(room.getPlayer(Number.parseInt(msgArray[1])))) return false;
                    setTimeout(function (p) { setMute(p, false); }, timeOut, room.getPlayer(Number.parseInt(msgArray[1])));
                    setMute(room.getPlayer(Number.parseInt(msgArray[1])), true);
                    room.sendAnnouncement(room.getPlayer(Number.parseInt(msgArray[1])).name + " has been muted for " + timeOut / 60000 + " minutes!", null, announcementColor, "bold", 1);
                }
            }
        } else if (Number.isNaN(Number.parseInt(msgArray[0]))) {
            if (msgArray[0] && msgArray[0].length > 1 && msgArray[0][0] == "#") {
                msgArray[0] = msgArray[0].substring(1);
                if (!Number.isNaN(Number.parseInt(msgArray[0])) && room.getPlayer(Number.parseInt(msgArray[0])) != null) {
                    if (room.getPlayer(Number.parseInt(msgArray[0])).admin || getMute(room.getPlayer(Number.parseInt(msgArray[0])))) return false;
                    setTimeout(function (p) { setMute(p, false); }, 3 * 60 * 1000, room.getPlayer(Number.parseInt(msgArray[0])));
                    setMute(room.getPlayer(Number.parseInt(msgArray[0])), true);
                    room.sendAnnouncement(room.getPlayer(Number.parseInt(msgArray[0])).name + " has been muted for 3 minutes!", null, announcementColor, "bold", 1);
                }
            }
        }
    }
}

async function unmuteCommand(player, message) {
    var args = Array.isArray(message) ? message : message.split(/ +/).slice(1);
    if (!player) return false;
    const role = await getRole(player);
    if (role < Role.STAFF) return false;
    if (!args || args.length < 1) return false;
    var target = args[0];
    if (target.toLowerCase() == "all" || target.toLowerCase() == "*") {
        extendedP.forEach((ePlayer) => { ePlayer[eP.MUTE] = false; });
        room.sendAnnouncement("All players have been unmuted!", null, 0x4ffaff, "bold", 2);
        return true;
    }
    if (target[0] == "#") target = target.substring(1);
    if (Number.isNaN(Number.parseInt(target))) return false;
    var targetPlayer = room.getPlayer(Number.parseInt(target));
    if (!targetPlayer || !getMute(targetPlayer)) return false;
    setMute(targetPlayer, false);
    room.sendAnnouncement(`${targetPlayer.name} has been unmuted!`, null, successColor, "bold", 2);
    return true;
}

function muteListCommand(player, message) {
    var msg = "Muted Player List: ";
    for (var i = 0; i < extendedP.length; i++) {
        if (room.getPlayer(extendedP[i][eP.ID]) != null && getMute(room.getPlayer(extendedP[i][eP.ID]))) {
            if (140 - msg.length < (room.getPlayer(extendedP[i][eP.ID]).name + "[" + extendedP[i][eP.ID] + "], ").length) {
                room.sendAnnouncement(msg, player.id, announcementColor, "bold", 2); msg = "... ";
            }
            msg += room.getPlayer(extendedP[i][eP.ID]).name + "[" + extendedP[i][eP.ID] + "], ";
        }
    }
    if (msg == "Muted Player List: ") {
        room.sendAnnouncement("No muted players found!", player.id, announcementColor, "bold", 2); return false;
    }
    room.sendAnnouncement(msg.substring(0, msg.length - 2) + ".", player.id, announcementColor, "bold", 2);
}

async function banCommand(player, message) {
    const role = await getRole(player);
    if (role >= Role.MOD) {
        updateTeams();
        var msgArray = Array.isArray(message) ? message : message.split(/ +/).slice(1);
        if (msgArray.length > 0 && msgArray[0].length > 1 && msgArray[0][0] == "#") {
            msgArray[0] = msgArray[0].substring(1);
            if (!Number.isNaN(Number.parseInt(msgArray[0])) && room.getPlayer(Number.parseInt(msgArray[0])) != null) {
                const target = room.getPlayer(Number.parseInt(msgArray[0]));
                room.kickPlayer(target.id, "You have been banned!", true);
                room.sendAnnouncement(target.name + " has been banned!", null, announcementColor, "bold", 2);
                let stats = await getPlayerStats(getAuth(target));
                stats[Ss.RL] = Role.BAN;
                await setPlayerStats(getAuth(target), stats);
            }
        }
    }
}

async function clearbansCommand(player, message) {
    const role = await getRole(player);
    if (role >= Role.MOD) {
        const allRows = await getAllStats();
        for (const row of allRows) {
            if (row.stats[Ss.RL] == Role.BAN) {
                row.stats[Ss.RL] = Role.PLAYER;
                await setPlayerStats(row.auth, row.stats);
            }
        }
        room.sendAnnouncement("All bans have been cleared!", null, successColor, "bold", 2);
    }
}

async function banListCommand(player, message) {
    const role = await getRole(player);
    if (role < Role.MOD) return;
    const allRows = await getAllStats();
    const banned = allRows.filter(r => r.stats[Ss.RL] == Role.BAN);
    if (banned.length == 0) {
        room.sendAnnouncement("No banned players found!", player.id, announcementColor, "bold", 2); return;
    }
    var msg = "Banned: " + banned.map(r => r.stats[Ss.NK] || "?").join(", ");
    room.sendAnnouncement(msg, player.id, announcementColor, "bold", 2);
}

async function setAdminCommand(player, message) {
    const role = await getRole(player);
    if (role >= Role.MOD) {
        var msgArray = Array.isArray(message) ? message : message.split(/ +/).slice(1);
        if (msgArray.length > 0 && msgArray[0].length > 1 && msgArray[0][0] == "#") {
            msgArray[0] = msgArray[0].substring(1);
            if (!Number.isNaN(Number.parseInt(msgArray[0])) && room.getPlayer(Number.parseInt(msgArray[0])) != null) {
                const target = room.getPlayer(Number.parseInt(msgArray[0]));
                room.setPlayerAdmin(target.id, true);
                room.sendAnnouncement(target.name + " has been promoted to staff!", null, announcementColor, "bold", 2);
                let stats = await getPlayerStats(getAuth(target));
                stats[Ss.RL] = Role.STAFF;
                stats[Ss.MSG] = "A Staff member has joined: " + target.name;
                stats[Ss.EMJ] = "🧑‍💼";
                await setPlayerStats(getAuth(target), stats);
            }
        } else {
            room.sendAnnouncement("Usage: !setadmin #<id>", player.id, errorColor, "bold", 1);
        }
    }
}

function rulesCommand(player, message) {
    room.sendAnnouncement(
        `Room Rules:\n1. Respect all players. No discrimination, harassment, or offensive language.\n2. No cheating or exploiting. Unauthorized software or macros = ban.\n3. No spamming.\n4. Toxic behavior will not be tolerated.`,
        player.id, infoColor, "italic", 2
    );
}

async function celebrationCommand(player, message) {
    var msgArray = Array.isArray(message) ? message : message.split(/ +/).slice(1);
    if (msgArray.length == 0) {
        room.sendAnnouncement("Usage: !cel <id>", player.id, errorColor, "normal", 1); return;
    }
    if (!Number.isNaN(Number.parseInt(msgArray[0]))) {
        let celId = Number.parseInt(msgArray[0]);
        let stats = await getPlayerStats(getAuth(player));
        const role = await getRole(player);
        if (CELEBRATIONS[celId] && CELEBRATIONS[celId].role <= role) {
            stats[Ss.CL] = celId;
            await setPlayerStats(getAuth(player), stats);
            room.sendAnnouncement(`Celebration set to ID: ${celId} (${CELEBRATIONS[celId].name}).`, player.id, infoColor, "normal", 1);
        }
    }
}

async function showCelebrationCommand(player, message) {
    const role = await getRole(player);
    let msg = "Available Celebrations:\n";
    for (const [key, value] of Object.entries(CELEBRATIONS)) {
        if (value.role <= role) {
            msg += `ID: ${value.id != null ? value.id : Number(key)} - ${value.name}\n`;
        }
    }
    room.sendAnnouncement(msg, player.id, infoColor, "normal", 1);
}

async function testCelebrationCommand(player, message) {
    var msgArray = Array.isArray(message) ? message : message.split(/ +/).slice(1);
    if (msgArray.length == 0) {
        room.sendAnnouncement("Usage: !tc <id>", player.id, errorColor, "normal", 1); return;
    }
    if (!Number.isNaN(Number.parseInt(msgArray[0]))) {
        let celId = Number.parseInt(msgArray[0]);
        if (CELEBRATIONS[celId]) {
            CELEBRATIONS[celId].function(player);
        } else {
            room.sendAnnouncement(`Celebration ID ${celId} does not exist!`, player.id, errorColor, "normal", 1);
        }
    }
}

function playerChat(player, message) {
    var msgArray = message.split(/ +/);
    let allPlayers = room.getPlayerList();
    if (msgArray.length < 2) {
        room.sendAnnouncement(`Invalid format. Use: @@PlayerName Message`, player.id, errorColor, "bold", null); return false;
    }
    var idx = allPlayers.findIndex((p) => p.name.replaceAll(" ", "_") == msgArray[0].substring(2));
    if (idx == -1) {
        room.sendAnnouncement(`Player not found.`, player.id, errorColor, "bold", null); return false;
    }
    var target = allPlayers[idx];
    if (player.id == target.id) {
        room.sendAnnouncement(`Can't PM yourself!`, player.id, errorColor, "bold", null); return false;
    }
    var msg = `📝 ${player.name} > ${target.name}: ${msgArray.slice(1).join(" ")}`;
    room.sendAnnouncement(msg, player.id, privateMessageColor, "bold", 1);
    room.sendAnnouncement(msg, target.id, privateMessageColor, "bold", 1);
}

room.onPlayerChat = async function (player, message) {
    let msgArray = message.split(/ +/);
    sendWebhook("chat", { player, message });
    if (msgArray[0][0] == "!") {
        let command = getCommand(msgArray[0].slice(1).toLowerCase());
        const role = await getRole(player);
        if (command != false && commands[command].roles <= role)
            commands[command].function(player, message);
        else
            room.sendAnnouncement(`Command not found or no permission. Type '!help'.`, player.id, errorColor, "bold", 1);
        return false;
    }
    if (msgArray[0].substring(0, 2) === "@@") {
        playerChat(player, message); return false;
    }
    if (msgArray[0] == "t") {
        let teamMessage = msgArray.slice(1).join(" ");
        if (player.team == Team.RED) {
            for (let i = 0; i < teamR.length; i++) room.sendAnnouncement(`[🔴 Team] ${player.name}: ${teamMessage}`, teamR[i].id, redColor, "bold", 1);
        } else if (player.team == Team.BLUE) {
            for (let i = 0; i < teamB.length; i++) room.sendAnnouncement(`[🔵 Team] ${player.name}: ${teamMessage}`, teamB[i].id, blueColor, "bold", 1);
        } else {
            for (let i = 0; i < players.length; i++) {
                if (players[i].team == Team.SPECTATORS)
                    room.sendAnnouncement(`[Team] ${player.name}: ${teamMessage}`, players[i].id, 0xffffff, "bold", 1);
            }
        }
        return false;
    }
    if (teamR.length != 0 && teamB.length != 0 && inChooseMode) {
        if (player.id == teamR[0].id || player.id == teamB[0].id) {
            if (teamR.length <= teamB.length && player.id == teamR[0].id) {
                if (["top", "auto"].includes(message.toLowerCase())) {
                    room.setPlayerTeam(teamS[0].id, Team.RED); redCaptainChoice = "top"; clearTimeout(timeOutCap);
                    room.sendAnnouncement(player.name + " chose Top!"); return false;
                } else if (["random", "rand"].includes(message.toLowerCase())) {
                    room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED); redCaptainChoice = "random"; clearTimeout(timeOutCap);
                    room.sendAnnouncement(player.name + " chose Random!"); return false;
                } else if (["bottom", "bot"].includes(message.toLowerCase())) {
                    room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED); redCaptainChoice = "bottom"; clearTimeout(timeOutCap);
                    room.sendAnnouncement(player.name + " chose Bottom!"); return false;
                } else if (!Number.isNaN(Number.parseInt(message))) {
                    let n = Number.parseInt(message);
                    if (n < 1 || n > teamS.length) { room.sendAnnouncement("Invalid number!", player.id, errorColor, "bold"); return false; }
                    room.setPlayerTeam(teamS[n - 1].id, Team.RED);
                    room.sendAnnouncement(player.name + " chose " + teamS[n - 1].name + "!"); return false;
                }
            }
            if (teamR.length > teamB.length && player.id == teamB[0].id) {
                if (["top", "auto"].includes(message.toLowerCase())) {
                    room.setPlayerTeam(teamS[0].id, Team.BLUE); blueCaptainChoice = "top"; clearTimeout(timeOutCap);
                    room.sendAnnouncement(player.name + " chose Top!"); return false;
                } else if (["random", "rand"].includes(message.toLowerCase())) {
                    room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE); blueCaptainChoice = "random"; clearTimeout(timeOutCap);
                    room.sendAnnouncement(player.name + " chose Random!"); return false;
                } else if (["bottom", "bot"].includes(message.toLowerCase())) {
                    room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE); blueCaptainChoice = "bottom"; clearTimeout(timeOutCap);
                    room.sendAnnouncement(player.name + " chose Bottom!"); return false;
                } else if (!Number.isNaN(Number.parseInt(message))) {
                    let n = Number.parseInt(message);
                    if (n < 1 || n > teamS.length) { room.sendAnnouncement("Invalid number!", player.id, errorColor, "bold"); return false; }
                    room.setPlayerTeam(teamS[n - 1].id, Team.BLUE);
                    room.sendAnnouncement(player.name + " chose " + teamS[n - 1].name + "!"); return false;
                }
            }
        }
    }
    if (getMute(player)) {
        room.sendAnnouncement(`You are muted!`, player.id, errorColor, "bold", 1); return false;
    } else {
        const auth = getAuth(player);
        const stats = await getPlayerStats(auth);
        const elo = stats ? stats[Ss.ELO] : 0;
        const role = stats ? stats[Ss.RL] : Role.PLAYER;
        const prefix = role == Role.STAFF ? "[👮]" : role == Role.MOD ? "[🤴]" : "";
        const icon = getIcon(elo);
        const color = getColor(elo);
        const rank = getRank(elo);
        const ranking = await getRanking(auth);
        room.sendAnnouncement(
            `${role == Role.VIP ? "[💎]" : prefix} #${ranking} - ${icon} ${player.name} [ ${rank.name} : ${elo} ] : ${message}`,
            null, color, null, 1
        );
        return false;
    }
};

room.onPlayerActivity = function (player) {
    setActivity(player, 0);
};

room.onPlayerBallKick = function (player) {
    if (lastPlayersTouched[0] == null || player.id != lastPlayersTouched[0].id) {
        !activePlay ? (activePlay = true) : null;
        lastTeamTouched = player.team;
        lastPlayersTouched[1] = lastPlayersTouched[0];
        lastPlayersTouched[0] = player;
    }
};

room.onGameStart = function (byPlayer) {
    game = new Game(Date.now(), room.getScores(), []);
    countAFK = true; activePlay = false; goldenGoal = false; endGameVariable = false;
    lastPlayersTouched = [null, null]; Rposs = 0; Bposs = 0; GKList = []; allReds = []; allBlues = [];
    if (teamR.length == maxTeamSize && teamB.length == maxTeamSize) {
        for (var i = 0; i < maxTeamSize; i++) { allReds.push(teamR[i]); allBlues.push(teamB[i]); }
    }
    for (var i = 0; i < extendedP.length; i++) {
        extendedP[i][eP.GK] = 0; extendedP[i][eP.ACT] = 0;
        room.getPlayer(extendedP[i][eP.ID]) == null ? extendedP.splice(i, 1) : null;
    }
    deactivateChooseMode();
    reset_size(player_size);
};

room.onGameStop = function (byPlayer) {
    if (endGameVariable) {
        updateTeams();
        if (inChooseMode) {
            if (players.length == 2 * maxTeamSize) {
                inChooseMode = false; resetBtn();
                for (var i = 0; i < maxTeamSize; i++) setTimeout(() => { randomBtn(); }, 400 * i);
                setTimeout(() => { room.startGame(); }, 2000);
            } else {
                if (lastWinner == Team.RED) blueToSpecBtn();
                else if (lastWinner == Team.BLUE) { redToSpecBtn(); blueToRedBtn(); }
                else resetBtn();
                setTimeout(() => { topBtn(); }, 500);
            }
        } else {
            if (players.length == 2) {
                if (lastWinner == Team.BLUE) { room.setPlayerTeam(teamB[0].id, Team.RED); room.setPlayerTeam(teamR[0].id, Team.BLUE); }
                setTimeout(() => { room.startGame(); }, 2000);
            } else if (players.length == 3 || players.length >= 2 * maxTeamSize + 1) {
                if (lastWinner == Team.RED) blueToSpecBtn();
                else { redToSpecBtn(); blueToRedBtn(); }
                setTimeout(() => { topBtn(); }, 200);
                setTimeout(() => { room.startGame(); }, 2000);
            } else if (players.length == 4) {
                resetBtn();
                setTimeout(() => { randomBtn(); setTimeout(() => { randomBtn(); }, 500); }, 500);
                setTimeout(() => { room.startGame(); }, 2000);
            } else if (players.length == 5) {
                if (lastWinner == Team.RED) blueToSpecBtn();
                else { redToSpecBtn(); blueToRedBtn(); }
                setTimeout(() => { topBtn(); }, 200);
                activateChooseMode();
            } else if (players.length == 6) {
                resetBtn();
                setTimeout(() => { randomBtn(); setTimeout(() => { randomBtn(); setTimeout(() => { randomBtn(); }, 500); }, 500); }, 500);
                setTimeout(() => { room.startGame(); }, 2000);
            }
        }
    }
};

function change_size(player_size, team) {
    var pList = room.getPlayerList();
    var team_players = pList.filter((p) => p.team == team);
    for (var i = 0; i < team_players.length; i++) room.setPlayerDiscProperties(team_players[i].id, { radius: player_size });
}

function reset_size(player_size) {
    var pList = room.getPlayerList();
    for (var i = 0; i < pList.length; i++) room.setPlayerDiscProperties(pList[i].id, { radius: player_size });
}

room.onGamePause = function (byPlayer) { };

room.onGameUnpause = function (byPlayer) {
    if ((teamR.length == 4 && teamB.length == 4 && inChooseMode) ||
        (teamR.length == teamB.length && teamS.length < 2 && inChooseMode)) {
        deactivateChooseMode();
    }
};

room.onRoomLink = function (url) {
    console.log("Room link: " + url);
};

room.onPlayerAdminChange = async function (changedPlayer, byPlayer) {
    if (getMute(changedPlayer) && changedPlayer.admin) {
        room.sendAnnouncement(changedPlayer.name + " has been promoted to staff and unmuted.", null, announcementColor, "bold", 1);
        let stats = await getPlayerStats(getAuth(changedPlayer));
        stats[Ss.RL] = Role.STAFF;
        stats[Ss.MSG] = "A Staff member has joined: " + changedPlayer.name;
        stats[Ss.EMJ] = "👮";
        await setPlayerStats(getAuth(changedPlayer), stats);
        setMute(changedPlayer, false);
    }
};

room.onStadiumChange = function (newStadiumName, byPlayer) { };

room.onGameTick = function () {
    checkTime();
    getLastTouchOfTheBall();
    getStats();
    handleInactivity();
};

room.onTeamGoal = async function (team) {
    activePlay = false; countAFK = false;
    const scores = room.getScores();
    game.scores = scores;
    if (lastPlayersTouched[0] != null && lastPlayersTouched[0].team == team) {
        if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
            room.sendAnnouncement("⚽ " + getTime(scores) + " Goal Scored by " + lastPlayersTouched[0].name + " ! With a pass from " + lastPlayersTouched[1].name + ". Shot speed : " + ballSpeed.toPrecision(4).toString() + "km/h", null, team == Team.RED ? redColor : blueColor, "bold", 1);
            game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));
        } else {
            room.sendAnnouncement("⚽ " + getTime(scores) + " Goal " + lastPlayersTouched[0].name + " ! Shot speed : " + ballSpeed.toPrecision(4).toString() + "km/h", null, team == Team.RED ? redColor : blueColor, "bold", 1);
            game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
        }
        let stats = await getPlayerStats(getAuth(lastPlayersTouched[0]));
        let celebrationId = stats[Ss.CL];
        if (celebrationId != null && CELEBRATIONS[celebrationId]) {
            CELEBRATIONS[celebrationId].function(lastPlayersTouched[0]);
        }
    } else {
        room.sendAnnouncement("🤣 " + getTime(scores) + " " + lastPlayersTouched[0].name + " BABY WHAT WAS THAT? 🙃 ! Shot speed : " + ballSpeed.toPrecision(4).toString() + "km/h", null, team == Team.RED ? redColor : blueColor, "bold", 1);
        game.goals.push(new Goal(scores.time, team, null, null));
    }
    if (scores.scoreLimit != 0 && (scores.red == scores.scoreLimit || (scores.blue == scores.scoreLimit && scores.blue > 0) || goldenGoal == true)) {
        endGame(team);
        goldenGoal = false;
        setTimeout(() => { room.stopGame(); }, 1000);
    }
};

room.onPositionsReset = function () {
    countAFK = true; lastPlayersTouched = [null, null];
    reset_size(player_size);
};

// RANKS
const RANKS = [
    { icon: "🥚", name: "ɴᴇᴡ", min: -Infinity, max: 249, color: 0x4CAF50, level: 1 },
    { icon: "🐣", name: "ᴊᴜɴɪᴏʀ", min: 250, max: 499, color: 0x4CAF50, level: 1 },
    { icon: "🐔", name: "ᴀᴍᴀᴛᴇᴜʀ", min: 500, max: 749, color: 0x4CAF50, level: 1 },
    { icon: "🎮", name: "ᴘʟᴀʏᴇʀ", min: 750, max: 999, color: 0x2196F3, level: 2 },
    { icon: "⚽", name: "ꜱᴛᴀʀ", min: 1000, max: 1499, color: 0x2196F3, level: 2 },
    { icon: "🃏", name: "ᴘʀᴏ", min: 1500, max: 1999, color: 0x2196F3, level: 2 },
    { icon: "🔥", name: "ᴇʟɪᴛᴇ", min: 2000, max: 2499, color: 0x9C27B0, level: 3 },
    { icon: "💎", name: "ᴅɪᴀᴍᴏɴᴅ", min: 2500, max: 2999, color: 0x9C27B0, level: 3 },
    { icon: "🎖️", name: "ᴠᴇᴛᴇʀᴀɴ", min: 3000, max: 3499, color: 0x9C27B0, level: 3 },
    { icon: "🏆", name: "ᴄʜᴀᴍᴘɪᴏɴ", min: 3500, max: 3999, color: 0x9C27B0, level: 3 },
    { icon: "⭐", name: "ᴍʏᴛʜɪᴄ", min: 4000, max: 4999, color: 0xE91E63, level: 4 },
    { icon: "🐉", name: "ʟᴇɢᴇɴᴅ", min: 5000, max: 6999, color: 0xE91E63, level: 4 },
    { icon: "👑", name: "ɪᴄᴏɴ", min: 7000, max: 9999, color: 0xE91E63, level: 4 },
    { icon: "🐐", name: "ɢᴏᴀᴛ", min: 10000, max: Infinity, color: 0xFFD700, level: 5 },
];

function getRank(elo) {
    for (let i = 0; i < RANKS.length; i++) {
        if (elo >= RANKS[i].min && elo <= RANKS[i].max) return RANKS[i];
    }
    return RANKS[0];
}
function getIcon(elo) { return getRank(elo).icon; }
function getColor(elo) { return getRank(elo).color; }
function getRankName(elo) { return getRank(elo).name; }

// CELEBRATIONS
const CELEBRATIONS = {
    0: { id: 0, name: "Huge", role: Role.PLAYER, function: HugeC },
    1: { id: 1, name: "Colorful", role: Role.PLAYER, function: ColorC },
};

function HugeC(player) {
    const startR = 15, duration = 1700;
    const discID = player.id;
    let currentR = startR;
    let interval = setInterval(() => {
        currentR += 1;
        room.setDiscProperties(discID, { radius: currentR });
    }, 20);
    setTimeout(() => {
        clearInterval(interval);
        room.setDiscProperties(discID, { radius: startR });
    }, duration);
}

function ColorC(player) {
    const COLORS = [0xff0000, 0xff4000, 0xff8000, 0xffbf00, 0xffff00, 0x80ff00, 0x00ff00, 0x00ffff, 0x0000ff, 0x8000ff];
    const teamID = player.team;
    const duration = 2000;
    let up = 1, colorIndex = 0;
    let interval = setInterval(() => {
        room.setTeamColors(teamID, 0, 0xffffff, [COLORS[colorIndex]]);
        if (up) colorIndex++; else colorIndex--;
        if (colorIndex >= COLORS.length) { colorIndex = COLORS.length - 1; up = 0; }
    }, 50);
    setTimeout(() => {
        clearInterval(interval);
        room.setTeamColors(teamID, 0, teamID == Team.RED ? redColor : blueColor);
    }, duration);
}