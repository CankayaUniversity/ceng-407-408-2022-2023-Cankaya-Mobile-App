import {collection, doc, addDoc, setDoc, getDoc, updateDoc, getDocs, query, where} from "firebase/firestore";

import {firestore} from "../utils/firebaseHelper";

const usersRef = collection(firestore, "users");
const studentsRef = collection(firestore, "student");
const lecturersRef = collection(firestore, "lecturer");
const buscheckRef = collection(firestore, "buscheck")

export const saveQRCodeToFirestore = async (qrCodeData, courseId) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        const student_id = user ? user.uid : null;

        const attendanceRef = collection(firestore, "attendance");
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const newDocRef = await addDoc(attendanceRef, {
            QRData: qrCodeData,
            course_id: courseId,
            date: formattedDate,
            student_id: null,
        });

        // Get the course name based on the courseId
        const courseRef = doc(firestore, "courses", courseId);
        const courseSnapshot = await getDoc(courseRef);
        const courseName = courseSnapshot.data().name;

        // Update the course_id and date fields in the attendance document
        await setDoc(newDocRef, { course_name: courseName }, { merge: true });

        console.log("QR code successfully saved to Firestore with ID:", newDocRef.id);
    } catch (error) {
        console.error("Error saving QR code to Firestore:", error);
    }
};

export const getCourses = async () => {
    const coursesRef = collection(firestore, 'courses',);
    const querySnapshot = await getDocs(coursesRef);

    const courses = [];
    querySnapshot.forEach((doc) => {
        const courseData = doc.data();
        const courseId = doc.id;
        const courseName = courseData.name;
        courses.push({ label: courseName, value: courseId });
    });

    return courses;
};

export const saveQRScanDataToFirestore = async (courseId, qrCodeId) => {
    try {
        const courseRef = doc(firestore, "courses", courseId);
        await setDoc(courseRef, { qrScanData: qrCodeId }, { merge: true });
        console.log("QR scan data successfully saved to Firestore");
    } catch (error) {
        console.error("Error saving QR scan data to Firestore:", error);
    }
};
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

export const getAllSurveyDataFromFirestore = async () => {
  try {
    const userRef = collection(firestore, 'users');
    const querySnapshot = await getDocs(userRef);
    const randomUserDoc = querySnapshot.docs[Math.floor(Math.random() * querySnapshot.size)];
    const studentId = randomUserDoc.data().studentID;

    const surveyRef = collection(firestore, 'survey');
    const querySnapshotSurvey = await getDocs(surveyRef);

    const allSurveyData = [];
    querySnapshotSurvey.forEach((doc) => {
      const surveyData = doc.data();
      const documentId = `${studentId}_${surveyData.type}`;
      allSurveyData.push({ documentId, data: surveyData });
    });

    return allSurveyData;
  } catch (error) {
    console.error('Error retrieving survey data:', error);
    return [];
  }
};

// Button Press Part
  export const saveButtonPressDate = async (isButtonPressed) => {
  try {
    const collectionName = 'lecturer_survey'; // Collection name
    const documentName = 'createSurvey'; // Document name

    const lecturer_surveyRef = doc(firestore, collectionName, documentName);
    const snapshot = await getDoc(lecturer_surveyRef);

    if (snapshot.exists()) {
      // Document already exists, update the isPressed field
      await updateDoc(lecturer_surveyRef, {
        isPressed: isButtonPressed,
      });
      console.log('Button press status updated successfully!');
    } else {
      // Document doesn't exist yet, create a new document
      await setDoc(lecturer_surveyRef, {
        isPressed: isButtonPressed,
      });
      console.log('Button press status stored successfully!');
    }
  } catch (error) {
    console.error('Error storing button press status:', error);
  }
};

export const fetchButtonPressStatus = async () => {
  try {
    const collectionName = 'lecturer_survey'; // Collection name
    const documentName = 'createSurvey'; // Document name

    const lecturer_surveyRef = doc(firestore, collectionName, documentName);
    const snapshot = await getDoc(lecturer_surveyRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const isPressed = data.isPressed;
      console.log('Button press status:', isPressed);
      return isPressed;
    } else {
      console.log('Document does not exist.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching button press status:', error);
    return null;
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
    const q = query(        //bu satır alt iki satırdakilere ait bir sorgu oluşturuyor
        collection(firestore, "bus"),
        where("plate_number", "==", plateNumber)
    );

    //oluşturulan sorguyu çalıştırarak anlık sorgu görüntüsünü alır
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) { //boş mu değil mi kontrol ettik
        return undefined;
    }

    // sorgu anlık görüntüsünden ilk belgeyi yani docs[0]'ı alır ve bus değişkenine atar.
    const bus = querySnapshot.docs[0];
    // 'bus' belgesinin veri alanını (data()) alır ve busData değişkenine atar.
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
