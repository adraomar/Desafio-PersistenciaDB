const knex = require("knex");

class ContenedorSQL{
    constructor(options, tableName) {
        this.database = knex(options);
        this.table = tableName;
    }

    async getAll() {
        try {
            const response = await this.database.from(this.table).select("*");
            const result = JSON.parse(JSON.stringify(response));

            return result;
        } catch (error) {
            return `Error: ${error}`;
        }
    }

    async save(product) {
        try {
            const [id] = await this.database.from(this.table).insert(product);
            
            return `Producto agregado correctamente - ID: ${id}`;
        } catch (error) {
            return `Error: ${error}`;
        }
    }
}

module.exports = { ContenedorSQL };