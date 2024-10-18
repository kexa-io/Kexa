const { API_SECRET_KEY, API_SECRET_IV, API_ENCRYPTION_METHOD } = process.env

export const config  = {
  env: null,
  port: null,
  secret_key: API_SECRET_KEY,
  secret_iv: API_SECRET_IV,
  ecnryption_method: API_ENCRYPTION_METHOD,
}