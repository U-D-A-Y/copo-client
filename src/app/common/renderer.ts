const getRenderers = () => {
    return {
        getActionRenderer: () => {
            function ActionCellRenderer() {
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

            return ActionCellRenderer;
        },

        getSaveRenderer: () => {
            function SaveCellRenderer() {
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

            return SaveCellRenderer;
        },

        getPinned: () => {
            function AssessmentBottomPin() { }

            AssessmentBottomPin.prototype.init = function(params) {
                this.eGui = document.createElement('div');
                this.eGui.style = 'font-weight: bold; color: olivedrab';
                if (params.value > 100) {
                    this.eGui.style.backgroundColor = 'red';
                }
                this.eGui.innerHTML = params.value;
            };
            
            AssessmentBottomPin.prototype.getGui = function() {
                return this.eGui;
            };
            
            return AssessmentBottomPin;
        }
    }
}

const getCellEditors = () => {
    return {
        getNumericCellEditor: (target = '') => {
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

            // function to act as a class
            function NumericCellEditor() {
            }

            // gets called once before the renderer is used
            NumericCellEditor.prototype.init = function (params) {
                // create the cell
                // console.log(params);
                this.isRowPinned = params.node.rowPinned;
                // console.log(this.isRowPinned);
                this.eInput = document.createElement('input');
                this.eInput.classList.add('ag-cell-edit-input');
                this.eGridCell = params.eGridCell;

                if (isCharNumeric(params.charPress)) {
                    this.eInput.value = params.charPress;
                } else {
                    if (params.value !== undefined && params.value !== null) {
                        this.eInput.value = params.value;
                    }
                }

                var that = this;
                this.eInput.addEventListener('keypress', function (event) {
                    // console.log(event);
                    if (!isKeyPressedNumeric(event) &&
                        (!isKeyPressedDecimal(event) || isSecondDecimal(event, that.eInput.value))) {
                        that.eInput.focus();
                        if (event.preventDefault) event.preventDefault();
                    } else if (that.isKeyPressedNavigation(event)) {
                        event.stopPropagation();
                    }
                });

                // only start edit if key pressed is a number or [.] , not a letter
                var charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
                this.cancelBeforeStart = charPressIsNotANumber;

                // console.log('edit-stop', params);
                if (target === 'mark') {
                    // This editor will be used for mark input. So, context will get passed 
                    // and can be accessed here
                    let selectedAssessmentName = getSelectedOptionText(params.context.assessmentSelector);
                    let allAssessmentData = getAgGridAllData(params.context.assessmentAgGridOption);
                    let selectedAssessmentData = allAssessmentData.find(
                        item => item.assessment === selectedAssessmentName
                    );
                    if (selectedAssessmentData.is_dna === 'T') {
                        this.maxValue = selectedAssessmentData['exam_taken_in'];
                    } else {
                        let editedCoTitle = params.colDef.headerName;
                        let ratio = selectedAssessmentData['exam_taken_in'] / selectedAssessmentData['total'];
                        let maxValue = selectedAssessmentData['mapping'][editedCoTitle] * ratio;
                        this.maxValue = maxValue;
                    }

                    console.log(selectedAssessmentData);
                }
            };

            NumericCellEditor.prototype.isKeyPressedNavigation = function (event) {
                return event.keyCode === 39
                    || event.keyCode === 37;
            };


            // gets called once when grid ready to insert the element
            NumericCellEditor.prototype.getGui = function () {
                return this.eInput;
            };

            // focus and select can be done after the gui is attached
            NumericCellEditor.prototype.afterGuiAttached = function () {
                this.eInput.focus();
            };

            // returns the new value after editing
            NumericCellEditor.prototype.isCancelBeforeStart = function () {
                if (this.isRowPinned) {
                    // Row is pinned. Don't let edit;
                    // console.log('Pinned row');
                    return true;
                }
                return this.cancelBeforeStart;
            };

            // example - will reject the number if it contains the value 007
            // - not very practical, but demonstrates the method.
            NumericCellEditor.prototype.isCancelAfterEnd = function () {
                if (target === 'mark') {
                    var value = this.getValue();
                    console.log(value, this.maxValue)
                    // console.log(value);
                    if (value > this.maxValue) {
                        // attach invalid class to element;
                        // console.log(this.eGridCell);
                        this.eGridCell.classList.add('mark-invalid');
                    } else {
                        this.eGridCell.classList.remove('mark-invalid');
                    }
                }
                return false;   // don't cancel;
            };

            // returns the new value after editing
            NumericCellEditor.prototype.getValue = function () {
                return this.eInput.value;
            };

            // // any cleanup we need to be done here
            // NumericCellEditor.prototype.destroy = function () {
            //     // but this example is simple, no cleanup, we could  even leave this method out as it's optional
            // };

            // // if true, then this editor will appear in a popup 
            // NumericCellEditor.prototype.isPopup = function () {
            //     // and we could leave this method out also, false is the default
            //     return false;
            // };

            return NumericCellEditor;
        }
    }
}