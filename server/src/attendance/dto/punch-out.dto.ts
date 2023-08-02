import { PartialType } from '@nestjs/mapped-types';
import { PunchInDto } from './punch-in.dto';

export class PunchOutDto extends PartialType(PunchInDto) {}
