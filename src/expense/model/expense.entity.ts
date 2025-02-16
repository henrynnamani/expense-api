import { BaseModel } from 'src/common/base-model';
import { Column, Entity } from 'typeorm';

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
}
