import type { Route } from "next";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  /** White pill, for dark or coloured tiles. */
  paper: "bg-paper text-ink",
  /** Translucent white, for dark tiles. */
  ghost: "bg-tint text-paper",
  /** Near-black, the primary action in sheets. */
  ink: "bg-ink text-paper",
  /** Follows the theme's well colour. */
  well: "bg-well text-fg",
  /** Light grey that stays light inside sheets. */
  sheet: "bg-sheet-well text-ink",
} as const;

export type PillVariant = keyof typeof variantClasses;

type ExternalHref = `mailto:${string}` | `https://${string}`;

interface PillBaseProps {
  variant?: PillVariant;
  className?: string;
  children: ReactNode;
}

type PillButtonProps = PillBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof PillBaseProps> & { href?: undefined };

type PillLinkProps = PillBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof PillBaseProps | "href"> & {
    /** A route inside the site, or a mailto: / https: link. */
    href: Route | ExternalHref;
  };

export type PillProps = PillButtonProps | PillLinkProps;

function pillClasses(variant: PillVariant, className: string | undefined): string {
  return cn(
    "inline-flex min-h-11 items-center rounded-full px-4.5 text-ui font-semibold no-underline transition-transform duration-200 hover:-translate-y-0.5",
    variantClasses[variant],
    className,
  );
}

function isLink(props: PillProps): props is PillLinkProps {
  return props.href !== undefined;
}

function isExternal(href: Route | ExternalHref): href is ExternalHref {
  return href.startsWith("mailto:") || href.startsWith("https://");
}

/** Rounded action: a button, an internal link or an external link, depending on `href`. */
export function Pill(props: PillProps) {
  if (isLink(props)) {
    const { variant = "paper", className, children, href, ...rest } = props;
    const classes = pillClasses(variant, className);
    return isExternal(href) ? (
      <a {...rest} href={href} className={classes}>
        {children}
      </a>
    ) : (
      <Link {...rest} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant = "paper", className, children, type = "button", ...rest } = props;
  return (
    <button {...rest} type={type} className={pillClasses(variant, className)}>
      {children}
    </button>
  );
}
