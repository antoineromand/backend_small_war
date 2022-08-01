export class InfoServer {
  private _success: boolean;
  private _msg: string;
  constructor(success: boolean, msg: string) {
    this._success = success;
    this._msg = msg;
  }

  public get success(): boolean {
    return this._success;
  }

  public get message(): string {
    return this._msg;
  }

  public set success(success: boolean) {
    this._success = success;
  }
  public set message(message: string) {
    this._msg = message;
  }

  public getInfoServer() {
    return { success: this.success, message: this.message };
  }
}
