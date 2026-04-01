import Link from 'next/link';
import LnButton from './LnButton';
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("home.cta");

  return (
    <section className='bg-primary text-white text-center py-16 space-y-6'>
      <h2 className='text-5xl font-bold'>{t("title")}</h2>
      <p className='text-xl max-w-lg mx-auto'>
        {t("subtitle")}
      </p>
      <Link href='/become-instructor'>
        <LnButton variant='secondary'>{t("startTeaching")}</LnButton>
      </Link>
    </section>
  );
}
