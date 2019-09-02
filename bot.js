const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const config = require("./config.json");

const client = new Discord.Client({disableEveryone: true});

const token = config.token;
const prefix = config.prefix;

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("\nNo Commands To Load!");
        return;
    }

    console.log(`\nLoading ${jsfiles.length} Commands`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} Loaded!`);
        client.commands.set(props.config.name, props);
    });

    console.log(" ");
});

require("./util/eventLoader")(client, client.commands);

// client.on('',''=>{});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.author.id === client.user.id) return;
    if(message.channel.type !== "text") return;


    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);


    command = command.toLowerCase();

    if(!command.startsWith(prefix)) return;

    let cmd = await client.commands.get(command.slice(prefix.length));
    if(cmd) cmd.execute(message, args, client);
  
});

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

process.on('exit', async (code) => {
  
});


//Debug Events
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

// client.on('debug', e => {
//     console.log(chalk.bgBlue(e.replace(regToken, "{Token Redacted}")));
// });

client.on('warn', e => {
	try {
		console.log(chalk.bgYellow(e.replace(regToken, "{Token Redacted}")));
	} catch (e) {
    console.log(e);
  }
});

client.on('error', e => {
	try {
		console.log(chalk.bgRed(e.replace(regToken, "{Token Redacted}")));
	} catch (e) {
    console.log(e);
  }
});
//--Debug Events--

client.login(token);

process.on('unhandledRejection', error => {
    console.error(`Uncaught Promise Error: \n${error.stack}`);
});