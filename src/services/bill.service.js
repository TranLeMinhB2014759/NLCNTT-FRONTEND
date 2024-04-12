import createApiClient from "./api.service";

class BillService {
  constructor(baseUrl = "/api/bills") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
 
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async delete(id, data) {
    return (await this.api.delete(`/${id}`, data)).data;
  }
}

export default new BillService();
