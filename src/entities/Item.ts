import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  nombre: string

  @Column()
  descripcion: string

  @Column()
  active: boolean
}
