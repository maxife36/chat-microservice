import sequelize from "../config/config";

import Users from "./users"
import Contacts from "./contacts"

export default {
    User: Users(sequelize),
    Contact: Contacts(sequelize),
}