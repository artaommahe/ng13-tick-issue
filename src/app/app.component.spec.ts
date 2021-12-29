import { fakeAsync, tick } from '@angular/core/testing';
import { concat, concatMap, delay, EMPTY, of, Subject } from 'rxjs';

describe('AppComponent', () => {
  it('smth', fakeAsync(() => {
    const data = new Subject<void>();
    const received = jasmine.createSpy();

    data
      .pipe(
        // rate limiting, no more than 10 events per second
        concatMap(update => concat(of(update), EMPTY.pipe(delay(100)))),
      )
      .subscribe(received);

    expect(received).toHaveBeenCalledTimes(0);

    data.next();
    data.next();

    expect(received).toHaveBeenCalledTimes(1);

    tick(50);
    expect(received).toHaveBeenCalledTimes(1);

    tick(51);
    expect(received).toHaveBeenCalledTimes(2);
  }));

});
