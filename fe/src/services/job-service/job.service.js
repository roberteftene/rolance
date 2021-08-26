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

  getJobById(jobId) {
    return axios.get(`${API_URL}job/${jobId}`);
  }

  applyToJob(reqBody) {
    return axios.post(`${API_URL}job/apply`, reqBody);
  }

  getApplicants(jobId) {
    return axios.get(`${API_URL}job/applicants/${jobId}`);
  }

  getJobsApplied(userId) {
    return axios.get(`${API_URL}job/jobsApplied/${userId}`);
  }

  getUserJobs(userId) {
    return axios.get(`${API_URL}job/findOwnerJobs/${userId}`)
  }

  closeJob(jobId) {
    return axios.delete(`${API_URL}job/closeJob/${jobId}`)
  }
}

export default new JobService();
