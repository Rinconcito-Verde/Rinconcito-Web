import { ChevronLeft } from 'lucide-static';
import { Icon } from '@/components/Icon';
import { useEffect, useState } from 'hono/jsx';

export default function BackButton({text = 'Continuar comprando'} ) {
  const [isInternalReferrer, setIsInternalReferrer] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    setIsInternalReferrer(
      !!referrer && referrer.includes(window.location.hostname)
    );
  }, []);
  if (isInternalReferrer) {
    return (
      <button
        onClick={() => history.back()}
        className="flex items-center font-bold"
      >
        <Icon icon={ChevronLeft} />
        {text}
      </button>
    );
  }

  return (
    <a href="/" className="flex items-center font-bold">
      <Icon icon={ChevronLeft} />
      {text}
    </a>
  );
}