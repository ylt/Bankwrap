/**
 * Created by joe on 15/08/17.
 */

require('source-map-support').install();

import LazyContent from './LazyContent';
import OAuth from './OAuth';


// export interface MonzoConf {
//     user_agent?: string,
//     client_id: string,
//     client_secret?: string,
//     refresh_token?: string,
//     access_token?: string,
//     redirectUri?: string
// }
//
// export type Transaction_DeclineReason = "INSUFFICIENT_FUNDS" | "CARD_INACTIVE" | "CARD_BLOCKED" | "OTHER";
//


export class Monzo {
    constructor(conf) {
        this.conf = conf;
        this.oauth = new OAuth(conf);

    }

    getAccounts(type) { //opts?
        return this.oauth.Request({
            uri: '/accounts',
            qs: {
                'account_type': type
            }
        }).then(res => {
            let list = [];
            for (let account of res.accounts) {
                list.push(new Account(account.id, this, Promise.resolve(account)));
            }
            return list;
        });
    }

    getPrepaidAccount() {
        return new Promise((resolve, reject) => {
            this.getAccounts(null).then(res => {
                if (res.length > 0)
                    resolve(res[0]);
                resolve(null);
            });
        });
    }

    getCurrentAccount() {
        return new Promise((resolve, reject) => {
            this.getAccounts(null).then(res => {
                if (res.length > 0)
                    resolve(res[0]);
                resolve(null);
            });
        });
    }

    getAccount(id) {
        return new Account(id, this, null);
    }
}

export class Account extends LazyContent {
    // public id: string;
    // public created: string;
    // public description: string;
    // public type: string;

    constructor(id, _m, _fetcher) {
        super(_fetcher);
        this._m = _m;
        this.id = id;
    }

    get _request() {
        return {uri: `/accounts/${this.id}`};
    }
}

export class Balance {
    // public balance: number;
    // public currency: string;
    // public spend_today: string;
}

export class TransactionsPage {

}

export class Transaction {
    // public id: string;
    // public created: string;
    // public description;
    // public amount: number;
    // public decline_reason: Transaction_DeclineReason;
    // public currency;
    // public merchant: string;
    // public notes;
    // public metadata;
    // public account_balanace;
    // public category: string;
    // public is_load: boolean;
    // public settled: string;
    // public local_amount;
    // public local_currency;
    // public updated;
    // public account_id;
    // public scheme;
    // public dedupe_id;
    // public originator;
    // public include_in_spending;
}

export class Merchant {
    // public id;
    // public group_id;
    // public created;
    // public name;
    // public logo;
    // public emoji;
    // public category;
    // public online;
    // public atm;
    // public address;
    // public updated;
    // public metadata;
    // public disable_feedback;
}

export class MerchantAddress {
    // public short_formatted;
    // public formatted;
    // public address;
    // public city;
    // public region;
    // public country;
    // public postcode;
    // public latitude;
    // public longitude;
    // public zoom_level;
    // public approximate;
}

export class Limits {
    // public is_verified: boolean;
    // public max_balance: number;
    // public verification_type: string;
    // public daily_load_limit: number;
    // public daily_load_limit_total: number;
    // public monthly_load_limit: number;
    // public monthly_load_limit_total: number;
    // public annual_load_limit: number;
    // public annual_load_limit_total: number;
    // public max_single_load_limit: number;
    // public daily_cash_limit_total: number;
    // public daily_cash_limit: number;
    // public monthly_cash_limit_total: number;
    // public monthly_cash_limit: number;
    // public annual_cash_limit_total: number;
    // public annual_cash_limit: number;
    // public max_single_cash_limit: number;
    // public daily_pos_limit_total: number;
    // public daily_pos_limit: number;
    // public monthly_pos_limit_total: number;
    // public monthly_pos_limit: number;
    // public annual_pos_limit_total: number;
    // public annual_pos_limit: number;
    // public max_single_pos_limit: number;
    // public daily_p2p_limit_total: number;
    // public daily_p2p_limit: number;
    // public monthly_p2p_limit_total: number;
    // public monthly_p2p_limit: number;
    // public annual_p2p_limit_total: number;
    // public annual_p2p_limit: number;
    // public max_single_p2p_limit: number;
    // public inbound_p2p_min: number;
    // public inbound_p2p_max: number;
    // public monthly_inbound_p2p_limit: number;
    // public monthly_inbound_p2p_limit_total: number;
}

export class Card {
    // public id: string;
    // public processor_token: string;
    // public processor: string;
    // public account_id: string;
    // public last_digits: string;
    // public name: string;
    // public expires;
    // public status: string;
    // public created;
}

export class Profile {
    // public address: {
    //     administrative_area: string,
    //     country: string,
    //     locality: string,
    //     postal_code: string,
    //     steet_address: string
    // };
    // public address_updatable: boolean;
    // public address_updated: string;
    // public date_of_birth: string;
    // public email: string;
    // public name: string;
    // public phone_number: string;
    // public preferred_name: string;
    // public user_id: string;
    // public user_number;
}