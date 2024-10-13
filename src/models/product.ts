
import { Sequelize, DataTypes, Model } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Product extends Model {
    public id!: number; 
    public name!: string;
    public price!: number;
    public description?: string;
    public category!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'products',
    }
  );

  return Product;
};
