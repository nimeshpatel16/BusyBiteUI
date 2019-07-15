import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { MatCardModule, MatListModule } from '@angular/material';
import { MatGridListModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule],
    declarations: [StatComponent],
    exports: [StatComponent]
})
export class StatModule {}
