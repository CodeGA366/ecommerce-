import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface SaleAttributes {
  id: number;
  productId: number;
  buyerId: number;
  amount: number;
}

interface SaleCreationAttributes extends Optional<SaleAttributes, "id"> {}

class Sale extends Model<SaleAttributes, SaleCreationAttributes> {
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT, // Ensure the type matches the Product price type
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sales",
  }
);

export default Sale;