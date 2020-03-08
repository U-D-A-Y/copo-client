export const constants = {
        student_id: 'Student ID',
        student_name: 'Student Name',
        status: 'Status',
        action: 'Action',
        assessment: 'Assessment',
        co1: 'CO1',
        co2: 'CO2',
        co3: 'CO3',
        co4: 'CO4',
        co5: 'CO5',
        co6: 'CO6',
        co7: 'CO7',
        co8: 'CO8',
        co9: 'CO9',
        co10: 'CO10',
        co11: 'CO11',
        co12: 'CO12',

        po1: 'PO1',
        po2: 'PO2',
        po3: 'PO3',
        po4: 'PO4',
        po5: 'PO5',
        po6: 'PO6',
        po7: 'PO7',
        po8: 'PO8',
        po9: 'PO9',
        po10: 'PO10',
        po11: 'PO11',
        po12: 'PO12',

        total: 'Total',
        total_marks: 'Total Marks',
        attendance: 'Attendance',
        quiz: 'Quiz',
        mid1: 'Mid 1',
        mid2: 'Mid 2',
        final: 'Final',
        mini_project: 'Mini Project',
        lab: 'Lab',
        letter_grade: 'Letter Grade',
        grade_point: 'Grade Point',

        exam_taken_in: 'Exam Taken In',
        ratio: 'Ratio',

        // MAINLY ADMIN RELATED
        course_code: 'Course Code',
        course_name: 'Course Name',
        credit: 'Credit',
        section: 'Section',

        faculty_initial: 'Initial',
        faculty_name: 'Faculty Name',
        designation: 'Designation',

        co_po: 'CO/PO',
        co: 'CO',
        po: 'PO',
        po_dist: 'PO Dist',
}

// const getAllAssessments = function (courseCode, section) {
//     let apiUrl = `getDefaultAssessmentCoMapping/${courseCode}/${section}`;
//     return axios.get(apiUrl)
//     .then(result => {
//         return result;
//     })
//     .catch(err => {
//         return {
//             'success': false,
//             'data': [],
//             'error': err
//         }
//     })
// }