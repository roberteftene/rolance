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

}

export default new JobService();
