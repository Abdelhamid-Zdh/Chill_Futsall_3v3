# 🟧 Chill Futsal Haxball Room — Server Setup

A headless Haxball room server using Puppeteer + SQLite for persistent player stats.

---

## Architecture

```
launcher.js  (Node.js)
│
├── Opens headless Chromium via Puppeteer
├── Navigates to haxball.com/headless
├── Injects room.js into the browser context
│
├── SQLite DB (stats.db)
│   └── Exposes 3 functions to the browser:
│       ├── dbGetPlayer(auth)        → returns player stats JSON string
│       ├── dbSetPlayer(auth, json)  → saves player stats
│       └── dbGetAllPlayers()        → returns all players as JSON array
│
└── room.js runs inside the browser, calls those functions via await
```

**Why this architecture?**
Haxball's `HBInit` API only works inside a real browser context — it cannot run in plain Node.js. Puppeteer runs a headless Chromium that loads haxball.com, then injects the room script into it. Since the browser context has no filesystem access, SQLite is managed on the Node.js side and bridged into the browser via `page.exposeFunction()`.

---

## Stats Schema

Each player is stored by their Haxball `auth` key.

```
Index  Field   Type    Description
──────────────────────────────────────
  0    GA      number  Games played
  1    WI      number  Wins
  2    GL      number  Goals
  3    AS      number  Assists
  4    GK      number  Goalkeeper appearances
  5    CS      number  Clean sheets
  6    ELO     number  Elo rating
  7    RL      number  Role (-1=BAN, 0=PLAYER, 1=VIP, 2=STAFF, 3=MOD)
  8    CL      number  Celebration ID
  9    MSG     string  Join message
  10   EMJ     string  Emoji / Avatar
  11   NK      string  Nickname (shown on leaderboard)
```

Default stats for a new player: `[0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, ""]`

---

## Elo Formula

```
ELO = 1000 + (Wins × 5) + (Losses × -15) + (Goals × 15) + (Assists × 15) + (Cleansheets × 20)
```

Blue team starts from 0 instead of 1000 (known issue, fix if needed).

---

## Maps

| Map      | Players | Score Limit | Time Limit |
|----------|---------|-------------|------------|
| m_solo   | 1       | 0           | 0          |
| m_2v2    | 2–5     | 3           | 3 min      |
| m_3v3    | 6       | 3           | 3 min      |

Maps switch automatically based on player count.

---

## Ranks

| Icon | Name     | Elo Range     |
|------|----------|---------------|
| 🥚   | ɴᴇᴡ      | 0 – 249       |
| 🐣   | ᴊᴜɴɪᴏʀ   | 250 – 499     |
| 🐔   | ᴀᴍᴀᴛᴇᴜʀ  | 500 – 749     |
| 🎮   | ᴘʟᴀʏᴇʀ   | 750 – 999     |
| ⚽   | ꜱᴛᴀʀ     | 1000 – 1499   |
| 🃏   | ᴘʀᴏ      | 1500 – 1999   |
| 🔥   | ᴇʟɪᴛᴇ    | 2000 – 2499   |
| 💎   | ᴅɪᴀᴍᴏɴᴅ  | 2500 – 2999   |
| 🎖️   | ᴠᴇᴛᴇʀᴀɴ  | 3000 – 3499   |
| 🏆   | ᴄʜᴀᴍᴘɪᴏɴ | 3500 – 3999   |
| ⭐   | ᴍʏᴛʜɪᴄ   | 4000 – 4999   |
| 🐉   | ʟᴇɢᴇɴᴅ   | 5000 – 6999   |
| 👑   | ɪᴄᴏɴ     | 7000 – 9999   |
| 🐐   | ɢᴏᴀᴛ     | 10000+        |

---

## Commands

### Player Commands
| Command | Aliases | Description |
|---------|---------|-------------|
| `!help [command]` | `!commands` | Show all commands or info on a specific one |
| `!claim <code>` | — | Claim a role (VIP, STAFF, MOD) with a code |
| `!afk` | — | Toggle AFK status |
| `!afks` | `!afklist` | Show AFK players |
| `!bb` | `!bye !gn !cya` | Leave the room |
| `!me` | `!stat !stats` | Show your stats |
| `!rename <name>` | — | Change your leaderboard nickname |
| `!rules` | — | Show room rules |
| `!cel <id>` | `!celebration !c` | Set your goal celebration |
| `!showcel` | `!showcelebration !sc` | List available celebrations |

### Staff Commands
| Command | Description |
|---------|-------------|
| `!rr` | Restart the game |
| `!rrs` | Swap teams and restart |
| `!swap` | Swap teams (game must be stopped) |
| `!mute #<id> [minutes]` | Mute a player |
| `!unmute #<id>` | Unmute a player |
| `!mutes` | List muted players |

### MOD Commands
| Command | Description |
|---------|-------------|
| `!ban #<id>` | Ban a player |
| `!clearbans` | Clear all bans |
| `!bans` | List banned players |
| `!setadmin #<id>` | Promote player to staff |
| `!tc <id>` | Test a celebration |

### Special Chat
| Prefix | Description |
|--------|-------------|
| `@@PlayerName message` | Send a private message |
| `t message` | Send a team-only message |

---

## Role Codes
Change these in `room.js` before deploying:
```js
const vipCode   = "ChillVIP2026";
const modCode   = "ChillMOD2026";
const staffCode = "ChillSTAFF2026";
```

---

## Installation

### Requirements
- Node.js 18+
- Fedora / Debian Linux

### Steps

```bash
# Clone your repo
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

# Install dependencies
npm install puppeteer better-sqlite3

# Run
node launcher.js
```

### Keep alive 24/7 with PM2

```bash
npm install -g pm2
pm2 start launcher.js --name haxball
pm2 save
pm2 startup   # run the command it outputs
```

### Update token
Haxball tokens expire. Get a new one at:
`https://www.haxball.com/headlesstoken`

Then update in `room.js`:
```js
const token = "your_new_token_here";
```

---

## Files

```
/
├── launcher.js   — Node.js entry point, SQLite setup, Puppeteer bridge
├── room.js       — Haxball room logic (runs inside headless browser)
├── stats.db      — SQLite database (auto-created on first run)
└── README.md     — This file
```

---

## Known Issues / TODOs

- Blue team Elo formula starts from 0 instead of 1000 (inconsistency with red team)
- Token needs manual renewal when it expires
- `checkStatsFormat` allows EMJ to be either number or string for backwards compatibility
- No web dashboard yet for viewing stats externally