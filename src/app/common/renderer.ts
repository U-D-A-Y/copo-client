import {getSelectedOptionText, getAgGridAllData} from './util';
import { ICellEditorAngularComp } from 'ag-grid-angular';

export function ActionCellRenderer() {
}

ActionCellRenderer.prototype.init = function (params) {
    this.isPinned = params.node.rowPinned;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = "<i class='fas fa-trash-alt' style='cursor: pointer; color: red;';></i>"
    if (params.value !== "" || params.value !== undefined || params.value !== null) {
        let that = this;
        this.eGui.addEventListener('click', function (event) {
            that.handleAction(params);
        }, false);
    }
};

ActionCellRenderer.prototype.handleAction = function (params) {
    console.log('event created');
    let event = new CustomEvent('action-delete', {
        bubbles: true,
        detail: params
    });
    this.eGui.dispatchEvent(event);
}

ActionCellRenderer.prototype.getGui = function () {
    if (this.isPinned) return '';
    return this.eGui;
};


export function SaveCellRenderer() {
}

SaveCellRenderer.prototype.init = function (params) {
    this.isPinned = params.node.rowPinned;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = "<i class='fas fa-save' style='cursor: pointer; color: red;';></i>"
    if (params.value !== "" || params.value !== undefined || params.value !== null) {
        let that = this;
        this.eGui.addEventListener('click', function (event) {
            that.handleAction(params);
        }, false);
    }
};

SaveCellRenderer.prototype.handleAction = function (params) {
    console.log('save event created');
    let event = new CustomEvent('action-save', {
        bubbles: true,
        detail: params
    });
    this.eGui.dispatchEvent(event);
}

SaveCellRenderer.prototype.getGui = function () {
    if (this.isPinned) return '';
    return this.eGui;
};


export function AssessmentBottomPinRenderer() { }

AssessmentBottomPinRenderer.prototype.init = function(params) {
    this.eGui = document.createElement('div');
    this.eGui.style = 'font-weight: bold; color: olivedrab';
    if (params.value > 100) {
        this.eGui.style.backgroundColor = 'red';
    }
    this.eGui.innerHTML = params.value;
};

AssessmentBottomPinRenderer.prototype.getGui = function() {
    return this.eGui;
};


// -------------------------------- //
function getCharCodeFromEvent(event) {
    event = event || window.event;
    return (typeof event.which == "undefined") ? event.keyCode : event.which;
}

function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
    let charCode = getCharCodeFromEvent(event);
    let charStr = String.fromCharCode(charCode);
    return isCharNumeric(charStr);
}

function isKeyPressedDecimal(event) {
    let charCode = getCharCodeFromEvent(event);
    return charCode === 46;
}

function isSecondDecimal(event, inputVal) {
    let isCharDecimal = isKeyPressedDecimal(event);
    if (!isCharDecimal) return false;

    let secondDecimal = inputVal.indexOf('.') >= 0;
    return secondDecimal;
}