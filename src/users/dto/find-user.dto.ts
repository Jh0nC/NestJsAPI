import { Exclude, Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';
import { DocType } from 'src/doc-type/entities/doc-type.entity';
import { Role } from 'src/roles/entities/role.entity';
import { State } from 'src/states/entities/state.entity';

export class FindUserDto {
  @Expose()
  id: number;

  @Expose()
  role: Role;

  @Expose()
  state: State;

  @Expose()
  docType: DocType;

  @Expose()
  document: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  address: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  @Transform(({value}) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss'))
  createdAt: Date;

  @Expose()
  @Transform(({value}) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss'))
  updatedAt: Date;
}
