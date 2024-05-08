import type { ComponentProps } from "./types";

export class Component {
  type: number;
  custom_id: string;

  constructor(props: ComponentProps) {
    this.type = props.type;
    this.custom_id = props.customId;
  }
}
