const Discord = require('discord.js');
const client = new Discord.Client();
const mysql = require('mysql')
const config = require("./config.json");
const prefix = config.prefix;
const fs = require('fs')

client.on('ready', () => {
  console.log(`Je suis prêt. ${client.user.tag}!`);
  bot.user.setStatus("online");
  client.user.setActivity(`Une question ? MP MOI`);
});

client.on('message', msg => {
  if (msg.content === '!ping') {
    msg.reply('pong');
  }
});


let con = mysql.createConnection({
  host: config.host,
  port: "3306",
  user: config.utilisateur,
  password: config.motdepasse,
  database: config.database
});



client.on('message', message => {
  if(message.guild) return;
              const args = message.content.slice(prefix.length).trim().split(/ +/g);
              const command = args.shift().toLowerCase();
              let object = args[0];
              let detail = args.slice(1).join(" ");
                      if(command === "ip"){
                          if(!object){
                            const err_code = new Discord.MessageEmbed()
                            .setColor('#F93A2F')
                            .setTitle('Error 400 - Bad Request')
                            .setDescription("Tu n\'a pas précisé ton ip. Exemple : !ip 127.0.0.1")
                            
                                  message.channel.send(err_code)
                                }else{
                                  try {
                                    const code = new Discord.MessageEmbed()
                                    .setColor('#8e44ad')
                                    .setTitle('Succès :')
                                    .setDescription(":white_check_mark: Votre requête a été envoyé au serveur !")
                                    message.channel.send(code);
                                    con.query(`SELECT * FROM whitelist`)
                                    con.query('INSERT INTO whitelist (ip) VALUES (?);', [object]); 
                                    con.on('error', function(err) {
                                      console.log("[mysql error]",err);

                                    });
    

                                  } catch (err) {
                                    if (err.code === 'ER_DUP_ENTRY') {
                                        message.channel.send(err_code2)
                                    } else {
                                       
                                     }
                                 }
                                  
                    
                    }
            }return
    })



client.login(config.token)