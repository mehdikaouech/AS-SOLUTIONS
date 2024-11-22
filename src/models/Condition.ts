import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Rule from './Rule';

export interface ConditionAttributes {
  id: number;
  ruleId: number;  
  field: string;
  operator: '>' | '<' | '==' | '!=' | '<=' | '>=' ;
  value: string | number | boolean;  
  type?: 'AND' | 'OR' | null;
}

export interface ConditionCreationAttributes extends Optional<ConditionAttributes, 'id'> {}

@Table({
  modelName: 'Condition',
  tableName: 'conditions',
  timestamps: true,
})
export default class Condition extends Model<ConditionAttributes, ConditionCreationAttributes> {

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
    type: DataType.ENUM('>', '<', '==', '!=', '<=', '>='),  
    allowNull: false,
  })
  declare operator: '>' | '<' | '==' | '!=' | '<=' | '>=';

  @Column({
    type: DataType.JSON,  
    allowNull: false,
  })
  declare value: string | number | boolean;

  @Column({
    type: DataType.ENUM('AND', 'OR'),  
    allowNull: true,
  })
  declare type: 'AND' | 'OR' | null;

}
