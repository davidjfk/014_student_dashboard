
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

    export const correlationCoefficientBetween2Arrays = (X, Y) => {
        /*
            X = array1
            Y = array2
            source: https://www.geeksforgeeks.org/program-find-correlation-coefficient/ 
            This code is contributed by susmitakundugoaldanga
            
            (I have removed 1 parameter from fn-definition)
        */
            let sum_X = 0, sum_Y = 0, sum_XY = 0;
            let squareSum_X = 0, squareSum_Y = 0;
            let array1Length = X.length;
            
            for(let i = 0; i < array1Length; i++)
            {
                // Sum of elements of array X.
                sum_X = sum_X + X[i];
            
                // Sum of elements of array Y.
                sum_Y = sum_Y + Y[i];
            
                // Sum of X[i] * Y[i].
                sum_XY = sum_XY + X[i] * Y[i];
            
                // Sum of square of array elements.
                squareSum_X = squareSum_X + X[i] * X[i];
                squareSum_Y = squareSum_Y + Y[i] * Y[i];
            }
            // Use formula for calculating correlation
            // coefficient.
            let correlationBetweenArray1AndArray2 = (array1Length * sum_XY - sum_X * sum_Y)/
                    (Math.sqrt((array1Length * squareSum_X -
                            sum_X * sum_X) *
                                (array1Length * squareSum_Y -
                            sum_Y * sum_Y)));
            return correlationBetweenArray1AndArray2;
        }

    export const createArrayWithPropertyValueFromEachArrayObject = (arrayWithObjects, arrayObjectKey) => {
        const arrayWithObjectKeysNotCheckedForRedundancy = arrayWithObjects.map(arrayElement => arrayElement[arrayObjectKey]);
        return arrayWithObjectKeysNotCheckedForRedundancy;
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
        victoryBrushContainer: calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, assignmentId),
        fun: calculateAverageForFunForOneAssignmentOfAllStudents(studentMockData, assignmentId),
        label: `Assignment: ${ assignmentId
        }, avg difficultyRating: ${calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}, 
        avg enjoymentRating: ${calculateAverageForFunForOneAssignmentOfAllStudents(studentMockData, assignmentId).toFixed(1)}`
    });

    //1of3: 
        export const createArrayWithAssignmentObjects =  (createAssignmentObjectForEachAssignmentId, studentsMockData,  arrayWithPrimitiveValues) =>
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
        victoryBrushContainer: calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentMockData, studentName),
        label: `Student: ${ studentName
        }, avg difficultyRating: ${calculateAverageForDifficultyForAllAssignmentsOf1Student(studentMockData, studentName).toFixed(1)}, 
        avg enjoymentRating: ${calculateAverageForFunForAllAssignmentsOf1Student(studentMockData, studentName).toFixed(1)}`
    });

    //1of3: 
    export const createArrayWithStudentObjects = (createStudentObjectForEachStudentId, studentsMockData, arrayWithPrimitiveValues) =>
    arrayWithPrimitiveValues.map(primitiveValue => createStudentObjectForEachStudentId(studentsMockData, primitiveValue));

// end of fns for scatterplot


const getQuantile = (array, quantile) => {
    // Get the index the quantile is at.
    let index = quantile / 100.0 * (array.length - 1);

    // Check if it has decimal places.
    if (index % 1 === 0) {
        return array[index];
    } else {
        // Get the lower index.
        let lowerIndex = Math.floor(index);
        // Get the remaining.
        let remainder = index - lowerIndex;
        // Add the remaining to the lowerindex value.
        return array[lowerIndex] + remainder * (array[lowerIndex + 1] - array[lowerIndex]);
    }
}

export const filterOutliers = (someArray) => {
    /*
        source: https://stackoverflow.com/questions/20811131/javascript-remove-outlier-from-an-array
        
        The original code returns the values that are not outliers: "(x <= maxValue) && (x >= minValue)".
        I have changed the code so that now it returns the outliers instead:
        ((x) => (x < minValue) || (x > maxValue))
    */
    if (someArray.length < 4) {
        return someArray;
    }

    let values = someArray.slice().sort((a, b) => a - b); // copy array fast and sort

    let q1 = getQuantile(values, 25);
    let q3 = getQuantile(values, 75);

    let iqr, maxValue, minValue;
    iqr = q3 - q1;
    maxValue = q3 + iqr * 1.5;
    minValue = q1 - iqr * 1.5;
    return values.filter((x) => (x < minValue) || (x > maxValue));
}




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