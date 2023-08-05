import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class MathService {
    public preciseNumber(formattedString: string | undefined | null): number | undefined {
        if(formattedString) {
            formattedString = formattedString.replace(/,/g,'').replace(/\$/g,'').replace(/%/g,'');
            return Math.round(Number(formattedString) * 1_000) / 1_000;
        } else {
            return undefined;
        }
    }

    public totalFromAmountOrPercent(totalAmount: number, usePercent: boolean | undefined | null, amount: number | undefined | null, percent: number | undefined | null): number {
        let total = 0;

        if(usePercent) {
            if(percent && percent > 0) {
                total += (percent * totalAmount);
            }
        } else {
            if(amount && amount > 0) {
                total += amount;
            }
        }   

        return total;
    }
}