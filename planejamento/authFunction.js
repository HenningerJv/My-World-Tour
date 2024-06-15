import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './fireBaseConfig';

// Função para registrar usuário
export const registerUser = async (email, senha) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Função para logar usuário
export const loginUser = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
