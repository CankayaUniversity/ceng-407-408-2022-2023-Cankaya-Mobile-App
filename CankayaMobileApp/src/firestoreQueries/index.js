import {collection, doc, addDoc, setDoc, getDoc, getDocs, query, where} from "firebase/firestore";

import {firestore} from "../utils/firebaseHelper";

const usersRef = collection(firestore, "users");
const studentsRef = collection(firestore, "student");
const lecturersRef = collection(firestore, "lecturer");

export const submitSurveyToFirestore = async (surveyId, surveyType, surveyData) => {
    try {
      const surveyRef = collection(firestore, 'survey');
      const docRef = await addDoc(surveyRef, {
        survey_id: surveyId,
        type: surveyType,
        ...surveyData,
      });
      console.log('Survey data stored successfully! Document ID:', docRef.id);
    } catch (error) {
      console.error('Error storing survey data:', error);
    }
  };

export const findUserByEmailAndPassword = async ({email, password}) => {
    const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", email))
    );

    if (querySnapshot.empty) {
        throw "User not found!";
    }

    const user_ = querySnapshot.docs[0];
    const user = {
        ...user_.data(),
        id: user_.id
    };

    if (user.password === password) {
        const filledUser = await fillUser({ user });
        return filledUser;
    }

    throw "Password is incorrect!";
};

export const checkStudent = async ({userID}) => {
    const userRef = doc(firestore, "users", userID);

    const querySnapshot = await getDocs(
        query(studentsRef, where("userRef", "==", userRef))
    );

    if (querySnapshot.empty) {
        return undefined;
    }

    const student = querySnapshot.docs[0];
    return {
        ...student.data(),
        sid: student.id
    };
}

export const checkLecturer = async ({userID}) => {
    const userRef = doc(firestore, "users", userID);

    const querySnapshot = await getDocs(
        query(lecturersRef, where("userRef", "==", userRef))
    );

    if (querySnapshot.empty) {
        return undefined;
    }

    const lecturer = querySnapshot.docs[0];
    return {
        ...lecturer.data(),
        lid: lecturer.id
    };
}

export const fillUser = async ({user}) => {
    const student = await checkStudent({userID: user.id});
    const lecturer = await checkLecturer({userID: user.id});
    const additionalInfos = student || lecturer;

    return {
        ...user,
        ...additionalInfos,
        isStudent: !!student,
        isLecturer: !!lecturer
    };
};

export const findUserByEmail = async ({email}) => {
    const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", email))
    );

    if (querySnapshot.empty) {
        throw "User not found!";
    }

    const user_ = querySnapshot.docs[0];
    const user = {
        ...user_.data(),
        id: user_.id
    };

    const filledUser = await fillUser({ user });
    return filledUser;
};
