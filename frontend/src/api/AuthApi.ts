import api from '../lib/axios'
import { isAxiosError } from 'axios'
import { ConfirmToken, UserLoginForm, UserRegistrationForm, RequestConfirmationCodeForm, ForgotPasswordForm, NewPasswordForm } from '../types/auth'

// export async function createAccount(formData: UserRegistrationForm) {
//   try {
//     const url = '/auth/create-account'
//     const { data } = await api.post<string>(url, formData)
//     console.log(data)
//     return data
//   } catch (error) {
//     if(isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error)
//     }
//   }
// }

export async function confirmAccount(formData: ConfirmToken) {
  try {
      const url = '/auth/confirm/:token'
      const { data } = await api.post<string>(url, formData)
      return data
  } catch (error) {
      if(isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
      }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login';
        const { data } = await api.post(url, formData);
        console.log(data)
        localStorage.setItem('AUTH_TOKEN', data.token);
        localStorage.setItem('USER', JSON.stringify(data.user));
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


//Revisar de aqui en adelante.
export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
  try {
      const url = '/auth/request-code'
      const { data } = await api.post<string>(url, formData)
      return data
  } catch (error) {
      if(isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
      }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
      const url = '/auth/forgot-password'
      const { data } = await api.post<string>(url, formData)
      return data
  } catch (error) {
      if(isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
      }
  }
}

export async function validateToken(formData: ConfirmToken) {
  try {
      const url = '/auth/validate-token'
      const { data } = await api.post<string>(url, formData)
      return data
  } catch (error) {
      if(isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
      }
  }
}

export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
  try {
      
      const url = `/auth/update-password/${token}`
      const { data } = await api.post<string>(url, formData)
      return data
  } catch (error) {
      if(isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
      }
  }
}