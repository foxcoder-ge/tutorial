export class MathUtil {
    static percentInRange (percent: number, min: number, max: number): number {
        return percent * (max - min) + min;
    }
}
