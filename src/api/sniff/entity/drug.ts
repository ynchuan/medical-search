import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ comment: '西药/中成药-常规药' })
export class DrugCg {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '-1' })
  drugstdcode: string

  @Column({ default: '-1' })
  updtTime: string

  @Column({ default: '-1' })
  drugType: string

  @Column({ unique: true })
  rid: string

  @Column({ default: '-1' })
  opterName: string

  @Column({ default: '-1' })
  minPacCnt: string

  @Column({ default: '-1' })
  lstdLicHolder: string

  @Column({ default: '-1' })
  natHiDruglistDosform: string

  @Column({ default: '-1' })
  smlVerName: string

  @Column({ default: '-1' })
  crterName: string

  @Column({ default: '-1' })
  verName: string

  @Column({ default: '-1' })
  mktStas: string

  @Column({ default: '-1' })
  crterId: string

  @Column({ default: '-1' })
  optinsNo: string

  @Column({ default: '-1' })
  aprvnoEnddate: string

  @Column({ default: '-1' })
  drugRegAppvletrElecacs: string

  @Column({ default: '-1' })
  consevalDrug: string

  @Column({ default: '-1' })
  drugGenname: string

  @Column({ default: '-1' })
  crteOptinsNo: string

  @Column({ default: '-1' })
  drugDosform: string

  @Column({ default: '-1' })
  crteTime: string

  @Column({ default: '-1' })
  prodentpName: string

  @Column({ default: '-1' })
  aprvno: string

  @Column({ default: '-1' })
  drugExpy: string

  @Column({ default: '-1' })
  optTime: string

  @Column({ default: '-1' })
  opterId: string

  @Column({ type: 'text' })
  manl: string

  @Column({ default: '-1' })
  minPacunt: string

  @Column({ default: '-1' })
  pacmatl: string

  @Column({ type: 'text' })
  eachDos: string

  @Column({ default: '-1' })
  drugProdname: string

  @Column({ default: '-1' })
  splmAppyAppvletrFile: string

  @Column({ default: '-1' })
  medListCodg: string

  @Column({ default: '-1' })
  drugSpec: string

  @Column({ default: '-1' })
  regName: string

  @Column({ default: '-1' })
  natDrugNo: string

  @Column({ type: 'text' })
  efccAtd: string

  @Column({ default: '-1' })
  subpckFcty: string

  @Column({ default: '-1' })
  tramDataId: string

  @Column({ default: '-1' })
  ver: string

  @Column({ type: 'text' })
  natHiDruglistMemo: string

  @Column({ default: '-1' })
  minPrepunt: string

  @Column({ default: '-1' })
  isuFlag: string

  @Column({ default: '-1' })
  efftTime: string

  @Column({ default: '-1' })
  regDosform: string

  @Column({ default: '-1' })
  lstdDruglistDrug: string

  @Column({ default: '-1' })
  convrat: string

  @Column({ default: '-1' })
  minPrcunt: string

  @Column({ default: '-1' })
  valiFlag: string

  @Column({ default: '-1' })
  engName: string

  @Column({ default: '-1' })
  natHiDruglistChrgitmLv: string

  @Column({ default: '-1' })
  chldMedc: string

  @Column({ default: '-1' })
  regSpec: string

  @Column({ default: '-1' })
  prodentpCode: string

  @Column({ default: '-1' })
  otcFlag: string

  @Column({ default: 'X' })
  drugCategory: string
}


