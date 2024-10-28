import actions from "../utils/migrations";

import migrationsTable from "./migrations"
import usersMigrations from "./users"
import contactsMigrations from "./contacts"

const {firstMigrate, migrate, sequelize} = actions

async function migrateAll() {
    await firstMigrate(migrationsTable.up)
    await migrate(usersMigrations.up, usersMigrations.pathName)
    await migrate(contactsMigrations.up, contactsMigrations.pathName)
    await sequelize.close()
}

migrateAll()