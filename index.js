const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('helllo world i am online lmfao')
})

client.on('message', message => {
    if (!message.content.startsWith('!')) return msg.reply('ah thats not a bot command...bye')
    msg.reply('Hefhbweiguewohv')
})

client.login('')