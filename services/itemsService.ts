import { CosmosClient } from "@azure/cosmos";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const itemsService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("ToDoList");
      this.container = this.database.container("Items");
    } catch (err) {
      console.log(err.message);
    }
  },
  async read(): Promise<string> {
    const iterator = this.container.items.readAll();
    const { resources } = await iterator.fetchAll();
    return JSON.stringify(resources);
  },
  async create(itemToCreate) {
    const { resource } = await this.container.items.create(itemToCreate);
    return resource;
  }
};

itemsService.init();

export default itemsService;
