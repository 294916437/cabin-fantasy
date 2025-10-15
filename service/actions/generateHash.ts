import crypto from "crypto";
export default async function generateHash(userIdentifier:string, secretKey:string) {
    try {
      const hash = crypto.createHmac('sha256', secretKey).update(userIdentifier).digest('hex');
      return hash;
    } catch (error) {
      console.log("🚀 ~ file: generateHash.ts:337 ~ ", error);
      return null;
    }
  }
  