@Entity({ comment: '中草药' })
export class DrugZcy {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '-1' })
  medListCodg: string

  @Column({ type: 'text' })
  stdElecacs: string

  @Column({ default: '-1' })
  cnvlUsed: string

  @Column({ default: '-1' })
  crteOptinsNo: string

  @Column({ default: '-1' })
  updtTime: string

  @Column({ default: '-1' })
  mlmsName: string

  @Column({ default: '-1' })
  stdName: string

  @Column({ unique: true })
  rid: string

  @Column({ default: '-1' })
  opterName: string

  @Column({ default: '-1' })
  admdvs: string

  @Column({ default: '-1' })
  crteTime: string

  @Column({ default: '-1' })
  valiFlag: string

  @Column({ type: 'text' })
  efccAtd: string

  @Column({ default: '-1' })
  cat: string

  @Column({ default: '-1' })
  natHiPayPol: string

  @Column({ default: '-1' })
  medPart: string

  @Column({ default: '-1' })
  natfla: string

  @Column({ default: '-1' })
  optTime: string

  @Column({ default: '-1' })
  opterId: string

  @Column({ type: 'text' })
  psdgMtd: string

  @Column({ default: '-1' })
  tramDataId: string

  @Column({ default: '-1' })
  ver: string

  @Column({ default: '-1' })
  ecyType: string

  @Column({ default: '-1' })
  provHiPayPol: string

  @Column({ default: '-1' })
  crterName: string

  @Column({ default: '-1' })
  verName: string

  @Column({ default: '-1' })
  isuFlag: string

  @Column({ default: '-1' })
  mlmsCatSouc: string

  @Column({ default: '-1' })
  crterId: string

  @Column({ default: '-1' })
  stdPagen: string

  @Column({ default: '-1' })
  optinsNo: string

  @Column({ default: '-1' })
  tcmherbName: string
}


@Entity({ comment: '自制药' })
export class DrugZzy {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '-1' })
  selfprepPmtnoElecacs: string

  @Column({ default: '-1' })
  updtTime: string

  @Column({ default: '-1' })
  drugType: string

  @Column({ unique: true })
  rid: string

  @Column({ default: '-1' })
  opterName: string

  @Column({ default: '-1' })
  minPacCnt: string

  @Column({ default: '-1' })
  medinsConerName: string

  @Column({ default: '-1' })
  crterName: string

  @Column({ default: '-1' })
  verName: string

  @Column({ default: '-1' })
  hospPrepAppyerEmpAddr: string

  @Column({ default: '-1' })
  crterId: string

  @Column({ default: '-1' })
  eldPatnMedc: string

  @Column({ default: '-1' })
  optinsNo: string

  @Column({ default: '-1' })
  drugRegAppvletrElecacs: string

  @Column({ default: '-1' })
  crteOptinsNo: string

  @Column({ default: '-1' })
  crteTime: string

  @Column({ default: '-1' })
  prodentpName: string

  @Column({ default: '-1' })
  aprvno: string

  @Column({ default: '-1' })
  optTime: string

  @Column({ default: '-1' })
  opterId: string

  @Column({ type: 'text' })
  manl: string

  @Column({ default: '-1' })
  selfprepPmtno: string

  @Column({ default: '-1' })
  minPacunt: string

  @Column({ default: '-1' })
  regn: string

  @Column({ default: '-1' })
  medinsConerTel: string

  @Column({ default: '-1' })
  pacmatl: string

  @Column({ type: 'text' })
  eachDos: string

  @Column({ default: '-1' })
  drugProdname: string

  @Column({ default: '-1' })
  medListCodg: string

  @Column({ type: 'text' })
  drugSpec: string

  @Column({ type: 'text' })
  efccAtd: string

  @Column({ default: '-1' })
  tramDataId: string

  @Column({ default: '-1' })
  ver: string

  @Column({ default: '-1' })
  hospPrepAppyerEmpName: string

  @Column({ default: '-1' })
  minPrepunt: string

  @Column({ default: '-1' })
  isuFlag: string

  @Column({ default: '-1' })
  convrat: string

  @Column({ default: '-1' })
  valiFlag: string

  @Column({ default: '-1' })
  dosform: string

  @Column({ default: '-1' })
  chldMedc: string

  @Column({ default: '-1' })
  aprvnoBegndate: string

  @Column({ default: '-1' })
  prodentpAddr: string
}