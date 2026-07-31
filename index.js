const http = require('http');
http.createServer((req, res) => res.end('Bot is running')).listen(process.env.PORT || 3000);
const { Telegraf, Markup } = require('telegraf');

// यहाँ अपना Bot API Token पेस्ट करें
const BOT_TOKEN = '8855826720:AAE2E2c1xZoiAiMX9MXwz3uiFB7OsgNT4HY'; 
const bot = new Telegraf(BOT_TOKEN);

const users = {};

bot.start((ctx) => {
    const userId = ctx.from.id;
    if (!users[userId]) {
        users[userId] = {
            balance: 0,
            baseRate: 0.10,
            boosterRate: 0,
            miningStartTime: null,
            referrals: 0
        };
    }

    ctx.replyWithMarkdown(
        `👑 *Welcome to $SHRI Mining & Game Zone!*\n\n` +
        `Mine $SHRI tokens every 8 hours with 1-tap.\n\n` +
        `⚡ *Mining Speed:* ${(users[userId].baseRate + users[userId].boosterRate).toFixed(2)} $SHRI/hr\n` +
        `💰 *Your Balance:* ${users[userId].balance.toFixed(2)} $SHRI`,
        Markup.keyboard([
            ['🎮 ENTER GAME ZONE'],
            ['⛏️ Start Mining (8 Hours)', '👛 Balance'],
            ['👥 Invite Friends (+0.01/hr)', '📋 Tasks']
        ]).resize()
    );
});

bot.hears('⛏️ Start Mining (8 Hours)', (ctx) => {
    const userId = ctx.from.id;
    const user = users[userId];
    const now = Date.now();
    const EIGHT_HOURS = 8 * 60 * 60 * 1000;

    if (user.miningStartTime && (now - user.miningStartTime < EIGHT_HOURS)) {
        const remainingTime = Math.ceil((EIGHT_HOURS - (now - user.miningStartTime)) / (1000 * 60));
        return ctx.reply(`⏳ Mining is active! Next session starts in ${remainingTime} minutes.`);
    }

    if (user.miningStartTime) {
        user.balance += (user.baseRate + user.boosterRate) * 8;
    }

    user.miningStartTime = now;
    ctx.reply(`🚀 *Mining Started!* You will earn ${((user.baseRate + user.boosterRate) * 8).toFixed(2)} $SHRI in the next 8 hours.`);
});

bot.hears('👛 Balance', (ctx) => {
    const userId = ctx.from.id;
    const user = users[userId];
    ctx.reply(`💰 *Your Balance:* ${user.balance.toFixed(4)} $SHRI\n⚡ *Current Rate:* ${(user.baseRate + user.boosterRate).toFixed(2)} $SHRI/hr`);
});

bot.hears('👥 Invite Friends (+0.01/hr)', (ctx) => {
    const userId = ctx.from.id;
    const refLink = `https://t.me/SHRIOfficialBot?start=${userId}`;
    ctx.reply(`📢 *Invite Friends & Boost Speed!*\nGet *+0.01 $SHRI/hr* booster for every friend.\n\nYour Link:\n${refLink}`);
});

bot.launch();
console.log("SHRI Bot is running...");
