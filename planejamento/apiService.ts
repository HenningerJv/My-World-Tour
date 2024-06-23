export const processPayment = async (paymentDetails: any) => {
    try {
      const response = await fetch('https://your-backend-endpoint.com/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw error;
    }
  };
  