import AWS from "aws-sdk"
import varEnv from "../config/varEnv"
import { v4 as uuidv4 } from 'uuid';

const spacesEndpoint = new AWS.Endpoint(varEnv.Endpoint)
const s3 = new AWS.S3({ endpoint: spacesEndpoint })

const addImages = async (img) => {

    let imgSplit = img.name.split(".")

    let idImage = uuidv4();
    idImage += `.${imgSplit[imgSplit.length - 1]}`

    await s3.putObject({
        Body: img.data,
        ACL: 'public-read',
        Bucket: varEnv.BucketName,
        Key: idImage
    }).promise()

    return `https://${varEnv.BucketName}.${varEnv.Endpoint}/${idImage}`
}





export default { addImages }