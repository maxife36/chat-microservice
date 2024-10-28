import { Model, DataTypes, Optional,Sequelize } from 'sequelize';

interface ContactAttributes {
  id: string;
  userId: string;
  contactId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: string;
  public userId!: string;
  public contactId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'owner', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    });

    this.belongsTo(models.User, { 
      foreignKey: 'contactId', 
      as: 'contact', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    });
  }
}

export default (sequelize: Sequelize) => {
  Contact.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      contactId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "contacts",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "contactId"],
        },
      ],
    }
  );

  return Contact;
};
