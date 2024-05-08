import { Component } from "./base";
import { ComponentType, ComponentProps } from "./types";

export interface ButtonProps extends ComponentProps {
  style: number;
}

export enum ButtonStyle {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Link = 5,
}

export class Button extends Component {
  style: ButtonStyle;

  constructor(props: ButtonProps) {
    super({ type: ComponentType.Button, customId: props.customId });

    this.style = props.style;
  }
}
