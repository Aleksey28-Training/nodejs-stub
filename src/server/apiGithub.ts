import got, { CancelableRequest, Method, Response } from 'got';
import { debugApiGithub, baseUrlGitHub } from './config.js';

interface ProxyInterface {
    relativePath: string,
    method: Method | undefined,
    headers: {
        'Content-Type'?: string,
        'authorization'?: string
    },
    body?: string
}

interface HandleResponseInterface {
    status?: string,
    message?: string,
    'workflow_runs'?: Array<{ unknown: string }>
}

interface GotJSONResponse {
    responseType: 'json',

    [index: string]: unknown
}

export default class ApiGithub {

    protected _token: string;
    protected _baseUrl: string;

    constructor (token: string | undefined) {
        this._token = token || '';
        this._baseUrl = baseUrlGitHub;
    }

    _getProxy ({
        relativePath,
        method,
        headers = {},
        body = ''
    }: ProxyInterface): CancelableRequest<Response<HandleResponseInterface>> {
        const options: GotJSONResponse = {
            method,
            headers:      { ...headers },
            responseType: 'json'
        };

        if (body)
            options.body = body;


        debugApiGithub(`URL: ${this._baseUrl}${relativePath}`);
        debugApiGithub(`Options before request: `);
        debugApiGithub(options);

        return got(`${this._baseUrl}${relativePath}`, options);
    }

    _handleResponse (response: Response<HandleResponseInterface>): HandleResponseInterface {

        debugApiGithub(`Response: ${response}`);

        const result = response.body;

        debugApiGithub(`Status code: ${response.statusCode}`);

        if (response.statusCode === 200)
            return result;


        debugApiGithub(`Message: ${result && result.message}`);

        return {
            status:  response.statusMessage,
            message: result && result.message
                ? result.message
                : 'Shit happens!\nTry again.',
        };

    }


    async getListWorkflows (owner: string, repo: string): Promise<HandleResponseInterface> {

        //NOTE: You need to tap $env:DEBUG="github api" in terminal to turn on debug
        debugApiGithub(`Token: ${this._token}`);
        debugApiGithub(`Owner: ${owner}`);
        debugApiGithub(`Repo: ${repo}`);

        const params: ProxyInterface = {
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

    async getListRuns (owner: string, repo: string): Promise<HandleResponseInterface> {

        //NOTE: You need to tap $env:DEBUG="github api" in terminal to turn on debug
        debugApiGithub(`Token: ${this._token}`);
        debugApiGithub(`Owner: ${owner}`);
        debugApiGithub(`Repo: ${repo}`);

        const params: ProxyInterface = {
            relativePath: `/repos/${owner}/${repo}/actions/runs`,
            method:       'GET',
            headers:      {
                'Content-Type':  'application/json',
                'authorization': this._token
            },
        };

        let response;


        try {
            response = await this._getProxy(params);
        }
        catch (error) {
            response = error.response;
        }

        return this._handleResponse(response);
    }

    async rerunRun (owner: string, repo: string, id: string): Promise<HandleResponseInterface> {

        //NOTE: You need to tap $env:DEBUG="github api" in terminal to turn on debug
        debugApiGithub(`Id: ${id}`);

        const params: ProxyInterface = {
            relativePath: `/repos/${owner}/${repo}/actions/runs/${id}/rerun`,
            method:       'POST',
            headers:      {
                'Content-Type':  'application/json',
                'authorization': this._token
            },
        };

        let response;

        try {
            response = await this._getProxy(params);
        }
        catch (error) {
            response = error.response;
        }

        return this._handleResponse(response);
    }
}

