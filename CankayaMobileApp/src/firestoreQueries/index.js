import {collection, doc, addDoc, setDoc, getDoc, updateDoc, getDocs, query, where} from "firebase/firestore";

import {firestore} from "../utils/firebaseHelper";

const usersRef = collection(firestore, "users");
const studentsRef = collection(firestore, "student");
const lecturersRef = collection(firestore, "lecturer");
const buscheckRef = collection(firestore, "buscheck")

export const submitSurveyToFirestore = async (surveyId, surveyType, surveyData) => {
  try {
    const userRef = collection(firestore, 'users');
    const querySnapshot = await getDocs(userRef);
    const randomUserDoc = querySnapshot.docs[Math.floor(Math.random() * querySnapshot.size)];
    const studentId = randomUserDoc.data().studentID;
    const documentId = `${studentId}_${surveyType}`;

    const surveyRef = collection(firestore, 'survey');
    const docRef = doc(surveyRef, documentId);

    await setDoc(docRef, {
      survey_id: surveyId,
      type: surveyType,
      ...surveyData,
    });

    console.log('Survey data stored successfully! Document ID:', documentId);
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
        const filledUser = await fillUser({user});
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
    const {userRef: userRef_, ...studentData} = student.data();

    return {
        ...studentData,
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
    const {lecturerRef: lecturerRef_, ...lecturerData} = lecturer.data();
    return {
        ...lecturerData,
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

    const filledUser = await fillUser({user});
    return filledUser;
};

export const saveDeviceIDToStudent = async (studentID, {deviceID, newDeviceAllowed = false}) => {
    const studentRef = doc(firestore, "student", studentID);

    await updateDoc(studentRef, {
        deviceID: deviceID,
        newDeviceAllowed: newDeviceAllowed
    });
}

export const getBusByPlateNumber = async ({plateNumber}) => {
    const q = query(
        collection(firestore, "bus"),
        where("plate_number", "==", plateNumber)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return undefined;
    }

    const bus = querySnapshot.docs[0];
    const busData = bus.data();

    return {
        ...busData,
        bid: bus.id
    };
}

export const saveBusCheck = async ({user, plateNumber, busID}) => {
    const busCheckData = {
        plate_number: plateNumber,
        date: new Date(),
        bus_id: busID
    };

    if (user.isStudent) {
        busCheckData.student_id = user.sid
    } else if (user.isLecturer) {
        busCheckData.lecturer_id = user.lid
    }

    await addDoc(buscheckRef, busCheckData);
}
