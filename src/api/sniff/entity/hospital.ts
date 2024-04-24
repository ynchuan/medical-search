import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ comment: '医院-北京' })
export class HospitalBj {
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



@Entity({ comment: '医院-全国' })
export class HospitalNation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: -1 })
  medinsTypeName: string

  @Column({ default: -1 })
  medinsNatu: string

  @Column({ default: -1 })
  hospLv: string

  @Column({ default: -1 })
  medinsType: string

  @Column({ default: -1 })
  uscc: string

  @Column({ default: -1 })
  openElec: string

  @Column({ default: -1 })
  businessLvEpc: string

  @Column({ default: -1 })
  lnt: string

  @Column({ default: -1 })
  businessLvCfc: string

  @Column({ default: -1 })
  businessLvMpc: string

  @Column({ default: -1 })
  medinsLvName: string

  @Column({ default: -1 })
  medinsLv: string

  @Column({ default: -1 })
  medinsName: string

  @Column({ type: 'text' })
  addr: string

  @Column({ default: -1, unique: true })
  medinsCode: string

  @Column({ default: -1 })
  lat: string

  @Column({ default: -1 })
  businessLvEbc: string

  @Column({ default: -1 })
  regnCode: string

  @Column({ default: -1 })
  index: number
}