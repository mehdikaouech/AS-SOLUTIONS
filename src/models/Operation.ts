import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Rule from './Rule';

export interface OperationAttributes {
  id: number;
  ruleId: number;  
  field: string;
  operator: '+' | '-' | '*' | '/';
  value: number;
}

export interface OperationCreationAttributes extends Optional<OperationAttributes, 'id'> {}

@Table({
  modelName: 'Operation',
  tableName: 'operations',
  timestamps: true,
})
export default class Operation extends Model<OperationAttributes, OperationCreationAttributes> {

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Rule)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ruleId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare field: string;

  @Column({
    type: DataType.ENUM('+', '-', '*', '/'),
    allowNull: false,
  })
  declare operator: '+' | '-' | '*' | '/';

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare value: number;

}
