import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {ConsoleService} from "./console.service";
import {EstaffFlowbackService} from "./estaff-flowback.service";

export interface User {
  username?: string;
  password?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public loginService: LoginService,
    public consoleService: ConsoleService,
    public estaffFlowbackService: EstaffFlowbackService,
  ) {
  }

  storeData(): void {
    this.loginService.storeData();
  }

  async updateStateFilingStatus(): Promise<void> {
    this.consoleService.clear();
    await this.loginService.login();
    await this.estaffFlowbackService.updateFlowback(
      'stateFilingStatus',
      [{"source":"*Head*","destination":"H"},{"source":"E","destination":"H"},{"source":"[AB]","destination":"S"},{"source":"[DC]","destination":"M"},{"source":"*Single*","destination":"S"},{"source":"*Spouse*","destination":"M"},{"source":"*HH","destination":"H"},{"source":"Choice4","destination":"H"},{"source":"*HigherRate","destination":"S"},{"source":"Choice[23]","destination":"M"},{"source":"Married","destination":"M"},{"source":"CivilUnion","destination":"M"},{"source":"*","destination":"S"}]
    );
  }
}
