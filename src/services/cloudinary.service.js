import createApiClient from "./api.service";

class CloudService {
  constructor(baseUrl = "/api/images") {
    this.api = createApiClient(baseUrl);
  }

  async uploadImageStaff(image) {
    try {
      const formData = new FormData();
      formData.append("image", image);
      
      const responseData = await this.api.post("/upload/staff", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return responseData;
    } catch (error) {
      throw new Error('Error uploading image: ' + error.message);
    }
  }

  async uploadImageMedicine(image) {
    try {
      const formData = new FormData();
      formData.append("image", image);
      
      const responseData = await this.api.post("/upload/medicine", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return responseData;
    } catch (error) {
      throw new Error('Error uploading image: ' + error.message);
    }
  }

  async uploadImageDoctor(image) {
    try {
      const formData = new FormData();
      formData.append("image", image);
      
      const responseData = await this.api.post("/upload/doctor", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return responseData;
    } catch (error) {
      throw new Error('Error uploading image: ' + error.message);
    }
  }

  async delete(publicID) {
    return (await this.api.delete(`remove/${publicID}`)).data;
  }
}

export default new CloudService();
