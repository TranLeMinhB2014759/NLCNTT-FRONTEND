import createApiClient from "./api.service";

class MedicineService {
  constructor(baseUrl = "/api/medicalrecords") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
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

  async getRecord(phoneNumber){
    return (await this.api.get(`/phone/${phoneNumber}`)).data;
  }

  async getRecordByMSDT(MSDT){
    return (await this.api.get(`/msdt/${MSDT}`)).data;
  }
}

export default new MedicineService();
