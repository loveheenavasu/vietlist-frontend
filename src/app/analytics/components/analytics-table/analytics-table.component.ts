import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'app-analytics-table',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, MatSelectModule, FormsModule],
  templateUrl: './analytics-table.component.html',
  styleUrl: './analytics-table.component.scss',
})
export class AnalyticsTableComponent implements AfterViewInit {
  @Input() currentPage = 0
  @Input() totalItems = 0
  @Input() itemsPerPage = 0
  @Input() data: any
  @Input() columns: any
  @Input() rowAccessor: any
  @Input() timePeriod: any
  @Input() paginationHide?: any
  @Output() handlePageChange = new EventEmitter<any>()
  @Output() handleTimePeriodChange = new EventEmitter<any>()
  colspan: any
  constructor() {}

  handlePageChanges(e: any) {
    this.handlePageChange.emit(e)
  }
  onChange(e: any) {
    this.handleTimePeriodChange.emit(e)
  }

  ngAfterViewInit(): void {
    console.log(this.data, 'data')
    console.log(this.columns, 'columns')
    console.log(this.rowAccessor, 'rowAccessor')
    this.colspan = this.columns?.length
  }
}
