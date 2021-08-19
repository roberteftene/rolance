import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class JobService {
  addJob(reqBody, token, currentUserId) {
    return axios.post(
      `${API_URL}job/${currentUserId}`,

      reqBody,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  getJobsLocation() {
    return axios.get(`${API_URL}job/find/locations`);
  }

  getJobsFiltered(reqBody) {
    return axios.post(`${API_URL}job/find`, reqBody);
  }
}

export default new JobService();
