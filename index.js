const Discord = require('discord.js')
const { arg } = require('mathjs')
const client = new Discord.Client()
const Prefix = '!'
client.on('ready', () => {
    console.log('helllo world i am online lmfao')
})
require('dotenv').config()
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
                hwEmbed.addField(title, subtitleOfHw);
            }
            message.channel.send(hwEmbed)
        } else if (args[1] == "add") {
            let newItem = message.content.slice(Prefix.length - 1 + 7)
            if (!newItem) return message.reply('Please give the new homework item in the correct format. Type !hw help for more information')
            hwList.push(newItem)
            message.reply('Added new item successfully!')
        } else if (args[1] == "help") {
            let hwHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Homework List Command Help')
                .addField('This command is made to help you track all the homework you get from school easily with this bot.', 'Each homework item contains a title and a details part.')
                .addField('Getting homework list command format:', '!hw list')
                .addField('Adding a homework item command format:', '!hw add <title>:<details or description>')
                .addField('Example of homework adding command:', '!hw add Emaths:TB Page 31, Practise Now 3')
                .addField('Deleting a homework item command format: ', '!hw delete <count of item>')
                .addField('The homework list counting starts with 1 being the first item in the list', 'Example if I wanted to delete second item in list: !hw delete 2');
            message.channel.send(hwHelpEmbed)
        } else if (args[1] == 'delete') {
            let countOfItemToBeDeleted = args[2]
            if (!countOfItemToBeDeleted) return message.reply('Please give the number of the homework item to delete. Type !hw help for more information.')
            if (countOfItemToBeDeleted - 1 > hwList.length) return message.reply('Please give a valid homework item count.')
            if (countOfItemToBeDeleted - 1 > -1) {
                hwList.splice(countOfItemToBeDeleted - 1, 1);
            } else {
                message.reply('Please give a valid homework item count.')
                return
            }
            message.reply('Deleted homework item successfully!')
        }
    }
})

client.login(process.env.DISCORD_TOKEN)
