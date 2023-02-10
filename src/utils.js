
/*
createArrayWithUniqueValues // createArrayWithUniqueStudentNames
generateRandomPersonId
log

*/

export const createArrayWithUniqueValues = (arrayWithObjects, arrayObjectKey) => {
    const arrayWithObjectKeysNotCheckedForRedundancy = arrayWithObjects.map(arrayElement => arrayElement[arrayObjectKey]);
    
    const removeDuplicates = arr => [...new Set(arr)];
    let listOfUniqueArrayElements = removeDuplicates(arrayWithObjectKeysNotCheckedForRedundancy);
    return listOfUniqueArrayElements;
}

export const generateRandomPersonId = () => Math.floor(10000000 + Math.random() * 9000000); // 7 digits

export const log = console.log;