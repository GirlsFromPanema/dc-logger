import express, { Express, Request, Response } from 'express';
const app: Express = express();
import fetch from "cross-fetch";
import { MessageEmbed, WebhookClient } from "discord.js";

import "dotenv/config";

const webhook = new WebhookClient({
  url: process.env.WEBHOOK_TOKEN as string,
});

const port = 8000;

app.listen(port, () => console.log("Website online at " + port));

app.get('/', (req: Request, res: Response) => {
  res.send("Hi");

  async function sendwebhook(ip: string, time: string) {
    const data = await fetch("https://api.ipify.org/?format=txt").then(
      (results) => results.text()
    );

    let embed = new MessageEmbed()
      .setTitle("New Website Visitor!")
      .setDescription(`**IP:** \n ${data} \n\n **Time:** \n ${Date()}`);
    webhook.send({
      embeds: [embed],
    });
  }
  sendwebhook("", "");
});
