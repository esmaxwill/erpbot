import {
  InteractionType,
  InteractionResponseType,
  type ActionRow,
} from "discord-interactions";

export interface Env {
  APP_ID: string;
  PUBLIC_KEY: string;
}

export interface Entitlement {
  id: string;
  sku_id: string;
  application_id: string;
  user_id?: string;
  type: number;
  deleted: boolean;
  starts_at?: string;
  ends_at?: string;
  guild_id?: string;
  consumed?: boolean;
}

export interface InteractionData {
  id: string;
  name: string;
  type: number;
  resolved?: any;
  options?: any[];
  guild_id?: string;
  target_id?: string;
}

export interface InteractionDataModal {
  custom_id: string;
  components: ActionRow[];
}

export interface User {
  avatar: string;
  avatar_decoration_data: any;
  clan?: any;
  discriminator?: string;
  global_name: string;
  id: string;
  public_flags: number;
  username: string;
}

export interface Interaction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: InteractionData;
  guild_id?: string;
  channel?: any;
  channel_id?: string;
  member?: any;
  user?: User;
  token: string;
  version: number;
  message?: any;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
  entitlements?: Entitlement[];
  authorizing_integration_owners?: Record<string, string>;
  context?: number;
}

export interface InteractionResponse {
  type: InteractionResponseType;
}
