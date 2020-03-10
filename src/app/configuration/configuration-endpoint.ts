import { environment } from 'src/environments/environment';

export class ConfigurationEndpoint {
    private static ecommerceEndpoint = `${environment.url}`;

    static getLoginEndpoint(): string {
        return `${this.ecommerceEndpoint}/login`;
    }

    static getAlertEndpoint(): string {
        return `${this.ecommerceEndpoint}/alerts`;
    }

    static getOrdersEndpoint(): string {
        return `${this.ecommerceEndpoint}/orders`;
    }
}
