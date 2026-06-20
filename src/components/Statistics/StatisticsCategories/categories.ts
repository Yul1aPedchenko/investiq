import products from '../../../assets/categoriesIcons/products.svg';
import alco from '../../../assets/categoriesIcons/alco.svg';
import entertainment from '../../../assets/categoriesIcons/entertainment.svg';
import health from '../../../assets/categoriesIcons/health.svg';
import cars from '../../../assets/categoriesIcons/cars.svg';
import home from '../../../assets/categoriesIcons/home.svg';
import tools from '../../../assets/categoriesIcons/tools.svg';
import invoice from '../../../assets/categoriesIcons/invoice.svg';
import hobby from '../../../assets/categoriesIcons/hobby.svg';
import study from '../../../assets/categoriesIcons/study.svg';
import other from '../../../assets/categoriesIcons/other.svg';

import salary from '../../../assets/categoriesIcons/salary.svg';
import extra  from '../../../assets/categoriesIcons/extra.svg';

export const expenseCategories = ["Продукти", "Алкоголь", "Розваги", "Здоров'я", "Транспорт", "Все для дому", "Техніка", "Комуналка/Зв'язок", "Спорт/Хобі", "Навчання", "Інше"];

export const categoriesIcons: Record<string, string> = {
    "Продукти": products,
    "Алкоголь": alco,
    "Розваги": entertainment,
    "Здоров’я": health,
    "Транспорт": cars,
    "Все для дому": home,
    "Техніка": tools,
    "Комуналка/Зв’язок": invoice,
    "Спорт/Хобі": hobby,
    "Навчання": study,
    "Інше": other,

    'Зарплата': salary,
    "Дод дохід": extra,
}

export const incomeCategories = ["Зарплата", "Дод дохід"];

