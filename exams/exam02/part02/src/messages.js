const messages = {
  'get-fail': 'Failed to get results for a guess.  Check your network connection and try again.',
  'put-fail': 'session timedout',
  'post-fail': 'Failed to get secretWord.  Check your network connection and try again.',
  'delete-fail': 'could not find the id',
  'generic-error': 'Uh-oh, something bad happened'
};

export const pickErrorMessage = code => {
  if(!code) {
    return '';
  }
  code = messages[code] ? code : 'generic-error';
  return messages[code];
}
