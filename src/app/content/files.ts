
export const files = {
    main: { language: 'typescript', contents: require('!!raw-loader!./files/main.ts') },
    index: { language: 'html', contents: require('!!raw-loader!./files/index.html')}
}