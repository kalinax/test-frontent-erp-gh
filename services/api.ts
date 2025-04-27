import { auth } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY;

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
    };
  };
}

interface OTPResponse {
  detail?:string;
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    ref_id: string;
    user_type: string;
    avatar: string | null;
    email: string;
    first_name: string;
    country: string;
    last_name: string;
    dob: string;
    phone_country_code: string;
    phone_number: string;
    status: string;
    is_email_verified: string;
    permissions: {
      organization_id: string;
      org_ref_id: string;
      subdomain: string;
      roles: string[];
      on_boarded: boolean;
      kyc: any;
      on_boarding_steps: string;
      account_status: string;
    };
  };
}

async function handleRequest(requestFn: (token: string) => Promise<Response>): Promise<any> {
    try {
        const response = await requestFn(auth.getAccessToken() || '');
        const data = await response.json();

        if (!response.ok) {
            if (data.detail === 'Signature has expired') {
                let newToken;
                try {
                    newToken = await auth.refreshToken();
                } catch (refreshError) {
                    throw { detail: 'token_expired' };
                }
                
                const retryResponse = await requestFn(newToken);
                const retryData = await retryResponse.json();
                if (!retryResponse.ok) {
                    if (retryData.detail === 'You do not have permission to access this resource') {
                        throw { detail: 'You do not have permission to access this resource' };
                    } else {
                        throw retryData;
                    }
                }
                return retryData;
            }
            
            if (data.detail === 'No authorization token provided') {
              throw { detail: 'token_expired' };
            }
            throw data;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const api = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}api/v1/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY || '',
      },
      body: JSON.stringify({ 
        email, 
        password,
        user_type: "root"
      }),
    });

    return response.json();
  },

  async verifyOTP(otp: string, email: string): Promise<OTPResponse> {
    const response = await fetch(`${BASE_URL}api/v1/user/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY || '',
      },
      body: JSON.stringify({ 
        otp,
        email,
        user_type: "root"
      }),
    });

    return response.json();
  },

  getAccountantDashboard: async () => {
    return handleRequest((token: string) => {
      return fetch(`${BASE_URL}/api/v1/dashboard/accountant`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api_key': API_KEY || '',
          'token': token,
        },
      });
    });
  },

  getAccountantInvoices: async () => {
    return handleRequest((token: string) => {
      return fetch(`${BASE_URL}/api/v1/dashboard/accountant/invoices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api_key': API_KEY || '',
          'token': token,
        },
      });
    });
  },

  getAccountantReceipts: async () => {
    return handleRequest((token: string) => {
      return fetch(`${BASE_URL}/api/v1/dashboard/accountant/receipts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api_key': API_KEY || '',
          'token': token,
        },
      });
    });
  },

  getAccountantInventory: async () => {
    return handleRequest((token: string) => {
      return fetch(`${BASE_URL}/api/v1/dashboard/accountant/inventory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api_key': API_KEY || '',
          'token': token,
        },
      });
    });
  },
}; 