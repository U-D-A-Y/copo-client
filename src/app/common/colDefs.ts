import {constants} from './constants';
import { ActionCellRenderer, SaveCellRenderer, AssessmentBottomPinRenderer, NumericCellEditor } from './renderer';
import { SelectCellEditor } from 'ag-grid-community';
import { CheckBoxCellEditor } from '@common/grid-components/checkbox-editor/checkbox-editor.component';
// const editors = getCellEditors();


const generateColDef = (field, headerName, opts = {}) => {
    let colDef = {};
    colDef["field"] = field;
    colDef["headerName"] = headerName;
    colDef["headerTooltip"] = headerName;

    for (let key of Object.keys(opts)) {
        let val = opts[key];
        colDef[key] = val;
    }
    return colDef;
}

/*  ADD OPTION TO ALL COLUMNS  */
/**
 * 
 * @param {Array} allColDefs Array containing all the column definitions
 * @param {Object : Optional} opts The options to add to all columns
 * @param {Array : Optional} exclude Array of headerNames to exclude
 */
const addOptionToAllColumn = (allColDefs, opts = {}, exclude = []) => {
    let modifiedColDefs = allColDefs.map(colDef => {
        if (exclude.includes(colDef.headerName)) {
            return colDef;
        }
        for (let key of Object.keys(opts)) {
            let val = opts[key];
            colDef[key] = val;
        }
        return colDef;
    })
    return modifiedColDefs;
}

const addOptionToSomeColumn = (allColDefs, opts = {}, cols = []) => {
    let modifiedColDefs = allColDefs.map(colDef => {
        if (!cols.includes(colDef.headerName)) {
            return colDef;
        }
        for (let key of Object.keys(opts)) {
            let val = opts[key];
            colDef[key] = val;
        }
        return colDef;
    })
    return modifiedColDefs;
}

const addOptionToSomeChildColumn = (allColDefs, opts = {}, cols = []) => {
    let modifiedColDefs = allColDefs.map(colDef => {
        if (!colDef.hasOwnProperty('children')) {
            // This is NOT a column group. Return AS IS
            return colDef;
        }
        let childs = colDef.children;
        for (let child of childs) {
            if (cols.includes(child.headerName)) {
                // Modify this child
                for (let key of Object.keys(opts)) {
                    let val = opts[key];
                    child[key] = val;
                }
            }
        }
        return colDef;
    })
    return modifiedColDefs;
}
/*  END - ADD OPTION TO ALL COLUMNS  */

/* GENERATE GROUP COLUMN DEFITIONS */
const groupColDefaultOpts = {
    marryChildren: true
}

const generateGroupColDef = (groupHeaderName, childrenArray, opts = {}) => {
    let groupColDef = {};
    groupColDef["headerName"] = groupHeaderName;
    groupColDef["children"] = childrenArray;

    // merge default and user supplied opts and dynamically add to every cols
    let mergedOpts = Object.assign({}, groupColDefaultOpts, opts);
    for (let key of Object.keys(mergedOpts)) {
        let val = mergedOpts[key];
        groupColDef[key] = val;
    }
    return groupColDef;
}
/* END - GENERATE GROUP COLUMN DEFITIONS */

/* SPECIAL COLUMNS */
const slColumn = {
    headerName: '#',
    field: '#',
    editable: false,
    lockPosition: true,
    valueGetter: function (params) {
        if (!params.node.rowPinned) {
            // Not a pinned row
            return params.node.rowIndex + 1;
        }
    },
    cellClass: function (params) {
        if (!params.node.rowPinned) {
            return 'locked-col';
        }
    },
    headerClass: 'locked-col',
    minWidth: 35,
    maxWidth: 45,
    suppressNavigable: true,
    suppressSizeToFit: true,
    cellStyle: { textAlign: 'center' },
    pinned: 'left'
}

const actionColumn = {
    editable: false,
    headerName: constants.action,
    cellRenderer: ActionCellRenderer,
    minWidth: 30,
    maxWidth: 60,
    cellStyle: { textAlign: 'center' }
}

const saveColumn = {
    editable: false,
    headerName: constants.action,
    cellRenderer: SaveCellRenderer,
    minWidth: 30,
    maxWidth: 60,
    cellStyle: { textAlign: 'center' }
}
/* END - SPECIAL COLUMNS */

