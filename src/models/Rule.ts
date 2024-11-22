import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Condition from './Condition';
import Operation from './Operation';
import Product from './Product';

export interface RuleAttributes {
  id: number;
  productId: any;  
  conditions: Condition[];  
  operation: Operation;  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RuleCreationAttributes extends Optional<RuleAttributes, 'id'> {}

@Table({
  modelName: 'Rule',
  tableName: 'rules', 
  timestamps: true,   
})
export default class Rule extends Model<RuleAttributes, RuleCreationAttributes> {

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare productId: string;

  @Column({
    type: DataType.JSON, 
    allowNull: false,
  })
  declare conditions:  Condition[];

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  declare operation: Operation;

  @HasMany(() => Condition)
  declare conditionsData: Condition[ ];

  @HasMany(() => Operation)
  declare operationsData: Operation[];

}
