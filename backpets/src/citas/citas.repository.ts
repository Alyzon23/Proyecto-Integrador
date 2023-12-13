import { EntityRepository, Repository } from 'typeorm';
import { CitasEntity } from './entities/cita.entity';


@EntityRepository(CitasEntity)
export class CitasRepository extends Repository<CitasEntity> {}