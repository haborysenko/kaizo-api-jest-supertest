require("dotenv").config(); // Load environment variables

const ApiConfig = {
  BASE_URL: process.env.BASE_URL,
  API_KEY: process.env.API_KEY,
  USER_ID: process.env.USER_ID,
  AUDIT_NAME: process.env.AUDIT_NAME,

  // Generate audit object
  getAuditJson() {
    return {
      "user-id": this.USER_ID,
      "original-get-timestamp": 0,
      name: this.AUDIT_NAME,
    };
  },

  // Get standard headers
  getHeaders() {
    return {
      "X-API-Key": this.API_KEY,
      "Content-Type": "application/json",
    };
  },
};

module.exports = ApiConfig;
