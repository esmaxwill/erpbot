import { z } from "zod";

// attribute	type	specification
// id	string	Unique identifier, begins with "adr_"
// object	string	"Address"
// mode	string	Set based on which api-key you used, either "test" or "production"
// street1	string	First line of the address
// street2	string	Second line of the address
// city	string	City the address is located in
// state	string	State or province the address is located in
// zip	string	ZIP or postal code the address is located in
// country	string	ISO 3166 country code for the country the address is located in
// residential	boolean	Whether or not this address would be considered residential
// carrier_facility	string	The specific designation for the address (only relevant if the address is a carrier facility)
// name	string	Name of the person. Both name and company can be included
// company	string	Name of the organization. Both name and company can be included
// phone	string	Phone number to reach the person or organization
// email	string	Email to reach the person or organization
// federal_tax_id	string	Federal tax identifier of the person or organization
// state_tax_id	string	State tax identifier of the person or organization
// verifications	Verifications	The result of any verifications requested

export const AddressInfoSchema = z.object({
  id: z.string().ulid(),
  api_id: z.string().regex(/^adr_[a-zA-Z0-9]+$/),
  discord_user_id: z.string(),
});

export type AddressInfo = z.infer<typeof AddressInfoSchema>;

export const AddressSchema = z.object({
  street1: z.string(),
  street2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  residential: z.boolean().default(true),
  name: z.string(),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export type Address = z.infer<typeof AddressSchema>;
