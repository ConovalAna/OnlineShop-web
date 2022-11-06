// Helper
export const StringIsNumber = (value: string) => isNaN(Number(value)) === false;

// Turn enum into array
export function ToArray(enumme: any) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map((key) => enumme[key]);
}
