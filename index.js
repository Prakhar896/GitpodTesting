const Discord = require('discord.js')
const client = new Discord.Client()
const cron = require('cron')
const Prefix = '!'
client.on('ready', () => {
    console.log('helllo world i am online lmfao')
})
require('dotenv').config()
var hwList = []
let magaServerID = '780685961079685120'
let hwChannelID = '800333000671232041'
let classServerID = '807599800379768862'
let classServerHwChannelID = '807601775753429002'

let hwListJob = new cron.CronJob('00 00 17 * * *', () => {
    const hwEmbed = new Discord.MessageEmbed()
        .setTitle('List of Homework items');

    for (hwItem of hwList) {
        var indexOfColon = hwItem.indexOf(":")
        var subtitleOfHw = hwItem.substring(indexOfColon + 1)
        var title = hwItem.substring(0, indexOfColon)
        console.log(title)
        hwEmbed.addField(title, subtitleOfHw);
    }

    client.guilds.cache.get(magaServerID).channels.cache.get(hwChannelID).send(hwEmbed)
    client.guilds.cache.get(classServerID).channels.cache.get(classServerHwChannelID).send(hwEmbed)
})

hwListJob.start()

client.on('message', message => {
    if (message.author.bot) return
    if (!message.content.startsWith(Prefix)) return
    if (!message.guild) return message.reply('Please use this bot in a guild!')
    let args = message.content.substring(Prefix.length).split(' ');
    if (args[0] == "ping") {
        message.reply('pong!')
    } else if (args[0] == "kanye" || args[0] == 'k') {
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
                if (!title || !subtitleOfHw) {
                    hwEmbed.addField('Fatal Error:', 'Could not find title or description of homework item. Please delete this item and try again.')
                } else {
                    hwEmbed.addField(title, subtitleOfHw)
                }
            }
            message.channel.send(hwEmbed)
        } else if (args[1] == "add") {
            let newItem = message.content.slice(Prefix.length - 1 + 8)
            if (!newItem) return message.reply('Please give the new homework item in the correct format. Type !hw help for more information')
            if (!(newItem.indexOf(':') > -1)) return message.reply('Please use the correct format to add a homework entry.')
            hwList.push(newItem)
            message.reply('Added new item successfully!')
            message.channel.send('Showing homework list with new changes...')

            const hwEmbed = new Discord.MessageEmbed()
                .setTitle('List of Homework items');
            for (hwItem of hwList) {
                var indexOfColon = hwItem.indexOf(":")
                var subtitleOfHw = hwItem.substring(indexOfColon + 1)
                var title = hwItem.substring(0, indexOfColon)
                if (!title || !subtitleOfHw) {
                    hwEmbed.addField('Fatal Error:', 'Could not find title or description of homework item. Please delete this item and try again.')
                } else {
                    hwEmbed.addField(title, subtitleOfHw)
                }
            }
            message.channel.send(hwEmbed)

        } else if (args[1] == "help") {
            let hwHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Homework List Command Help')
                .addField('This command is made to help you track all the homework you get from school easily with this bot.', 'Each homework item contains a title and a details part.')
                .addField('Getting homework list command format:', '!hw list')
                .addField('Adding a homework item command format:', '!hw add <title>:<details or description>')
                .addField('Example of homework adding command:', '!hw add Emaths:TB Page 31, Practise Now 3')
                .addField('Deleting a homework item command format: ', '!hw delete <count of item>')
                .addField('The homework list counting starts with 1 being the first item in the list', 'Example if I wanted to delete second item in list: !hw delete 2')
                .addField('Deleting all Homework Items', 'If you want to delete the entire list, type !hw wipe')
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
            message.channel.send('Showing homework list with new changes...')

            const hwEmbed = new Discord.MessageEmbed()
                .setTitle('List of Homework items');
            for (hwItem of hwList) {
                var indexOfColon = hwItem.indexOf(":")
                var subtitleOfHw = hwItem.substring(indexOfColon + 1)
                var title = hwItem.substring(0, indexOfColon)
                if (!title || !subtitleOfHw) {
                    hwEmbed.addField('Fatal Error:', 'Could not find title or description of homework item. Please delete this item and try again.')
                } else {
                    hwEmbed.addField(title, subtitleOfHw)
                }
            }
            message.channel.send(hwEmbed)
            
        } else if (args[1] == 'wipe') {
            hwList = []
            message.channel.send('Wiped the Homework List successfully!')
            message.channel.send('Showing homework list with new changes...')

            const hwEmbed = new Discord.MessageEmbed()
                .setTitle('List of Homework items');
            for (hwItem of hwList) {
                var indexOfColon = hwItem.indexOf(":")
                var subtitleOfHw = hwItem.substring(indexOfColon + 1)
                var title = hwItem.substring(0, indexOfColon)
                if (!title || !subtitleOfHw) {
                    hwEmbed.addField('Fatal Error:', 'Could not find title or description of homework item. Please delete this item and try again.')
                } else {
                    hwEmbed.addField(title, subtitleOfHw)
                }
            }
            message.channel.send(hwEmbed)
            
        }
    }
})

client.on('messageDelete', deletedMessage => {
    client.guilds.cache.get('805723501544603658').channels.cache.get('805733098297360406').send(`${deletedMessage.author.tag} deleted a message with the content \`${deletedMessage.content}\` in the server ${deletedMessage.guild.name}.`)
})

client.login(process.env.DISCORD_TOKEN)
