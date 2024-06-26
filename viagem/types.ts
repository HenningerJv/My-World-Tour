export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    HallMoedas: undefined;
    Configuracoes: undefined;
    Cadastro: undefined;
    AlterarInformacao: undefined;
    ConfirmeCompra: undefined;
    Reservas: undefined;
    Passagens: undefined;
    ReservaVoo: undefined;
    ReservaTurismo: undefined;
    ReservaHotel: undefined;
    ReservaPasseio: undefined;
    ConfirmarReserva: undefined;
    TicketDetail: { ticket: Ticket };
  };

  export interface Ticket {
    id: string;
    destino: string;
    data: string;
    assento: string;
    userId: string;
  }