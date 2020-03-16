import { ICellEditorAngularComp, AgEditorComponent, AgRendererComponent } from 'ag-grid-angular';
import { Component } from '@angular/core';

/**
 * CheckBox cell editor
 */
@Component({
    templateUrl: './checkbox-editor.component.html'
})
export class CheckBoxCellEditor implements AgRendererComponent {
    public params: any;

    agInit(params) {
        this.params = params;
        this.params.value = false;
        // eGui.checked = params.value === 'T'? true : false;
        // eGui.addEventListener('click', function (event) {
        //     console.log("clicked:", params);
        //     params.value = params.value === 'T'? 'F': 'T';
        //     params.node.data.is_dna = params.value;

        //     if (params.value === 'T') {
        //         for (let i=1; i<=4; i++) {
        //             params.columnApi.getColumn(`mapping.CO${i}`).getColDef().editable = false;
        //         }
        //         params.columnApi.getColumn('total').getColDef().editable = true;
        //     } else {
        //         for (let i=1; i<=4; i++) {
        //             params.columnApi.getColumn(`mapping.CO${i}`).getColDef().editable = true;
        //         }
        //         params.columnApi.getColumn('total').getColDef().editable = false;
        //     }
        // });
    }

    refresh(params: any): boolean {
        // params.data.amount++;
        params.data.cbox = params.value
        // console.log(params.value);
        params.api.refreshCells(params);
        return false;
    }

    getValue() {
        return false;
    }
}