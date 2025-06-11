// Icon.tsx
// Componente para renderizar SVGs de lucide-static como JSX en Honox/Preact/React

type IconProps = {
  icon: string;
  className?: string;
  [key: string]: any;
};

export function Icon({ icon, className = "", ...props }: IconProps) {
  delete props.children;
  return (
    <span
      className={className}
      {...props}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
}
