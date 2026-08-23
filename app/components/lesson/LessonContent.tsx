import { MDXRemote } from "next-mdx-remote/rsc";
import type { LessonFrontmatter } from "@/types/curriculum";
import CodeBlock from "./CodeBlock";
import type { ComponentPropsWithoutRef } from "react";

interface Props {
  content: string;
  frontmatter: LessonFrontmatter;
}

// Custom MDX components — each maps an HTML element to our design system
const components = {
  // Code blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
    // next-mdx-remote passes <pre><code className="language-xx"> structure
    const child = children as React.ReactElement<ComponentPropsWithoutRef<"code">>;
    if (child?.props?.className) {
      const match = /language-(\w+)/.exec(child.props.className);
      if (match) {
        return (
          <CodeBlock
            language={match[1]}
            code={String(child.props.children).replace(/\n$/, "")}
          />
        );
      }
    }
    return <pre {...props}>{children}</pre>;
  },

  code({ className, children, ...props }: ComponentPropsWithoutRef<"code">) {
    // Inline code (no language class)
    if (!className) {
      return (
        <code
          className="bg-gray-100 border border-ink px-1.5 py-0.5 font-mono text-sm text-error"
          {...props}
        >
          {children}
        </code>
      );
    }
    return <code className={className} {...props}>{children}</code>;
  },

  // Tables
  table({ children, ...props }: ComponentPropsWithoutRef<"table">) {
    return (
      <div className="overflow-x-auto border-2 border-ink shadow-hard my-8">
        <table className="w-full font-mono text-sm" {...props}>{children}</table>
      </div>
    );
  },
  th({ children, ...props }: ComponentPropsWithoutRef<"th">) {
    return (
      <th
        className="bg-ink text-white px-4 py-3 text-left font-bold uppercase text-xs tracking-wide"
        {...props}
      >
        {children}
      </th>
    );
  },
  td({ children, ...props }: ComponentPropsWithoutRef<"td">) {
    return (
      <td className="px-4 py-3 border-b border-gray-200 text-gray-800" {...props}>
        {children}
      </td>
    );
  },

  // Blockquote → info box
  blockquote({ children }: ComponentPropsWithoutRef<"blockquote">) {
    return (
      <div className="bg-[var(--primary-light)] border-2 border-ink border-l-4 border-l-primary px-5 py-4 my-6 shadow-[2px_2px_0px_#1a1a1a]">
        {children}
      </div>
    );
  },

  h2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
      <h2
        className="font-heading font-bold text-2xl md:text-3xl mt-12 mb-6 border-b-4 border-ink pb-2 inline-block"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
    return (
      <h3 className="font-heading font-bold text-xl mt-8 mb-4" {...props}>
        {children}
      </h3>
    );
  },
  h4({ children, ...props }: ComponentPropsWithoutRef<"h4">) {
    return (
      <h4
        className="font-heading font-bold text-base mt-6 mb-3 uppercase tracking-wide"
        {...props}
      >
        {children}
      </h4>
    );
  },
  p({ children, ...props }: ComponentPropsWithoutRef<"p">) {
    return (
      <p className="font-body text-base leading-relaxed mb-5 text-gray-800" {...props}>
        {children}
      </p>
    );
  },
  ul({ children, ...props }: ComponentPropsWithoutRef<"ul">) {
    return (
      <ul className="list-none space-y-2 mb-5 pl-0" {...props}>
        {children}
      </ul>
    );
  },
  li({ children, ...props }: ComponentPropsWithoutRef<"li">) {
    return (
      <li className="flex items-start gap-2 font-body text-sm text-gray-700" {...props}>
        <span className="text-primary font-bold mt-0.5 flex-shrink-0">→</span>
        <span>{children}</span>
      </li>
    );
  },
  ol({ children, ...props }: ComponentPropsWithoutRef<"ol">) {
    return (
      <ol className="list-decimal list-inside space-y-2 mb-5 font-body text-sm text-gray-700" {...props}>
        {children}
      </ol>
    );
  },
  hr() {
    return <hr className="border-t-2 border-ink my-10" />;
  },
  strong({ children, ...props }: ComponentPropsWithoutRef<"strong">) {
    return (
      <strong className="font-bold text-ink" {...props}>
        {children}
      </strong>
    );
  },
  a({ children, href, ...props }: ComponentPropsWithoutRef<"a">) {
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-secondary underline underline-offset-2 decoration-2 hover:text-primary hover:bg-[var(--primary-light)] transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },
};

export default function LessonContent({ content }: Props) {
  return (
    <div className="lesson-content">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
