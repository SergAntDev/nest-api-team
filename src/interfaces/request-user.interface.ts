import { Request } from 'express';
import { User } from 'src/modules/users/users.entity';

export interface RequestWithUser extends Request {
  user: User;
}
