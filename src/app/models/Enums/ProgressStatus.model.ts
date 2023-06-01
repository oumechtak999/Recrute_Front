import {ProgressStatusEnum} from './ProgressStatusEnum.model';

export interface ProgressStatus {
  status: ProgressStatusEnum;
  percentage?: number;
}