/*  OBE1 COLUMNS DEFINITIONS  */
// default properties for `generateObe1Children`
const obe1ChildrenDefaultOpts = {
    minWidth: 50,
    cellStyle: {
        textAlign: 'center'
    }
}
// generate children for obe1
const generateObe1Children = (assessmentTitle, opts = {}) => {
    let childrens = [
        // CO columns
        generateColDef(`marks.${assessmentTitle}.CO1`, constants.co1),
        generateColDef(`marks.${assessmentTitle}.CO2`, constants.co2),
        generateColDef(`marks.${assessmentTitle}.CO3`, constants.co3),
        generateColDef(`marks.${assessmentTitle}.CO4`, constants.co4),
        {
            // TOTAL column
            headerName: constants.total,
            field: `marks.${assessmentTitle}.total`,
            valueGetter: function (params) {
                return generateReportTotalValue(params, assessmentTitle);
            }
        }
    ]

    // merge default+user_supplied and dynamically add opts to every children
    let mergedOpts = Object.assign({}, obe1ChildrenDefaultOpts, opts)
    childrens = childrens.map(children => {
        for (let key of Object.keys(mergedOpts)) {
            let val = mergedOpts[key];
            children[key] = val;
        }
        return children;
    })
    return childrens;
}
/* END - OBE1 COLUMNS DEFINITIONS  */

/** GENERATE TOTAL VALUE COLUMN IN REPORTS **/
// it needs to be normal function to access params I guess;
const generateReportTotalValue = function (params, assessmentTitle) {
    let total = 0;
    let allMarks = params.data.marks[assessmentTitle];
    if (allMarks === undefined || allMarks === null) {
        return undefined;
    }
    for (let key of Object.keys(allMarks)) {
        total += Number(allMarks[key]);
    }
    // Set value of TOTAL column in GRID
    params.data.marks[assessmentTitle].total = total;
    return total;
}
/** END - GENERATE TOTAL VALUE COLUMN IN REPORTS **/


export const getAdminCourses = () => {
    let colDefs = [
        { ...slColumn },
        {
            ...generateColDef('course_code', constants.course_code, {
                minWidth: 70
            })
        },
        {
            ...generateColDef('course_name', constants.course_name, {
                minWidth: 200
            })
        },
        {
            ...generateColDef('credit', constants.credit, {
                minWidth: 40
            })
        },
        { ...actionColumn },
    ]
    colDefs = addOptionToAllColumn(colDefs, {
        cellStyle: { textAlign: 'center' }
    }, ['#'])
    // console.log(colDefs);
    return colDefs;
}


export const getAdminFaculty = () => {
    let colDefs = [
        { ...slColumn },
        {
            ...generateColDef('faculty_initial', constants.faculty_initial, {
                width: 70
            })
        },
        {
            ...generateColDef('faculty_name', constants.faculty_name, {
                minWidth: 200
            })
        },
        {
            ...generateColDef('designation', constants.designation, {
                minWidth: 130
            })
        },
        { ...saveColumn },
        { ...actionColumn }
    ]
    return colDefs;
}

export const getAdminSections = () => {
    let colDefs = [
        { ...slColumn },
        { ...generateColDef('course_code', constants.course_code) },
        { ...generateColDef('faculty_initial', constants.faculty_initial) },
        { ...generateColDef('faculty_name', constants.faculty_name) },
        { ...generateColDef('section', constants.section) },
        { ...actionColumn }
    ]
    return colDefs;
}

export const getAdminStudents = () => {
    let colDefs = [
        {
            ...slColumn
        },
        {
            ...generateColDef('student_id', constants.student_id)
        },
        {
            ...generateColDef('student_name', constants.student_name)
        },
        {
            ...actionColumn
        }
    ]
    return colDefs;
}

/**
 * PO Reports of Student
 */
export const getStudentPoReport = () => {
    let colDefs = [
        generateColDef('student_id', constants.student_id, {
            rowSpan: function (params) {
                if (params.data.student_id) {
                    return params.data.span;
                } else {
                    return 1;
                }
            },
            minWidth: 100,
            cellClassRules: {
                'show-cell': 'value !== undefined'
            }
        }),
        generateColDef('student_name', constants.student_name, {
            rowSpan: function (params) {
                if (params.data.student_id) {
                    return params.data.span;
                } else {
                    return 1;
                }
            },
            cellClassRules: {
                'show-cell': 'value !== undefined'
            },
            minWidth: 200
        }),
        generateColDef('po', constants.po),
        generateColDef('dist', constants.po_dist, {
            valueFormatter: function (params) {
                const cellValue = params.value;
                let precision = 3;
                if (typeof (cellValue) === "number") {
                    return cellValue.toFixed(precision);
                } else if (typeof (cellValue) === "string") {
                    return parseFloat(cellValue).toFixed(precision);
                } else {
                    return undefined;
                }
            }
        })
    ]
    return colDefs;
}


