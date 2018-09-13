export interface User {
  autorization: {
    created_at: string;
    scopes: Array<string>;
    updated_at: string;
  };
  client_id: string;
  expires_in: number;
  user_id: string;
  user_name: string;
  valid: boolean;
}
