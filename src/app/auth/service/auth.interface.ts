export interface RegisteredUserResponse {
  ID: string
  display_name: string
  user_activation_key: string
  user_email: string
  user_level: number
  user_login: string
  user_nicename: string
  user_pass: string
  user_registered: string
  user_role: string
  user_status: string
  user_url: string
}

export interface AuthResponse {
  status: boolean
  data: {
    token: string
    user: RegisteredUserResponse
  }
}
