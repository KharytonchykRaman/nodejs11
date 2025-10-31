const FileManager = require("./FileManager");

const groups = {
  design: ["P1111", "K1313", "L1234"],
  programming: ["J1313", "P13023", "G3838"],
  robotech: ["R1310", "R9090", "V2323"],
};
const list = FileManager.getStudents();
const lastId = list.at(-1)?.id || -1;

const studentKeys = [
  "id",
  "firstName",
  "secondName",
  "thirdName",
  "email",
  "speciality",
  "group",
  "isKicked",
  "isVacation",
];

const add = (studentObj) => {
  list.push({
    id: lastId + 1,
    ...studentObj,
    isKicked: false,
    isVacation: false,
  });

  FileManager.updateStorage(list);
};

const filter = (firstName, secondName, thirdName, email, speciality) => {
  return list.filter((st) => {
    const matchesFirstName =
      !firstName ||
      st.firstName?.toLowerCase().includes(firstName.toLowerCase());

    const matchesSecondName =
      !secondName ||
      st.secondName?.toLowerCase().includes(secondName.toLowerCase());

    const matchesThirdName =
      !thirdName ||
      st.thirdName?.toLowerCase().includes(thirdName.toLowerCase());

    const matchesEmail = !email || st.email?.includes(email);

    const matchesSpeciality =
      !speciality || st.speciality?.includes(speciality);

    return (
      matchesFirstName &&
      matchesSecondName &&
      matchesThirdName &&
      matchesEmail &&
      matchesSpeciality
    );
  });
};

const getGroup = (speciality) => {
  const chosenGroups = groups[speciality]; // redo

  return list.filter((st) => chosenGroups.includes(st.group));
};

const kickStudent = (id) => {
  id = Number(id);
  const student = list.some((st) => st.id === id);
  if (student) {
    student.isKicked = true;
    FileManager.updateStorage(list);
  } else throw new Error(`No student with id ${id}`);
};

const setVacation = (id) => {
  id = Number(id);
  const student = list.some((st) => st.id === id);
  if (student) {
    student.isVacation = true;
    FileManager.updateStorage(list);
  } else throw new Error(`No student with id ${id}`);
};

module.exports = {
  groups,
  list,
  add,
  filter,
  getGroup,
  studentKeys,
  setVacation,
  kickStudent,
};
