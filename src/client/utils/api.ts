import { API_SETTINGS } from './constants.js';

interface ConstructorInterface {
    baseUrl: string,
    headers: {
        'Content-Type'?: string
        [index: string]: unknown
    }
}

interface ProxyInterface {
    relativePath: string,
    method: string,
    headers: {
        'Content-Type'?: string,
    },
    body?: string
}

interface OptionInterface {
    method: string,
    headers: {
        'Content-Type'?: string,
    },
    body?: string
}

class Api {
    _baseUrl: string;
    _headers: {
        'Content-Type'?: string
        [index: string]: unknown
    };

    constructor ({ baseUrl, headers }: ConstructorInterface) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getProxy ({ relativePath, method, body = '', headers = {} }: ProxyInterface) {
        const options: OptionInterface = {
            method,
            headers: { ...this._headers, ...headers },
        };

        if (body) {
            options.body = body;
        }

        return fetch(`${this._baseUrl}${relativePath}`, options);
    }

    async _handleResponse (response: any) {
        const description = await response.json();

        if (response.ok) {
            return description;
        } else {
            return Promise.reject({
                status:  response.status,
                message: description.message
                             ? description.message
                             : description.error
                        ? description.error
                        : 'Что-то пошло не так!\nПопробуйте ещё раз.',
            });
        }
    }

    async rerun({ id }:{id:string}) {
        const params: ProxyInterface = {
            relativePath: "/rerun",
            method: "POST",
            headers: {},
            body: JSON.stringify({ id }),
        };
        const response = await this._getProxy(params);
        return await this._handleResponse(response);
    }
}

export default new Api(API_SETTINGS);
