import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const config = {
  runtime: 'edge',
}

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.CLOUDFLARE_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string;

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// - This should eventually check the user's permissions
//   and return a signed URL for the image if they have access
// - This api is only needed for images without a public URL

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    const { fileName } = req.query;
    const { authorization } = req.headers;
    
    if (!fileName) {
        res.status(400).json({ error: "Missing file name" });
        return;
    }
    
    const command = new GetObjectCommand({
        Bucket: "ai-images",
        Key: `${fileName}`,
    });
    
    const signedUrl = await getSignedUrl(S3, command, {
        expiresIn: 60 * 60 * 24 * 7,
    });

    // redirect to the signed URL
    res.status(302).redirect(signedUrl);
}

export default get;
