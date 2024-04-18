import createApiClient from "./api.service";

class PatientService {
  constructor(baseUrl = "/api/patients") {
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
  async getListPhone(){
    return (await this.api.get(`/phone/listphone`)).data;
  }
  async getPatientByPhoneNumber(phoneNumber){
    return (await this.api.post(`/patient/${phoneNumber}`)).data;
  }
}

export default new PatientService();
