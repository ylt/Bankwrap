/**
 * Created by joe on 15/08/17.
 */

import * as OAuthLibre from 'oauth-libre';
const OAuth2 = OAuthLibre.PromiseOAuth2;


interface MonzoConf {
    user_agent?: string,
    client_id?: string,
    client_secret?: string,
    refresh_token?: string,
    access_token?: string
}

type Transaction_DeclineReason = "INSUFFICIENT_FUNDS" | "CARD_INACTIVE" | "CARD_BLOCKED" | "OTHER";



class Monzo {
    private baseUrl;
    public oauth;

    constructor(private conf: MonzoConf) {



    }

    getAccounts(): Promise<Account[]> { //opts?
        return null;
    }

    getPrepaidAccount() {
        return new Promise((resolve, reject) => {
            this.getAccounts().then(res => {
                if (res.length > 0)
                    resolve(res[0]);
                resolve(null);
            });
        });
    }

    getCurrentAccount() {

    }

    getAccount(id) {

    }
}

class Account {
    //public id: string;
    public description: string;
    public created: string;
}

class Balance {
    public balance: number;
    public currency: string;
    public spend_today: string;
}

class TransactionsPage {

}

class Transaction {
    public id: string;
    public created: string;
    public description;
    public amount: number;
    public decline_reason: Transaction_DeclineReason;
    public currency;
    public merchant: string;
    public notes;
    public metadata;
    public account_balanace;
    public category: string;
    public is_load: boolean;
    public settled: string;
    public local_amount;
    public local_currency;
    public updated;
    public account_id;
    public scheme;
    public dedupe_id;
    public originator;
    public include_in_spending;
}

class Merchant {
    public id;
    public group_id;
    public created;
    public name;
    public logo;
    public emoji;
    public category;
    public online;
    public atm;
    public address;
    public updated;
    public metadata;
    public disable_feedback;
}

class MerchantAddress {
    public short_formatted;
    public formatted;
    public address;
    public city;
    public region;
    public country;
    public postcode;
    public latitude;
    public longitude;
    public zoom_level;
    public approximate;
}

class Limits {
    public is_verified: boolean;
    public max_balance: number;
    public verification_type: string;
    public daily_load_limit: number;
    public daily_load_limit_total: number;
    public monthly_load_limit: number;
    public monthly_load_limit_total: number;
    public annual_load_limit: number;
    public annual_load_limit_total: number;
    public max_single_load_limit: number;
    public daily_cash_limit_total: number;
    public daily_cash_limit: number;
    public monthly_cash_limit_total: number;
    public monthly_cash_limit: number;
    public annual_cash_limit_total: number;
    public annual_cash_limit: number;
    public max_single_cash_limit: number;
    public daily_pos_limit_total: number;
    public daily_pos_limit: number;
    public monthly_pos_limit_total: number;
    public monthly_pos_limit: number;
    public annual_pos_limit_total: number;
    public annual_pos_limit: number;
    public max_single_pos_limit: number;
    public daily_p2p_limit_total: number;
    public daily_p2p_limit: number;
    public monthly_p2p_limit_total: number;
    public monthly_p2p_limit: number;
    public annual_p2p_limit_total: number;
    public annual_p2p_limit: number;
    public max_single_p2p_limit: number;
    public inbound_p2p_min: number;
    public inbound_p2p_max: number;
    public monthly_inbound_p2p_limit: number;
    public monthly_inbound_p2p_limit_total: number;
}

class Card {
    public id: string;
    public processor_token: string;
    public processor: string;
    public account_id: string;
    public last_digits: string;
    public name: string;
    public expires;
    public status: string;
    public created;
}

class Profile {
    public address: {
        administrative_area: string,
        country: string,
        locality: string,
        postal_code: string,
        steet_address: string
    };
    public address_updatable: boolean;
    public address_updated: string;
    public date_of_birth: string;
    public email: string;
    public name: string;
    public phone_number: string;
    public preferred_name: string;
    public user_id: string;
    public user_number;
}