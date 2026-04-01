import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import LnButton from './LnButton';
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className='bg-primary text-white text-center py-20 px-4 space-y-6'>
      <div className='space-y-6'>
        <h2 className='text-5xl font-bold'>{t("title")}</h2>
        <p className='text-xl max-w-lg mx-auto'>
          {t("subtitle")}
        </p>
      </div>
      <div className='max-w-xl mx-auto mb-4'>
        <InputGroup className='bg-accent text-accent-foreground p-2 h-10'>
          <InputGroupInput
            placeholder={t("searchPlaceholder")}

            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Link href='/course'>
        <LnButton variant='secondary'>{t("viewAllCourses")}</LnButton>
      </Link>
    </section>
  );
}
