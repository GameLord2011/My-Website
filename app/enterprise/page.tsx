"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function Page() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if(loaded) {
        return createPortal(
            <meta httpEquiv="refresh" content="1; https://youtu.be/dQw4w9WgXcQ" />,
            document.head
        );
    } else {
        return <></>;
    }
}
