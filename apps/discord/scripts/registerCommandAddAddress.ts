(async () => {
  const applicationId = process.env.APP_ID;
  const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;
  const headers = {
    Authorization: `Bot ${process.env.BOT_TOKEN}`,
    "Content-Type": "application/json",
  };

  const commandInformation = {
    name: "Add Address",
    type: 2,
    contexts: [0, 1, 2],
    integration_types: [0, 1],
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(commandInformation),
  });

  console.log(response.status);
  const data = await response.json();
  console.log(data);
})();
