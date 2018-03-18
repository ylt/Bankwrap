/**
 * Created by joe on 15/08/17.
 */
import request from 'request-promise';
import EventEmitter from 'events';
import {includes, merge} from 'lodash';
import Promise from './Promise';

const MAX_TOKEN_LATENCY = 30;

// export interface oauth {
//     client_id,
//     client_secret?,
//     refresh_token?,
//     access_token?,
//     expires_in?,
//     token_expiration?,
//     redirectUri?
// }

export default class OAuth {

    constructor(oauth) {
        this.oauth = oauth;
        this.baseUrl = 'https://api.monzo.com';
        this.emitter = new EventEmitter();
        if (!oauth.token_expiration && oauth.expires_in) { //convert the relative expires to absolute, based on now..
            oauth.token_expiration = Date.now() + (oauth.expires_in * 1000);
        }


    }

    //only update 1 access token, if already in progress then return promise for existing refresh
    updateAccessToken() {
        if (this.accessTokenPromise)
            return this.accessTokenPromise;

        if ((!this.oauth.access_token || Date.now() > this.oauth.token_expiration) && (this.oauth.refresh_token)) {
            let promise = request({
                method: 'post',
                url: this.baseUrl + '/oauth2/token',
                form: {
                    grant_type: 'refresh_token',
                    client_id: this.oauth.client_id,
                    client_secret: this.oauth.client_secret,
                    refresh_token: this.oauth.refresh_token
                },
                auth: {
                    user: this.oauth.client_id,
                    pass: this.oauth.client_secret
                },
                json: true
            }).then(tokenInfo => {
                console.log(tokenInfo);
                this.oauth.access_token = tokenInfo.access_token;
                this.oauth.refresh_token = tokenInfo.refresh_token;
                this.oauth.token_expiration = Date.now() + (tokenInfo.expires_in * 1000);

                this.emitter.emit('update', this.oauth);
                delete this.accessTokenPromise;
                return this.oauth.access_token;
            });
            this.accessTokenPromise = promise;
            return promise;
        }
        return Promise.resolve(this.oauth.access_token);
    }

    getAuthUrl() {
        return `https://auth.getmondo.co.uk/?client_id=${this.oauth.client_id}&redirect_uri=${this.oauth.redirectUri}&response_type=code&state=`;
    }

    exchangeAuth(code) {
        return request({
            method: 'post',
            url: this.baseUrl + '/oauth2/token',
            form: {
                grant_type: 'authorization_code',
                client_id: this.oauth.client_id,
                client_secret: this.oauth.client_secret,
                redirect_uri: this.oauth.redirectUri,
                code: code
            },
            json: true
        }).then(tokenInfo => {
            this.oauth.access_token = tokenInfo.access_token;
            this.oauth.refresh_token = tokenInfo.refresh_token;
            this.oauth.token_expiration = Date.now() + (tokenInfo.expires_in * 1000);

            this.emitter.emit('update', this.oauth);
            return tokenInfo;
        });
    }

    toJson() {
        return this.oauth;
    }

    /* event listener stuff */
    on(eventName, listener) {
        return this.emitter.on(eventName, listener);
    }

    once(eventName, listener) {
        return this.emitter.once(eventName, listener);
    }

    removeListener(eventName, listener) {
        return this.emitter.removeListener(eventName, listener);
    }

    Request(options) {
        return Promise.resolve()
            .then(() => this.updateAccessToken())
            .then(() => {
                return request(merge({
                    json: true,
                    baseUrl: this.baseUrl,
                    auth: { bearer: this.oauth.access_token}
                }, options))
            })
            .then(response => {
                return response;
            })
            .catch({statusCode: 401}, e => {
                if (this.oauth.access_token && this.oauth.token_expiration - Date.now() < MAX_TOKEN_LATENCY) {
                    this.oauth.access_token = null;
                    this.oauth.token_expiration = null;
                    return this.Request(options);
                }
                throw e;
            })
    }

}