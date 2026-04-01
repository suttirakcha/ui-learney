import CheckoutSummary from '@/components/cart/CheckoutSummary';
import CheckoutForm from '@/components/features/checkout-form';
import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const t = useTranslations("pages.checkout");

  return (
    <Fragment>
      <div className='bg-primary px-8 py-12'>
        <h2 className='text-4xl font-medium text-white'>{t("title")}</h2>
      </div>
      <div className='p-8'>
        <main className='grid grid-cols-3 gap-6'>
          <section className='col-span-2'>
            <CheckoutForm />
          </section>
          <section>
            <CheckoutSummary />
          </section>
        </main>
      </div>
    </Fragment>
  );
}
