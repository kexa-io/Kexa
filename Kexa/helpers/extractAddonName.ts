export const extractObjectBetween = (inputString: string, startStrings: string[], endString: string): string | null => {
    let startIndex: number = -1;
    let foundStartString: string | undefined;

    if (startStrings.length == 0)
        startIndex = 0;
    else {
        for (const element of startStrings) {
            const index = inputString.indexOf(element);
            if (index !== -1 && (startIndex === -1 || index < startIndex)) {
                startIndex = index;
                foundStartString = element;
            }
        }
    }
    if (startIndex === -1 || inputString.indexOf(endString, startIndex) === -1) {
        return null;
    }

    let extractedContent;
    if (startIndex == 0 && !foundStartString) {
        const endIndex = inputString.indexOf(endString, startIndex);
        extractedContent = inputString.substring(startIndex, endIndex);
    }
    else if (!foundStartString)
        return null;
    else {
        const endIndex = inputString.indexOf(endString, startIndex);
        extractedContent = inputString.substring(startIndex + foundStartString.length, endIndex);
    }
    return extractedContent;
}
