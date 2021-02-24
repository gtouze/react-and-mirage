import { createServer, Model, JSONAPISerializer } from "miragejs"

/**
 * @typedef {object} User
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 */

export function makeServer({ environment = "test" } = {}) {
    const server = createServer({
        environment,
        serializers: {
            application: JSONAPISerializer
        },
        models: {
            user: Model,
            compagny: Model
        },
        seeds(server) {
            // @ts-ignore
            server.create("user", { first_name: "Touze", last_name: "Gurvan", email: "Touze@Gurvan.com" })
            // @ts-ignore
            server.create("user", { first_name: "Quentin", last_name: "Dijoux", email: "Quentin@Dijoux.com" })
            // @ts-ignore
            server.create("compagny", { name: "Ynov" })
        },
        routes() {
            this.namespace = "api"
            this.get("/users", schema => {
                // @ts-ignore
                return schema.users.all()
            })
            this.get("/users/:id", (schema, request) => {
                // @ts-ignore
                return schema.users.findBy({ id: request.params.id })
            })
            this.post("/users", (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                // @ts-ignore
                return schema.users.create(attrs);
            })
            this.delete("/users/:id", (schema, request) => {
                // @ts-ignore
                return schema.users.find(request.params.id).destroy()
            });
            this.get("/companies", schema => {
                // @ts-ignore
                return schema.companies.all()
            })

            this.post("/users")
            this.post("/companies")
        }
    })

    return server
}