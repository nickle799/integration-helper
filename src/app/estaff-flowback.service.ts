import {Injectable} from "@angular/core";
import {ConsoleService} from "./console.service";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";

export interface FlowbackConversion {source: string, destination: string}

export interface FlowbackData {
  estaffFieldType?: string;
}

@Injectable()
export class EstaffFlowbackService {

  constructor(
    private consoleService: ConsoleService,
    private loginService: LoginService,
    private http: HttpClient,
  ) {
  }

  public async updateFlowback(atsField: string, flowbackConversion: Array<FlowbackConversion>, flowbackData: FlowbackData = {}): Promise<void> {
    this.consoleService.append(`Looking up current flowbacks for: ${atsField}`);
    const lookupResponse: { data: Array<{id: number}> } = <any>(await this.http.get(`${this.loginService.userInfo.restUrl}query/EstaffMappableFlowback?fields=id&where=id>0 AND atsField='${atsField}'&BhRestToken=${this.loginService.userInfo.BhRestToken}`).toPromise());
    this.consoleService.append(`Found ${lookupResponse.data.length} flowbacks to update`);
    for(const entity of lookupResponse.data) {
      await this.http.post(`${this.loginService.userInfo.restUrl}entity/EstaffMappableFlowback/${entity.id}?BhRestToken=${this.loginService.userInfo.BhRestToken}`, {
        ...flowbackData,
        conversion: JSON.stringify(flowbackConversion),
      }).toPromise();
      this.consoleService.append(`Flowback Updated for: ${entity.id}`);
    }
  }
}
