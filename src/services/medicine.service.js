import createApiClient from "./api.service";

class MedicineService {
  constructor(baseUrl = "/api/medicines") {
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
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id, data) {
    return (await this.api.delete(`/${id}`, data)).data;
  }
  
  async getIsActive() {
    return (await this.api.get("/active")).data;
  }

  async findByTenThuoc(tenThuoc) {
    return (await this.api.get(`/search/${tenThuoc}`)).data;
  }
}

export default new MedicineService();
