import React, { ElementType, ReactNode } from "react";
import { STYLE_INTERNAL } from "@/lib/constants/constantStyle";

type ButtonVariant = keyof typeof STYLE_INTERNAL;

interface GenericButtonProps<E extends ElementType> {
    as?: E;
    variant?: ButtonVariant;
    className?: string;
    children: ReactNode;
    disabled?: boolean;
}

// 2. Tipado polimórfico
type Props<E extends ElementType> = GenericButtonProps<E> &
    Omit<React.ComponentPropsWithoutRef<E>, keyof GenericButtonProps<E>>;

export const GenericButton = <E extends ElementType = "button">({
    as,
    variant = "none",
    className = "",
    children,
    disabled = false,
    onClick,
    ...props
}: Props<E>) => {
    const Tag = as || "button";

    const combinedClasses = `
    ${STYLE_INTERNAL[variant as ButtonVariant] || ""} 
    ${className}
    ${disabled ? "transition-opacity opacity-50 cursor-not-allowed pointer-events-none " : ""}
  `
        .trim()
        .replace(/\s+/g, " ");

    return (
        <Tag
            className={combinedClasses}
            disabled={Tag === "button" ? disabled : undefined}
            onClick={(e: React.MouseEvent) => {
                if (disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                // 🔥 Ahora usamos la variable extraída, sin errores de TypeScript
                if (onClick) {
                    (onClick as React.MouseEventHandler)(e);
                }
            }}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default GenericButton;