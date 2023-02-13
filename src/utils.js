
/*
    calculateAverageForDifficultyForOneAssignmentOfAllStudents
    calculateAverageForFunForOneAssignmentOfAllStudents
    createArrayWithUniqueValues // createArrayWithUniqueStudentNames
    createAssignmentObjectForEachAssignmentId
    generateRandomPersonId
    log

*/



// start of fns Student Dashboard and student-pages.
    export const calculateAverageForDifficultyForOneAssignmentOfAllStudents = (array, assignmentId) => {
    //scope: only called from this file utils.js from fn createAssignmentObjectForEachAssignmentId    
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
        //scope: only called from this file utils.js from fn createAssignmentObjectForEachAssignmentId
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
        /*
            scope: only called inside this file utils.js from:
            a) fn createAssignmentObjectForEachAssignmentId --> scope: Student-Dashboard and student-pages. 
            b) fn 
        */
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
        label: `Opdracht: ${ assignmentId
        }, avg difficultyRating: ${calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}, 
        avg enjoymentRating: ${calculateAverageForFunForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}`
    });

    //1of3: 
    export const createArrayWithAssignmentObjects = (createAssignmentObjectForEachAssignmentId, studentsMockData, arrayWithPrimitiveValues) =>
    arrayWithPrimitiveValues.map(primitiveValue => createAssignmentObjectForEachAssignmentId(studentsMockData, primitiveValue));
// end of fns Student Dashboard and student-pages.



// start of fns for scatterplot:
    export const calculateAverageForDifficultyForAllAssignmentsOf1Student = (array, studentName) => {
        // only called from fn createStudentObjectForEachStudentId inside this file utils.js 
        const createArrayWithStudentsForStudentName = (array, studentName) => {
            let filterStudentObjectWithStudentName = student => student.studentName === studentName;
            const filterStudents = (array, filterFunction) => {
                let filteredArr = array.filter(filterFunction)
                return filteredArr;
            }
            let arrayWithAssignmentsFilteredOnOneSpecificStudentName = filterStudents(array, filterStudentObjectWithStudentName )
            return arrayWithAssignmentsFilteredOnOneSpecificStudentName;
        }
        let arrayWithAssignmentsFilteredOnOneSpecificStudentName = createArrayWithStudentsForStudentName(array, studentName);
        // log(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId);
        const calculateAverageForArrayObjectKey = (array, objKey) => array
            .reduce((accumulator, variableDoingNothing, index, array) => accumulator + parseInt(array[index][objKey]), 0) / array.length;
        let averageDifficulty = calculateAverageForArrayObjectKey(arrayWithAssignmentsFilteredOnOneSpecificStudentName, "difficulty");
        let averageDifficultyRoundedToOneDecimal = parseFloat(averageDifficulty.toFixed(1));
        return averageDifficultyRoundedToOneDecimal;
    }

    export const calculateAverageForFunForAllAssignmentsOf1Student = (array, studentName) => {
        // only called from fn createStudentObjectForEachStudentId inside this file utils.js 
        const createArrayWithStudentsForstudentName = (array, studentName) => {
            let filterStudentObjectWithstudentName = student => student.studentName === studentName;
            const filterStudents = (array, filterFunction) => {
                let filteredArr = array.filter(filterFunction)
                return filteredArr;
            }
            let arrayWithAssignmentsFilteredOnOneSpecificStudentName = filterStudents(array, filterStudentObjectWithstudentName )
            return arrayWithAssignmentsFilteredOnOneSpecificStudentName;
        }
        let arrayWithAssignmentsFilteredOnOneSpecificStudentName = createArrayWithStudentsForstudentName(array, studentName);
        // log(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId);
        const calculateAverageForArrayObjectKey = (array, objKey) => array
            .reduce((accumulator, variableDoingNothing, index, array) => accumulator + parseInt(array[index][objKey]), 0) / array.length;
        let averageFun = calculateAverageForArrayObjectKey(arrayWithAssignmentsFilteredOnOneSpecificStudentName, "fun");
        let averageFunRoundedToOneDecimal = parseFloat(averageFun.toFixed(1));
        return averageFunRoundedToOneDecimal;
    }

    // //3of3:
    // export const makeStudentNameShort = (item, idLength) => {

    //     if (item.length > idLength) {
    //         return item.slice(0,4).trim();
    //     }
    //     return item
    // }

    //2of3:
    export const createStudentObjectForEachStudentId = (studentMockData, studentName) => ({
        studentName,
        // assignmentIdShort: makeAssignmentIdShort(studentName, 6), // works
        difficulty: calculateAverageForDifficultyForAllAssignmentsOf1Student(studentMockData, studentName),
        fun: calculateAverageForFunForAllAssignmentsOf1Student(studentMockData, studentName),
        label: `Student name: ${ studentName
        }, avg difficultyRating: ${calculateAverageForDifficultyForAllAssignmentsOf1Student(studentMockData, studentName).toFixed(1)}, 
        avg enjoymentRating: ${calculateAverageForFunForAllAssignmentsOf1Student(studentMockData, studentName).toFixed(1)}`
    });

    //1of3: 
    export const createArrayWithStudentObjects = (createStudentObjectForEachStudentId, studentsMockData, arrayWithPrimitiveValues) =>
    arrayWithPrimitiveValues.map(primitiveValue => createStudentObjectForEachStudentId(studentsMockData, primitiveValue));

// end of fns for scatterplot







export const generateRandomPersonId = () => Math.floor(10000000 + Math.random() * 9000000); // 7 digits

export const log = console.log;


// //3of3:
// export const makeAssignmentIdShort = (item, idLength) => {
//     if (item.length > idLength) {
//         return item.slice(0,4).trim();
//     }
//     return item
// }

// //2of3:
// export const createAssignmentObjectForEachAssignmentId = (studentMockData, assignmentId) => ({
//     assignmentId,
//     assignmentIdShort: makeAssignmentIdShort(assignmentId, 6), // works
//     difficulty: calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, assignmentId),
//     fun: calculateAverageForFunForOneAssignmentOfAllStudents(studentMockData, assignmentId),
//     label: `Opdracht ${ assignmentId
//     }, difficultyRating: ${calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}, 
//     enjoymentRating: ${calculateAverageForFunForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}`
// });

// //1of3: 
// export const createArrayWithObjects = (createAssignmentObjectForEachAssignmentId, studentsMockData, arrayWithPrimitiveValues) =>
// arrayWithPrimitiveValues.map(primitiveValue => createAssignmentObjectForEachAssignmentId(studentsMockData, primitiveValue));