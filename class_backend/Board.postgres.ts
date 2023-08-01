import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  number!: number
  // 중복되지 않는 주요한 Column으로 자동으로 생성된다.
  @Column()
  writer!: string

  @Column()
  title!: string

  @Column()
  contents!: string
}