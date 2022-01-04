import { User } from '@auth/models';
import { Model } from '@shared/models';

export interface Assignment extends Model {
  user_id: number;
  project_id: number;
  user?: User;
}
