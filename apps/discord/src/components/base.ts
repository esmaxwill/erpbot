import * as discord from "discord-interactions";
import { generateId } from "@repo/common";

export interface ModalOpts {
  title?: string;
  custom_id?: string;
}

export class Modal {
  public title: string;
  public custom_id?: string;
  public rows: discord.ActionRow[] = [];

  constructor(opts: ModalOpts) {
    this.custom_id = opts.custom_id;
    this.title = opts.title ?? "Modal";
  }

  serialize(): string {
    return JSON.stringify({
      type: discord.InteractionResponseType.MODAL,
      data: {
        title: this.title,
        custom_id: this.custom_id,
        components: this.rows,
      },
    });
  }
}
