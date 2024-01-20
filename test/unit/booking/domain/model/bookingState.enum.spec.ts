import { BookingState } from '../../../../../src/property/domain/model/bookingState.enum';

describe('BookingState enum', () => {
  test('Verificar los valores del enum', () => {
    expect(BookingState.PENDING).toBe('Pendiente');
    expect(BookingState.CONFIRMED).toBe('Confirmado');
    expect(BookingState.CANCELLED).toBe('Cancelado');
  });
});
