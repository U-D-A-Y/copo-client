import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CheckBoxCellEditor } from './checkbox-editor/checkbox-editor.component';
import { NumericCellEditor } from './numeric-cell-editor/numeric-cell-editor.component';
@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [
        CheckBoxCellEditor,
        NumericCellEditor,
    ]
})
export class GridModule {

}