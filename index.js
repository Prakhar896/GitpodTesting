const Discord = require('discord.js')
const client = new Discord.Client()
const cron = require('cron')
const Prefix = '!'
const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`School Bot listening at http://localhost:${port}`));
client.on('ready', () => {
  console.log('helllo world i am online lmfao')
})
require('dotenv').config()


client.on('message', message => {
  if (message.author.bot) return
  if (!message.content.startsWith("!msg")) return
  if (!message.guild) return message.reply('Please use this bot in a guild!')
  message.reply('Starting calculator...')
  var totalGotten = 0
  var totalOutOf = 0
  message.reply('What are your English marks? (Reply as {gotten}/{outOf}, for e.g: 02/10 or 08/10)')
  const englishCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
      englishCollector.on('collect', response => {
        
    })
})

client.on('messageDelete', deletedMessage => {
  client.guilds.cache.get('805723501544603658').channels.cache.get('805733098297360406').send(`${deletedMessage.author.tag} deleted a message with the content \`${deletedMessage.content}\` in the server ${deletedMessage.guild.name}.`)
})

client.login('ODAzMTcxMTUyMDgzMDI1OTQx.YA55bA.72xnft9V3oTriXMc4WI4pVxLZZU')