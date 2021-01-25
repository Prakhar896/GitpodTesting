const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('helllo world i am online lmfao')
})

client.on('message', message => {
    if (message.author.bot) return
    if (!message.content.startsWith('!')) return
    if (!message.guild) return message.reply('Please use this bot in a guild!')
    message.reply('Hefhbweiguewohv')
})

client.login('')