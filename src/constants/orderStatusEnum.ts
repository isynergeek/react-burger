import { Colors } from './colors';

export enum OrderStatusEnum {
  CREATED = 'created',
  PENDING = 'pending',
  CANCELED = 'canceled',
  DONE = 'done'
}

export const orderStatusPayload = {
  [OrderStatusEnum.CREATED]: {
    text: 'Создан',
    color: Colors.PrimaryLight,
  },
  [OrderStatusEnum.PENDING]: {
    text: 'Готовится',
    color: Colors.PrimaryLight,
  },
  [OrderStatusEnum.CANCELED]: {
    text: 'Отменен',
    color: Colors.Error,
  },
  [OrderStatusEnum.DONE]: {
    text: 'Выполнен',
    color: Colors.Success,
  }
};