export const getCoursePoReport = () => {
    let colDefs = [
        generateColDef('course_code', constants.course_code, {
            rowSpan: function (params) {
                if (params.data.course_code) {
                    return params.data.span;
                } else {
                    return 1;
                }
            },
            cellClassRules: {
                'show-cell': 'value !== undefined'
            },
            minWidth: 100
        }),
        generateColDef('po', constants.po),
        generateColDef('dist', constants.po_dist, {
            valueFormatter: function (params) {
                const cellValue = params.value;
                let precision = 3;
                if (typeof (cellValue) === "number") {
                    return cellValue.toFixed(precision);
                } else if (typeof (cellValue) === "string") {
                    return parseFloat(cellValue).toFixed(precision);
                } else {
                    return undefined;
                }
            }
        })
    ]
    return colDefs;
}


export const getCourseAndStudentPoReport = () => {
    let colDefs = [
        generateColDef('course_code', constants.course_code, {
            rowSpan: function (params) {
                if (params.data.course_code) {
                    return params.data.courseSpan;
                } else {
                    return 1;
                }
            },
            cellClassRules: {
                'show-cell': 'value !== undefined'
            },
            minWidth: 100
        }),
        generateColDef('student_id', constants.student_id, {
            rowSpan: function (params) {
                if (params.data.student_id) {
                    return params.data.studentSpan;
                } else {
                    return 1;
                }
            },
            cellClassRules: {
                'show-cell': 'value !== undefined'
            },
            minWidth: 100
        }),
        generateColDef('student_name', constants.student_name, {
            rowSpan: function (params) {
                if (params.data.student_name) {
                    return params.data.studentSpan;
                } else {
                    return 1;
                }
            },
            cellClassRules: {
                'show-cell': 'value !== undefined'
            },
            minWidth: 150
        }),
        generateColDef('po', constants.po),
        generateColDef('dist', constants.po_dist, {
            valueFormatter: function (params) {
                const cellValue = params.value;
                let precision = 3;
                if (typeof (cellValue) === "number") {
                    return cellValue.toFixed(precision);
                } else if (typeof (cellValue) === "string") {
                    return parseFloat(cellValue).toFixed(precision);
                } else {
                    return undefined;
                }
            }
        })
    ];
    return colDefs;
}


export const getCOPO = () => {
    let poCols = (() => {
        let cols = [];
        let keyName = "mapping";
        for (let i=1; i<=12; i++) {
            cols.push({
                headerName: `PO${i}`,
                field: `${keyName}.PO${i}`,
                cellClass: function(params) {
                    if (!params.value) {
                        return 'empty-copo-value';
                    }
                },
                cellStyle: {
                    textAlign: 'center'
                }
            })
        }
        return cols;
    })();

    let colDefs = [
        // { headerName:'CO/PO', field:'co', width: 60},
        generateColDef('co', constants.co_po, {
            minWidth: 60,
            cellStyle: {textAlign: 'center'},
            editable: false,
            cellClass: 'cell-disabled'
        }),
        ...poCols
    ]
    return colDefs;
}


/**
 * Faculty column definitions
 */


/**
 * Column Definitions for the Grid to add assessments to section
 */
export const getAssessmentChooserColDef = () => {
    let colDefs = [
        {
            ...generateColDef('assessment', constants.assessment, {
                checkboxSelection: true,
                headerCheckboxSelection: true
            })
        }, {
            ...generateColDef('dna', 'DNA?', {
                cellRendererFramework: CheckBoxCellEditor,
                maxWidth: 60,
                cellStyle: {
                    textAlign: 'center'
                }
            })
        }
    ]
    return colDefs;
}

