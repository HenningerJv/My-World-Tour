import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  TicketDetail: {
    ticket: {
      destino: string;
      data: string;
      assento: string;
    };
  };
};

export type TicketDetailRouteProp = RouteProp<RootStackParamList, 'TicketDetail'>;
