const puppeteer = require('puppeteer');
const fs = require('fs');
const Database = require('better-sqlite3');

// --- DATABASE SETUP ---
const db = new Database('./stats.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    auth TEXT PRIMARY KEY,
    stats TEXT NOT NULL
  )
`);

// Prepared statements for performance
const stmtGet = db.prepare('SELECT stats FROM players WHERE auth = ?');
const stmtSet = db.prepare('INSERT OR REPLACE INTO players (auth, stats) VALUES (?, ?)');
const stmtAll = db.prepare('SELECT auth, stats FROM players');
const stmtGetByRole = db.prepare('SELECT auth, stats FROM players WHERE json_extract(stats, \'$[7]\') = ?');

// --- DB FUNCTIONS (called from browser via exposeFunction) ---

function dbGetPlayer(auth) {
  if (!auth) return null;
  const row = stmtGet.get(auth);
  if (row) return row.stats; // returns JSON string
  return null;
}

function dbSetPlayer(auth, statsJson) {
  if (!auth || !statsJson) return false;
  stmtSet.run(auth, statsJson);
  return true;
}

function dbGetAllPlayers() {
  const rows = stmtAll.all();
  // returns array of { auth, stats } where stats is JSON string
  return JSON.stringify(rows);
}

// --- LAUNCHER ---
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ]
  });

  const page = await browser.newPage();

  // Log room output
  page.on('console', msg => console.log('[Room]', msg.text()));
  page.on('pageerror', err => console.error('[Error]', err.message));

  // Expose DB functions to the browser context
  await page.exposeFunction('dbGetPlayer', dbGetPlayer);
  await page.exposeFunction('dbSetPlayer', dbSetPlayer);
  await page.exposeFunction('dbGetAllPlayers', dbGetAllPlayers);

  console.log('[Launcher] Navigating to Haxball headless...');
  await page.goto('https://www.haxball.com/headless', { waitUntil: 'networkidle0' });

  console.log('[Launcher] Injecting room script...');
  const script = fs.readFileSync('./room.js', 'utf8');
  await page.evaluate(script);

  console.log('[Launcher] Room script injected. Waiting for room link...');

  // Keep process alive
  process.on('SIGINT', async () => {
    console.log('[Launcher] Shutting down...');
    db.close();
    await browser.close();
    process.exit(0);
  });
})();