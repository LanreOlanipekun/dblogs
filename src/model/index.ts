import { Dialect, ModelCtor, Sequelize } from 'sequelize';
import Logs, { ILogsInstance } from './logs';

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

export default class Models {
  private dbConnectionData: IDbData;
  readonly sequelize: Sequelize;
  logs: ModelCtor<ILogsInstance>;

  constructor(dbData: IDbConnection) {
    this.dbConnectionData = { ...dbData, logging: false };
    const sequelize = new Sequelize({ ...this.dbConnectionData });
    this.sequelize = sequelize;

    this.logs = Logs(sequelize);
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      return 'Connection to sql has been established successfully.';
    } catch (error) {
      return 'Connection to SQl could not be establised';
    }
  }
}
