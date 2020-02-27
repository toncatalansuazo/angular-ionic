/** @format */

import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Destroyer implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  protected closeOnDestroy$<T>() {
    return takeUntil<T>(this.destroy$);
  }

  ngOnDestroy() {
    // Unsubscribe from whatever used takeUntil(destroy$)
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.complete();
  }
}
