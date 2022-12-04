const knex = require("knex");

class ContenedorSQL{
    constructor(options, tableName) {
        this.database = knex(options);
        this.table = tableName;
    }

    save = async(object) => {
        try {
            const response = await this.database.from(this.table).insert(object);
            const result = JSON.parse(JSON.stringify(response));
            
            return `Objeto agregado correctamente - ID: ${result}`;
        } catch (error) {
            return `Error: ${error}`;
        }
    }

    getById = async(id) => {
        try {
            const response = await this.database.from("productos").select("*").where("id", "=", id);
            const result = JSON.parse(JSON.stringify(response));

            return result;
        } catch (error) {
            return `Error: ${error}`;
        }
    }

    getAll = async() => {
        try {
            const response = await this.database.from(this.table).select("*");
            const result = JSON.parse(JSON.stringify(response));

            return result;
        } catch (error) {
            return `Error: ${error}`;
        }
    }

    deleteById = async(id) => {
        try {
            const response = await this.database.from(this.table).where("id", "=", id).del();
            const result = JSON.parse(JSON.stringify(response));

            return `Objeto eliminado correctamente - ID: ${result}`;
        } catch (error) {
            return `Error: ${error}`;
        }
    }

    deleteAll = async() => {
        try {
            const response = await this.database.from(this.table).del();

            return `Todos los objetos han sido eliminado correctamente`;
        } catch (error) {
            return `Error: ${error}`;
        }
    }

    updateById = async(id, body) => {
        try {
            const response = this.database.from("cars").select("*").where("id", "=", id).update(body)
            const result = JSON.parse(JSON.stringify(response));

            return `Objeto actualizado correctamente - ID: ${result}`;
        } catch (error) {
            return `Error: ${error}`;
        }
    }
}

module.exports = { ContenedorSQL };