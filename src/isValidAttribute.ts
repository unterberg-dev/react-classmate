// Utility function to check if a prop is a valid HTML attribute
export const isValidHtmlAttribute = (key: string) => {
    // List of valid global HTML attributes
    const validAttributes = [
      'accesskey',
      'className',
      'contentEditable',
      'data-*', // Custom data attributes (you may want to handle these differently)
      'dir',
      'draggable',
      'hidden',
      'id',
      'lang',
      'spellCheck',
      'style',
      'tabIndex',
      'title',
      'translate',
    ];
  
    // Include common event handlers
    const eventHandlers = [
      'onClick',
      'onFocus',
      'onBlur',
      'onChange',
      'onInput',
      'onSubmit',
      'onMouseEnter',
      'onMouseLeave',
    ];

    if (key.startsWith('data-')) {
        return true;
    }
  
    return validAttributes.includes(key) || eventHandlers.includes(key);
  };