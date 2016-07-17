import { Pipe } from '@angular/core';
import { Scores } from './stats.scores';

@Pipe({
    name: "orderby"
})
export class OrderByPipe {
    transform(array: Scores[], args: string): Scores[] {
        if (!!array) {
            array.sort((a: Scores, b: Scores) => {
                if (a.total_score < b.total_score) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return array;
    }
}
