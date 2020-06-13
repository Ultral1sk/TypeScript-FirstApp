// Use "namespace" code is a syntax to group code
// what this means is that the interfaces are available inside this namespace
// but they are also available outside of this file
namespace App {

      export interface Draggable {
            dragStartHandler(event: DragEvent): void;
            dragEndHandler(event: DragEvent): void;
          }
          
      export interface DragTarget {
            dragOverHandler(event: DragEvent): void;
            dropHandler(event: DragEvent): void;
            dragLeaveHandler(event: DragEvent): void;
          }
}

