import { Dialect, ModelCtor, Sequelize } from 'sequelize';
import Logs, { ILogsAttributes, ILogsInstance } from './model/logs';
import Models from './model';

interface IDbConnection {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

interface IDbData extends IDbConnection {
  logging: boolean;
}

interface IUpdateLogs {
  id?: string;
  tags?: string;
  requestId?: string;
  createdBy?: string;
  method?: string;
  body?: string;
  response?: string;
  device?: string;
  ipAddress?: string;
  url?: string;
  headers?: string;
  service?: string;
}

export default class Log extends Models {
  //   private logModel: ModelCtor<ILogsInstance>;

  constructor(dbData: IDbConnection) {
    super(dbData);
    // this.logModel = this.logs(this.sequelize);
    this.testConnection();
  }

  async saveLog(data: ILogsAttributes) {
    return this.logs.create(data);
  }

  async updateLog(requestId: string, data: IUpdateLogs) {
    return this.logs.update(data, { where: { requestId } });
  }

  async search(text: string) {
    //@ts-ignore
    return this.logs.search(text);
  }
}
