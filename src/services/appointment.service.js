import createApiClient from "./api.service";

class MedicineService {
  constructor(baseUrl = "/api/appointments") {
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
    return (await this.api.delete(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/confirm/${id}`, data)).data;
  }

  // async confirm(id, confirmer) {
  //   return (await this.api.put(`/confirm/${id}`, { confirmer })).data;
  // }
  
  async cancel(id, confirmer) {
    return (await this.api.put(`/cancel/${id}`, { confirmer })).data;
  }
}

export default new MedicineService();
