const Discord = require('discord.js')
const client = new Discord.Client()
const Prefix = '!'
client.on('ready', () => {
    console.log('helllo world i am online lmfao')
})

const hwList = ["hello: prakhar"]

client.on('message', message => {
    if (message.author.bot) return
    if (!message.content.startsWith(Prefix)) return
    if (!message.guild) return message.reply('Please use this bot in a guild!')
    let args = message.content.substring(Prefix.length).split(' ');
    if (args[0] == "ping") {
        message.reply('pong!')
    } else if (args[0] == "kanye") {
        message.reply('Here\'s a pic of Kanye! :)')
        message.channel.send('https://upload.wikimedia.org/wikipedia/commons/0/0f/Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg')
    } else if (args[0] == "hi") {
        message.channel.send('Hey there! I am a school bot designed and built for this specific server by Prakhar Trivedi.')
        message.channel.send('https://prakhar896.github.io')
    } else if (args[0] == "hw") {
        if (args[1] == "list") {
            const hwEmbed = new Discord.MessageEmbed()
            .setTitle('List of Homework items');
            for (hwItem of hwList) {
                var indexOfColon = hwItem.indexOf(":")
                var subtitleOfHw = hwItem.substring(indexOfColon + 1)
                var title = hwItem.substring(0, indexOfColon)
                console.log(title)
                hwEmbed.addField(title, subtitleOfHw, true);
            }
            message.channel.send(hwEmbed)
        }
    }
})

client.login('token here')
