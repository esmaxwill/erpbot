import * as discord from "discord-interactions";

import { Modal, ModalOpts } from "./base";
import { generateId } from "@repo/common";

export class NewShipmentModal extends Modal {
  private static generateCustomId(): string {
    return `dropbox|newship|${generateId()}`;
  }

  constructor(opts: ModalOpts) {
    super(opts);
    this.title = "Create a new shipment";

    if (!this.custom_id) {
      this.custom_id = NewShipmentModal.generateCustomId();
    }

    const name: discord.InputText = {
      custom_id: this.custom_id + "|name",
      type: discord.MessageComponentTypes.INPUT_TEXT,
      label: "Nickname for this shipment:",
      style: discord.TextStyleTypes.SHORT,
      required: true,
    };

    const row1: discord.ActionRow = {
      type: discord.MessageComponentTypes.ACTION_ROW,
      components: [name],
    };

    this.rows.push(row1);
  }
}
