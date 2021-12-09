'use strict';

import { Sequelize, Model, DataTypes, Optional, Op } from 'sequelize';

const table = 'logs';

export interface ILogsAttributes {
  id?: string;
  tags?: string;
  requestId: string;
  createdBy?: string;
  method: string;
  body?: string;
  response?: string;
  device?: string;
  ipAddress?: string;
  url: string;
  headers?: string;
  service: string;
}

export interface ILogsCreationAttributes extends Optional<ILogsAttributes, 'id'> {}

export interface ILogsInstance extends Model<ILogsAttributes, ILogsCreationAttributes>, ILogsAttributes {}
// Define schema
const schemaObject: any = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING(255),
  },
  requestId: {
    type: DataTypes.STRING,
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  method: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT('long'),
  },
  response: {
    type: DataTypes.TEXT('long'),
  },
  device: {
    type: DataTypes.STRING,
  },
  ipAddress: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  service: {
    type: DataTypes.STRING,
  },
};

const LogsModel = (sequelize: Sequelize) => {
  const Logs = sequelize.define<ILogsInstance>(table, schemaObject, {
    tableName: 'logs',
    indexes: [
      {
        fields: ['tags'],
      },
      {
        unique: true,
        fields: ['id'],
      },
    ],
  });

  // @ts-ignore
  Logs.search = (text: string) => {
    return Logs.findAll({
      where: {
        tags: {
          [Op.like]: '%' + text + '%',
        },
      },
    });
  };

  Logs.afterCreate(async (data, options) => {
    const searchTags = [data.createdBy, data.method, data.url, data.service];
    const tags = searchTags.filter((tag) => tag).join(', ');
    data.tags = tags;
    await data.save();
  });

  Logs.sync();

  // @ts-ignore
  Logs.transaction = sequelize.transaction;

  return Logs;
};

export default LogsModel;
