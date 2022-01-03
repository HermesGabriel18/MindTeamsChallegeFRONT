import { Client } from '@pages/clients/models';
import { Model } from '@shared/models';

export interface Project extends Model {
  client_id: number;
  disabled: string;
  client?: Client;
}
