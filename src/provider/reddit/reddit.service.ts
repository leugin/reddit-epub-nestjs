import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const querystring = require('node:querystring');
const max = 20;
@Injectable()
export class RedditService {
  private credentials: {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
  };
  private token: string;
  constructor() {
    this.credentials = {
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
    };
  }

  login() {
    const URL = 'https://www.reddit.com/api/v1/access_token';
    const postData = querystring.stringify({
      grant_type: 'password',
      username: this.credentials.username,
      password: this.credentials.password,
    });
    return fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: this.auth(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'MyAPI/0.0.1',
      },
      body: postData,
    });
  }

  async find(subReddit: string, criteria: string, options = {}) {
    const token = await this.checkAndGetToken();
    const BASE_URL = `https://oauth.reddit.com/r/${subReddit}/search?`;
    const URL =
      BASE_URL +
      new URLSearchParams({
        ...options,
        q: criteria,
      });
    return fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async findAll(subReddit, criteria, options = {}) {
    const allResponses = [];

    let response = await this.find(subReddit, criteria, options);
    const text = await response.text();
    let json = text ? JSON.parse(text) : {};
    let i = 0;
    while (
      json &&
      json.data &&
      json.data.children.length > 0 &&
      json.data.after &&
      i < max
    ) {
      allResponses.push(...json.data.children);
      response = await this.find(subReddit, criteria, {
        ...options,
        after: json.data.after,
      });
      const text = await response.text();
      json = text ? JSON.parse(text) : null;
      i++;
    }
    return Promise.resolve(allResponses);
  }
  private async checkAndGetToken() {
    {
      if (this.token) {
        return Promise.resolve(this.token);
      } else {
        const response = await this.login();
        const json = await response.json();
        this.token = json.access_token;
        return Promise.resolve(json.access_token);
      }
    }
  }
  private auth(): string {
    return (
      'Basic ' +
      Buffer.from(
        `${this.credentials.clientId}:${this.credentials.clientSecret}`,
      ).toString('base64')
    );
  }
}
