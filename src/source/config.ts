import { DataSourceOptions } from "typeorm"
import { resolve } from "path"

const entitiy1 = resolve(__dirname, '../api/**/*.entity{.js,.ts}')
const entitiy2 = resolve(__dirname, '../api/**/entity/*{.js,.ts}')

export const config: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "medical_search",
  synchronize: true,
  logging: true,
  entities: [entitiy1, entitiy2],
  subscribers: [],
  migrations: [__dirname + "/migration/*{.js,.ts}"], // 字段标记加载的迁移文件有哪些
  migrationsTableName: 'migrations' // migrationsTableName默认标记的migrations记录是否执行过
}