export const getStudentManagement = () => {
    let colDefs = [
        {
            ...slColumn
        }, {
            ...generateColDef('student_id', constants.student_id, {
                    minWidth: 120,
                    maxWidth: 150,
                    editable: false
                }
            )
        }, {
            ...generateColDef('student_name', constants.student_name, {
                minWidth: 140
            })
        }, {
            ...generateColDef('enrollment_status', constants.status, {
                editable: true,
                singleClickEdit: true,
                maxWidth: 90,
                cellEditor: SelectCellEditor,
                cellEditorParams: {
                    // values: ['AC', 'DR', 'WI', 'IN', 'DE']
                    values: ['Active', 'Drop', 'Witheld', 'Incomplete', 'Defaulter']
                },
                cellStyle: function (params) {
                    // console.log("style", params);
                    let style = {};
                    let value = params.data.enrollment_status;
                    if (value === 'AC') {
                        style = { backgroundColor: 'green' };
                    } else if (value === 'DR') {
                        style = { backgroundColor: 'red' };
                    } else if (value === 'WI') {
                        style = { backgroundColor: 'blue' }
                    } else if (value === 'IN') {
                        style = { backgroundColor: 'purple' }
                    } else if (value === 'DE') {
                        style = { backgroundColor: 'aliceblue' }
                    }
                    style["fontWeight"] = 'bold';
                    style["textAlign"] = 'center';
                    return style;
                },
                valueSetter: function(params) {
                    let showToStoreMap = {
                        'Active': 'AC', 
                        'Drop': 'DR', 
                        'Witheld': 'WI', 
                        'Incomplete': 'IN', 
                        'Defaulter': 'DE'
                    }
                    let valueToSet = showToStoreMap[params.newValue];
                    // console.log("val-setter", params.newValue);
                    params.data.enrollment_status = valueToSet;
                    return valueToSet;
                },
                valueGetter: function(params) {
                    let storeToShowMap = {
                        'AC': 'Active', 
                        'DR': 'Drop', 
                        'WI': 'Witheld', 
                        'IN': 'Incomplete', 
                        'DE': 'Defaulter'
                    }
                    // console.log('val-getter', params);
                    let actualValue = params.data.enrollment_status;
                    return storeToShowMap[actualValue];
                }
            })
        }, {
            ...saveColumn,
        },
        // {
        //     ...generateColDef('_checked', ' ', {
        //         minWidth: 30,
        //         maxWidth: 30,
        //         editable: true,
        //     }),
        //     headerCheckboxSelection: true,
        //     checkboxSelection: true
        // }
    ];
    colDefs = addOptionToAllColumn(colDefs, {
        cellStyle: { textAlign: 'center' }
    }, [constants.status])
    return colDefs;
}


/** 
 * Assessment and CO mapping for an offered section;
*/
export const getAssessmentCoMapping = () => {
    let coMappingColumns = [];
    for (let i=1; i<=4; i++) {
        let col = generateColDef(`mapping.CO${i}`, constants[`co${i}`], {
            editable: function(params) {
                // console.log("editable", params);
                if (params.data.is_dna === "T") {
                    return false;
                } else {
                    return true;
                }
            }
        });
        coMappingColumns.push(col);
    }
    let colDefs = [
        {
            ...slColumn
        }, {
            headerName: "DNA?",
            field: "is_dna",
            editable: false,
            cellRendererFramework: CheckBoxCellEditor,
            // params.columnApi.getColumn(`mapping.CO${i}`).getColDef().editable = true;
            valueGetter: function(params) {
                // console.log("getter", params.data.assessment, params.data.is_dna);
                if (params.data.is_dna === 'T') {
                    // Cell Renderer will get this value
                    return true;
                } else {
                    return false;
                }
            },
            valueSetter: function(params) {
                // console.log("setter", params.data.assessment, params.newValue);
                let newValue = params.newValue;
                if (newValue) {
                    params.data.is_dna = 'T';
                } else {
                    params.data.is_dna = 'F';
                }
                return true;
            }
        }, {
            ...generateColDef('assessment', constants.assessment, {
                minWidth: 100,
                editable: false
            }),
        }, 
            ...coMappingColumns,
        {
            headerName: constants.total,
            field: 'total',
            editable: function(params) {
                // console.log("editable", params);
                if (params.data.is_dna === "T") {
                    return true;
                } else {
                    return false;
                }
            },
            valueGetter: function (params) {
                // console.log("getter", params);
                if (params.node.rowPinned) {
                    return params.data.total;
                }
                if (params.data.is_dna === 'T') {
                    // Total Should simply display value of DNA
                    // params.columnApi.getColumn("total").getColDef().editable = true;
                    // for (let i=1; i<=4; i++) {
                    //     let colName = `mapping.CO${i}`;
                    //     params.columnApi.getColumn(colName).getColDef().editable = false;
                    // }
                    let total = parseFloat(params.data.total || '0');
                    return total;
                }
                let total = 0;
                for (let key of Object.keys(params.data.mapping)) {
                    total += Number(params.data.mapping[key]) * 100;    // temporay solution to fix decimal precision error;
                }
                // setting value;
                params.data.total = total / 100;

                return total / 100;
            },
            valueSetter: function(params) {
                console.log("params:", params);
                if (params.node.rowPinned) {
                    return params.data.total;
                }
                if (params.data.is_dna === 'T') {
                    // Total Should simply display value of DNA
                    let total = parseFloat(params.newValue || '0');
                    params.data.total = total;
                    return total;
                }
            },
            pinnedRowCellRenderer: AssessmentBottomPinRenderer,
            pinnedRowCellRendererParams: {
                style: { 'color': 'blue' }
            }
        }, {
            ...generateColDef('exam_taken_in', constants.exam_taken_in)
        }, {
            ...actionColumn,
        }
    ];
    colDefs = addOptionToAllColumn(colDefs, {
        cellStyle: { textAlign: 'center' }
    })
    colDefs = addOptionToAllColumn(colDefs, {
        // cellEditor: NumericCellEditor('assessment')
    }, [
        '#', constants.assessment, constants.total
    ])
    return colDefs;
}

