

const getSelector = id => document.getElementById(id);

const getSelectedOptionText = (selector) => {
    let text = selector.options[selector.selectedIndex].text;
    return text;
}

const getSelectedOptionValue = (selector) => {
    let text = selector.options[selector.selectedIndex].value;
    return text;
}


const getRegistedCourses = () => {
    return axios.get('teacherApi/getRegisteredSections/')
        .then((result) => {
            result = result.data;
            // console.log(result);
            if (result.success === true) {
                // return courseInformation = result.data;
                return result.data;
            }
        })
}


const populateSelect = (selector, data) => {
    selector.length = 1;
    for (code of data) {
        let option = document.createElement('option');
        option.text = code;
        selector.appendChild(option);
    }
    // selector.selectedIndex = 0;
    // let event = new Event('change');
    // selector.dispatchEvent(event);

}


const getAgGridOptions = (opts = {}) => {
    const gridOpts = {
        defaultColDef: {
            editable: true,
            resizable: true
        },
        columnDefs: [],
        rowData: [],
        enterMovesDownAfterEdit: true,
        stopEditingWhenGridLosesFocus: true,
    }
    const mergedOpts = Object.assign({}, gridOpts, opts);
    return mergedOpts;
}


const getAgGridAllData = grid => {
    let data = [];
    grid.api.forEachNode(node => {
        data.push(node.data);
    })
    return data;
}

const populateGrid = (col, row, grid) => {
    grid.api.setColumnDefs(col);
    grid.api.setRowData(row);
    grid.api.sizeColumnsToFit();
}

const deleteItemFromGrid = (removeItem, grid) => {
    let all = getAgGridAllData(grid);
    let selectedIndex = all.findIndex(obj => obj === removeItem);
    all.splice(selectedIndex, 1);
    grid.api.setRowData(all);
}

const getReportDataFromAgGrid = (head, grid) => {
    let data = [];
    grid.api.forEachNode(node => {
        let obj = flattenObject(node.data)
        let row = head.map(item => obj[item] ? typeof obj[item] === 'string' ? obj[item] : Number(obj[item]).toFixed(2) : "")
        row[0] = ++node.rowIndex;
        data.push(row);
    })
    return data;
}

const flattenObject = (obj) => {
    const flattened = {}

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, flattenObject(obj[key]))
        } else {
            flattened[key] = obj[key]
        }
    })

    return flattened
}

const getLetterGrade = (total) => {
    if (total >= 97 && total <= 100) {
        return 'A+';
    } else if (total >= 90 && total < 97) {
        return 'A';
    } else if (total >= 87 && total < 90) {
        return 'A-';
    } else if (total >= 83 && total < 87) {
        return 'B+';
    } else if (total >= 80 && total < 83) {
        return 'B';
    } else if (total >= 77 && total < 80) {
        return 'B-';
    } else if (total >= 73 && total < 77) {
        return 'C+';
    } else if (total >= 70 && total < 73) {
        return 'C';
    } else if (total >= 67 && total < 70) {
        return 'C-';
    } else if (total >= 63 && total < 67) {
        return 'D+';
    } else if (total >= 60 && total < 63) {
        return 'D';
    } else {
        return 'F';
    }
}

const getLetterGradeWithDesc = (total) => {
    if (total >= 97 && total <= 100) {
        return 'A+ (plus)';
    } else if (total >= 90 && total < 97) {
        return 'A (plain)';
    } else if (total >= 87 && total < 90) {
        return 'A- (minus)';
    } else if (total >= 83 && total < 87) {
        return 'B+ (plus)';
    } else if (total >= 80 && total < 83) {
        return 'B (plain)';
    } else if (total >= 77 && total < 80) {
        return 'B- (minus)';
    } else if (total >= 73 && total < 77) {
        return 'C+ (plus)';
    } else if (total >= 70 && total < 73) {
        return 'C (plain)';
    } else if (total >= 67 && total < 70) {
        return 'C- (minus)';
    } else if (total >= 63 && total < 67) {
        return 'D+ (plus)';
    } else if (total >= 60 && total < 63) {
        return 'D (plain)';
    } else {
        return 'F (fail)';
    }
}

const getGradePoint = (total) => {
    if (total >= 97 && total <= 100) {
        return 4.00;
    } else if (total >= 90 && total < 97) {
        return 4.00;
    } else if (total >= 87 && total < 90) {
        return 3.7;
    } else if (total >= 83 && total < 87) {
        return 3.3;
    } else if (total >= 80 && total < 83) {
        return 3.0;
    } else if (total >= 77 && total < 80) {
        return 2.7;
    } else if (total >= 73 && total < 77) {
        return 2.3;
    } else if (total >= 70 && total < 73) {
        return 2.0;
    } else if (total >= 67 && total < 70) {
        return 1.7;
    } else if (total >= 63 && total < 67) {
        return 1.3;
    }  else if (total >= 60 && total < 63) {
        return 1.0;
    } else {
        return 0.0;
    }
}