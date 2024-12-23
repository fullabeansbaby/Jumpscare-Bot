const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', message => {
    console.log('Message received');

    const userTriggers = {
        '130817946032275456': ['kelly'],
        '218955017900654603': ['jigme', 'jstest']
    };

    const lowerCaseContent = message.content.toLowerCase();
    const userTriggerWords = userTriggers[message.author.id];

    if (userTriggerWords && userTriggerWords.some(trigger => lowerCaseContent.includes(trigger))) {
        console.log('Trigger detected');
        message.reply('https://i.imgur.com/d7V4jkz.gif').then(sentMessage => {
            setTimeout(() => {
                sentMessage.delete().catch(error => {
                    console.error('Failed to delete the message:', error);
                });
            }, 2000); // Delete the message after 2 seconds
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
