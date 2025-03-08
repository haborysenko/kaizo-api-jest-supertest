const request = require("supertest");
const ApiConfig = require("./apiConfig");

class ApiClient {
  constructor() {
    this.baseUrl = ApiConfig.BASE_URL;
    this.headers = ApiConfig.getHeaders();
  }

  setHeaders(req) {
    return req.set(this.headers);
  }

  async get(path) {
    return this.setHeaders(request(this.baseUrl).get(path));
  }

  async post(path, body) {
    return this.setHeaders(request(this.baseUrl).post(path).send(body));
  }

  async put(path, body) {
    return this.setHeaders(request(this.baseUrl).put(path).send(body));
  }

  async delete(path) {
    return this.setHeaders(
      request(this.baseUrl).delete(path).send(ApiConfig.getAuditJson())
    );
  }
}

module.exports = new ApiClient();
