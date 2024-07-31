const { Client } = require('discord.js-selfbot-v13');
const ytdl = require('@distube/ytdl-core');
const client = new Client();

client.on('ready', async client => {
  console.log(`${client.user.username} is ready!`);

  const channel = client.channels.cache.get(process.env.CHANNEL);
  const connection = await client.voice.joinChannel(channel, {
    selfMute: false,
    selfDeaf: false,
    selfVideo: false,
  });

  const dispatcher = connection.playAudio(
    ytdl(process.env.MUSIC, {
      quality: 'highestaudio',
    }),
  );

  dispatcher.on('start', () => {
    console.log('audio is now playing!');
    dispatcher.setVolume(0.5);
  });

  dispatcher.on('finish', () => {
    console.log('audio has finished playing!');
  });

  dispatcher.on('error', console.error);
});

client.login(process.env.TOKEN);
