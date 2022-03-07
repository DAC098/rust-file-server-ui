export function classes(...args: string[]): string {
    return args.join(" ");
}

export function epoch_to_date(seconds: number) {
    return new Date(seconds * 1000);
}

export function date_to_string(date: Date) {
    return date.getFullYear() + "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
        date.getDate().toString().padStart(2, "0") + " " +
        date.getHours().toString().padStart(2, "0") + ":" +
        date.getMinutes().toString().padStart(2, "0") + ":" +
        date.getSeconds().toString().padStart(2, "0");
}

export const BYTE     = 1;
export const KIBIBYTE = 1024;
export const MEBIBYTE = 1048576;
export const GIBIBYTE = 1073741824;
export const TEBIBYTE = 1099511627776;

export const binary_storage_prefixes = [
    "B", "KiB", "MiB", "GiB", "TiB"
];

const binary_storage_unit_order = [
    BYTE, KIBIBYTE, MEBIBYTE, GIBIBYTE, TEBIBYTE
];

export function bytes_to_unit_string(size: number) {
    let index = 0;

    for (; index < binary_storage_unit_order.length; index += 1) {
        if (binary_storage_unit_order[index] > size) {
            index -= 1;
            break;
        }
    }

    if (index == 0) {
        return size.toString() + " " + binary_storage_prefixes[index];
    } else {
        return (size / binary_storage_unit_order[index]).toFixed(1) + " " + binary_storage_prefixes[index];
    }
}