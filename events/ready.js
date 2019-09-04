const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.json");

module.exports = async (bot, commands) => {  
  
  console.log(chalk.bgGreen(` \n The Bot `),chalk.bgCyan(` ${bot.user.username} `),chalk.bgGreen(` Is Ready! \n `));
  console.log(commands);
  console.log(" ");

  bot.setInterval(() => {
    var games = [`With ${bot.users.size} People!`, `Typing Game With ;help`]

    bot.user.setPresence({ game: { name: games[Math.floor(Math.random() * games.length)], type: "PLAYING"}});        

  }, 10000);
}