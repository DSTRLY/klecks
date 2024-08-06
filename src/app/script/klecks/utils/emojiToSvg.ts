export const emojiToSvg = (emoji: string) => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <text x="0" y="75" font-size="75">${emoji}</text>
    </svg>`;
    
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}