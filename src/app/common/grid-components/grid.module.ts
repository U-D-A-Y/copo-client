import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CheckBoxCellEditor } from './checkbox-editor/checkbox-editor.component';

@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [
        CheckBoxCellEditor
    ]
})
export class GridModule {

}