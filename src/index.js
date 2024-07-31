const { joinVoice, playMusic } = require("./utils");
const config = require("./../config.json");

try {
  console.log("Started");
  config?.tokens.forEach((token, index) => {
    if (index === 0) {
      playMusic(token, config?.youtubeLink, config?.voiceId);
      return;
    }
    joinVoice(token, config?.voiceId);
  });
} catch (err) {
  console.error(err);
} 
