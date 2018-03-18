import promiseWrap from 'promise-chains';

export class LazyContent {
    // protected _fetcher: promiseWrap;

    constructor(_fetcher) {
        this._fetcher = promiseWrap(_fetcher);

        return new Proxy(this, {
            get (target, key) {
                return key in target || key === 'length' || key in Promise.prototype ? target[key] : target.fetch()[key];
            }
        });
    }

    fetch() {
        if (!this._fetcher) {
            this._fetcher = promiseWrap(this._fetch().then(res => this._transformApiResponse(res)));
        }
        return this._fetcher;
    }

    get _request() {

    }

    _fetch() {
        Promise.resolve(this._request).then(request => {
            return this._m.oauth.Request({
                uri: request.uri,
                qs: request.qs
            });
        });
    }

    _transformApiResponse(res) {
        return res;
    }


    refresh() {
        this._fetcher = null;
        this.fetch();
    }
}

export default LazyContent;
