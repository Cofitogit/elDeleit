export class Pago {
  constructor(sucursal, fecha, hora, producto, importe) {
    this.sucursal = sucursal;
    this.fecha = fecha;
    this.hora = hora;
    this.producto = producto;
    this.importe = importe;
  }
}

export const sucursal = ['Pueblo mio', 'Prado', 'Pulperia'];

export const producto = ['pan', 'rallado', 'criollo', 'factura'];

export function identificarHorarioPago(horaPago) {
    const hora = horaPago;
    if (hora >= 6 && hora <= 14) {
      return "Mañana";
    } else if (hora >= 16 && hora <= 22) {
      return "Tarde";
    } else {
      return "No se identificó el horario del pago";
    }
  }
