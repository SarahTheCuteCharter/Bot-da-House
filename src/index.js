import "dotenv/config";

import {
  Client,
  Collection,
  GatewayIntentBits,
  Events
} from "discord.js";

const requiredVariables = [
  "DISCORD_TOKEN",
  "CLIENT_ID",
  "GUILD_ID"
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(
      `Variável obrigatória ausente: ${variable}`
    );
  }
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

client.once(Events.ClientReady, (readyClient) => {
  console.log("================================");
  console.log("HOUSE DE COUNTRYBALLS");
  console.log("================================");
  console.log(`Bot: ${readyClient.user.tag}`);
  console.log(`ID: ${readyClient.user.id}`);
  console.log("Status: ONLINE");
  console.log("================================");
});
client.on('messageCreate', async (message) => {
  // 1. Impede que o bot responda a si mesmo ou a outros bots (evita loop infinito)
  if (message.author.bot) return;

  // 2. Verifica se o bot foi mencionado na mensagem (@SeuBot)
  if (message.mentions.has(client.user) && !message.mentions.everyone)
    return message.reply('swag bot'); // Use message.channel.send('swag bot') se não quiser que ele marque a pessoa de volta
  }
          
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(
    interaction.commandName
  );

  if (!command) {
    return interaction.reply({
      content: "Comando não encontrado.",
      ephemeral: true
    });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error("Erro no comando:", error);

    const response = {
      content: "Ocorreu um erro ao executar o comando.",
      ephemeral: true
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response);
    } else {
      await interaction.reply(response);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
