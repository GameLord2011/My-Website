"use client";

import "7.css/dist/7.scoped.css";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export interface Win7DialogHandle {
    show: () => void;
    close: () => void;
}

type win7DialogProps = {
    children: React.ReactNode;
    title?: string;
    barColor?: string;
    ref?: React.Ref<Win7DialogHandle>;
};

export default function Win7Dialog({
    children,
    title,
    barColor,
    ref,
}: win7DialogProps) {
    const win7DialogRef = useRef<HTMLDialogElement>(null);
    const titleBarRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);

    const barColorVar = barColor
        ? {
              "--w7-w-bg": barColor,
          }
        : {};

    const normWinStyles = {
        width: "250px",
        display: "flex",
        flexDirection: "column",
    };

    const combinedStyle = { ...normWinStyles, ...barColorVar };

    const [maximized, setMaximized] = useState<boolean>(false);

    const loc = useRef<{ x: string; y: string }>({
        x: "0px",
        y: "0px",
    });

    function closeDialog() {
        win7DialogRef.current?.close();
    }

    function showDialog() {
        win7DialogRef.current?.show();
    }

    useImperativeHandle(ref, () => ({
        show: showDialog,
        close: closeDialog,
    }));

    useEffect(() => {
        const dialogEl = win7DialogRef.current;
        const titleBarEl = titleBarRef.current;
        if (!dialogEl || !titleBarEl) return;

        dialogEl.style.position = "fixed";
        dialogEl.style.left = "calc(50vw - 124px)";
        dialogEl.style.top = "calc(50vh - 44px)";

        let offsetX = 0,
            offsetY = 0;
        let dragging = false;

        const startDrag = (e: MouseEvent) => {
            e.preventDefault();
            dragging = true;
            dialogEl.classList.remove(
                "top-1/2",
                "left-1/2",
                "translate-x-[-50%]",
                "translate-y-[-50%]",
            );
            const rect = dialogEl.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            dialogEl.style.left = rect.left + "px";
            dialogEl.style.top = rect.top + "px";
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", stopDrag);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!dragging) return;
            if (maximized) return;
            e.preventDefault();

            /*
                So, for some reason, I had to make the distance the width/height of the
                dialog minus one pixel to make it sit flush, I don't know why, methinks
                that there is a default padding of one pixel somewhere.
            */

            dialogEl.style.left = e.clientX - offsetX + "px";
            if (
                (dialogEl.style.left.replace("px", "") as unknown as number) < 0
            ) {
                dialogEl.style.left = "0px";
            }
            if (
                (dialogEl.style.left.replace("px", "") as unknown as number) >
                document.documentElement.clientWidth - 249
            ) {
                dialogEl.style.left = `${document.documentElement.clientWidth - 249}px`;
            }

            dialogEl.style.top = e.clientY - offsetY + "px";
            if (
                (dialogEl.style.top.replace("px", "") as unknown as number) >
                document.documentElement.clientHeight - 103
            ) {
                dialogEl.style.top = `${document.documentElement.clientHeight - 103}px`;
            }
            if (
                (dialogEl.style.top.replace("px", "") as unknown as number) < 0
            ) {
                dialogEl.style.top = "0px";
            }

            loc.current = { x: dialogEl.style.left, y: dialogEl.style.top };
        };

        const stopDrag = () => {
            dragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", stopDrag);
        };

        titleBarEl.onmousedown = startDrag;

        return () => {
            titleBarEl.onmousedown = null;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", stopDrag);
        };
    }, []);

    return createPortal(
        <dialog
            open
            className="win7 z-10001 bg-[#0000] text-black duration-[0]"
            id="win7Dialog"
            ref={win7DialogRef}
        >
            <div
                className="window glass active"
                style={combinedStyle as React.CSSProperties}
                ref={windowRef}
            >
                <div className="title-bar select-none" ref={titleBarRef}>
                    <div className="title-bar-text">{title || "Dialog"}</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" onClick={closeDialog} />
                        {!maximized && (
                            <button
                                aria-label="Maximize"
                                onClick={() => {
                                    setMaximized(true);
                                    if (
                                        windowRef.current &&
                                        win7DialogRef.current
                                    ) {
                                        win7DialogRef.current.style.width =
                                            "100%";
                                        win7DialogRef.current.style.height =
                                            "100%";
                                        windowRef.current.style.width = "100%";
                                        windowRef.current.style.height = "100%";
                                        windowRef.current.style.margin = "0px";
                                        win7DialogRef.current.style.top = "0px";
                                        win7DialogRef.current.style.left =
                                            "0px";
                                        windowRef.current.style.borderRadius =
                                            "0px";
                                    }
                                }}
                            />
                        )}
                        {maximized && (
                            <button
                                aria-label="Restore"
                                onClick={() => {
                                    setMaximized(false);
                                    if (
                                        windowRef.current &&
                                        win7DialogRef.current
                                    ) {
                                        win7DialogRef.current.style.width =
                                            "250px";
                                        win7DialogRef.current.style.height =
                                            "104px";
                                        windowRef.current.style.width = "250px";
                                        windowRef.current.style.height =
                                            "104px";
                                        windowRef.current.style.margin = "32px";
                                        win7DialogRef.current.style.top = loc.current.y;
                                        win7DialogRef.current.style.left =
                                            loc.current.x;
                                        windowRef.current.style.borderRadius =
                                            "";
                                        windowRef.current.style.margin = "0px";
                                    }
                                }}
                            />
                        )}
                        <button aria-label="Close" onClick={closeDialog} />
                    </div>
                </div>
                <div className="window-body has-space relative box-border flex h-full flex-col justify-between overflow-clip select-none">
                    <div className="text-left select-none">{children}</div>
                    {/* I would use a <form>, but that messes up the padding :P */}
                    <section className="relative flex flex-wrap content-baseline justify-end gap-[6px] self-end">
                        <button className="default" onClick={closeDialog}>
                            OK
                        </button>
                        <button onClick={closeDialog}>Cancel</button>
                    </section>
                </div>
            </div>
        </dialog>,
        document.body,
    );
}

Win7Dialog.displayName = "Win7Dialog";
