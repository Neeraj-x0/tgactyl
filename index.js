const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
const { useNewReplies } = require("telegraf/future")
const fs = require('fs')
const { createMembersData, getMemberData } = require('./lib/user_db')

const  {
    bot_token,
    mongoURL,
    ptero_api
} = require("./config.json")

 if (mongoURL === "") return console.log('Pls Fill The mongoURL Variable in config.json')
 if (ptero_api === "") return console.log('Pls Fill The ptero_api Variable in config.json')

const { verifyToken } = require("./lib/verify")
verifyToken(bot_token).then((res) => {
    if (!res) {
      console.log("Invalid Bot Token");
      process.exit();
    } else {
      console.log("Connecting");
      const bot = new Telegraf(bot_token);
      bot.use(useNewReplies());
      console.log("Connected");

      bot.telegram.setMyCommands([
        { command: "/start", description: "Start Command" },
        { command: "/help", description: "Commands List" },
        { command: "/updates", description: "Get bot updates" },
      ]);

bot.start((ctx) => {
    var buttons = {
    inline_keyboard: [
      [{text: 'Help', callback_data: '/help'}]
    ]
  };
  caption = `Hei Welcome To tgactyl bot!`
  ctx.replyWithPhoto(
    { url: 'https://graph.org/file/a1dda137cf229cecd849f.jpg' },
    {
      caption: caption,
      reply_markup: buttons
    }
  )
})

bot.help((ctx) => {
  help_text = `Here My command List!

public commands

/register
/unregister

owner commands

/listuser
/deluser
/adduser
/broadcast`
 ctx.reply(help_text)
})
bot.action('/help', (ctx) => {
  id = ctx.callbackQuery.message.message_id
  ctx.deleteMessage(id)
   help_text = `Here My command List!

public commands

/register
/unregister

owner commands

/listuser
/deluser
/adduser
/broadcast`
  ctx.reply(help_text)
})


bot.launch()
    }
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))