function playMusic(token, youtube, voice) {
  const { Client } = require("discord.js-selfbot-v13");
  const ytdl = require("@distube/ytdl-core");
  const client = new Client();

  client.on("ready", async (client) => {
    const channel = client.channels.cache.get(voice);
    const connection = await client.voice.joinChannel(channel, {
      selfMute: false,
      selfDeaf: false,
      selfVideo: false,
    });

    const dispatcher = connection.playAudio(
      ytdl("https://www.youtube.com/watch?v=" + youtube, {
        quality: "highestaudio",
      }),
    );

    dispatcher.on("start", () => {
      console.log(`${client.user.username} is play!`);
      dispatcher.setVolume(0.5);
    });

    dispatcher.on("finish", () => {
      console.log("finished playing!");
    });

    dispatcher.on("error", () => {
      console.error;
    });
  });

  client.login(token);
}

function joinVoice(token, voice) {
  const { Client } = require("discord.js-selfbot-v13");
  const client = new Client();

  client.on("ready", async (client) => {
    const channel = client.channels.cache.get(voice);
    await client.voice.joinChannel(channel, {
      selfMute: true,
      selfDeaf: false,
      selfVideo: false,
    });

    console.log(`${client.user.username} is join`);
  });

  client.login(token);
}

module.exports = {
  playMusic,
  joinVoice,
};
