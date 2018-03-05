const crypto = require('crypto');
const Models = require('../../models');
module.exports = [
    {
        path:'/createShortUrl',
        method:'POST',
        handler: (request,reply)=>{
            const longUrl = request.payload.longUrl;
            const shortUrl = crypto.createHash('md5').update(longUrl).digest('hex').slice(0,6);
            response(shortUrl)
        }
    }
]