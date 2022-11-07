
/*
createArrayWithUniqueStudentNames
generateRandomPersonId
log

*/

export const createArrayWithUniqueStudentNames = (arrayWithObjects, arrayObjectKeyWithWhichToSelectUniqueStudentNames) => {
    const listOfStudentNames = arrayWithObjects.map(student => student[arrayObjectKeyWithWhichToSelectUniqueStudentNames]);
    
    const removeDuplicates = arr => [...new Set(arr)];
    let listOfUniqueStudentNames = removeDuplicates(listOfStudentNames);
    return listOfUniqueStudentNames;
}

export const generateRandomPersonId = () => Math.floor(10000000 + Math.random() * 9000000); // 7 digits

export const log = console.log;