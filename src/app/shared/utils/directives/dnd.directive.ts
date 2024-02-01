import { Directive, EventEmitter } from '@angular/core'
import { DropEffect, EffectAllowed } from 'ngx-drag-drop'
import { calculateDragImageOffset } from 'ngx-drag-drop/lib/dnd-utils'

export type DndDragImageOffsetFunction = (
  event: DragEvent,
  dragImage: Element,
) => { x: number; y: number }
export interface DndDropEvent {
  // the original drag event
  event: DragEvent

  // the actual drop effect
  dropEffect: DropEffect

  // true if the drag did not origin from a [dndDraggable]
  isExternal: boolean

  // the data set on the [dndDraggable] that started the drag
  // for external drags use the event property which contains the original drop event as this will be undefined
  data?: any

  // the index where the draggable was dropped in a dropzone
  // set only when using a placeholder
  index?: number

  // if the dndType input on dndDraggable was set
  // it will be transported here
  type?: any
}
@Directive({
  standalone: true,
  selector: '[dndDraggable]',
})
export declare class DndDraggableDirective {
  // the data attached to the drag
  dndDraggable: any

  // the allowed drop effect
  dndEffectAllowed: EffectAllowed

  // optionally set the type of dragged data to restrict dropping on compatible dropzones
  dndType?: string

  // conditionally disable the draggability
  dndDisableIf: boolean
  dndDisableDragIf: boolean

  // set a custom class that is applied while dragging
  dndDraggingClass: any = 'dndDragging'

  // set a custom class that is applied to only the src element while dragging
  dndDraggingSourceClass: string = 'dndDraggingSource'

  // set the class that is applied when draggable is disabled by [dndDisableIf]
  dndDraggableDisabledClass = 'dndDraggableDisabled'

  // enables to set a function for calculating custom dragimage offset
  dndDragImageOffsetFunction: DndDragImageOffsetFunction =
    calculateDragImageOffset

  // emits on drag start
  readonly dndStart: EventEmitter<DragEvent>

  // emits on drag
  readonly dndDrag: EventEmitter<DragEvent>

  // emits on drag end
  readonly dndEnd: EventEmitter<DragEvent>

  // emits when the dragged item has been dropped with effect "move"
  readonly dndMoved: EventEmitter<DragEvent>

  // emits when the dragged item has been dropped with effect "copy"
  readonly dndCopied: EventEmitter<DragEvent>

  // emits when the dragged item has been dropped with effect "link"
  readonly dndLinked: EventEmitter<DragEvent>

  // emits when the drag is canceled
  readonly dndCanceled: EventEmitter<DragEvent>
}
