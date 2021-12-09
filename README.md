# dblogs

Send app logs to the database

## How to use

This package support mySql db at the moment
import the package

```sh
import log from 'dblogs'
const Log = new log({
    username: 'root';
    password: 'root';
    database: 'logs';
    host: '127.0.0.1';
    port: 3306;
    dialect: 'mysql'
})
```

You can check if the connection to the db is successful
this will return a string

```sh
log.testConnection()
```

| Methods     | Description                                      | parameters                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| saveLog()   | This saves log to the db you specify             | {requestId: string, createdBy:string(optional), method: string, body: string(optional), response: string(optional), device: string(optional), ipAddress: string(optional), url: string, headers: string(optional), service: string;} |
| updateLog() | This updates log by the requestId you specified  |
| search()    | Search logs with createdBy, method, url, service |
