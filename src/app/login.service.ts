import {Injectable} from "@angular/core";
import {ConsoleService} from "./console.service";
import {HttpClient} from "@angular/common/http";

export interface User {
  username?: string;
  password?: string;
}

interface UserInfo {
  BhRestToken: string;
  restUrl: string;
}

interface LoginInfo {
  ulUrl: string;
  oauthUrl: string;
  restUrl: string;
}

@Injectable()
export class LoginService {
  static USER_LOCAL_STORAGE = "LoginServiceUser";
  private static rest: string = 'https://rest.bullhornstaffing.com/rest-services';
  private static clientId: string = 'ed7f8176-d0ab-4241-8ca9-f817c6acfc40';
  private static clientSecret: string = 'Sw6FgmOC73NlYKQlYIHXafNn';
  private _user: User = null;
  private _userInfo: UserInfo;


  constructor(
    private consoleService: ConsoleService,
    private http: HttpClient,
  ) {
  }


  get userInfo(): UserInfo {
    return this._userInfo;
  }

  public get user(): User {
    if (this._user === null) {
      const localStorageUser: string = localStorage.getItem(LoginService.USER_LOCAL_STORAGE);
      if (localStorageUser != null) {
        this._user = JSON.parse(localStorageUser);
      } else {
        this._user = {};
      }
    }
    return this._user;

  }

  public storeData() {
    localStorage.setItem(LoginService.USER_LOCAL_STORAGE, JSON.stringify(this._user));
  }

  public async login(): Promise<boolean> {
    this.consoleService.append(`Starting Login Process for: ${this._user.username}`);
    const loginInfo: LoginInfo = await this.getLoginInfo();
    this.consoleService.append(`Logging in to: ${loginInfo.ulUrl}`);

    try {
      this._userInfo = await this.oauthLogin(loginInfo);
      this.consoleService.append(`Log In Success`);
    } catch (e) {
      this.consoleService.append(`Log In Failure`);
      return false;
    }

    return true;
  }

  private async oauthLogin(loginInfo: LoginInfo): Promise<UserInfo> {
    const codeResponse: any = await this.http.get(`${loginInfo.oauthUrl}/authorize?client_id=${LoginService.clientId}&response_type=code&action=Login&username=${this._user.username}&password=${this._user.password}`).toPromise();
    const code: string = codeResponse.args.code;
    const accessTokenResponse: any = await this.http.post(`${loginInfo.oauthUrl}/token?grant_type=authorization_code&code=${code}&client_id=${LoginService.clientId}&client_secret=${LoginService.clientSecret}`, '').toPromise();
    const accessToken: string = accessTokenResponse.access_token;
    return <UserInfo>(await this.http.post(`${loginInfo.restUrl}/login?version=*&access_token=${accessToken}`, '').toPromise());
  }

  private async getLoginInfo(): Promise<LoginInfo> {
    return <LoginInfo>(await this.http.get(`${LoginService.rest}/loginInfo?username=${this._user.username}`)
      .toPromise());
  }
}
