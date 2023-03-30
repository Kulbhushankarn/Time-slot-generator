import React, { useCallback } from 'react';

function MyComponent({ onClick }){
    const handleClick = useCallback(() => {
        console.log('hello');
    });

    return (
        <button onClick={handleClick}>Click me</button>
    );
}
export default MyComponent;