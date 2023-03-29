import React from 'react'

const Loading = ({ loading, error, children }) => {
    console.log(children); // Object
    console.log(children?.type?.render?.displayName); // Button
    
    const elementType = children?.type?.render?.displayName;

    const renderHandler = () => {
        if (elementType === "Button") {
            const cloneButton = React.cloneElement(
                children, // the button
                { disabled: true }, // the button properties
                "Loading..." // the text of the button 
            );
            return (
                <>
                    { 
                        loading ? (
                            cloneButton
                        ) : error ? (
                            <>
                                { children }
                                <p><br /> { error } </p>
                            </>
                        ) : (
                            children
                        )
                    }
                </>
            );
        }
        return (
            <>
                { 
                    loading ? (
                        <p>loading please wait...</p>
                    ) : error ? (
                        <p>{ error }</p>
                    ) : (
                        children
                    )
                }
            </>
        );
    };
    return renderHandler();
};

export default Loading