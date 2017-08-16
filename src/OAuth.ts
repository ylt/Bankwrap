/**
 * Created by joe on 15/08/17.
 */
import * as request from 'request-promise';

// user_agent?: string,
//     client_id?: string,
//     client_secret?: string,
//     refresh_token?: string,
//     access_token?: string

export class OAuth {
    baseUrl = 'https://api.monzo.com';
    redirectUri = 'http://localhost:3000/callback';

    constructor(private clientId, private clientSecret, private refreshToken, private accessToken, private tokenExpiration) {

    }

    public updateAccessToken() {
        if ((!this.accessToken || Date.now() > this.tokenExpiration) && (this.refreshToken)) {
            return request({
                method: 'post',
                url: this.baseUrl + '/oauth2/token',
                form: {
                    grant_type: 'refresh_token',
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    refresh_token: this.refreshToken
                },
                auth: {
                    user: this.clientId,
                    pass: this.clientSecret
                },
                json: true
            }).then(tokenInfo => {
                console.log(tokenInfo);
                this.accessToken = tokenInfo.access_token;
                this.refreshToken = tokenInfo.refresh_token;
                this.tokenExpiration = Date.now() + (tokenInfo.expires_in * 1000);
                return this.accessToken;
            });
        }
        return Promise.resolve(this.accessToken);
    }

    public getAuthUrl() {
        return `https://auth.getmondo.co.uk/?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&state=`;
    }

    public exchangeAuth(code) {
        return request({
            method: 'post',
            url: this.baseUrl + '/oauth2/token',
            form: {
                grant_type: 'authorization_code',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri,
                code: code
            },
            json: true
        }).then(tokenInfo => {
            return tokenInfo;
        });
    }

    public request() {

    }
}