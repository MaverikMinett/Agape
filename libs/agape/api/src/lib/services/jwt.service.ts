import { Injectable } from "@agape/api";
import { Exception } from "@agape/exception";
import crypto from 'crypto'


@Injectable()
export class JwtService {

    sign( payload: object, secret: string ) {
        const header = {
            'alg': 'HS256',
            'typ': 'JWT'
        }
        const encodedHeaders = Buffer.from(JSON.stringify(header), 'utf8').toString('base64');
        const encodedPaylod = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
        const hmac = crypto.createHmac('sha256',secret)
        const data = hmac.update(`${encodedHeaders}.${encodedPaylod}`)
        const signature= data.digest('hex');
        const encodedSignature = Buffer.from(signature, 'utf8').toString('base64');
        return `${encodedHeaders}.${encodedPaylod}.${encodedSignature}`
    }

    verify( jwt: string, secret: string ) {
        const [encodedHeaders, encodedPaylod, encodedSignature] = jwt.split('.')

        const hmac = crypto.createHmac('sha256',secret)
        const data = hmac.update(`${encodedHeaders}.${encodedPaylod}`)
        const signature= data.digest('hex');
        const expectedEncodedSignature = Buffer.from(signature, 'utf8').toString('base64');

        if ( encodedSignature !== expectedEncodedSignature ) {
            throw new Exception(401, "Unauthorized")
        }

        const payload = JSON.parse(Buffer.from(encodedPaylod, 'base64').toString('utf8'));
        return payload
    }
}
