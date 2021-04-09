import got from 'got';
import { debugApiGithub } from './config.js';

export default class ApiGithub {
    constructor (token) {
        this._token   = token;
        this._baseUrl = 'https://api.github.com';
    }

    _getProxy ({ relativePath, method, headers = {}, body = '' }) {
        const options = {
            method,
            headers: { ...headers },
        };

        if (body)
            options.body = body;


        return got(`${this._baseUrl}${relativePath}`, options);
    }

    _handleResponse (response) {

        const result = JSON.parse(response.body);

        debugApiGithub(`Status code: ${response.statusCode}`);

        if (response.statusCode === 200)
            return result;

        return {
            status:  response.statusMessage,
            message: result && result.message
                ? result.message
                : 'Shit happens!\nTry again.',
        };

    }


    async getListWorkflows (owner, repo) {

        //NOTE: You need to tap $env:DEBUG="github api" in terminal to turn on debug
        debugApiGithub(`Token: ${this._token}`);
        debugApiGithub(`Owner: ${owner}`);
        debugApiGithub(`Repo: ${repo}`);

        const params = {
            relativePath: `/repos/${owner}/${repo}/actions/workflows`,
            method:       'GET',
            headers:      {
                'Content-Type':  'application/json',
                'authorization': this._token
            },
        };
        const response = await this._getProxy(params);

        return this._handleResponse(response);
    }

    async getListRuns (owner, repo) {

        //NOTE: You need to tap $env:DEBUG="github api" in terminal to turn on debug
        debugApiGithub(`Token: ${this._token}`);
        debugApiGithub(`Owner: ${owner}`);
        debugApiGithub(`Repo: ${repo}`);

        const params = {
            relativePath: `/repos/${owner}/${repo}/actions/runs`,
            method:       'GET',
            headers:      {
                'Content-Type':  'application/json',
                'authorization': this._token
            },
        };
        const response = await this._getProxy(params);

        return this._handleResponse(response);
    }
}

