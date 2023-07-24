


export function executeOnEnter<T>(actionFn: () => void) {
    return (evt: React.KeyboardEvent<T>) => {
    if(evt.key === 'Enter')
    {
        console.log(evt.key);
        console.log(actionFn.toString());
      actionFn();
    }
  }
} 