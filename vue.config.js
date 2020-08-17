let MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'EVWT Layout Playground';
        return args;
      });
  },
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(
        {
          languages: ['javascript'],
          features: [
            'accessibilityHelp',
            'bracketMatching',
            'caretOperations',
            'clipboard',
            'codeAction',
            'codelens',
            'colorDetector',
            'comment',
            'contextmenu',
            'coreCommands',
            'cursorUndo',
            'dnd',
            'find',
            'folding',
            'fontZoom',
            'format',
            'gotoError',
            'gotoLine',
            'gotoSymbol',
            'hover',
            'iPadShowKeyboard',
            'inPlaceReplace',
            'inspectTokens',
            'linesOperations',
            'links',
            'multicursor',
            'parameterHints',
            'quickCommand',
            'quickOutline',
            'referenceSearch',
            'rename',
            'smartSelect',
            'snippets',
            'suggest',
            'toggleHighContrast',
            'toggleTabFocusMode',
            'transpose',
            'wordHighlighter',
            'wordOperations',
            'wordPartOperations'
          ]
        }
      )
    ]
  }
};