// export class ColDefs {
//     

//     

//     getStudentMarks: () => {
//         let colDefs = [
//             {
//                 ...slColumn
//             }, {
//                 ...generateColDef('student_id', constants.student_id, {
//                     editable: false,
//                     minWidth: 110
//                 })
//             }, {
//                 ...generateColDef('student_name', constants.student_name, {
//                     editable: false,
//                     minWidth: 150
//                 })
//             }, {
//                 ...generateColDef('marks.CO1', constants.co1)
//             }, {
//                 ...generateColDef('marks.CO2', constants.co2)
//             }, {
//                 ...generateColDef('marks.CO3', constants.co3)
//             }, {
//                 ...generateColDef('marks.CO4', constants.co4)
//             }, {
//                 headerName: constants.total,
//                 field: 'total',
//                 valueGetter: function (params) {
//                     if (params.colDef.editable) {
//                         // DNA
//                         params.data.total = params.data.total;
//                         return params.data.total;
//                     }
//                     let total = 0;
//                     let allMarks = params.data.marks;
//                     for (key of Object.keys(allMarks)) {
//                         total += Number(allMarks[key]);
//                     }
//                     params.data.total = total;
//                     return total;
//                 },
//                 editable: false
//             }
//         ];
//         colDefs = addOptionToAllColumn(colDefs, {
//             cellStyle: { textAlign: 'center' }
//         });
//         colDefs = addOptionToSomeColumn(colDefs, {
//             minWidth: 40,
//             cellEditor: editors.getNumericCellEditor(target = 'mark'),
//         }, [
//             constants.co1, constants.co2, constants.co3, constants.co4, constants.total
//         ])
//         return colDefs;
//     },

//     // REPORT: Mid1, Mid2, Final
//     getMidAndFinal: () => {
//         let colDefs = [
//             {
//                 ...slColumn
//             }, {
//                 ...generateColDef('student_id', constants.student_id)
//             }, {
//                 ...generateColDef('student_name', constants.student_name)
//             }, {
//                 ...generateColDef('total', constants.total, {
//                     cellClass: 'total-column-cell',
//                     headerClass: 'total-column-header'
//                 })
//             }
//         ];
//         colDefs = addOptionToAllColumn(colDefs, {
//             cellStyle: { textAlign: 'center' }
//         });
//         return colDefs;
//     },

