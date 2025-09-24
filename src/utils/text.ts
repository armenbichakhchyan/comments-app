export const cutText = (text: string, numOfLetters: number) => {
    return text.length > numOfLetters ? text.slice(0, numOfLetters ) + '...' : text;
}

