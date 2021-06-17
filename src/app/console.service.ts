import {Injectable} from "@angular/core";

@Injectable()
export class ConsoleService {
  private _value: string = '';

  get value(): string {
    return this._value;
  }

  public clear(): void {
    this._value = '';
  }

  append(value: string): void {
    this._value += `\n${value}`;
  }
}
