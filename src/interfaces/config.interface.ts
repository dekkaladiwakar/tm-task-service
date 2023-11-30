interface IPostgresqlConfigProps {
  port: number;
  host: string;
  dbName: string;
  username: string;
  password: string;
}

export interface IConfigProps {
  jwtSecret: string,
  port: number;
  database: IPostgresqlConfigProps,
}
