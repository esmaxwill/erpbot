import { ComponentType } from "./types";
import { Component } from "./base";

export class ActionRow {
  type: ComponentType = ComponentType.ActionRow;
  components: Component[] = [];
}