//     getTabulation: () => {
//         let colDefs = [
//             {
//                 ...slColumn
//             }, {
//                 ...generateColDef('student_id', constants.student_id, {
//                     minWidth: 120,
//                     editable: false,
//                 })
//             }, {
//                 ...generateColDef('student_name', constants.student_name, {
//                     minWidth: 150,
//                     editable: false,
//                 })
//             }, {
//                 ...generateColDef('marks.Attendance', constants.attendance)
//             }, {
//                 ...generateColDef('marks.Quiz', constants.quiz)
//             }, {
//                 ...generateColDef('marks.Mid 1', constants.mid1)
//             }, {
//                 ...generateColDef('marks.Mid 2', constants.mid2)
//             }, {
//                 ...generateColDef('marks.Final', constants.final)
//             }, {
//                 ...generateColDef('marks.Mini Project', constants.mini_project)
//             }, {
//                 ...generateColDef('marks.Lab', constants.lab)
//             }, {
//                 headerName: constants.total,
//                 field: 'total',
//                 valueGetter: function (params) {
//                     let total = 0;
//                     let allMarks = params.data.marks;
//                     if (allMarks === undefined || allMarks === null) {
//                         return undefined;
//                     }
//                     for (const mark of Object.values(allMarks)) {
//                         total += mark;
//                     }
//                     params.data.total = total.toFixed(2);
//                     return total.toFixed(2);
//                 },
//                 cellClass: 'total-column-cell',
//                 headerClass: 'total-column-header'
//             }, {
//                 headerName: constants.letter_grade,
//                 field: 'grade',
//                 valueGetter: function (params) {
//                     let en_status = params.data.enrollment_status || '';
//                     // Letter grade for WI and IN students won't be calculated
//                     // on their marks. They will get fixed letter grade 
//                     // either 'W' or 'I'
//                     if (en_status === 'WI') {
//                         params.data.letter_grade = 'W';
//                         return 'W';
//                     } else if (en_status === 'IN') {
//                         params.data.letter_grade = 'I';
//                         return 'I';
//                     }
//                     let totalMark = params.data.total || 0;
//                     let letterGrade = getLetterGrade(totalMark);
//                     params.data.letter_grade = letterGrade;
//                     return letterGrade;
//                 }
//             }
//         ]
//         colDefs = addOptionToAllColumn(colDefs, {
//             cellStyle: { textAlign: 'center' }
//         }, [
//             '#', constants.student_id, constants.student_name
//         ]);
//         // Add colors to all CO columns 
//         colDefs = addOptionToAllColumn(colDefs, {
//             cellClass: 'co-column-cell',
//             headerClass: 'co-column-header'
//         }, ['#', constants.student_id, constants.student_name, constants.total])
//         return colDefs;
//     },

//     getGradesheet: () => {
//         let colDefs = [
//             slColumn,
//             generateColDef('student_id', constants.student_id, {
//                 editable: false
//             }),
//             // generateColDef('student_name', fixedValues.student_name),
//             generateColDef('total_mark', constants.total, {
//                 editable: false
//             }),
//             {
//                 headerName: constants.grade_point,
//                 field: 'grade_point',
//                 editable: false,
//                 valueGetter: function (params) {
//                     let totalMark = params.data.total || 0;
//                     let gradePoint = getGradePoint(totalMark);
//                     params.data.grade_point = gradePoint;
//                     return gradePoint;
//                 }
//             },
//             {
//                 headerName: constants.letter_grade,
//                 field: 'letter_grade',
//                 editable: false,
//                 valueGetter: function (params) {
//                     let en_status = params.data.enrollment_status || '';
//                     if (en_status === 'WI') {
//                         params.data.letter_grade = 'W (plain)';
//                         return 'W (plain)';
//                     } else if (en_status === 'IN') {
//                         params.data.letter_grade = 'I (plain)';
//                         return 'I (plain)';
//                     }
//                     let totalMark = params.data.total_mark || 0;
//                     let letterGrade = getLetterGradeWithDesc(totalMark);
//                     params.data.letter_grade = letterGrade;
//                     return letterGrade;
//                 }
//             }
//         ]

//         colDefs = addOptionToAllColumn(colDefs, {
//             cellStyle: { textAlign: 'center' }
//         })

//         return colDefs;
//     },

