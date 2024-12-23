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

    const specificUsers = ['130817946032275456', '218955017900654603'];
    const lowerCaseContent = message.content.toLowerCase();

    if (
        specificUsers.includes(message.author.id) && 
        (lowerCaseContent.includes('kelly') || lowerCaseContent === 'whats wrong ?')
    ) {
        console.log('Trigger detected');
        message.reply('Here\'s your GIF: https://i.imgur.com/d7V4jkz.gif').then(sentMessage => {
            setTimeout(() => {
                sentMessage.delete().catch(error => {
                    console.error('Failed to delete the message:', error);
                });
            }, 2000); // Delete the message after 2 seconds
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
