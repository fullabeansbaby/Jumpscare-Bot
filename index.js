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
        '218955017900654603': ['jigmo'],
        '427160105625059339': ['jigme'],
        '512443803559264256': ['jigme']
    };

    const universalTriggers = ['jigmo', 'gerbear', 'oh bother', 'jumpscare'];

    const lowerCaseContent = message.content.toLowerCase();
    const userTriggerWords = userTriggers[message.author.id];

    if (userTriggerWords && userTriggerWords.some(trigger => lowerCaseContent.includes(trigger)) ||
        universalTriggers.some(trigger => lowerCaseContent.includes(trigger))) {
        console.log('Trigger detected');

        let responseLink;
        if (message.author.id === '218955017900654603' && lowerCaseContent.includes('jigmo')) {
            responseLink = 'wink! https://i.imgur.com/IjuhJB7.gif';
        } else {
            const randomChance = Math.random();
            responseLink = randomChance < 0.1
                ? 'wink! https://i.imgur.com/IjuhJB7.gif'
                : 'https://i.imgur.com/d7V4jkz.gif';
        }

        message.reply(responseLink).then(sentMessage => {
            setTimeout(() => {
                sentMessage.delete().catch(error => {
                    console.error('Failed to delete the message:', error);
                });
            }, 2000);
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
