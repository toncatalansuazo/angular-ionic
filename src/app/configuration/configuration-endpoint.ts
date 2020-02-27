import { environment } from 'src/environments/environment';

export class ConfigurationEndpoint {
    private static ecommerceEndpoint = `${environment.url}`;

    static getLoginEndpoint(): string {
        return `${this.ecommerceEndpoint}/login`;
    }
}
