import { ICellEditorAngularComp, AgEditorComponent, AgRendererComponent } from 'ag-grid-angular';
import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

/**
 * CheckBox cell editor
 */
@Component({
    templateUrl: './checkbox-editor.component.html'
})
export class CheckBoxCellEditor implements AgRendererComponent {
    public params: any;

    agInit(params: ICellRendererParams) {
        // setValue triggers valueSetter on colDefs
        // params.setValue(false);
        console.log("chk params", params);
        this.params = params;
        // this.params.value = params.value || false;  // default is false
    }

    refresh(params: any): boolean {
        console.log("Refresh");
        params.data.cbox = params.value
        // console.log(params.value);
        params.api.refreshCells(params);
        return false;
    }

    getValue() {
        console.log("Get Value");
        let val = this.params.value;
        this.params.data.cbox = val;
        this.params.setValue(val);
        return val;
    }
}