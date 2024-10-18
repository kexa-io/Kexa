import crypto from 'crypto'
import { CipherGCMTypes } from 'crypto';
import {config} from './encryption.config'

const { secret_key, secret_iv, ecnryption_method } = config

// if ((process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') && (!secret_key || !secret_iv || !ecnryption_method)) {
//   throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
// }

let key: string = '';
let encryptionIV: string = '';

if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') { 
  if (!secret_key || !secret_iv || !ecnryption_method) {
    throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
  }
  key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)
  encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)
}

export function decryptData(encryptedData: any) {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = crypto.createDecipheriv(ecnryption_method as CipherGCMTypes, key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  )
}