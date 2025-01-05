import CryptoJS from "crypto-js";

const secretKey = "QMDK8kecEikNNwXYtaW93PUUoeiB8ai3";

export function encryptData(data) {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return encodeURIComponent(ciphertext);
}

export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encryptedData),
    secretKey
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
