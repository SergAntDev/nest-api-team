import * as bcrypt from 'bcrypt';

export const userSeed = {
  firstName: 'admin',
  secondName: 'admin',
  email: 'admin@admin.com',
  password: bcrypt.hashSync('12345678', 10),
  role: 'admin',
};
