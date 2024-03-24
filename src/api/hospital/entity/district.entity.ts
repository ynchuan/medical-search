import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  code: string

  @Column()
  name: string

  @Column()
  parent: string

  @Column()
  level: string
}