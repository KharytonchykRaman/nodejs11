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
  "fullName",
  "email",
  "speciality",
  "group",
  "isKicked",
  "isVacation",
  "avatar",
  "info",
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

const filter = (fullName, email, speciality) => {
  return list.filter((st) => {
    const matchesFullName =
      !fullName || st.fullName?.toLowerCase().includes(fullName.toLowerCase());

    const matchesEmail = !email || st.email?.includes(email);

    const matchesSpeciality =
      !speciality || st.speciality?.includes(speciality);

    return matchesFullName && matchesEmail && matchesSpeciality;
  });
};

const getGroup = (speciality) => {
  const result = {};
  const chosenGroups = groups[speciality];

  for (const gr of chosenGroups) {
    result[gr] = list.filter((st) => gr === st.group);
  }

  return result;
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
