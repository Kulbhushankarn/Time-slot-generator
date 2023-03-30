import React,{useMemo} from 'react';

function MyComponent1({a,b}) {
    const result = useMemo(() => {
        return a + b;
    }, [a,b]);

    return (
        <div>{result}</div>
    );
}

export default MyComponent1;