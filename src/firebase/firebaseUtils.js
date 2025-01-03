import { db, doc, getDoc } from './firebase';

// Firestore에서 id와 password 확인하는 함수
export const checkUserCredentials = async (id, password) => {
  try {
    const userDocRef = doc(db, 'users', id);
    const docSnap = await getDoc(userDocRef); // 문서 가져오기

    if (docSnap.exists()) {
      const userData = docSnap.data(); // 문서 데이터
      if (userData.password === password) {
        return { isValid: true, userData };
      } else {
        return { isValid: false, error: 'Password is incorrect.' };
      }
    } else {
      return { isValid: false, error: 'User not found.' };
    }
  } catch (error) {
    console.error('Error fetching user: ', error);
    return { isValid: false, error: 'Error checking credentials.' };
  }
};
