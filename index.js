const qrcode = require('qrcode-terminal');

const { Client,LocalAuth  } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
	const chat = await msg.getChat();
    const contact = await msg.getContact();
    
    await chat.sendMessage(`Hello @${contact.id.user}`, {
        mentions: [contact]
    });
});

client.initialize();