import { User } from '@auth/models';
import { Project } from '@pages/projects/models';
import { Model } from '@shared/models';

export interface Transaction extends Model {
  transaction_type_id: number;
  user_id: number;
  project_id: number;
  created_by: number;
  transactionType?: Model;
  user?: User;
  project?: Project;
  createdBy?: User;
}
