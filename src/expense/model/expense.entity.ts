import { BaseModel } from 'src/common/base-model';
import { User } from 'src/user/model/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum Category {
  GROCERIES = 'groceries',
  LEISURE = 'leisure',
  ELECTRONICS = 'electronics',
  UTILITIES = 'utilities',
  CLOTHING = 'clothing',
  HEALTH = 'health',
  OTHERS = 'others',
}

@Entity('expenses')
export class Expense extends BaseModel {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'enum',
    nullable: false,
    enum: Category,
    default: Category.OTHERS,
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: 'userId' })
  user: User;
}
