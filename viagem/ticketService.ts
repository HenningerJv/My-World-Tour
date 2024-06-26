import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Defina a interface para os tickets
interface Ticket {
  id: string;
  destino: string;
  data: string;
  assento: string;
  userId: string;
  // Adicione outros campos necessários aqui
}

// Função para buscar tickets
const fetchTickets = async (userId: string): Promise<Ticket[]> => {
  try {
    const tickets: Ticket[] = [];
    const querySnapshot = await getDocs(collection(db, "tickets"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId === userId) {
        tickets.push({
            id: doc.id, ...data,
            destino: '',
            data: '',
            assento: '',
            userId: ''
        });
      }
    });
    return tickets;
  } catch (error) {
    console.error("Erro ao buscar passagens: ", error);
    return [];
  }
};

export { fetchTickets, Ticket };