//     getObe2: () => {
//         const threshold = 70;
//         let colDefs = [
//             {
//                 ...slColumn,
//             }, {
//                 ...generateColDef('student_id', constants.student_id, {
//                     minWidth: 120,
//                     cellStyle: { textAlign: 'center' }
//                 })
//             }, {
//                 ...generateColDef('student_name', constants.student_name, {
//                     minWidth: 150,
//                     cellStyle: { textAlign: 'center' }
//                 })
//             }, {
//                 ...generateColDef('co_dist.CO1', constants.co1)
//             }, {
//                 ...generateColDef('co_dist.CO2', constants.co2)
//             }, {
//                 ...generateColDef('co_dist.CO3', constants.co3)
//             }, {
//                 ...generateColDef('co_dist.CO4', constants.co4)
//             }, {
//                 headerName: 'CO1 (in 100)',
//                 field: 'co_status.s_CO1',
//                 valueGetter: function (params) {
//                     let co = params.data.co_dist.CO1;
//                     let status = (co > threshold) ? 1 : 0;
//                     params.data.co_status.s_CO1 = status;
//                     return status;
//                 }
//             }, {
//                 headerName: 'CO2 (in 100)',
//                 field: 'co_status.s_CO2',
//                 valueGetter: function (params) {
//                     let co = params.data.co_dist.CO2;
//                     let status = (co > threshold) ? 1 : 0;
//                     params.data.co_status.s_CO2 = status;
//                     return status;
//                 }
//             }, {
//                 headerName: 'CO3 (in 100)',
//                 field: 'co_status.s_CO3',
//                 valueGetter: function (params) {
//                     let co = params.data.co_dist.CO3;
//                     let status = (co > threshold) ? 1 : 0;
//                     params.data.co_status.s_CO3 = status;
//                     return status;
//                 }
//             }, {
//                 headerName: 'CO4 (in 100)',
//                 field: 'co_status.s_CO4',
//                 valueGetter: function (params) {
//                     let co = params.data.co_dist.CO4;
//                     let status = (co > threshold) ? 1 : 0;
//                     params.data.co_status.s_CO4 = status;
//                     return status;
//                 }
//             }
//         ];
//         colDefs = addOptionToSomeColumn(colDefs, {
//             cellStyle: { textAlign: 'center' },
//             valueFormatter: function (params) {
//                 const cellValue = params.value;
//                 if (typeof (cellValue) === "number") {
//                     return cellValue.toFixed(2);
//                 } else if (typeof (cellValue) === "string") {
//                     return parseFloat(cellValue).toFixed(2);
//                 } else {
//                     return undefined;
//                 }
//             }
//         }, [
//             constants.co1, constants.co2, constants.co3, constants.co4
//         ]);
//         colDefs = addOptionToSomeColumn(colDefs, {
//             cellClass: 'total-column-cell',
//             headerClass: 'total-column-header'
//         }, [constants.co1, constants.co2, constants.co3, constants.co4])

//         colDefs = addOptionToSomeColumn(colDefs, {
//             cellStyle: { textAlign: 'center' },
//             cellClass: 'co-status-cell',
//             headerClass: 'co-status-header'
//         }, ['CO1 %', 'CO2 %', 'CO3 %', 'CO4 %'])

//         return colDefs;
//     },

//     getObe1: () => {
//         let colDefs = [
//             {
//                 ...slColumn
//             }, {
//                 ...generateColDef('student_id', constants.student_id, {
//                     minWidth: 110,
//                     pinned: 'left'
//                 })
//             }, {
//                 ...generateColDef('student_name', constants.student_name, {
//                     minWidth: 120,
//                     pinned: 'left'
//                 })
//             }, {
//                 ...generateGroupColDef('Attendance',
//                     [
//                         ...generateObe1Children('Attendance'),
//                     ])
//             }, {
//                 ...generateGroupColDef('Quiz',
//                     [
//                         ...generateObe1Children('Quiz'),
//                     ])
//             }, {
//                 ...generateGroupColDef('Mid 1',
//                     [
//                         ...generateObe1Children('Mid 1'),
//                     ])
//             }, {
//                 ...generateGroupColDef('Mid 2',
//                     [
//                         ...generateObe1Children('Mid 2'),
//                     ])
//             }, {
//                 ...generateGroupColDef('Final',
//                     [
//                         ...generateObe1Children('Final'),
//                     ])
//             }, {
//                 ...generateGroupColDef('Mini Project',
//                     [
//                         ...generateObe1Children('Mini Project'),
//                     ])
//             }, {
//                 ...generateGroupColDef('Lab',
//                     [
//                         ...generateObe1Children('Lab'),
//                     ])
//             }
//         ]
//         colDefs = addOptionToSomeChildColumn(colDefs, {
//             cellClass: 'total-column-cell',
//             headerClass: 'total-column-header'
//         }, [constants.total])
//         return colDefs;
//     },

//     // ADMIN ADMIN

//     
// }