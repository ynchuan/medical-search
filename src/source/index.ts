import "reflect-metadata"
import { DataSource } from "typeorm"
import { config } from "./config"

export const dataSource = new DataSource(config)
