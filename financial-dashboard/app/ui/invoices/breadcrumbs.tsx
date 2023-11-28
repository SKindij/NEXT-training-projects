// @path: @/app/ui/invoices/breadcrumbs
import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

// інтерфес для "хлібних крихт"
interface Breadcrumb {
  label:string; // текстовий опис елемента
  href:string; // URL, на який вказує елемент
  active?:boolean; // позначає активний елемент
}
// відповідає за відображення хлібних крихт у інтерфейсі користувача
export default function Breadcrumbs({ breadcrumbs }: {
  breadcrumbs:Breadcrumb[]; // масив хлібних крихт для відображення
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      {/* оформлення відсортованого списку */}
	  <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        {/* мапінг по кожному елементу хлібного шляху */}
		{breadcrumbs.map( (breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
		    {/* для навігації за посиланням */}
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
			{/* додавання роздільника "/" між хлібними крихтами */}
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ) )}
      </ol>
    </nav>
  );
}
