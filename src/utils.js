
/*
    calculateAverageForDifficultyForOneAssignmentOfAllStudents
    calculateAverageForFunForOneAssignmentOfAllStudents
    createArrayWithUniqueValues // createArrayWithUniqueStudentNames
    createAssignmentObjectForEachAssignmentId
    generateRandomPersonId
    log

*/

// calculateAverageForDifficultyForOneAssignmentOfAllStudents


export const calculateAverageForDifficultyForOneAssignmentOfAllStudents = (array, assignmentId) => {
    
    const createArrayWithStudentsForAssignmentId = (array, assignmentId) => {

        let filterStudentObjectWithAssignmentId = student => student.assignmentId === assignmentId;

        const filterStudents = (array, filterFunction) => {
            let filteredArr = array.filter(filterFunction)
            return filteredArr;
        }
    
        let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = filterStudents(array, filterStudentObjectWithAssignmentId )
        return arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId;
    }

    let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = createArrayWithStudentsForAssignmentId(array, assignmentId);
    // log(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId);


    const calculateAverageForArrayObjectKey = (array, objKey) => array
        .reduce((accumulator, variableDoingNothing, index, array) => accumulator + parseInt(array[index][objKey]), 0) / array.length;

    let averageDifficulty = calculateAverageForArrayObjectKey(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId, "difficulty");
    let averageDifficultyRoundedToOneDecimal = parseFloat(averageDifficulty.toFixed(1));
    return averageDifficultyRoundedToOneDecimal;
}



export const calculateAverageForFunForOneAssignmentOfAllStudents = (array, assignmentId) => {

    const createArrayWithStudentsForAssignmentId = (array, assignmentId) => {

        let filterStudentObjectWithAssignmentId = student => student.assignmentId === assignmentId;

        const filterStudents = (array, filterFunction) => {
            let filteredArr = array.filter(filterFunction)
            return filteredArr;
        }
    
        let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = filterStudents(array, filterStudentObjectWithAssignmentId )
        return arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId;
    }

    let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = createArrayWithStudentsForAssignmentId(array, assignmentId);
    // log(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId);


    const calculateAverageForArrayObjectKey = (array, objKey) => array
        .reduce((accumulator, variableDoingNothing, index, array) => accumulator + parseInt(array[index][objKey]), 0) / array.length;

    let averageFun = calculateAverageForArrayObjectKey(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId, "fun");
    let averageFunRoundedToOneDecimal = parseFloat(averageFun.toFixed(1));
    return averageFunRoundedToOneDecimal;
}

export const createArrayWithUniqueValues = (arrayWithObjects, arrayObjectKey) => {
    const arrayWithObjectKeysNotCheckedForRedundancy = arrayWithObjects.map(arrayElement => arrayElement[arrayObjectKey]);
    
    const removeDuplicates = arr => [...new Set(arr)];
    let listOfUniqueArrayElements = removeDuplicates(arrayWithObjectKeysNotCheckedForRedundancy);
    return listOfUniqueArrayElements;
}

//3of3:
export const makeAssignmentIdShort = (item, idLength) => {
    if (item.length > idLength) {
        return item.slice(0,4).trim();
    }
    return item
}

//2of3:
export const createAssignmentObjectForEachAssignmentId = (studentMockData, assignmentId) => ({
    assignmentId,
    assignmentIdShort: makeAssignmentIdShort(assignmentId, 6), // works
    difficulty: calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, assignmentId),
    fun: calculateAverageForFunForOneAssignmentOfAllStudents(studentMockData, assignmentId),
    label: `Opdracht ${ assignmentId
    }, difficultyRating: ${calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}, 
    enjoymentRating: ${calculateAverageForFunForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}`
});

//1of3: 
export const createArrayWithObjects = (createAssignmentObjectForEachAssignmentId, studentsMockData, arrayWithPrimitiveValues) =>
arrayWithPrimitiveValues.map(primitiveValue => createAssignmentObjectForEachAssignmentId(studentsMockData, primitiveValue));




export const generateRandomPersonId = () => Math.floor(10000000 + Math.random() * 9000000); // 7 digits

export const log = console.log;