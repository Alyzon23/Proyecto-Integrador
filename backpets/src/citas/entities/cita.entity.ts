import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'citas' })
export class CitasEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre_paciente: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre_mascota: string;

  @Column({ type: 'date', nullable: false })
  fecha_nacimiento: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  especie: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  raza: string;

  @Column({ type: 'date', nullable: false })
  fecha: Date;

  @Column({ type: 'time', nullable: false })
  hora: string; 

  @Column({ type: 'varchar', length: 100, nullable: false })
  motivo: string;    
}
