import axios from 'axios';
import { getLoginUser } from './loginService';

const base_url = 'http://pergosandbox2.com/api/jobs.php';

export const jobsService = {
  get_jobs: async () => {
    return axios.get(base_url, {
      params: {
        method: 'get_jobs',
        token: getLoginUser().token,
      },
    });
  },
};
