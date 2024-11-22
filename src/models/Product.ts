import { Optional } from 'sequelize';
import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import Rule from './Rule';

export interface ProductAttributes {
  id: string;
  basePrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

@Table({
    modelName: 'Product',
    tableName: 'products',  
    timestamps: true , 
}) 
 
export default class Product extends Model< ProductAttributes , ProductCreationAttributes >{
    @Column ({
        primaryKey : true , 
        type : DataType.UUID , 
        defaultValue : DataType.UUIDV4 ,
    }) 
    declare  id : String 

    @Column ({
        type : DataType.FLOAT  , 
    }) 
    declare  basePrice : number 

    @HasMany(() => Rule)
    declare rules: Rule[];

    @CreatedAt 
    declare created_at : Date ;

    @UpdatedAt 
    declare updated_at : Date ; 

    
}

