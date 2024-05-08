import * as discord from "discord-interactions";

import { Modal, ModalOpts } from "./base";
import { generateId } from "@repo/common";

export class NewAddressModal extends Modal {
  private static generateCustomId(): string {
    return `dropbox|newadd|${generateId()}`;
  }

  constructor(opts: ModalOpts) {
    super(opts);
    this.title = "Enter Shipping Address";

    if (!this.custom_id) {
      this.custom_id = NewAddressModal.generateCustomId();
    }

    const name: discord.InputText = {
      custom_id: this.custom_id + "|name",
      type: discord.MessageComponentTypes.INPUT_TEXT,
      label: "Deliver To:",
      style: discord.TextStyleTypes.SHORT,
      required: true,
    };

    const row1: discord.ActionRow = {
      type: discord.MessageComponentTypes.ACTION_ROW,
      components: [name],
    };
    this.rows.push(row1);

    const street1: discord.InputText = {
      custom_id: this.custom_id + "|street1",
      type: discord.MessageComponentTypes.INPUT_TEXT,
      label: "Address Line 1:",
      style: discord.TextStyleTypes.SHORT,
      required: true,
    };

    const row2: discord.ActionRow = {
      type: discord.MessageComponentTypes.ACTION_ROW,
      components: [street1],
    };

    this.rows.push(row2);

    const street2: discord.InputText = {
      custom_id: this.custom_id + "|street2",
      type: discord.MessageComponentTypes.INPUT_TEXT,
      label: "Address Line 2:",
      style: discord.TextStyleTypes.SHORT,
      required: false,
    };

    const row3: discord.ActionRow = {
      type: discord.MessageComponentTypes.ACTION_ROW,
      components: [street2],
    };

    this.rows.push(row3);

    const city: discord.InputText = {
      custom_id: this.custom_id + "|city",
      type: discord.MessageComponentTypes.INPUT_TEXT,
      label: "City: ",
      style: discord.TextStyleTypes.SHORT,
      required: true,
    };

    const state: discord.InputText = {
      custom_id: this.custom_id + "|state",
      type: discord.MessageComponentTypes.INPUT_TEXT,
      label: "State: ",
      style: discord.TextStyleTypes.SHORT,
      required: true,
    };

    const zip: discord.InputText = {
      custom_id: this.custom_id + "|zip",
      type: discord.MessageComponentTypes.INPUT_TEXT,
      label: "Zip: ",
      style: discord.TextStyleTypes.SHORT,
      required: true,
    };

    const row4: discord.ActionRow = {
      type: discord.MessageComponentTypes.ACTION_ROW,
      components: [city, state], //, zip],
    };

    this.rows.push(row4);
  }
}
