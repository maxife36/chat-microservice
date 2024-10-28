import path from "path";
import { QueryInterface, DataTypes } from "sequelize";

const migrations = {
  up: async function (queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("contacts", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      contactId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    // Agregar restricción única para que no se repitan las relaciones de contactos
    await queryInterface.addConstraint("contacts", {
      fields: ["userId", "contactId"],
      type: "unique",
      name: "unique_user_contact_pair",
    });
  },

  down: async function (queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("contacts");
  },
  
  pathName: path.basename(__filename)
};

export default migrations;
