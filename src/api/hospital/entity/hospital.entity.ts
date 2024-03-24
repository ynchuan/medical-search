import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  code: string

  @Column()
  name: string

  @Column()
  area: string

  @Column()
  clazz: string

  @Column()
  level: string

  @Column({ default: false })
  isAclazz: boolean

  @Column({ default: false })
  isInternet: boolean

  @Column({ default: false })
  isFirstVisit: boolean
}