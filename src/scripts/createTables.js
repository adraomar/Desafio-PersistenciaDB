const { options } = require("../config/connections");
const knex = require("knex");

// CREAR INSTANCIA BASE DE DATOS
const databaseMySQL = knex(options.mariaDB);
const databaseSQLite = knex(options.sqliteDB);

const createTables = async () => {
    try {
        let productosTable = await databaseMySQL.schema.hasTable("productos");

        if(productosTable) {
            await databaseMySQL.schema.dropTable("productos");
        }

        await databaseMySQL.schema.createTable("productos", table => {
            table.increments("id");
            table.string("title", 40).nullable(false);
            table.integer("price").nullable(false);
            table.string("thumbnail", 200).nullable(false);
        })
        console.log("[MySQL]: Tabla productos creada correctamente!");

        let chatTable = await databaseSQLite.schema.hasTable("chat");

        if(chatTable) {
            await databaseSQLite.schema.dropTable("chat");
        }

        await databaseSQLite.schema.createTable("chat", table => {
            table.increments("id");
            table.string("user", 30);
            table.string("timestamp", 20);
            table.string("message", 200);
        })

        console.log("[SQLITE]: Tabla chat creada correctamente!");
    } catch (error) {
        console.log(error);
    }

    databaseMySQL.destroy();
    databaseSQLite.destroy();
}

createTables();
